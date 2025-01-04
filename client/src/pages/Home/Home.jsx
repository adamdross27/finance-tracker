import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../../api/user'; // API function to get user data
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [authError, setAuthError] = useState(false); // State to handle redirection logic
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // Missing token
        setAuthError(true); // Trigger error handling
        return;
      }

      try {
        const response = await getUserDetails(token);

        if (response.error) {
          // API returned an error
          setAuthError(true); // Trigger error handling
        } else {
          // Successfully fetched user data
          setFirstName(response.firstName);
          localStorage.setItem('firstName', response.firstName);
        }
      } catch (error) {
        // Unexpected fetch error
        setAuthError(true); // Trigger error handling
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (authError) {
      // Handle the alert and redirection in a single place
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
