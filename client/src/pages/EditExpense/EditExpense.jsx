import React, { useState, useEffect } from 'react';
import './EditExpense.css';
import { getExpenseById, editExpense, deleteExpense } from '../../api/editExpense'; // Import API functions

const EditExpense = () => {
  const [query, setQuery] = useState({ title: '', date: '' });
  const [matchingExpenses, setMatchingExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories and payment methods
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated.');

        const [categoriesResponse, methodsResponse] = await Promise.all([
          fetch('http://localhost:5001/api/categories', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5001/api/paymentMethods', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!categoriesResponse.ok || !methodsResponse.ok) {
          throw new Error('Failed to fetch options.');
        }

        setCategories(await categoriesResponse.json());
        setPaymentMethods(await methodsResponse.json());
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleSearch = async () => {
    setLoading(true); // Show loading state
  
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated.');
  
    const response = await fetch(`${process.env.REACT_APP_API_URL}/expenses/search?title=${query.title}&date=${query.date}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
  
    setMatchingExpenses(data);
    
    // If no results are found, show alert and clear search fields
    if (data.length === 0) {
      let alertMessage = 'No results found';
      
      if (query.title && query.date) {
        alertMessage = `No results found for expense "${query.title}" on ${formatDate(query.date)}`;
      } else if (query.title) {
        alertMessage = `No results found for expense "${query.title}"`;
      } else if (query.date) {
        alertMessage = `No results found for the date ${formatDate(query.date)}`;
      }

      alert(alertMessage);
      setQuery({ title: '', date: '' }); // Clear search fields
    }
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSelectExpense = async (expenseId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const expenseData = await getExpenseById(expenseId, token);
      if (expenseData.error) throw new Error(expenseData.error);
      
      setSelectedExpense(expenseData);
      setFormData({
        ...expenseData,
        payment_method: expenseData.payment_method || '',
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const result = await deleteExpense(expenseId, token);
      if (result.error) throw new Error(result.error);
      
      alert('Expense deleted successfully!');
      setMatchingExpenses(matchingExpenses.filter(exp => exp.expense_id !== expenseId));
      setSelectedExpense(null);
      setFormData({});
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const result = await editExpense(selectedExpense.expense_id, formData, token);
      if (result.error) throw new Error(result.error);
      
      alert('Expense updated successfully!');
      setSelectedExpense(null);
      setFormData({});
      setMatchingExpenses([]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-expense">
      <h2>Edit Expense</h2>

      <p>Search by the expense title or expense date below!</p>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Search Section */}
      <div className="search-expenses">
        <input
          type="text"
          placeholder="Search by title"
          value={query.title}
          onChange={(e) => setQuery({ ...query, title: e.target.value })}
        />
        <input
          type="date"
          value={query.date}
          onChange={(e) => setQuery({ ...query, date: e.target.value })}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Matching Expenses */}
      {matchingExpenses.length > 0 && (
        <ul className="expense-list">
          {matchingExpenses.map((expense) => (
            <li key={expense.expense_id}>
              {expense.title} - {formatDate(expense.date)} - ${expense.amount}
              <div className="buttons">
                <button className="edit-button" onClick={() => handleSelectExpense(expense.expense_id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteExpense(expense.expense_id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Form */}
      {selectedExpense && (
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Category:
            <select
              name="category_id"
              value={formData.category_id || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Payment Method:
            <select
              name="payment_method"
              value={formData.payment_method || ''}
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
          </label>
          <button type="submit">Update Expense</button>
        </form>
      )}
    </div>
  );
};

export default EditExpense;
