import React, { useEffect } from 'react';
import { FileText, Receipt, Target, Users, ShieldAlert, Plus, UserPlus, FilePlus2, ChevronRight, TrendingUp, TrendingDown, IndianRupee, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const formatINR = (amount: number) =>
  '₹' + amount.toLocaleString('en-IN');

const statsData = [
  { icon: FileText, title: 'Total Quotes', value: '24', trend: '+12%', trendUp: true, color: 'amber' },
  { icon: Receipt, title: 'Total Invoices', value: '18', trend: '+8%', trendUp: true, color: 'indigo' },
  { icon: IndianRupee, title: 'Revenue', value: formatINR(428500), trend: '+15%', trendUp: true, color: 'emerald' },
  { icon: Target, title: 'Conversion Rate', value: '68%', trend: '-5%', trendUp: false, color: 'rose' },
  { icon: Users, title: 'Active Customers', value: '32', trend: '+22%', trendUp: true, color: 'blue' },
  { icon: ShieldAlert, title: 'Pending Approvals', value: '7', trend: '-2%', trendUp: false, color: 'amber' },
];

const recentQuotes = [
  { id: 'Q-101', customer: 'Ravi Constructions', amount: 185000, status: 'Approved', date: '10 Jun 2026' },
  { id: 'Q-102', customer: 'Priya Enterprises', amount: 42500, status: 'Pending', date: '09 Jun 2026' },
  { id: 'Q-103', customer: 'GreenLeaf Solutions', amount: 92000, status: 'Draft', date: '08 Jun 2026' },
  { id: 'Q-104', customer: 'Agarwal & Sons', amount: 234000, status: 'Approved', date: '07 Jun 2026' },
  { id: 'Q-105', customer: 'SkyHigh Ventures', amount: 15000, status: 'Pending', date: '06 Jun 2026' },
];

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    Approved: 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Draft: 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard | QuoteFlow AI';
  }, []);

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Trial Status Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-4 sm:p-5 mb-8 text-white shadow-lg animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Gift size={24} className="text-indigo-200" />
              <div>
                <p className="font-bold text-sm sm:text-base">Free Trial Active</p>
                <p className="text-xs text-indigo-200 mt-0.5">6 days remaining in your 7-day free trial</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="px-4 py-2 bg-white text-indigo-700 text-sm font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
            >
              Upgrade Now
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight">Dashboard</h2>
            <p className="text-[14px] text-gray-500 font-medium mt-1">Here's your business overview.</p>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400 font-medium">
            <span>Last updated: 11 Jun 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow-sm border border-[#e8e2d8] hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center ${
                  stat.color === 'amber' ? 'bg-amber-50 text-amber-700' :
                  stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' :
                  stat.color === 'rose' ? 'bg-rose-50 text-rose-600' :
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-700' :
                  stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-700' :
                  'bg-gray-50 text-gray-700'
                }`}>
                  <stat.icon size={22} strokeWidth={2} />
                </div>
                <div className={`flex items-center gap-0.5 text-[11px] font-bold px-2 py-1 rounded-md ${
                  stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{stat.trend}</span>
                </div>
              </div>
              <div>
                <h4 className="text-[24px] font-black text-gray-900 leading-none mb-1 tracking-tight">{stat.value}</h4>
                <p className="text-[13px] font-semibold text-gray-400">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Quotations */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[16px] font-extrabold text-gray-900">Recent Quotations</h3>
              <button
                onClick={() => navigate('/my-quotations')}
                className="text-[13px] font-bold text-brand-gold-600 hover:text-brand-gold-700 flex items-center"
              >
                View All <ChevronRight size={14} className="ml-0.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8]">
                    <th className="pb-3 w-16">#</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3 text-right">Amount</th>
                    <th className="pb-3 text-center">Status</th>
                    <th className="pb-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQuotes.map((q, i) => (
                    <tr key={q.id} className="border-b border-[#e8e2d8]/60 hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 font-medium text-gray-400">{q.id}</td>
                      <td className="py-3.5 font-semibold text-gray-900">{q.customer}</td>
                      <td className="py-3.5 text-right font-bold text-gray-900">{formatINR(q.amount)}</td>
                      <td className="py-3.5 text-center">{statusBadge(q.status)}</td>
                      <td className="py-3.5 text-right text-gray-500">{q.date}</td>
                    </tr>
                  ))}
                  {recentQuotes.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400 font-medium">
                        No quotations yet. Create your first one!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6">
            <h3 className="text-[16px] font-extrabold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/estimation')}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-white font-bold bg-brand-gold-600 hover:bg-brand-gold-700 shadow-sm transition-all text-[13px]"
              >
                <Plus size={16} className="mr-2" strokeWidth={3} />
                New Estimation
              </button>
              <button
                onClick={() => navigate('/customers')}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-gray-700 font-bold bg-white border border-[#e8e2d8] hover:bg-gray-50 transition-all text-[13px]"
              >
                <UserPlus size={16} className="mr-2" strokeWidth={2.5} />
                Add Customer
              </button>
              <button
                onClick={() => navigate('/invoices/new')}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-gray-700 font-bold bg-white border border-[#e8e2d8] hover:bg-gray-50 transition-all text-[13px]"
              >
                <FilePlus2 size={16} className="mr-2" strokeWidth={2.5} />
                New Invoice
              </button>
            </div>
            {/* Revenue Summary */}
            <div className="mt-6 pt-6 border-t border-[#e8e2d8]">
              <h4 className="text-[13px] font-bold text-gray-900 mb-3">Revenue Summary</h4>
              <div className="space-y-2.5">
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-500">This Month</span>
                  <span className="font-bold text-gray-900">{formatINR(428500)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-500">Last Month</span>
                  <span className="font-bold text-gray-900">{formatINR(372000)}</span>
                </div>
                <div className="flex justify-between text-[13px] pt-2 border-t border-[#e8e2d8]">
                  <span className="text-gray-700 font-bold">Growth</span>
                  <span className="font-bold text-emerald-600">+15.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
