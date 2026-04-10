const mongoose = require('mongoose');

const studyLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: [
      'Data Structures', 'Algorithms', 'Operating Systems',
      'DBMS', 'Computer Networks', 'TOC',
      'Compiler Design', 'Digital Logic', 'Mathematics', 'General Aptitude'
    ]
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