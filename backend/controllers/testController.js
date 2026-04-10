const Test = require('../models/Test');
const QUESTION_BANK = require('../data/questionBank');

// Seed question bank into DB (run once)
const seedTests = async (req, res) => {
  try {
    // Create topic-wise tests from question bank
    const subjects = [...new Set(QUESTION_BANK.map(q => q.subject))];
    let created = 0;

    for (const subject of subjects) {
      const questions = QUESTION_BANK.filter(q => q.subject === subject);
      if (questions.length === 0) continue;

      const existing = await Test.findOne({ subject, testType: 'topic-wise' });
      if (existing) continue;

      const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
      await Test.create({
        title: `${subject} - Topic Test`,
        testType: 'topic-wise',
        subject,
        duration: 45,
        questions,
        totalMarks
      });
      created++;
    }

    // Create one full mock test with all questions
    const fullMockExists = await Test.findOne({ testType: 'full-mock' });
    if (!fullMockExists) {
      const totalMarks = QUESTION_BANK.reduce((sum, q) => sum + q.marks, 0);
      await Test.create({
        title: 'GATE CS Full Mock Test 2024',
        testType: 'full-mock',
        duration: 180,
        questions: QUESTION_BANK,
        totalMarks
      });
      created++;
    }

    res.json({ message: `Seeded ${created} tests successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

<<<<<<< HEAD
module.exports = { seedTests, getTests, getTestById };
=======
module.exports = { seedTests, getTests, getTestById }; 
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
