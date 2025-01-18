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
      <div className="card">
        <div className="stats">
          <h1>Welcome, {firstName || localStorage.getItem('firstName') || 'Guest'}! Here's your financial snapshot!</h1>

          <div className="spending-summary">
            <h3>Spending Summary</h3>
            <table>
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Yearly</td>
                  <td>${Number(stats.yearSpending || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Monthly</td>
                  <td>${Number(stats.monthSpending || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Weekly</td>
                  <td>${Number(stats.weekSpending || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Today's</td>
                  <td>${Number(stats.daySpending || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Avg Daily</td>
                  <td>${Number(stats.dailyAverage || 0).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="expense-summary">
            <h3>Expenses by Category</h3>
            {stats.expenseByCategory && stats.expenseByCategory.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.expenseByCategory.map((category) => (
                    <tr key={category.name}>
                      <td>{category.name}</td>
                      <td>${category.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
