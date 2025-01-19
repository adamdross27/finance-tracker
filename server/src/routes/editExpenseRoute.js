const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../utils/db');

// Add `/search` to handle search requests
router.get('/search', authenticateToken, async (req, res) => {
  const { title, date } = req.query;
  const userId = req.user.id;

  try {
    const query = `
      SELECT * FROM expense
      WHERE user_id = ?
      AND (? IS NULL OR title LIKE ?)
      AND (? IS NULL OR date = ?)
    `;
    const [rows] = await db.execute(query, [
      userId,
      title || null, `%${title}%`,
      date || null, date,
    ]);

    return res.status(200).json(rows); // Send the result of the search
  } catch (error) {
    console.error('Error searching expenses:', error);
    return res.status(500).json({ error: 'Failed to search expenses.' });
  }
});

module.exports = router;
