const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenseController'); // Correct path to controller
const { authenticateToken } = require('../middleware/auth'); // Correct import

// Define routes with the appropriate middleware and controllers
router.get('/weekly-summary', authenticateToken, expensesController.getWeeklySummary);
router.get('/spending-by-category', authenticateToken, expensesController.getSpendingByCategory);
router.get('/recent-transactions', authenticateToken, expensesController.getRecentTransactions);

module.exports = router;
