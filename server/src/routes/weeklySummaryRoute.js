// server/src/routes/weeklySummaryRoute.js
const express = require('express');
const router = express.Router();
const { getWeeklySummary } = require('../controllers/weeklySummaryController');
const { authenticateToken } = require('../middleware/auth');

// Protected route for weekly summary
router.get('/weekly-summary', authenticateToken, getWeeklySummary);

module.exports = router;
