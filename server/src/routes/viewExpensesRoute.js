const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../utils/db');

// Fetch expenses based on custom date range
router.get('/expenses', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { start_date, end_date } = req.query;  // Get the query parameters

  // Validate if the dates are provided
  if (!start_date || !end_date) {
    return res.status(400).json({ error: 'Both start_date and end_date are required.' });
  }

  try {
    const [expenses] = await db.execute(
      `
      SELECT 
        e.expense_id,
        e.date,
        e.title,
        e.amount,
        e.description,
        e.payment_method,
        c.name AS category_name
      FROM 
        expense e
      LEFT JOIN 
        category c ON e.category_id = c.category_id
      WHERE 
        e.user_id = ? 
        AND e.date BETWEEN ? AND ?
      ORDER BY 
        e.date DESC
      `,
      [userId, start_date, end_date]  // Pass the date range into the query
    );

    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

module.exports = router;
