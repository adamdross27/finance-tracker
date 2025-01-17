// server/src/controllers/expenseController.js

const db = require('../utils/db'); // Assuming you have a utility for database queries

// Weekly summary
const getWeeklySummary = async (req, res) => {
  const userId = req.user.id;
  console.log(`Fetching weekly summary for user ID ${userId}`);
  try {
    const result = await db.query(
      'SELECT SUM(amount) AS weeklyTotal FROM expense WHERE user_id = ? AND WEEK(date_added) = WEEK(CURRENT_DATE)',
      [userId]
    );
    if (!result || result.length === 0) {
      console.log(`No weekly expenses found for user ID ${userId}`);
      return res.status(404).json({ message: 'No expenses found for this user.' });
    }
    res.json(result[0]);
  } catch (error) {
    console.error(`Error fetching weekly summary for user ID ${userId}:`, error.message);
    res.status(500).json({ error: 'Failed to fetch weekly summary.' });
  }
};

// Other controllers remain unchanged


// Controller for fetching spending by category
const getSpendingByCategory = async (req, res) => {
  const userId = req.user.id;
  console.log('Fetching spending by category for user:', userId); // Log the user ID

  try {
    const result = await db.query('SELECT category_id, SUM(amount) AS totalSpent FROM expense WHERE user_id = ? GROUP BY category_id', [userId]);
    console.log('Spending by category query result:', result); // Log the query result
    res.json(result);
  } catch (error) {
    console.error('Error fetching spending by category:', error);
    res.status(500).json({ error: 'Failed to fetch spending by category.' });
  }
};

// Controller for fetching recent transactions
const getRecentTransactions = async (req, res) => {
  const userId = req.user.id;
  console.log('Fetching recent transactions for user:', userId); // Log the user ID

  try {
    const result = await db.query('SELECT * FROM expense WHERE user_id = ? ORDER BY date_added DESC LIMIT 5', [userId]);
    console.log('Recent transactions query result:', result); // Log the query result
    res.json(result);
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    res.status(500).json({ error: 'Failed to fetch recent transactions.' });
  }
};

module.exports = {
  getWeeklySummary,
  getSpendingByCategory,
  getRecentTransactions,
};
