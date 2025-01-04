import React, { useState, useContext } from 'react';
import { login } from '../../api/auth';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { logIn } = useContext(AuthContext); // Use context for authentication

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(email, password);

        if (response.error) {
            setError(response.error);
            setSuccess('');
        } else {
            setSuccess('Logged in successfully');
            logIn(response.token); // Update the global authentication state
            localStorage.setItem('firstName', response.firstName); // Optional: Save user data locally
            navigate('/home');
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1 className="login-title">Login</h1>
                {error && <p className="login-error">{error}</p>}
                {success && <p className="login-success">{success}</p>}
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
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
