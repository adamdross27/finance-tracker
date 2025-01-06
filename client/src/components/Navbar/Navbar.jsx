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
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} end>
                Get Started
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
                Register
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/view-expenses" className={({ isActive }) => (isActive ? 'active' : '')}>
                View Expenses
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-expense" className={({ isActive }) => (isActive ? 'active' : '')}>
                Add Expense
              </NavLink>
            </li>
            <li>
              <NavLink to="/edit-expense" className={({ isActive }) => (isActive ? 'active' : '')}>
                Edit Expense
              </NavLink>
            </li>
            <li>
              <NavLink to="/budget" className={({ isActive }) => (isActive ? 'active' : '')}>
                Budget
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active' : '')}>
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/export-data" className={({ isActive }) => (isActive ? 'active' : '')}>
                Export Data
              </NavLink>
            </li>
            <li>
              <NavLink to="/account-settings" className={({ isActive }) => (isActive ? 'active' : '')}>
                Account Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" onClick={logOutUser} className={({ isActive }) => (isActive ? 'active' : '')}>
                Log Out
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
