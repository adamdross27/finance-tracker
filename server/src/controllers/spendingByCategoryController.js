const pool = require('../utils/db');

const getSpendingByCategory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Query to get spending by category
    const [result] = await pool.query(`
      SELECT c.name AS category, SUM(e.amount) AS totalSpending
      FROM expenses e
      JOIN categories c ON e.categoryId = c.id
      WHERE e.userId = ?
      GROUP BY c.name
    `, [userId]);

    res.json(result);
  } catch (error) {
    console.error('Error fetching spending by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getSpendingByCategory };
