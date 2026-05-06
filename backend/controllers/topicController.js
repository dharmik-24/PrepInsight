const Topic = require('../models/Topic');
const GATE_SYLLABUS = require('../data/gateSyllabus');
const { generateRevisionPlan } = require('../utils/revisionPlanner');

// Ensure user's topic documents stay in sync with latest syllabus.
const syncTopicsWithLatestSyllabus = async (userId) => {
  const existingTopics = await Topic.find({ user: userId }, { subject: 1, topicName: 1 });
  const existingKeys = new Set(
    existingTopics.map((t) => `${t.subject}::${t.topicName}`)
  );

  const missingTopicDocs = [];
  for (const [subject, topics] of Object.entries(GATE_SYLLABUS)) {
    for (const topicName of topics) {
      const key = `${subject}::${topicName}`;
      if (!existingKeys.has(key)) {
        missingTopicDocs.push({ user: userId, subject, topicName, status: 'pending' });
      }
    }
  }

  if (missingTopicDocs.length > 0) {
    await Topic.insertMany(missingTopicDocs, { ordered: false });
  }
};

// Initialize topics for a new user (called on first visit)
const initializeTopics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check if already initialized
    const existing = await Topic.countDocuments({ user: userId });
    if (existing > 0) {
      return res.json({ message: 'Already initialized' });
    }

    // Create topic records for all GATE subjects
    const topicDocs = [];
    for (const [subject, topics] of Object.entries(GATE_SYLLABUS)) {
      for (const topicName of topics) {
        topicDocs.push({ user: userId, subject, topicName, status: 'pending' });
      }
    }

    await Topic.insertMany(topicDocs);
    res.status(201).json({ message: 'Topics initialized', count: topicDocs.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all topics for user
const getTopics = async (req, res) => {
  try {
    await syncTopicsWithLatestSyllabus(req.user._id);
    const topics = await Topic.find({ user: req.user._id }).sort({ subject: 1 });
    
    // Group by subject
    const grouped = {};
    for (const t of topics) {
      if (!grouped[t.subject]) grouped[t.subject] = [];
      grouped[t.subject].push(t);
    }

    // Calculate progress per subject
    const progress = {};
    for (const [subject, topicList] of Object.entries(grouped)) {
      const total = topicList.length;
      const completed = topicList.filter(t => t.status === 'completed').length;
      const inProgress = topicList.filter(t => t.status === 'in-progress').length;
      // Bar reflects completion + partial credit for topics you're actively studying (e.g. via Study Log)
      const percentage = Math.round(
        ((completed + 0.5 * inProgress) / total) * 100
      );
      progress[subject] = {
        topics: topicList,
        completed,
        inProgress,
        total,
        percentage
      };
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update topic status
const updateTopic = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const topic = await Topic.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status, notes, lastStudied: status === 'completed' ? Date.now() : undefined },
      { new: true }
    );
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get revision suggestions based on weak topics + last studied date
const getRevisionPlan = async (req, res) => {
  try {
    await syncTopicsWithLatestSyllabus(req.user._id);
    const topics = await Topic.find({ user: req.user._id });
    const topN = Number(req.query.limit) || 10;
    const suggestions = generateRevisionPlan({
      topics,
      topN
    });

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { initializeTopics, getTopics, updateTopic, getRevisionPlan };