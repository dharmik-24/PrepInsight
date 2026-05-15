const Test = require('../models/Test');
const { QUESTION_BANK } = require('../data/questionBank');
const GATE_SYLLABUS = require('../data/gateSyllabus');
<<<<<<< Updated upstream

const TEST_BLUEPRINT = [
  { type: 'mcq', marks: 1, count: 2 },
  { type: 'mcq', marks: 2, count: 4 },
  { type: 'msq', marks: 1, count: 2 },
  { type: 'msq', marks: 2, count: 3 },
  { type: 'nat', marks: 1, count: 1 },
  { type: 'nat', marks: 2, count: 3 }
];
=======
const {
  TEST_BLUEPRINT,
  TEST_CONSTRAINTS
} = require('../constants/testBlueprint');

const {
  generateSubjectWiseTest
} = require('../services/testGenerationService');

const AppError = require('../utils/AppError');
>>>>>>> Stashed changes

// ================= MOCK TEST IMPORTS =================


const MOCK_TEST_1 = require('../data/mockTest1');
const MOCK_TEST_2 = require('../data/mockTest2');
const MOCK_TEST_3 = require('../data/mockTest3');
const MOCK_TEST_4 = require('../data/mockTest4');

// ================= HELPER FUNCTIONS =================

const cloneQuestion = (question) => ({
  questionText: question.questionText,
  type: question.type,
  options: Array.isArray(question.options)
    ? [...question.options]
    : [],
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

const buildFallbackQuestion = ({
  subject,
  topic,
  type,
  marks,
  index
}) => {

  if (type === 'mcq') {

    const options = [
      'Statement 1',
      'Statement 2',
      'Statement 3',
      'Statement 4'
    ];

    return {
      questionText: `${subject}: ${topic} practice question ${index + 1}`,
      type: 'mcq',
      options,
      correctAnswer: options[0],
      explanation: 'Fallback question',
      subject,
      topic,
      difficulty: marks === 1 ? 'easy' : 'medium',
      marks,
      negativeMarks: marks === 1 ? 0.33 : 0.66
    };
  }

  if (type === 'msq') {

    const options = [
      'Statement A',
      'Statement B',
      'Statement C',
      'Statement D'
    ];

    return {
      questionText: `${subject}: ${topic} practice question ${index + 1}`,
      type: 'msq',
      options,
      correctAnswer: [options[0], options[1]],
      explanation: 'Fallback question',
      subject,
      topic,
      difficulty: marks === 1 ? 'easy' : 'medium',
      marks,
      negativeMarks: 0
    };
  }

  return {
    questionText: `${subject}: ${topic} practice question ${index + 1}`,
    type: 'nat',
    options: [],
    correctAnswer: marks + index + 1,
    explanation: 'Fallback question',
    subject,
    topic,
    difficulty: marks === 1 ? 'easy' : 'medium',
    marks,
    negativeMarks: 0
  };
};

const buildSubjectWiseQuestions = (subject) => {

  const subjectPool = QUESTION_BANK.filter(
    (q) => q.subject === subject
  );

  const topics = GATE_SYLLABUS[subject] || ['Core Concepts'];

  const topicCursor = { value: 0 };

  const nextTopic = () => {
    const topic = topics[topicCursor.value % topics.length];
    topicCursor.value += 1;
    return topic;
  };

  const result = [];

  for (const slot of TEST_BLUEPRINT) {
<<<<<<< Updated upstream
    const filtered = subjectPool.filter((q) => q.type === slot.type && q.marks === slot.marks);

    for (let i = 0; i < slot.count; i++) {
      if (filtered[i]) {
        result.push(cloneQuestion(filtered[i]));
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
=======

    const exactMatches = subjectPool.filter(
      (q) =>
        q.type === slot.type &&
        q.marks === slot.marks &&
        !usedQuestions.has(q.questionText)
    );

    for (let i = 0; i < slot.count; i++) {

      if (exactMatches[i]) {

        result.push(cloneQuestion(exactMatches[i]));
        usedQuestions.add(exactMatches[i].questionText);

      } else {

        const anyUnused = subjectPool.find(
          (q) =>
            q.marks === slot.marks &&
            !usedQuestions.has(q.questionText)
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
>>>>>>> Stashed changes
      }
    }
  }

  return result;
};

// ========================= SEED TESTS =========================

const seedTests = async (req, res) => {

  try {

    // DELETE OLD TESTS
    await Test.deleteMany({});

    // ================= SUBJECT-WISE TESTS =================

    const subjects = Object.keys(GATE_SYLLABUS);

    for (const subject of subjects) {

      const questions = buildSubjectWiseQuestions(subject);

      const totalMarks = questions.reduce(
        (sum, q) => sum + q.marks,
        0
      );

      await Test.create({
        title: `${subject} - Subject-wise Test`,
        testType: 'topic-wise',
        subject,
        duration: 45,
        questions,
        totalMarks
      });

      console.log(`${subject} test inserted`);
    }

    // ================= MOCK TESTS =================

    
  const mockTests = [
      MOCK_TEST_1[0],
      MOCK_TEST_2[0],
      MOCK_TEST_3[0],
      MOCK_TEST_4[0]
    ];
    for (const mock of mockTests) {

      if (!mock || !mock.questions) {
        console.log('Invalid mock test:', mock);
        continue;
      }

      const totalMarks = mock.questions.reduce(
        (sum, q) => sum + q.marks,
        0
      );

      await Test.create({
        title: mock.title ,
        testType: 'full-mock',
        subject: 'All Subjects',
        duration: 180,
        questions: mock.questions,
        totalMarks: 100
      });

      console.log(`${mock.title} inserted`);
    }

    res.json({
<<<<<<< Updated upstream
      message: `Seeded ${created} subject-wise tests successfully`,
      blueprint: {
        totalQuestions: 15,
        durationMinutes: 45,
        totalMarks: 25,
        distribution: { mcq: 6, msq: 5, nat: 4, oneMark: 5, twoMark: 10 }
      }
=======
      message: 'All tests seeded successfully'
>>>>>>> Stashed changes
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

<<<<<<< Updated upstream
// Get all available tests
=======
// ========================= GET SUBJECTS =========================

const getSubjects = async (req, res) => {

  res.json({
    subjects: Object.keys(GATE_SYLLABUS),
    blueprint: TEST_CONSTRAINTS
  });
};

// ========================= GENERATE TEST =========================

const generateTest = async (req, res, next) => {

  try {

    const { subject } = req.body;

    try {

      const { test, cached } =
        await generateSubjectWiseTest({ subject });

      return res.status(201).json({
        message: cached
          ? 'Using recently generated test'
          : 'AI generated test successfully',
        cached,
        test
      });

    } catch (aiError) {

      console.warn(
        `[Fallback] AI generation failed (${aiError.code || aiError.message})`
      );

      const questions = buildSubjectWiseQuestions(subject);

      const totalMarks = questions.reduce(
        (sum, q) => sum + q.marks,
        0
      );

      const test = await Test.create({
        title: `${subject} - Subject-wise Test`,
        testType: 'topic-wise',
        subject,
        duration: TEST_CONSTRAINTS.durationMinutes,
        questions,
        totalMarks
      });

      return res.status(201).json({
        message: 'Offline test generated',
        cached: false,
        test
      });
    }

  } catch (error) {

    if (error instanceof AppError) {
      return next(error);
    }

    next(
      new AppError(
        'Unable to generate test right now',
        502,
        'TEST_GENERATION_FAILED'
      )
    );
  }
};

// ========================= GET ALL TESTS =========================

>>>>>>> Stashed changes
const getTests = async (req, res) => {

  try {

    const tests = await Test.find().select('-questions');

    res.json(tests);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// ========================= GET TEST BY ID =========================

const getTestById = async (req, res) => {

  try {

    const test = await Test.findById(req.params.id);

    if (!test) {

      return res.status(404).json({
        message: 'Test not found'
      });
    }

    const testObj = test.toObject();

    if (!testObj.questions || testObj.questions.length === 0) {

      return res.status(400).json({
        message: 'This test has no questions'
      });
    }

    const shuffledQuestions = [...testObj.questions].sort(
      () => Math.random() - 0.5
    );

    testObj.questions = shuffledQuestions;

    res.json(testObj);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

<<<<<<< Updated upstream
module.exports = { seedTests, getTests, getTestById };
=======
module.exports = {
  seedTests,
  getSubjects,
  generateTest,
  getTests,
  getTestById
};
>>>>>>> Stashed changes
