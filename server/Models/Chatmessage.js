const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  socketid: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
module.exports = ChatMessage;
