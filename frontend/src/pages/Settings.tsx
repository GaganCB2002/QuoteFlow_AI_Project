import React, { useEffect } from 'react';
import Layout from './Layout';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, User, Shield, Bell, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.title = 'Settings | QuoteFlow AI';
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('companyName');
    localStorage.removeItem('userCompany');
    navigate('/login');
  };

  return (
    <Layout title="Settings" subtitle="Manage your account preferences">
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        {/* Profile */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-[15px] font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <User size={18} /> Profile
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {localStorage.getItem('userName')?.split(' ').map(s => s[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                </div>
                <div>
                  <p className="text-[16px] font-bold text-gray-900">{localStorage.getItem('userName') || 'User'}</p>
                  <p className="text-[13px] text-gray-500">{localStorage.getItem('userEmail') || 'user@example.com'}</p>
                  <p className="text-[12px] text-gray-400">{localStorage.getItem('companyName') || 'Company'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-[15px] font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />} Appearance
            </h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <p className="text-[13px] font-bold text-gray-900">Dark Mode</p>
                <p className="text-[12px] text-gray-500">Toggle between light and dark theme</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-brand-gold-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-[15px] font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <Bell size={18} /> Preferences
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer">
                <div>
                  <p className="text-[13px] font-bold text-gray-900">Email Notifications</p>
                  <p className="text-[12px] text-gray-500">Receive quotation updates via email</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-brand-gold-600 focus:ring-brand-gold-500" />
              </label>
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer">
                <div>
                  <p className="text-[13px] font-bold text-gray-900">SMS Alerts</p>
                  <p className="text-[12px] text-gray-500">Get SMS notifications for new leads</p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-gold-600 focus:ring-brand-gold-500" />
              </label>
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer">
                <div>
                  <p className="text-[13px] font-bold text-gray-900">WhatsApp Updates</p>
                  <p className="text-[12px] text-gray-500">Send quotation PDFs via WhatsApp</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-brand-gold-600 focus:ring-brand-gold-500" />
              </label>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-[15px] font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <Shield size={18} /> Account
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors text-left">
                <span className="text-[13px] font-bold text-gray-900">Subscription Plan</span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded-lg">Pro Plan Active</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </button>
              <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100 hover:bg-red-100 transition-colors text-left">
                <span className="text-[13px] font-bold text-red-600">Sign Out</span>
                <LogOut size={16} className="text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
