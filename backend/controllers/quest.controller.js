// controllers/quest.controller.js
const Quest = require('../models/Quest');
const User = require('../models/User');
const Mood = require('../models/Mood');

exports.createQuest = async (req, res) => {
  try {
    const { title, description, tags, difficulty } = req.body;
    const quest = await Quest.create({
      title,
      description,
      tags,
      difficulty,
      createdBy: req.user.userId
    });
    res.json({ message: 'Quest created successfully', quest });
  } catch (err) {
    res.status(500).json({ message: 'Quest creation failed', error: err.message });
  }
};

exports.getQuests = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const isAdmin = user.email === 'juber@gmail.com';
    let filter;

    if (isAdmin) {
      filter = {};
    } else {
      const adminUser = await User.findOne({ email: 'juber@gmail.com' });
      filter = {
        $or: [
          { createdBy: adminUser._id },
          { createdBy: user._id }
        ]
      };
    }

    const quests = await Quest.find(filter).populate('createdBy', 'email');
    res.json({ quests });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load quests', error: err.message });
  }
};

exports.recommendQuests = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const mood = await Mood.findOne({ userId: user._id }).sort({ date: -1 });

    const baseFilter = {
      tags: { $in: user.personality?.preferredQuestTypes || [] }
    };

    if (mood?.mood === 'anxious' || mood?.mood === 'sad') {
      baseFilter.tags.$in.push('calm', 'reflection');
    }

    const quests = await Quest.find(baseFilter).limit(5);
    res.json({ recommended: quests });
  } catch (err) {
    res.status(500).json({ message: "AI quest suggestion failed", error: err.message });
  }
};
