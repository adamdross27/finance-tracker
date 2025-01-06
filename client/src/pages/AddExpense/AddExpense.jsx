import React, { useState, useEffect, useContext } from 'react';
import './AddExpense.css';
import { addExpense } from '../../api/addExpense'; // Import the addExpense function
import AuthContext from '../../context/AuthContext';  // Import the AuthContext

const AddExpense = () => {
  const { isAuthenticated } = useContext(AuthContext);  // Access the authentication state
  const [categories, setCategories] = useState([]); // State for category options
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
    category_id: '',  // Matches the database field
    date: '',
    paymentMethod: 'Cash',
    isRecurring: false,
  });
  const [loading, setLoading] = useState(true); // Loading state for category fetch
  const [error, setError] = useState(null); // Error state for category fetch

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/categories'); // Ensure correct API URL
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is authenticated
    if (!isAuthenticated) {
      alert('You must be logged in to add an expense');
      return;
    }

    // Get token from localStorage (or wherever it is stored)
    const token = localStorage.getItem('token');

    // Call the addExpense function to send data to the API
    const response = await addExpense(formData, token);

    if (response.error) {
      alert(`Error: ${response.error}`);
    } else {
      alert('Expense added successfully!');
      setFormData({
        title: '',
        amount: '',
        description: '',
        category_id: '',
        date: '',
        paymentMethod: 'Cash',
        isRecurring: false,
      });
    }
  };

  return (
    <div className="add-expense">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Amount:
          <input
            type="number"
            name="amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Category:
          {loading ? (
            <p>Loading categories...</p>
          ) : error ? (
            <p>Error loading categories: {error}</p>
          ) : (
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Payment Method:
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Recurring:
          <input
            type="checkbox"
            name="isRecurring"
            checked={formData.isRecurring}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
