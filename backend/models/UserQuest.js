// models/UserQuest.js
const mongoose = require('mongoose');

const userQuestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' },
  status: { type: String, enum: ['assigned', 'completed', 'skipped'], default: 'assigned' },
  assignedAt: { type: Date, default: Date.now },
  completedAt: Date,
});

module.exports = mongoose.model('UserQuest', userQuestSchema);
