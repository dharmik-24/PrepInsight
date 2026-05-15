const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
    index: true // Indexing for faster queries when fetching messages by group
  },
  sender: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// To ensure consistent 'id' behavior similar to old JSON logic
messageSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Message', messageSchema);
