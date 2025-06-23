// controllers/userQuest.controller.js
const UserQuest = require('../models/UserQuest');
const Quest = require('../models/Quest');
const Point = require('../models/Point');

exports.assignQuest = async (req, res) => {
  const { questId } = req.body;
  try {
    const newAssignment = new UserQuest({
      userId: req.user.userId,
      questId
    });
    await newAssignment.save();
    res.json({ message: 'Quest assigned', assignment: newAssignment });
  } catch (err) {
    res.status(500).json({ message: 'Assignment failed', error: err.message });
  }
};

exports.completeQuest = async (req, res) => {
  const { userQuestId } = req.body;
  try {
    const userQuest = await UserQuest.findById(userQuestId);
    if (!userQuest) return res.status(404).json({ message: "UserQuest not found" });

    if (userQuest.status === "completed") {
      return res.status(400).json({ message: "Already marked as completed" });
    }

    userQuest.status = 'completed';
    userQuest.completedAt = new Date();
    await userQuest.save();

    const quest = await Quest.findById(userQuest.questId);
    let rewardPoints = 10;
    if (quest?.difficulty === 'medium') rewardPoints = 20;
    else if (quest?.difficulty === 'hard') rewardPoints = 30;

    await Point.create({
      userId: req.user.userId,
      userQuestId,
      points: rewardPoints,
      type: 'quest-completion',
      reason: `Completed a ${quest?.difficulty || 'easy'} quest`
    });

    res.json({ message: 'Quest marked complete and reward granted', userQuest });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark complete', error: err.message });
  }
};

exports.getUserQuests = async (req, res) => {
  try {
    const assigned = await UserQuest.find({ userId: req.user.userId })
      .populate('questId')
      .sort({ assignedAt: -1 });
    res.json({ assigned });
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};
