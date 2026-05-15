const mongoose = require('mongoose');

const studyLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  // Duration in minutes
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  notes: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('StudyLog', studyLogSchema);