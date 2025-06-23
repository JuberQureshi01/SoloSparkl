// models/Mood.js
const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  mood: String,
  notes: String,
});

module.exports = mongoose.model('Mood', moodSchema);
