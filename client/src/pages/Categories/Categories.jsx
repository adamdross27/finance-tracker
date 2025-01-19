import React, { useEffect, useState } from 'react';
import { fetchCategories, addCategory, deleteCategory } from '../../api/categoryService';
import './Categories.css';
import { jwtDecode } from 'jwt-decode'; // Use named import

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [loggedInUserId, setLoggedInUserId] = useState(null); // Manage logged in user ID state

  useEffect(() => {
    // Fetch categories when the component mounts
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    console.log("Stored token from localStorage on mount:", token); // Debugging line
  
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT
        console.log("Decoded token:", decodedToken); // Check the decoded token structure
        const userId = decodedToken.id; // Assuming the ID is in the 'id' field
        setLoggedInUserId(userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  
    loadCategories();
  }, []); // Empty dependency array ensures this runs once on mount
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
  
    // Check loggedInUserId from state first, if not, try from localStorage
    const userId = loggedInUserId || localStorage.getItem('userId');
    console.log("Attempting to add category with userId:", userId); // Debugging line
  
    if (!userId) {
      console.error('User is not logged in!');
      alert('Please log in to add a category.');
      return;
    }
  
    const categoryData = {
      name: newCategory.name,
      description: newCategory.description,
      user_id: userId, // Ensure user ID is passed
    };
  
    try {
      const category = await addCategory(categoryData);
      setCategories((prevCategories) => [...prevCategories, category]);
      setNewCategory({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  
  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.category_id !== categoryId)
      );
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="categories-container">
      <div className='headings'>
        <h1>Categories</h1>
        <h3>Below you can add a new category as well as view your existing categories below!</h3>
      </div>
      {/* Add New Category Form */}
      <form onSubmit={handleAddCategory} className="add-category-form">
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Category Description"
          value={newCategory.description}
          onChange={handleInputChange}
        />
        <button type="submit">Add Category</button>
      </form>

      {/* Display Categories List */}
      <div className="categories-list">
        {categories.map((category) => (
          <div key={category.category_id} className="category-item">
            <div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
            <div>
              <button onClick={() => handleDeleteCategory(category.category_id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
