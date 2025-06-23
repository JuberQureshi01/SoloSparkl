// controllers/mood.controller.js
const Mood = require('../models/Mood');

exports.addMood = async (req, res) => {
  try {
    const { mood, notes } = req.body;
    const newMood = new Mood({
      userId: req.user.userId,
      mood,
      notes
    });
    await newMood.save();
    res.json({ message: 'Mood saved successfully', mood: newMood });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save mood', error: err.message });
  }
};

exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json({ moods });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch moods', error: err.message });
  }
};
