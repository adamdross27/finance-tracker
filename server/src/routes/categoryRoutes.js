const express = require('express');
const router = express.Router();
const { getCategories } = require('../../models/Category');  // Import the getCategories function

// Route to get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await getCategories();  // Get categories using the raw query
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
