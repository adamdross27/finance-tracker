import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'; // Import the Navbar
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout">
            <header className="layout-header">
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
