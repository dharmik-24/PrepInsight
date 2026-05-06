const mongoose = require('mongoose');

// Mistake Book: stores wrong answers for later revision
const mistakeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionText: { type: String, required: true },
  options: [String],
  userAnswer: mongoose.Schema.Types.Mixed,
  correctAnswer: mongoose.Schema.Types.Mixed,
  explanation: { type: String, default: '' },
  subject: { type: String },
  topic: { type: String },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  // User can mark as revised
  isRevised: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mistake', mistakeSchema);