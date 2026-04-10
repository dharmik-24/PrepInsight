const StudyLog = require('../models/StudyLog');
const Topic = require('../models/Topic');
const GATE_SYLLABUS = require('../data/gateSyllabus');

// @route POST /api/studylogs — Add a new study session
const addLog = async (req, res) => {
  try {
    const { subject, topic, duration, notes, date } = req.body;
    const log = await StudyLog.create({
      user: req.user._id,
      subject, topic, duration, notes,
      date: date || Date.now()
    });

    const studiedAt = log.date || new Date();
    const topicDoc = await Topic.findOne({
      user: req.user._id,
      subject,
      topicName: topic
    });
    if (topicDoc) {
      topicDoc.lastStudied = studiedAt;
      if (topicDoc.status === 'pending') {
        topicDoc.status = 'in-progress';
      }
      await topicDoc.save();
    }

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/studylogs — Get all logs for the logged-in user
const getLogs = async (req, res) => {
  try {
    const logs = await StudyLog.find({ user: req.user._id }).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/studylogs/stats — Aggregated stats for dashboard
const getStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total minutes studied
    const totalMinutes = await StudyLog.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: '$duration' } } }
    ]);

    // Per-subject breakdown
    const subjectBreakdown = await StudyLog.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$subject', minutes: { $sum: '$duration' } } }
    ]);

    // Daily study data for heatmap (last 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const dailyData = await StudyLog.aggregate([
      { $match: { user: userId, date: { $gte: ninetyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          minutes: { $sum: '$duration' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalHours: totalMinutes[0] ? (totalMinutes[0].total / 60).toFixed(1) : 0,
      subjectBreakdown,
      dailyData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/studylogs/:id
const deleteLog = async (req, res) => {
  try {
    const log = await StudyLog.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/studylogs/syllabus — Return GATE syllabus (subjects -> topics)
const getSyllabus = async (_req, res) => {
  res.json(GATE_SYLLABUS);
};

module.exports = { addLog, getLogs, getStats, deleteLog, getSyllabus };