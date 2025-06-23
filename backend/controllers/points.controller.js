// controllers/points.controller.js
const Point = require('../models/Point');

exports.awardPoints = async (req, res) => {
  const { userQuestId, points, type, reason } = req.body;
  try {
    const newPoint = new Point({
      userId: req.user.userId,
      userQuestId: userQuestId || null,
      points,
      type,
      reason
    });
    await newPoint.save();
    res.json({ message: 'Points awarded', point: newPoint });
  } catch (err) {
    res.status(500).json({ message: 'Failed to award points', error: err.message });
  }
};

exports.getPoints = async (req, res) => {
  try {
    const allPoints = await Point.find({ userId: req.user.userId });
    const total = allPoints.reduce((sum, p) => sum + p.points, 0);
    res.json({ totalPoints: total, logs: allPoints });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch points', error: err.message });
  }
};
