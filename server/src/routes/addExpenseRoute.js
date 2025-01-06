// routes/addExpenseRoutes.js

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/addExpenseController');
const { authenticateToken } = require('../middleware/auth'); // Middleware to authenticate JWT token

// Route for adding an expense
router.post('/addExpense', authenticateToken, expenseController.addExpense);

module.exports = router;
