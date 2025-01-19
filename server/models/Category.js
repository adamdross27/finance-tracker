const db = require('../src/utils/db');  // Import the database utility

// Function to get all categories
const getCategories = async () => {
  try {
    const [rows] = await db.execute('SELECT * FROM Category ORDER BY name ASC');
    return rows;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
};

const addCategory = async (categoryData) => {
  const { name, description, user_id } = categoryData;
  try {
    console.log('Adding category:', { name, description, user_id });
    const [result] = await db.execute(
      'INSERT INTO Category (name, description, user_id) VALUES (?, ?, ?)',
      [name, description, user_id]
    );
    console.log('Category added:', result);
    return { category_id: result.insertId, name, description };
  } catch (error) {
    console.error('Error adding category:', error);
    throw new Error('Error adding category');
  }
};



// Function to delete a category
const deleteCategory = async (categoryId) => {
  try {
    await db.execute('DELETE FROM Category WHERE category_id = ?', [categoryId]);
  } catch (error) {
    throw new Error('Error deleting category');
  }
};

module.exports = {
  getCategories,
  addCategory,
  deleteCategory
};
