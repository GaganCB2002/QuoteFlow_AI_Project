import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import CompanyProfile from './pages/CompanyProfile';
import CustomerList from './pages/CustomerList';
import QuotationBuilder from './pages/QuotationBuilder';
import Estimation from './pages/Estimation';
import MyQuotations from './pages/MyQuotations';
import QuotationEditor from './pages/QuotationEditor';
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
import LearningAdmin from './pages/LearningAdmin';
import Settings from './pages/Settings';
import CookieConsent from './pages/CookieConsent';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CookieConsent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/estimation" element={<Estimation />} />
        <Route path="/quotations" element={<MyQuotations />} />
        <Route path="/quotations/new" element={<QuotationBuilder />} />
        <Route path="/my-quotations" element={<MyQuotations />} />
        <Route path="/my-quotations/:quoteNo/edit" element={<QuotationEditor />} />
        <Route path="/products" element={<Products />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/crm" element={<Sierra />} />
        <Route path="/sierra" element={<Sierra />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/company" element={<CompanyProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/learning" element={<LearningAdmin />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/invoices/new" element={<Invoices />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
