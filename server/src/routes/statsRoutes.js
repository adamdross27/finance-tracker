const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { authenticateToken } = require('../middleware/auth'); // JWT authentication middleware

// Route to fetch stats
router.get('/stats', authenticateToken, statsController.getStats);

module.exports = router;
