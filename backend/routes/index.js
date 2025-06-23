// routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const questRoutes = require('./quest.routes');
const moodRoutes = require('./mood.routes');
const userQuestRoutes = require('./userQuest.routes');
const reflectionRoutes = require('./reflection.routes');
const pointsRoutes = require('./points.routes');
const rewardRoutes = require('./reward.routes');
const analyticsRoutes = require('./analytics.routes');

router.use(authRoutes);
router.use(userRoutes);
router.use(questRoutes);
router.use(moodRoutes);
router.use(userQuestRoutes);
router.use(reflectionRoutes);
router.use(pointsRoutes);
router.use(rewardRoutes);
router.use(analyticsRoutes);

module.exports = router;
