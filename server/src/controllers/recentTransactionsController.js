const pool = require('../utils/db');

const getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    // Query to get recent transactions
    const [result] = await pool.query(`
      SELECT id, name, amount, date
      FROM expenses
      WHERE userId = ?
      ORDER BY date DESC
      LIMIT 5
    `, [userId]);

    res.json(result);
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getRecentTransactions };
