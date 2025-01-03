// routes/userRoutes.js
const express = require('express');
const { verifyToken, getUserDetails } = require('../controllers/userController');
const router = express.Router();

// Protected route for getting user details
router.get('/details', verifyToken, getUserDetails);

module.exports = router;
