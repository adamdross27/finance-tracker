import React, { useState } from 'react';
import { login } from '../../api/auth';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // New state for success message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(email, password);
        
        if (response.error) {
            setError(response.error);
            setSuccess(''); // Clear success message if error occurs
        } else {
            setSuccess('Logged in successfully'); // Show success message
            localStorage.setItem('token', response.token); // Save token
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1 className="login-title">Login</h1>
                {error && <p className="login-error">{error}</p>}
                {success && <p className="login-success">{success}</p>} {/* Display success message */}
                <input 
                    className="login-input" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    className="login-input" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <div className="button-group">
                    <button className="login-button" type="submit">Login</button>
                    <button
                        className="back-button"
                        type="button" // Ensure it doesn't trigger form submission
                        onClick={() => navigate('/')} // Navigate back to the Intro page
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
