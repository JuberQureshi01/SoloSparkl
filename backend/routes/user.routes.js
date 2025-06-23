// routes/user.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user.controller');

router.get('/user/profile', auth, userController.getProfile);
router.post('/user/personality', auth, userController.updatePersonality);

module.exports = router;
