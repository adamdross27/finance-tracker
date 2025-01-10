import React, { useState, useEffect, useContext } from 'react';
import './AddExpense.css';
import { addExpense } from '../../api/addExpense'; // Import the addExpense function
import AuthContext from '../../context/AuthContext'; // Import the AuthContext

const AddExpense = () => {
  const { isAuthenticated } = useContext(AuthContext); // Access the authentication state
  const [categories, setCategories] = useState([]); // State for category options
  const [paymentMethods, setPaymentMethods] = useState([]); // State for payment methods
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
    category_id: '', // Matches the database field
    date: '',
    paymentMethod: 'Cash',
    isRecurring: false,
  });
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for category fetch
  const [loadingMethods, setLoadingMethods] = useState(true); // Loading state for payment methods fetch
  const [error, setError] = useState(null); // Error state for API fetches

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch payment methods from backend
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5001/api/paymentMethods', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payment methods');
        }

        const data = await response.json();
        setPaymentMethods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingMethods(false);
      }
    };

    fetchPaymentMethods();
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

    if (!isAuthenticated) {
        alert('You must be logged in to add an expense');
        return;
    }

    const token = localStorage.getItem('token');

    // Prepare data for backend
    const preparedData = {
        ...formData,
        payment_method: formData.paymentMethod, // Map to backend's expected field
    };

    delete preparedData.paymentMethod; // Remove the unused field

    const response = await addExpense(preparedData, token);

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
          {loadingCategories ? (
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
          {loadingMethods ? (
            <p>Loading payment methods...</p>
          ) : error ? (
            <p>Error loading payment methods: {error}</p>
          ) : (
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select a payment method</option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.type}>
                  {method.type}
                </option>
              ))}
            </select>
          )}
        </label>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
