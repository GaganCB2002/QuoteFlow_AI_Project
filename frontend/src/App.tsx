import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PremiumLoader from './components/PremiumLoader';
import PageTransition from './components/PageTransition';
import CookieConsent from './pages/CookieConsent';
import Lenis from 'lenis';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import Dashboard from './pages/Dashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
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
import { storage } from './utils';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0] p-8">
          <div className="max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-500 mb-4">{this.state.error?.message || 'An unexpected error occurred'}</p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
              className="px-4 py-2 bg-[#2d5a8a] text-white rounded-lg text-sm font-semibold hover:bg-[#1e3a5f] transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}


const DashboardRouter = () => {
  const role = storage.getUserRole();
  if (role === 'ROLE_USER') {
    return <Navigate to="/customer-dashboard" replace />;
  }
  return <Dashboard />;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/oauth2/redirect" element={<PageTransition><OAuth2RedirectHandler /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardRouter /></PageTransition>} />
        <Route path="/customer-dashboard" element={<PageTransition><CustomerDashboard /></PageTransition>} />
        <Route path="/estimation" element={<PageTransition><Estimation /></PageTransition>} />
        <Route path="/my-quotations" element={<PageTransition><MyQuotations /></PageTransition>} />
        <Route path="/my-quotations/:quoteNo/edit" element={<PageTransition><QuotationEditor /></PageTransition>} />
        <Route path="/quotations/new" element={<PageTransition><QuotationBuilder /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/invoices" element={<PageTransition><Invoices /></PageTransition>} />
        <Route path="/receipts" element={<PageTransition><Receipts /></PageTransition>} />
        <Route path="/customers" element={<PageTransition><CustomerList /></PageTransition>} />
        <Route path="/crm" element={<PageTransition><Sierra /></PageTransition>} />
        <Route path="/marketing" element={<PageTransition><Marketing /></PageTransition>} />
        <Route path="/finance" element={<PageTransition><Finance /></PageTransition>} />
        <Route path="/documents" element={<PageTransition><Documents /></PageTransition>} />
        <Route path="/notifications" element={<PageTransition><Notifications /></PageTransition>} />
        <Route path="/visitors" element={<PageTransition><Visitors /></PageTransition>} />
        <Route path="/company" element={<PageTransition><CompanyProfile /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        <Route path="/learning" element={<PageTransition><LearningAdmin /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <PremiumLoader />
      <CookieConsent />
      <div className="min-h-screen bg-[#f7f5f0] dark:bg-[#0a0f1c] flex flex-col">
        <AnimatedRoutes />
      </div>
    </ErrorBoundary>
  );
};

export default App;
