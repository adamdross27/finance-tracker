import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import './RegisterPage.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await register(email, password);
        if (response.error) {
            setError(response.error);
            setSuccess('');
        } else {
            setSuccess('Registration successful! You can now log in.');
            setError('');
        }
    };

    return (
        <div className="register-page">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1 className="register-title">Register</h1>
                {error && <p className="register-error">{error}</p>}
                {success && <p className="register-success">{success}</p>}
                <input
                    className="register-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="register-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="button-group">
                    <button className="register-button" type="submit">Register</button>
                    <button
                        className="back-button"
                        type="button"
                        onClick={() => navigate('/')} // Navigate to the Intro page
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
