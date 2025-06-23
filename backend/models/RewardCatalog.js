// models/RewardCatalog.js
const mongoose = require('mongoose');

const rewardCatalogSchema = new mongoose.Schema({
  title: String,
  description: String,
  cost: Number,
  type: String,
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('RewardCatalog', rewardCatalogSchema);
