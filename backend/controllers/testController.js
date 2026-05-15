const Test = require('../models/Test');
const { QUESTION_BANK } = require('../data/questionBank');
const GATE_SYLLABUS = require('../data/gateSyllabus');
const { TEST_BLUEPRINT, TEST_CONSTRAINTS } = require('../constants/testBlueprint');
const { generateSubjectWiseTest } = require('../services/testGenerationService');
const AppError = require('../utils/AppError');

const cloneQuestion = (question) => ({
  questionText: question.questionText,
  type: question.type,
  options: Array.isArray(question.options) ? [...question.options] : [],
  correctAnswer: Array.isArray(question.correctAnswer)
    ? [...question.correctAnswer]
    : question.correctAnswer,
  explanation: question.explanation || '',
  subject: question.subject,
  topic: question.topic,
  difficulty: question.difficulty || 'medium',
  marks: question.marks,
  negativeMarks: question.negativeMarks
});

const buildFallbackQuestion = ({ subject, topic, type, marks, index }) => {
  if (type === 'mcq') {
    const options = ['Statement 1', 'Statement 2', 'Statement 3', 'Statement 4'];
    return {
      questionText: `${subject}: ${topic} practice question ${index + 1} (${marks}-mark MCQ). Choose the best option.`,
      type: 'mcq',
      options,
      correctAnswer: options[0],
      explanation: `Auto-generated ${marks}-mark MCQ placeholder for ${subject} - ${topic}.`,
      subject,
      topic,
      difficulty: marks === 1 ? 'easy' : 'medium',
      marks,
      negativeMarks: marks === 1 ? 0.33 : 0.67
    };
  }

  if (type === 'msq') {
    const options = ['Statement A', 'Statement B', 'Statement C', 'Statement D'];
    return {
      questionText: `${subject}: ${topic} practice question ${index + 1} (${marks}-mark MSQ). Select all correct options.`,
      type: 'msq',
      options,
      correctAnswer: [options[0], options[1]],
      explanation: `Auto-generated ${marks}-mark MSQ placeholder for ${subject} - ${topic}.`,
      subject,
      topic,
      difficulty: marks === 1 ? 'easy' : 'medium',
      marks,
      negativeMarks: 0
    };
  }

  return {
    questionText: `${subject}: ${topic} practice question ${index + 1} (${marks}-mark NAT). Enter a numerical answer.`,
    type: 'nat',
    options: [],
    correctAnswer: marks + index + 1,
    explanation: `Auto-generated ${marks}-mark NAT placeholder for ${subject} - ${topic}.`,
    subject,
    topic,
    difficulty: marks === 1 ? 'easy' : 'medium',
    marks,
    negativeMarks: 0
  };
};

const buildSubjectWiseQuestions = (subject) => {
  const subjectPool = QUESTION_BANK.filter((q) => q.subject === subject);
  const topics = GATE_SYLLABUS[subject] || ['Core Concepts'];
  const topicCursor = { value: 0 };

  const nextTopic = () => {
    const topic = topics[topicCursor.value % topics.length];
    topicCursor.value += 1;
    return topic;
  };

  const result = [];
  const usedQuestions = new Set();

  for (const slot of TEST_BLUEPRINT) {
    // Get all unused questions of the exact type and marks
    const exactMatches = subjectPool.filter(
      (q) => q.type === slot.type && q.marks === slot.marks && !usedQuestions.has(q.questionText)
    );

    for (let i = 0; i < slot.count; i++) {
      if (exactMatches[i]) {
        result.push(cloneQuestion(exactMatches[i]));
        usedQuestions.add(exactMatches[i].questionText);
      } else {
        // Fallback: Find ANY unused question with the same marks to avoid placeholders
        const anyUnused = subjectPool.find(
          (q) => q.marks === slot.marks && !usedQuestions.has(q.questionText)
        );
        
        if (anyUnused) {
          result.push(cloneQuestion(anyUnused));
          usedQuestions.add(anyUnused.questionText);
        } else {
          result.push(
            buildFallbackQuestion({
              subject,
              topic: nextTopic(),
              type: slot.type,
              marks: slot.marks,
              index: i
            })
          );
        }
      }
    }
  }

  return result;
};

// Seed question bank into DB (run once)
const seedTests = async (req, res) => {
  try {
    // Rebuild tests from scratch so latest blueprint is always applied.
    await Test.deleteMany({ testType: { $in: ['topic-wise', 'full-mock'] } });

    // Create one subject-wise test per syllabus subject
    const subjects = Object.keys(GATE_SYLLABUS);
    let created = 0;

    for (const subject of subjects) {
      const questions = buildSubjectWiseQuestions(subject);
      const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
      await Test.create({
        title: `${subject} - Subject-wise Test`,
        testType: 'topic-wise',
        subject,
        duration: 45,
        questions,
        totalMarks
      });
      created++;
    }

    res.json({
      message: `Seeded ${created} subject-wise tests successfully`,
      blueprint: {
        totalQuestions: TEST_CONSTRAINTS.totalQuestions,
        durationMinutes: TEST_CONSTRAINTS.durationMinutes,
        totalMarks: TEST_CONSTRAINTS.totalMarks,
        distribution: { mcq: 6, msq: 5, nat: 4, oneMark: 5, twoMark: 10 }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubjects = async (req, res) => {
  res.json({
    subjects: Object.keys(GATE_SYLLABUS),
    blueprint: TEST_CONSTRAINTS
  });
};

const generateTest = async (req, res, next) => {
  try {
    const { subject } = req.body;
    try {
      const { test, cached } = await generateSubjectWiseTest({ subject });
      return res.status(201).json({
        message: cached ? 'Using recently generated test' : 'AI generated test successfully',
        cached,
        test
      });
    } catch (aiError) {
      console.warn(`[Fallback] AI generation failed (${aiError.code || aiError.message}). Using offline question bank.`);
      const questions = buildSubjectWiseQuestions(subject);
      const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
      const test = await Test.create({
        title: `${subject} - Subject-wise Test (Offline Fallback)`,
        testType: 'topic-wise',
        subject,
        duration: TEST_CONSTRAINTS.durationMinutes,
        questions,
        totalMarks
      });
      
      return res.status(201).json({
        message: 'AI service busy or failed validation. Generated test using offline question bank.',
        cached: false,
        test
      });
    }
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(new AppError('Unable to generate test right now', 502, 'TEST_GENERATION_FAILED'));
  }
};

// Get all available tests
const getTests = async (req, res) => {
  try {
    // Don't send questions in list view (too large)
    const tests = await Test.find().select('-questions');
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single test with questions (when starting a test)
const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    
    // Shuffle questions for fairness
    const shuffled = [...test.toObject().questions].sort(() => Math.random() - 0.5);
    res.json({ ...test.toObject(), questions: shuffled });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { seedTests, getSubjects, generateTest, getTests, getTestById };