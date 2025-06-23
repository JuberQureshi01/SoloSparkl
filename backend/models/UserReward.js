// models/UserReward.js
const mongoose = require('mongoose');

const userRewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rewardId: { type: mongoose.Schema.Types.ObjectId, ref: 'RewardCatalog' },
  redeemedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserReward', userRewardSchema);

