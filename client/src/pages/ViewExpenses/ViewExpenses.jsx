import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext'; // Ensure AuthContext is correctly imported
import { fetchExpenses } from '../../api/viewExpenses';
import './ViewExpenses.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

const ViewExpenses = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Set default date range to the last 30 days
  useEffect(() => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);

    setStartDate(lastMonth.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);

  }, []);

  useEffect(() => {
    // When startDate or endDate changes, trigger the fetch
    if (startDate && endDate) {
      handleShowExpenses();
    }
  }, [startDate, endDate]);

  const handleShowExpenses = async () => {
    if (!isAuthenticated) {
      setError('You must be logged in to view expenses');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    setLoading(true);

    try {
      const data = await fetchExpenses(token, startDate, endDate);
      if (data.error) {
        setError(data.error);
      } else {
        setExpenses(data);
      }
    } catch (err) {
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handlePresetRange = (range) => {
    const today = new Date();
    let newStartDate = today;
    let newEndDate = today;

    switch (range) {
      case 'today':
        newStartDate = today;
        newEndDate = today;
        break;
      case 'lastWeek':
        newStartDate = new Date();
        newStartDate.setDate(today.getDate() - 7);
        break;
      case 'lastMonth':
        newStartDate = new Date();
        newStartDate.setMonth(today.getMonth() - 1);
        break;
      case 'thisYear':
        newStartDate = new Date(today.getFullYear(), 0, 1); // Jan 1 of the current year
        break;
      default:
        break;
    }

    setStartDate(newStartDate.toISOString().split('T')[0]);
    setEndDate(newEndDate.toISOString().split('T')[0]);
  };

  return (
    <div className="view-expenses">
      <h2>View Expenses</h2>
      
      <div className="filters">
        {/* Date Pickers and Show Button on the left */}
        <div className="date-pickers">
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
          <span>to</span>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
          <button className="show-button" onClick={handleShowExpenses}>Show</button>
        </div>

        {/* Preset Range Buttons on the right */}
        <div className="preset-buttons">
          <button onClick={() => handlePresetRange('today')}>Today</button>
          <button onClick={() => handlePresetRange('lastWeek')}>Last Week</button>
          <button onClick={() => handlePresetRange('lastMonth')}>Last Month</button>
          <button onClick={() => handlePresetRange('thisYear')}>This Year</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : expenses.length === 0 ? (
        <p>No expenses found for the selected date range.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.expense_id}>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.title}</td>
                <td>${expense.amount}</td>
                <td>{expense.description || 'N/A'}</td>
                <td>{expense.category_name || 'Uncategorized'}</td>
                <td>{expense.payment_method || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewExpenses;
