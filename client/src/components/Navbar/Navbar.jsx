import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutUser = () => {
    localStorage.removeItem('firstName');
    localStorage.removeItem('token'); // Remove authentication token
    logOut(); // Update the authentication state
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo"></div>
      <ul className="navbar-links">
        {!isAuthenticated && (
          <>
            <li><NavLink to="/" activeClassName="active" end>Get Started</NavLink></li>
            <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
            <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/view-expenses" activeClassName="active">View Expenses</NavLink></li>
            <li><NavLink to="/add-expense" activeClassName="active">Add Expense</NavLink></li>
            <li><NavLink to="/edit-expense" activeClassName="active">Edit Expense</NavLink></li>
            <li><NavLink to="/budget" activeClassName="active">Budget</NavLink></li>
            <li><NavLink to="/categories" activeClassName="active">Categories</NavLink></li>
            <li><NavLink to="/export-data" activeClassName="active">Export Data</NavLink></li>
            <li><NavLink to="/account-settings" activeClassName="active">Account Settings</NavLink></li>
            <li><NavLink to="/login" onClick={logOutUser}>Log Out</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
