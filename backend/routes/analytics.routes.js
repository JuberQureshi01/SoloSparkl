// routes/analytics.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const analyticsController = require('../controllers/analytics.controller');

router.get('/analytics/quests-completed', auth, analyticsController.questsCompleted);
router.get('/analytics/mood-trend', auth, analyticsController.moodTrend);
router.get('/analytics/weekly-reflections', auth, analyticsController.weeklyReflections);
router.get('/analytics/summary', auth, analyticsController.summary);
router.get('/analytics/emotion-timeline', auth, analyticsController.emotionTimeline);

module.exports = router;
