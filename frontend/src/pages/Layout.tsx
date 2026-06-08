import React from 'react';
import { LayoutDashboard, Users, Building2, FileText, Bell, Search, Plus, Calculator, Package, Receipt, BarChart3, Megaphone, DollarSign, FolderOpen, BellRing, Eye, Wrench } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: Calculator, label: 'Estimation', to: '/estimation' },
  { icon: FileText, label: 'Quotations', to: '/quotations/new' },
  { icon: Package, label: 'Products', to: '/products' },
  { icon: Receipt, label: 'Invoices', to: '/invoices' },
  { icon: Receipt, label: 'Receipts', to: '/receipts' },
  { icon: Users, label: 'Customers', to: '/customers' },
  { icon: BarChart3, label: 'Sierra', to: '/sierra' },
  { icon: Megaphone, label: 'Marketing', to: '/marketing' },
  { icon: DollarSign, label: 'Finance', to: '/finance' },
  { icon: FolderOpen, label: 'Documents', to: '/documents' },
  { icon: BellRing, label: 'Notifications', to: '/notifications' },
  { icon: Eye, label: 'Visitors', to: '/visitors' },
  { icon: Building2, label: 'Company', to: '/company' },
  { icon: Wrench, label: 'Admin', to: '/admin' },
];

const Layout = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle?: string }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm relative z-10">
        <div className="h-20 flex items-center px-8 border-b border-gray-50">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mr-3 shadow-md">
            <span className="text-white font-bold text-sm">QF</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-purple-900">QuoteFlow</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <span className={`mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  <Icon size={20} />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search quotations, customers..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 transition-shadow text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-100 to-indigo-100 border border-white shadow-sm flex items-center justify-center">
              <span className="text-indigo-700 font-medium">RK</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
            </div>
            <Link to="/estimation" className="flex items-center px-4 py-2.5 bg-gray-900 text-white rounded-xl shadow-lg hover:bg-gray-800 transition-colors">
              <Plus size={18} className="mr-2" />
              New Quotation
            </Link>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
