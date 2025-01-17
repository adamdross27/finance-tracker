import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../../api/user'; // API function to get user data
import { fetchStats } from '../../api/stats'; // API to fetch stats
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [authError, setAuthError] = useState(false);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setAuthError(true); // Missing token
        return;
      }

      try {
        const userResponse = await getUserDetails(token);

        if (userResponse.error) {
          setAuthError(true); // API returned an error
        } else {
          setFirstName(userResponse.firstName);
          localStorage.setItem('firstName', userResponse.firstName);

          // Fetch stats after user data
          const statsResponse = await fetchStats(token);
          setStats(statsResponse);
        }
      } catch (error) {
        setAuthError(true); // Unexpected fetch error
        console.error('Fetch error:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (authError) {
      alert('No authorization token found or session expired. Please log in again.');
      navigate('/login', { replace: true });
    }
  }, [authError, navigate]);

  return (
    <div className="home-page">
      
      <div className="stats">
      <h1>Welcome, {firstName || localStorage.getItem('firstName') || 'Guest'}!</h1>

        <h2>Here's Your Financial Snapshot</h2>
        <ul>
          <li><strong>Yearly Spending:</strong> ${Number(stats.yearSpending || 0).toFixed(2)}</li>
          <li><strong>Monthly Spending:</strong> ${Number(stats.monthSpending || 0).toFixed(2)}</li>
          <li><strong>Weekly Spending:</strong> ${Number(stats.weekSpending || 0).toFixed(2)}</li>
          <li><strong>Today's Spending:</strong> ${Number(stats.daySpending || 0).toFixed(2)}</li>
          <li><strong>Top Categories:</strong> {stats.topCategories?.join(', ') || 'None'}</li>
          <li><strong>Avg Daily Spending:</strong> ${Number(stats.dailyAverage || 0).toFixed(2)}</li>
          <li><strong>Biggest Expense:</strong> ${Number(stats.biggestExpense || 0).toFixed(2)}</li>
        </ul>

        <div className="expense-summary">
          <h3>Expenses by Category</h3>
          {stats.expenseByCategory && stats.expenseByCategory.length > 0 ? (
            <ul>
              {stats.expenseByCategory.map((category) => (
                <li key={category.name}>
                  {category.name}: ${category.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
