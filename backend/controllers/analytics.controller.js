// controllers/analytics.controller.js
const UserQuest = require('../models/UserQuest');
const Mood = require('../models/Mood');
const Reflection = require('../models/Reflection');
const Point = require('../models/Point');

exports.questsCompleted = async (req, res) => {
  try {
    const completed = await UserQuest.countDocuments({
      userId: req.user.userId,
      status: 'completed'
    });
    res.json({ completedQuests: completed });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quest data', error: err.message });
  }
};

exports.moodTrend = async (req, res) => {
  try {
    const pastWeek = new Date();
    pastWeek.setDate(pastWeek.getDate() - 7);

    const moods = await Mood.find({
      userId: req.user.userId,
      date: { $gte: pastWeek }
    }).sort({ date: 1 });

    const moodMap = moods.map(m => ({
      date: m.date.toISOString().split('T')[0],
      mood: m.mood
    }));

    res.json({ moodTrend: moodMap });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch mood data', error: err.message });
  }
};

exports.weeklyReflections = async (req, res) => {
  try {
    const pastWeek = new Date();
    pastWeek.setDate(pastWeek.getDate() - 7);

    const reflections = await Reflection.find({
      userQuestId: { $exists: true },
      createdAt: { $gte: pastWeek }
    }).populate({
      path: 'userQuestId',
      match: { userId: req.user.userId }
    });

    const filtered = reflections.filter(r => r.userQuestId !== null);

    res.json({ reflectionsThisWeek: filtered.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reflection data', error: err.message });
  }
};

exports.summary = async (req, res) => {
  try {
    const completed = await UserQuest.countDocuments({ userId: req.user.userId, status: 'completed' });
    const totalPoints = await Point.find({ userId: req.user.userId });
    const moodEntries = await Mood.countDocuments({ userId: req.user.userId });

    const pointSum = totalPoints.reduce((sum, p) => sum + p.points, 0);

    res.json({
      completedQuests: completed,
      totalPoints: pointSum,
      moodLogs: moodEntries
    });
  } catch (err) {
    res.status(500).json({ message: 'Summary fetch failed', error: err.message });
  }
};

exports.emotionTimeline = async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.userId }).sort({ date: 1 });
    const data = moods.map(m => ({
      date: m.date.toISOString().split('T')[0],
      mood: m.mood
    }));
    res.json({ timeline: data });
  } catch (err) {
    res.status(500).json({ message: "Timeline fetch failed", error: err.message });
  }
};
