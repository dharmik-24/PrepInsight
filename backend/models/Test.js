const mongoose = require('mongoose');

// Schema for a single question
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  // 'mcq' = single correct, 'msq' = multiple correct, 'nat' = numerical
  type: {
    type: String,
    enum: ['mcq', 'msq', 'nat'],
    required: true
  },
  options: [String],          // For MCQ/MSQ
  correctAnswer: mongoose.Schema.Types.Mixed, // String, Array, or Number
  explanation: { type: String, default: '' },
  subject: { type: String },
  topic: { type: String },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  marks: { type: Number, default: 2 },
  negativeMarks: { type: Number, default: 0.67 }
});

// A Test can be topic-wise or full-length mock
const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  testType: {
    type: String,
    enum: ['topic-wise', 'full-mock'],
    required: true
  },
  subject: { type: String },  // For topic-wise tests
  topic: { type: String },
  duration: { type: Number, required: true }, // in minutes
  questions: [questionSchema],
  totalMarks: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', testSchema);