const db = require('../src/utils/db');  // Import the database connection from db.js

// Function to fetch all categories
const getCategories = async () => {
  try {
    const [rows] = await db.query('SELECT category_id, name FROM category');  // Query categories table
    return rows;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

module.exports = { getCategories };
