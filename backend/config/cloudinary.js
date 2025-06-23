// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });
  console.log('🌩️ Cloudinary configured');
};

module.exports = configureCloudinary;
