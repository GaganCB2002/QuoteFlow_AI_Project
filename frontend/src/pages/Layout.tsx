import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, Users, FileText, Calculator, Package, Receipt, BarChart3, Megaphone, DollarSign, FolderOpen, Eye, BellRing, LogOut, ChevronLeft, ChevronRight, Shield, Brain, Search, Bell, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLocationTracking } from '../hooks/useLocationTracking';
import { useTheme } from '../context/ThemeContext';
import QuoteFlowLogo from '../components/QuoteFlowLogo';
import { storage } from '../utils';

const getNavItems = (role: string) => {
  if (role === 'ROLE_USER') {
    return [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/customer-dashboard' },
      { icon: Calculator, label: 'Estimation', to: '/estimation' },
      { icon: FolderOpen, label: 'My Quotations', to: '/my-quotations' },
      { icon: Receipt, label: 'Invoices', to: '/invoices' },
      { icon: Receipt, label: 'Receipts', to: '/receipts' },
      { icon: FolderOpen, label: 'Documents', to: '/documents' },
      { icon: BellRing, label: 'Notifications', to: '/notifications' },
    ];
  }

  return [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: Calculator, label: 'Estimation', to: '/estimation' },
    { icon: FileText, label: 'New Quotation', to: '/quotations/new' },
    { icon: FolderOpen, label: 'My Quotations', to: '/my-quotations' },
    { icon: Package, label: 'Products', to: '/products' },
    { icon: Receipt, label: 'Invoices', to: '/invoices' },
    { icon: Receipt, label: 'Receipts', to: '/receipts' },
    { icon: Users, label: 'Customers', to: '/customers' },
    { icon: BarChart3, label: 'CRM', to: '/crm' },
    { icon: Megaphone, label: 'Marketing', to: '/marketing' },
    { icon: DollarSign, label: 'Finance', to: '/finance' },
    { icon: FolderOpen, label: 'Documents', to: '/documents' },
    { icon: BellRing, label: 'Notifications', to: '/notifications' },
    { icon: Eye, label: 'Visitors', to: '/visitors' },
    { icon: Brain, label: 'AI Learning', to: '/learning' },
    { icon: Shield, label: 'Admin', to: '/admin' },
  ];
};

const Layout = ({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const userName = storage.getUserName();
  const initials = storage.getUserInitials();

  useLocationTracking();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>('input[type="text"][placeholder*="Search"]');
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    storage.clearSession();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#f7f5f0] dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
      <aside
        className={`${collapsed ? 'w-[72px]' : 'w-[260px]'} bg-brand-navy flex flex-col relative z-20 transition-all duration-300`}
        role="navigation"
        aria-label="Sidebar navigation"
      >
        <div className={`h-20 flex items-center px-6 border-b border-white/5 ${collapsed ? 'justify-center px-0' : ''}`}>
          <Link to="/dashboard" className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <QuoteFlowLogo size={28} />
            {!collapsed && <h1 className="text-xl font-bold text-white tracking-wide">QuoteFlow</h1>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`text-white/30 hover:text-white transition-colors ${collapsed ? 'absolute -right-3 top-7 bg-brand-navy border border-white/10 rounded-full p-1 shadow-md' : 'ml-auto'}`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto space-y-1">
          {getNavItems(storage.getUserRole()).map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
            return (
              <Link
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={`flex items-center ${collapsed ? 'justify-center px-0' : 'px-3.5'} py-2.5 rounded-[10px] transition-all ${
                  isActive
                    ? 'bg-brand-gold-500/20 text-brand-gold-300 font-bold'
                    : 'text-white/50 hover:bg-brand-gold-500/10 hover:text-brand-gold-200 font-medium'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={`w-5 flex justify-center ${collapsed ? '' : 'mr-3'} ${isActive ? 'text-brand-gold-300' : 'text-white/50'}`}>
                  <IconComponent size={18} strokeWidth={isActive ? 2.5 : 2} />
                </span>
                {!collapsed && <span className="text-[14px]">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => navigate('/settings')}
            className={`w-full flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors ${collapsed ? 'justify-center p-2' : ''}`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
              {initials}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-white truncate">{userName}</p>
                <p className="text-xs text-white/40 truncate">Pro Plan</p>
              </div>
            )}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-[72px] bg-white dark:bg-gray-900 border-b border-[#e8e2d8] dark:border-gray-700 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-8 flex-1 min-w-0">
            {title && (
              <div className="hidden md:block min-w-0">
                <h2 className="text-[16px] font-extrabold text-gray-900 truncate">{title}</h2>
                {subtitle && <p className="text-[12px] text-gray-400 truncate">{subtitle}</p>}
              </div>
            )}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search quotations, customers, invoices..."
                className="w-full pl-10 pr-16 py-2.5 bg-[#f7f5f0] dark:bg-gray-800 border border-transparent rounded-[8px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 transition-all text-[13px] text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="text-[10px] font-semibold text-gray-400">Ctrl+K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 ml-4 shrink-0">
            <Link
              to="/estimation"
              className="flex items-center px-4 py-2 bg-brand-gold-500 text-white rounded-lg shadow-sm hover:bg-brand-gold-600 transition-colors text-[13px] font-bold"
            >
              <FileText size={14} className="mr-2" />
              New Quote
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-brand-gold-600 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 text-gray-400 hover:text-brand-gold-600 transition-colors"
              aria-label="View notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">3</span>
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 border-2 border-white shadow-sm flex items-center justify-center ml-2"
              aria-label="Settings"
            >
              <span className="text-white text-xs font-bold">{initials}</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-2"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-[#f7f5f0] dark:bg-gray-950">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
