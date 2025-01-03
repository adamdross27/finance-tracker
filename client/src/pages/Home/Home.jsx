import React, { useState, useEffect } from 'react';

const Home = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    // Assuming the firstName is stored in localStorage after registration/login
    const storedFirstName = localStorage.getItem('firstName');
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome, {firstName || 'Guest'}!</h1>
      <p>You're successfully logged in.</p>
    </div>
  );
};

export default Home;
