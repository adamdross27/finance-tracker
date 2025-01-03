import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../../api/user'; // API function to get user data
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const logOut = () => {
    // Clear the localStorage or any other session data
    localStorage.removeItem('firstName');
    localStorage.removeItem('token'); // Assuming the token is stored in localStorage

    // Redirect the user to the login page
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
        const token = localStorage.getItem('token'); // Correct token key
        if (!token) {
            setError('No token found. Please log in again.');
            return;
        }
    
        try {
            const response = await getUserDetails(token);
            if (response.error) {
                setError(response.error);
            } else {
                setFirstName(response.firstName); // Update state with first name
                localStorage.setItem('firstName', response.firstName); // Save first name in localStorage
            }
        } catch (error) {
            setError('An error occurred while fetching user data.');
        }
    };
  
    fetchUserData();
}, []);


return (
    <div className="home-page">
      {error && <p className="error-message">{error}</p>}
      <h1>Welcome, {firstName || localStorage.getItem('firstName') || 'Guest'}!</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
);

};

export default Home;
