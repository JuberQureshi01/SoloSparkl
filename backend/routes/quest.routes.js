// routes/quest.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const questController = require('../controllers/quest.controller');

router.post('/quest', auth, questController.createQuest);
router.get('/quest', auth, questController.getQuests);
router.get('/quest/recommended', auth, questController.recommendQuests);

module.exports = router;
