// models/Reflection.js
const mongoose = require('mongoose');

const reflectionSchema = new mongoose.Schema({
  userQuestId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserQuest' },
  text: String,
  photos: [String],
  audio: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reflection', reflectionSchema);
