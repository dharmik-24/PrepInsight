const mongoose = require('mongoose');

// Tracks per-user completion status for each GATE CS topic
const topicSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  topicName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  // Notes specific to this topic
  notes: {
    type: String,
    default: ''
  },
  lastStudied: {
    type: Date
  }
});

// Compound index: one record per user per topic
topicSchema.index({ user: 1, subject: 1, topicName: 1 }, { unique: true });

module.exports = mongoose.model('Topic', topicSchema);