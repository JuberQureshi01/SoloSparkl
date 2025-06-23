// routes/reflection.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const reflectionController = require('../controllers/reflection.controller');

// Multer + Cloudinary Storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'solo_sparks',
    allowed_formats: ['jpg', 'png', 'mp3', 'wav', 'mp4'],
    resource_type: 'auto',
  }
});
const upload = multer({ storage });

router.post('/reflection', auth, upload.fields([{ name: 'photos' }, { name: 'audio' }]), reflectionController.submitReflection);
router.get('/reflection/view/:userQuestId', auth, reflectionController.viewReflections);

module.exports = router;
