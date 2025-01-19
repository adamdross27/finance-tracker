// src/api/categoryService.js

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const addCategory = async (categoryData) => {
  try {
    console.log("Sending category data:", categoryData);

    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData), // Passing data to the backend
    });

    if (!response.ok) {
      throw new Error('Failed to add category');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding category:', error);
    throw new Error('Error adding category');
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_URL}/categories/${categoryId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
