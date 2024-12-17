// routes/homeRoutes.js
const express = require('express');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');
const router = express.Router();

// Use the routes from authRoutes and postRoutes
router.use('/auth', authRoutes);  // e.g., /home/auth/signup
router.use('/posts', postRoutes); // e.g., /home/posts/create

module.exports = router;
