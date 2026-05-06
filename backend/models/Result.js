const mongoose = require('mongoose');

// Stores each user's response per question and final analysis
const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  // Array of user answers: { questionId, userAnswer, isCorrect, timeTaken }
  responses: [{
    questionId: mongoose.Schema.Types.ObjectId,
    userAnswer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    timeTaken: Number  // seconds
  }],
  score: { type: Number, default: 0 },
  totalMarks: { type: Number },
  accuracy: { type: Number, default: 0 },          // percentage
  timeTaken: { type: Number },                      // total seconds
  subjectWiseScore: { type: Map, of: Number },
  weakTopics: [String],
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);