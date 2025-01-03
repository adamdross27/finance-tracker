import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout">
            <header className="layout-header">
                <h1>Finance Tracker</h1>
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
