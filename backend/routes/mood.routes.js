// routes/mood.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const moodController = require('../controllers/mood.controller');

router.post('/mood', auth, moodController.addMood);
router.get('/mood', auth, moodController.getMoods);

module.exports = router;
