import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CompanyProfile from './pages/CompanyProfile';
import CustomerList from './pages/CustomerList';
import QuotationBuilder from './pages/QuotationBuilder';
import Estimation from './pages/Estimation';
import Products from './pages/Products';
import Invoices from './pages/Invoices';
import Receipts from './pages/Receipts';
import Sierra from './pages/Sierra';
import Marketing from './pages/Marketing';
import Finance from './pages/Finance';
import Documents from './pages/Documents';
import Notifications from './pages/Notifications';
import Visitors from './pages/Visitors';
import Admin from './pages/Admin';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/estimation" element={<Estimation />} />
        <Route path="/quotations" element={<QuotationBuilder />} />
        <Route path="/products" element={<Products />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/sierra" element={<Sierra />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/company" element={<CompanyProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
