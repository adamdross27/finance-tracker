import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css';

const IntroPage = () => {
    const navigate = useNavigate();

    return (
        <div className="intro-page">
            <h1>Welcome to Finance Tracker</h1>
            <p>Your personal tool for managing expenses efficiently.</p>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
    );
};

export default IntroPage;
