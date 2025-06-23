// controllers/reward.controller.js
const RewardCatalog = require('../models/RewardCatalog');
const UserReward = require('../models/UserReward');
const Point = require('../models/Point');

exports.getAvailableRewards = async (req, res) => {
  try {
    const rewards = await RewardCatalog.find({ available: true });
    res.json({ rewards });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch rewards', error: err.message });
  }
};

exports.redeemReward = async (req, res) => {
  const { rewardId } = req.body;

  try {
    const reward = await RewardCatalog.findById(rewardId);
    if (!reward || !reward.available) {
      return res.status(404).json({ message: 'Reward not available' });
    }

    const userPoints = await Point.find({ userId: req.user.userId });
    const total = userPoints.reduce((sum, p) => sum + p.points, 0);

    const redeemedRewards = await UserReward.find({ userId: req.user.userId }).populate('rewardId');
    const totalSpent = redeemedRewards.reduce((sum, r) => sum + (r.rewardId?.cost || 0), 0);

    const available = total - totalSpent;

    if (available < reward.cost) {
      return res.status(400).json({ message: 'Not enough points' });
    }

    const newRedeem = new UserReward({
      userId: req.user.userId,
      rewardId
    });

    await newRedeem.save();

    res.json({ message: 'Reward redeemed successfully', reward: newRedeem });
  } catch (err) {
    res.status(500).json({ message: 'Redemption failed', error: err.message });
  }
};
