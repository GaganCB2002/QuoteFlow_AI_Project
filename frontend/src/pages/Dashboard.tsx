import React from 'react';
import { FileText } from 'lucide-react';
import Layout from './Layout';

const Dashboard = () => {
  return (
    <Layout title="Welcome back, Rahul!" subtitle="Here is what's happening with your business today.">
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
    </Layout>
  );
};

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
