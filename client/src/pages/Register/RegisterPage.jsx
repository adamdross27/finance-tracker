import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import './RegisterPage.css';
import AuthContext from '../../context/AuthContext';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { logIn } = useContext(AuthContext); // Use context for authentication

    const validateFields = () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return 'Please fill out all fields.';
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address.';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            setSuccess('');
            return;
        }

        const response = await register(email, password, firstName, lastName);
        if (response.error) {
            setError(response.error);
            setSuccess('');
        } else {
            setSuccess('Registration successful!');
            setError('');
            logIn(response.token); // Update the global authentication state
            navigate('/home');
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
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    className="register-input"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                <input
                    className="register-input"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="button-group">
                    <button className="register-button" type="submit">Register</button>
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

export default RegisterPage;
