// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const connectDB = require('./config/db');
const configureCloudinary = require('./config/cloudinary');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin:"*",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
}))
app.use(express.json());

// DB & Cloudinary setup
connectDB();
configureCloudinary();

app.get("/working", (req, res) => {
  res.send("working");
});

// Routes
app.use('/api', routes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
