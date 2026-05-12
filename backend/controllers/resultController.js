const Result = require('../models/Result');
const Test = require('../models/Test');
const Mistake = require('../models/Mistake');
const Topic = require('../models/Topic');

// Submit a test and calculate results
const submitTest = async (req, res) => {
  try {
    const { testId, responses, timeTaken } = req.body;
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    let score = 0;
    let correctCount = 0;
    const processedResponses = [];
    const weakTopics = new Set();
    const subjectScores = {};
    const mistakesToSave = [];
    const topicPerformance = new Map();

    // Evaluate each response
    for (const response of responses) {
      const question = test.questions.id(response.questionId);
      if (!question) continue;

      let isCorrect = false;
      const topicKey = question.subject && question.topic
        ? `${question.subject}::${question.topic}`
        : null;

      if (question.type === 'mcq') {
        isCorrect = response.userAnswer === question.correctAnswer;
      } else if (question.type === 'msq') {
        // Both arrays must match exactly
        const userAns = [...(response.userAnswer || [])].sort();
        const correct = [...question.correctAnswer].sort();
        isCorrect = JSON.stringify(userAns) === JSON.stringify(correct);
      } else if (question.type === 'nat') {
        isCorrect = parseFloat(response.userAnswer) === parseFloat(question.correctAnswer);
      }

      // Calculate marks (GATE marking scheme)
      const subj = question.subject || 'General';
      if (!subjectScores[subj]) subjectScores[subj] = 0;

      if (isCorrect) {
        score += question.marks;
        subjectScores[subj] += question.marks;
        correctCount++;
        if (topicKey) {
          const perf = topicPerformance.get(topicKey) || {
            subject: question.subject,
            topicName: question.topic,
            total: 0,
            correct: 0,
            incorrect: 0
          };
          perf.total += 1;
          perf.correct += 1;
          topicPerformance.set(topicKey, perf);
        }
      } else if (response.userAnswer !== null && response.userAnswer !== undefined && response.userAnswer !== '') {
        // Apply negative marking only for attempted wrong answers (not NAT)
        if (question.type !== 'nat') {
          score -= question.negativeMarks;
          subjectScores[subj] -= question.negativeMarks;
        }
        // Add to weak topics
        if (question.topic) weakTopics.add(question.topic);
        // Save to mistake book
        mistakesToSave.push({
          user: req.user._id,
          questionText: question.questionText,
          options: question.options,
          userAnswer: response.userAnswer,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
          subject: question.subject,
          topic: question.topic,
          testId
        });
        if (topicKey) {
          const perf = topicPerformance.get(topicKey) || {
            subject: question.subject,
            topicName: question.topic,
            total: 0,
            correct: 0,
            incorrect: 0
          };
          perf.total += 1;
          perf.incorrect += 1;
          topicPerformance.set(topicKey, perf);
        }
      }

      processedResponses.push({
        questionId: response.questionId,
        userAnswer: response.userAnswer,
        isCorrect,
        timeTaken: response.timeTaken || 0
      });
    }

    const accuracy = responses.length > 0
      ? Math.round((correctCount / responses.length) * 100)
      : 0;

    // Save result
    const result = await Result.create({
      user: req.user._id,
      test: testId,
      responses: processedResponses,
      score: Math.max(0, score), // Score can't go below 0
      totalMarks: test.totalMarks,
      accuracy,
      timeTaken,
      subjectWiseScore: subjectScores,
      weakTopics: [...weakTopics]
    });

    // Save mistakes to mistake book (avoid duplicates)
    if (mistakesToSave.length > 0) {
      await Mistake.insertMany(mistakesToSave);
    }

    // Persist per-topic performance so revision planning has topic-level signals.
    if (topicPerformance.size > 0) {
      const criteria = [...topicPerformance.values()].map(({ subject, topicName }) => ({
        user: req.user._id,
        subject,
        topicName
      }));

      const topicDocs = await Topic.find({ $or: criteria });
      const topicByKey = new Map(
        topicDocs.map((doc) => [`${doc.subject}::${doc.topicName}`, doc])
      );

      const updates = [];
      for (const [key, perf] of topicPerformance.entries()) {
        const topicDoc = topicByKey.get(key);
        if (!topicDoc) continue;

        const totalAttempts = Math.max(0, topicDoc.totalAttempts || 0) + perf.total;
        const correctAttempts = Math.max(0, topicDoc.correctAttempts || 0) + perf.correct;
        const incorrectAttempts = Math.max(0, topicDoc.incorrectAttempts || 0) + perf.incorrect;
        const accuracy = totalAttempts > 0
          ? Math.round((correctAttempts / totalAttempts) * 100)
          : null;

        updates.push({
          updateOne: {
            filter: { _id: topicDoc._id },
            update: {
              $set: {
                totalAttempts,
                correctAttempts,
                incorrectAttempts,
                accuracy,
                lastStudied: new Date(),
                status: topicDoc.status === 'pending' ? 'in-progress' : topicDoc.status
              }
            }
          }
        });
      }

      if (updates.length > 0) {
        await Topic.bulkWrite(updates);
      }
    }

    res.status(201).json({ result, weakTopics: [...weakTopics] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all results for the user
const getResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id })
      .populate('test', 'title testType subject')
      .sort({ completedAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get rank prediction based on scores
const getRankPrediction = async (req, res) => {
  try {
    // 1. Fetch only full-length mock tests for the user and sort ascending
    const allResults = await Result.find({ user: req.user._id })
      .populate({
        path: 'test',
        match: { testType: 'full-mock' }
      })
      .sort({ createdAt: 1 }); // Oldest to newest
    
    // Filter out results where test is null (i.e. testType is not 'full-mock')
    const mockResults = allResults.filter(r => r.test != null);

    if (mockResults.length === 0) {
      return res.json({ message: 'Please attempt at least one full mock test to generate rank prediction.' });
    }

    // 2. Calculate weighted average score and average accuracy
    let totalWeightedScore = 0;
    let totalWeight = 0;
    let totalAccuracy = 0;

    mockResults.forEach((result, index) => {
      const weight = index + 1; // Progressive weights: 1 for first test, 2 for second, etc.
      totalWeightedScore += result.score * weight;
      totalWeight += weight;
      totalAccuracy += result.accuracy;
    });

    const avgScore = totalWeightedScore / totalWeight;
    const avgAccuracy = totalAccuracy / mockResults.length;

    // 3. Rank Prediction Logic (Exponential Decay)
    const totalCandidates = 200000;
    
    // Clamp score between 0 and 100
    const normalizedScore = Math.max(0, Math.min(100, avgScore));

    let predictedRank = totalCandidates * Math.exp(-0.09 * normalizedScore);

    // 4. Accuracy Adjustments
    if (avgAccuracy >= 90) {
      predictedRank *= 0.8;
    } else if (avgAccuracy >= 80) {
      predictedRank *= 0.9;
    } else if (avgAccuracy < 60) {
      predictedRank *= 1.15;
    }

    // 5. Prevent impossible values
    predictedRank = Math.max(1, Math.round(predictedRank));

    // 6. Prediction range
    const lowerBound = Math.max(1, Math.round(predictedRank * 0.8));
    const upperBound = Math.max(1, Math.round(predictedRank * 1.2));

    // 7. Format Response
    res.json({
      avgScore: Number(avgScore.toFixed(2)),
      avgAccuracy: Number(avgAccuracy.toFixed(2)),
      predictedRank,
      predictedRange: `${lowerBound} - ${upperBound}`,
      totalTests: mockResults.length,
      note: 'Prediction based on full mock tests. Exponential decay model with recent-test weighting applied.'
    });
  } catch (error) {
    console.error('Rank prediction error:', error);
    res.status(500).json({ message: 'Failed to generate rank prediction.' });
  }
};

module.exports = { submitTest, getResults, getRankPrediction };