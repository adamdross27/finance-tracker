const pool = require('../utils/db');

const getWeeklySummary = async (req, res) => {
  try {
    const userId = req.user.id; // Get user from JWT token

    // Query to get weekly spending summary
    const [result] = await pool.query(`
      SELECT
        SUM(amount) AS totalSpending,
        WEEK(date) AS week,
        YEAR(date) AS year
      FROM expenses
      WHERE userId = ? AND date >= CURDATE() - INTERVAL 1 WEEK
      GROUP BY year, week
    `, [userId]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'No data found for the current week.' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching weekly summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getWeeklySummary };
