// controllers/user.controller.js
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ profile: user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get profile', error: err.message });
  }
};

exports.updatePersonality = async (req, res) => {
  try {
    const { introvert, openness, preferredQuestTypes } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.userId,
      { personality: { introvert, openness, preferredQuestTypes } },
      { new: true }
    );
    res.json({ message: "Personality updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to save personality", error: err.message });
  }
};
