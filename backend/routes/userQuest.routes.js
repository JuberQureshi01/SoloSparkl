// routes/userQuest.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userQuestController = require('../controllers/userQuest.controller');

router.post('/user-quest', auth, userQuestController.assignQuest);
router.post('/user-quest/complete', auth, userQuestController.completeQuest);
router.get('/user-quest', auth, userQuestController.getUserQuests);

module.exports = router;
