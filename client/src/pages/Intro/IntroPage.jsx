import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css';
import logo from '../../assets/icon.png';  // Import the logo image

const IntroPage = () => {
    const navigate = useNavigate();

    return (
        <div className="intro-page">
            <img src={logo} alt="Finance Tracker Logo" className="intro-logo" />  {/* Add the image with a class */}
            <h1>FINANCE TRACKER</h1>
            <h3>Your personal tool for managing expenses efficiently.</h3>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
    );
};

export default IntroPage;
