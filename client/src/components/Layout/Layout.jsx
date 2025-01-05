import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'; // Import the Navbar
import './Layout.css';
import icon from '../../assets/icon.png'; // Import the icon image

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ['/login', '/register', '/']; // Pages that don't require a token
    const token = localStorage.getItem('token');

    if (!token && !publicPaths.includes(location.pathname)) {
      // Redirect to login if token is missing and not on a public page
      alert('No authorization token found or session expired. Please log in again.');
      navigate('/login', { replace: true });
    }
  }, [navigate, location]);

  return (
    <div className="layout">
      <header className="layout-header">
        <img src={icon} alt="Finance Tracker" className="header-icon" />
        <Navbar /> {/* Add Navbar here */}
      </header>
      <main className="layout-content">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>&copy; {new Date().getFullYear()} Finance Tracker Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
