import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CompanyProfile from './pages/CompanyProfile';
import CustomerList from './pages/CustomerList';
import QuotationBuilder from './pages/QuotationBuilder';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<CompanyProfile />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/quotations/new" element={<QuotationBuilder />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
