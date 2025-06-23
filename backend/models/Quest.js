// models/Quest.js
const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  recommendedFor: Object,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quest', questSchema);
