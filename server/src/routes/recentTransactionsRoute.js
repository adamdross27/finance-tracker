// server/src/routes/recentTransactionsRoute.js

const express = require('express');
const router = express.Router();
const { getRecentTransactions } = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/auth');

// Protected route for recent transactions
router.get('/recent-transactions', authenticateToken, (req, res, next) => {
  console.log('Request for recent transactions from user:', req.user.id); // Log user ID before calling the controller
  next();
}, getRecentTransactions);

module.exports = router;
