// server/src/routes/spendingByCategoryRoute.js
const express = require('express');
const router = express.Router();
const { getSpendingByCategory } = require('../controllers/spendingByCategoryController');
const { authenticateToken } = require('../middleware/auth');

// Protected route for spending by category
router.get('/spending-by-category', authenticateToken, getSpendingByCategory);

module.exports = router;
