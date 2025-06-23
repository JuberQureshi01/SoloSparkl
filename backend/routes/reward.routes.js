// routes/reward.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const rewardController = require('../controllers/reward.controller');

router.get('/rewards', rewardController.getAvailableRewards);
router.post('/redeem', auth, rewardController.redeemReward);

module.exports = router;
