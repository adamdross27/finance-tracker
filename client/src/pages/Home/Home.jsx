import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../../api/user'; // API function to get user data
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setAuthError(true); // Missing token
        return;
      }

      try {
        const response = await getUserDetails(token);

        if (response.error) {
          setAuthError(true); // API returned an error
        } else {
          setFirstName(response.firstName);
          localStorage.setItem('firstName', response.firstName);
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
      <h1>Welcome, {firstName || localStorage.getItem('firstName') || 'Guest'}!</h1>
    </div>
  );
};

export default Home;
