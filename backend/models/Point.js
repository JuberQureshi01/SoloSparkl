// models/Point.js
const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userQuestId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserQuest', default: null },
  points: Number,
  type: { type: String, enum: ['quest-completion', 'reflection', 'mood-log', 'bonus'], required: true },
  reason: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Point', pointsSchema);
