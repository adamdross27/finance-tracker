import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import IntroPage from './pages/Intro/IntroPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Home from './pages/Home/Home';
import ViewExpenses from './pages/ViewExpenses/ViewExpenses';
import AddExpense from './pages/AddExpense/AddExpense';
import EditExpense from './pages/EditExpense/EditExpense';
import Budget from './pages/Budget/Budget';
import Categories from './pages/Categories/Categories';
import ExportData from './pages/ExportData/ExportData';
import AccountSettings from './pages/AccountSettings/AccountSettings';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IntroPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="home" element={<Home />} />
                    <Route path="view-expenses" element={<ViewExpenses />} />
                    <Route path='add-expense' element={<AddExpense />}/>
                    <Route path='edit-expense' element={<EditExpense />}/>
                    <Route path='budget' element={<Budget />}/>
                    <Route path='categories' element={<Categories />}/>
                    <Route path='export-data' element={<ExportData />}/>
                    <Route path='account-settings' element={<AccountSettings />}/>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
