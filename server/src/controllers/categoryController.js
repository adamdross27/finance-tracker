const { getCategories, addCategory, deleteCategory } = require('../../models/Category');

// Controller to get all categories
const getCategoriesController = async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Controller to add a new category
const addCategoryController = async (req, res) => {
  const { name, description, user_id } = req.body;
  try {
    const newCategory = await addCategory({ name, description, user_id });
    res.json(newCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Failed to add category' });
  }
};

// Controller to delete a category
const deleteCategoryController = async (req, res) => {
  const { categoryId } = req.params;
  try {
    await deleteCategory(categoryId);
    res.status(204).send();  // No content response
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

module.exports = {
  getCategoriesController,
  addCategoryController,
  deleteCategoryController
};
