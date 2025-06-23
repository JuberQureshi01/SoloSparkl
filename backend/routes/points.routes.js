// routes/points.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pointsController = require('../controllers/points.controller');

router.post('/points', auth, pointsController.awardPoints);
router.get('/points', auth, pointsController.getPoints);

module.exports = router;
