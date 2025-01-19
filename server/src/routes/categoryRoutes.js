const express = require('express');
const router = express.Router();
const { getCategories, addCategory, deleteCategory } = require('../../models/Category');  // Import necessary functions

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

// Route to add a new category
router.post('/', async (req, res) => {
  const { name, description, user_id } = req.body;  // Destructure data from request body
  try {
    // Add category to the database
    const newCategory = await addCategory({ name, description, user_id });
    res.status(201).json(newCategory);  // Respond with the newly created category
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Failed to add category' });
  }
});

// Route to delete a category
router.delete('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;  // Get categoryId from route parameters
  try {
    await deleteCategory(categoryId);  // Delete the category using its ID
    res.status(204).send();  // No content response after successful deletion
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;
