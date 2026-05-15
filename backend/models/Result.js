const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
    index: true
  },

  // ⭐ NEW: tracks repeated attempts of same test
  attemptNumber: {
    type: Number,
    default: 1
  },

  responses: [{
    questionId: mongoose.Schema.Types.ObjectId,
    userAnswer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    timeTaken: Number
  }],

  score: { type: Number, default: 0 },
  totalMarks: { type: Number },

  accuracy: { type: Number, default: 0 },

  timeTaken: { type: Number },

  subjectWiseScore: {
    type: Map,
    of: Number,
    default: {}
  },

  weakTopics: {
    type: [String],
    default: []
  },

  completedAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('Result', resultSchema);