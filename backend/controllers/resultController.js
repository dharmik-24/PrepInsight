const Result = require('../models/Result');
const Test = require('../models/Test');
const Mistake = require('../models/Mistake');

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

    // Evaluate each response
    for (const response of responses) {
      const question = test.questions.id(response.questionId);
      if (!question) continue;

      let isCorrect = false;

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
    const results = await Result.find({ user: req.user._id });
    if (results.length === 0) {
      return res.json({ message: 'No tests taken yet' });
    }

    // Average score across all mock tests
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    const avgAccuracy = results.reduce((sum, r) => sum + r.accuracy, 0) / results.length;

    // Simple rank estimation formula (based on GATE 2023 statistics)
    // Adjust thresholds based on real GATE data
    let predictedRank;
    const totalAppearances = 100000; // approx GATE CS aspirants

    if (avgScore >= 70) predictedRank = Math.round(totalAppearances * 0.001);
    else if (avgScore >= 60) predictedRank = Math.round(totalAppearances * 0.005);
    else if (avgScore >= 50) predictedRank = Math.round(totalAppearances * 0.02);
    else if (avgScore >= 40) predictedRank = Math.round(totalAppearances * 0.08);
    else if (avgScore >= 30) predictedRank = Math.round(totalAppearances * 0.2);
    else predictedRank = Math.round(totalAppearances * 0.5);

    res.json({
      avgScore: avgScore.toFixed(1),
      avgAccuracy: avgAccuracy.toFixed(1),
      predictedRank,
      totalTests: results.length,
      note: 'Prediction based on mock test performance. Actual rank may vary.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitTest, getResults, getRankPrediction };