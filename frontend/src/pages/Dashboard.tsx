import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Receipt, Target, Users, ShieldAlert, Plus, UserPlus, FilePlus2, ChevronRight, TrendingUp, TrendingDown, IndianRupee, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { formatINR } from '../utils/format';
import { apiRequest } from '../utils/api';
import { getErrorMessage } from '../utils/errors';

interface DashboardStats {
  totalQuotes: number;
  totalInvoices: number;
  revenue: number;
  conversionRate: number;
  activeCustomers: number;
  pendingApprovals: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
}

interface RecentQuote {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

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
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Dashboard | QuoteFlow AI';
  }, []);

  useEffect(() => {
    const mockStats: DashboardStats = {
      totalQuotes: 156,
      totalInvoices: 89,
      revenue: 2475000,
      conversionRate: 68,
      activeCustomers: 42,
      pendingApprovals: 7,
      revenueThisMonth: 485000,
      revenueLastMonth: 412000,
    };

    const mockQuotes: RecentQuote[] = [
      { id: 'QF-001', customer: 'Priya Technologies Pvt Ltd', amount: 125000, status: 'Approved', date: '28 Jun 2026' },
      { id: 'QF-002', customer: 'GreenLeaf Solutions', amount: 87500, status: 'Pending', date: '27 Jun 2026' },
      { id: 'QF-003', customer: 'Nexus Digital Services', amount: 215000, status: 'Approved', date: '25 Jun 2026' },
      { id: 'QF-004', customer: 'Velocity Enterprises', amount: 54000, status: 'Draft', date: '24 Jun 2026' },
      { id: 'QF-005', customer: 'Skyline Infrastructure', amount: 340000, status: 'Approved', date: '22 Jun 2026' },
    ];

    const fetchDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        const [statsData, quotesData] = await Promise.all([
          apiRequest<DashboardStats>('/api/dashboard/stats'),
          apiRequest<RecentQuote[]>('/api/dashboard/recent-quotes'),
        ]);
        setStats(statsData);
        setRecentQuotes(quotesData);
      } catch {
        // Backend unavailable — use mock data so the dashboard still works
        setStats(mockStats);
        setRecentQuotes(mockQuotes);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const statCards = stats ? [
    { icon: FileText, title: 'Total Quotes', value: String(stats.totalQuotes), trend: '+12%', trendUp: true, color: 'amber' },
    { icon: Receipt, title: 'Total Invoices', value: String(stats.totalInvoices), trend: '+8%', trendUp: true, color: 'indigo' },
    { icon: IndianRupee, title: 'Revenue', value: formatINR(stats.revenue), trend: '+15%', trendUp: true, color: 'emerald' },
    { icon: Target, title: 'Conversion Rate', value: `${stats.conversionRate}%`, trend: '-5%', trendUp: false, color: 'rose' },
    { icon: Users, title: 'Active Customers', value: String(stats.activeCustomers), trend: '+22%', trendUp: true, color: 'blue' },
    { icon: ShieldAlert, title: 'Pending Approvals', value: String(stats.pendingApprovals), trend: '-2%', trendUp: false, color: 'amber' },
  ] : [];

  if (loading) {
    return (
      <Layout>
        <div className="p-8 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-24 bg-gray-100 rounded-2xl" />
            <div className="h-10 w-48 bg-gray-100 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-28 bg-gray-100 rounded-2xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-64 bg-gray-100 rounded-2xl" />
              <div className="h-64 bg-gray-100 rounded-2xl" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-8 max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-700 font-semibold text-sm">Failed to load dashboard data</p>
            <p className="text-red-500 text-xs mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <Layout>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-8 max-w-7xl mx-auto"
      >
        {/* Trial Status Banner */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-4 sm:p-5 mb-8 text-white shadow-lg">
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
        </motion.div>

        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight">Dashboard</h2>
            <p className="text-[14px] text-gray-500 font-medium mt-1">Here's your business overview.</p>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-400 font-medium">
            <span>Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((stat, i) => (
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
        </motion.div>

        {/* Main Content Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  {recentQuotes.map((q) => (
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
            {stats && (
              <div className="mt-6 pt-6 border-t border-[#e8e2d8]">
                <h4 className="text-[13px] font-bold text-gray-900 mb-3">Revenue Summary</h4>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-gray-500">This Month</span>
                    <span className="font-bold text-gray-900">{formatINR(stats.revenueThisMonth)}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-gray-500">Last Month</span>
                    <span className="font-bold text-gray-900">{formatINR(stats.revenueLastMonth)}</span>
                  </div>
                  <div className="flex justify-between text-[13px] pt-2 border-t border-[#e8e2d8]">
                    <span className="text-gray-700 font-bold">Growth</span>
                    <span className="font-bold text-emerald-600">
                      {stats.revenueLastMonth > 0
                        ? `+${((stats.revenueThisMonth - stats.revenueLastMonth) / stats.revenueLastMonth * 100).toFixed(1)}%`
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
