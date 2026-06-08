import React from 'react';
import { LayoutDashboard, Users, Building2, FileText, Settings, Bell, Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm relative z-10">
        <div className="h-20 flex items-center px-8 border-b border-gray-50">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mr-3 shadow-md">
            <span className="text-white font-bold text-sm">QF</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-purple-900">QuoteFlow</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active to="/dashboard" />
          <NavItem icon={<FileText size={20} />} label="Quotations" to="/quotations/new" />
          <NavItem icon={<Users size={20} />} label="Customers" to="/customers" />
          <NavItem icon={<Building2 size={20} />} label="Company" to="/company" />
        </nav>
        <div className="p-4 border-t border-gray-50">
          <NavItem icon={<Settings size={20} />} label="Settings" to="#" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
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
              <span className="text-indigo-700 font-medium">JD</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, John!</h2>
              <p className="text-gray-500 mt-1">Here is what's happening with your business today.</p>
            </div>
            <Link to="/quotations/new" className="flex items-center px-4 py-2.5 bg-gray-900 text-white rounded-xl shadow-lg hover:bg-gray-800 transition-colors">
              <Plus size={18} className="mr-2" />
              New Quotation
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Revenue" value="₹2,45,000" trend="+12.5%" />
            <StatCard title="Active Quotes" value="24" trend="+5.2%" />
            <StatCard title="Conversion Rate" value="68%" trend="-2.1%" negative />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Quotations</h3>
            <div className="space-y-4">
              <ActivityRow id="QT-1718102392" customer="Acme Corp" amount="₹45,000" status="Approved" date="Today, 10:23 AM" />
              <ActivityRow id="QT-1718102201" customer="TechFlow Inc" amount="₹12,500" status="Pending" date="Yesterday" />
              <ActivityRow id="QT-1718101005" customer="Global Retail" amount="₹89,000" status="Sent" date="Jun 05, 2024" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, to }: { icon: React.ReactNode, label: string, active?: boolean, to: string }) => (
  <Link to={to} className={`flex items-center px-4 py-3 rounded-xl transition-all group ${active ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
    <span className={`mr-3 ${active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
      {icon}
    </span>
    {label}
  </Link>
);

const StatCard = ({ title, value, trend, negative }: { title: string, value: string, trend: string, negative?: boolean }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <FileText size={80} />
    </div>
    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
    <h4 className="text-3xl font-bold text-gray-900 mb-2">{value}</h4>
    <div className={`text-sm font-medium ${negative ? 'text-red-500' : 'text-emerald-500'}`}>
      {trend} from last month
    </div>
  </div>
);

const ActivityRow = ({ id, customer, amount, status, date }: { id: string, customer: string, amount: string, status: string, date: string }) => {
  const getStatusColor = (s: string) => {
    switch(s.toLowerCase()) {
      case 'approved': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
          <FileText size={20} />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{customer}</p>
          <p className="text-sm text-gray-500">{id}</p>
        </div>
      </div>
      <div className="flex items-center space-x-8">
        <div className="text-right">
          <p className="font-semibold text-gray-900">{amount}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
