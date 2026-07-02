import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, FolderOpen, CreditCard, LifeBuoy, ChevronRight, Edit3, Tag, Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { agentApi } from '../api';
import type { QuotationSummary } from '../types';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState<QuotationSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Customer Dashboard | QuoteFlow AI';
    const fetchQuotations = async () => {
      setLoading(true);
      try {
        const data = await agentApi.getHistory();
        setQuotations(data.slice(0, 5)); // show latest 5
      } catch {
        setQuotations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotations();
  }, []);

  const statCards = [
    { icon: FileText, title: 'My Quotations', value: quotations.length.toString(), color: 'amber' },
    { icon: FolderOpen, title: 'Active Projects', value: '1', color: 'indigo' },
    { icon: CreditCard, title: 'Total Spent', value: '₹0', color: 'emerald' },
    { icon: LifeBuoy, title: 'Support Tickets', value: '0', color: 'blue' },
  ];

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
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight">Welcome Back!</h2>
            <p className="text-[14px] text-gray-500 font-medium mt-1">Here is the summary of your projects and quotations.</p>
          </div>
        </motion.div>

        {/* Action Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow-sm border border-[#e8e2d8] hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center ${
                  stat.color === 'amber' ? 'bg-amber-50 text-amber-700' :
                  stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' :
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-700' :
                  'bg-indigo-50 text-indigo-700'
                }`}>
                  <stat.icon size={22} strokeWidth={2} />
                </div>
              </div>
              <div>
                <h4 className="text-[24px] font-black text-gray-900 leading-none mb-1 tracking-tight">{stat.value}</h4>
                <p className="text-[13px] font-semibold text-gray-400">{stat.title}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
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

            {loading ? (
              <div className="text-center py-12 text-gray-400 text-[14px]">Loading...</div>
            ) : quotations.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-[14px]">
                No quotations yet. Let's create your first one!
              </div>
            ) : (
              <div className="space-y-3">
                {quotations.map((q) => (
                  <div key={q.quoteNo} className="border border-[#e8e2d8] rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Tag size={13} className="text-brand-gold-600" />
                          <span className="text-[12px] font-bold text-brand-gold-700 font-mono">{q.quoteNo}</span>
                        </div>
                        <p className="text-[14px] font-bold text-gray-900">{q.projectName}</p>
                        <p className="text-[12px] text-gray-500 mt-1 flex items-center gap-1">
                          <Calendar size={12} /> {q.createdAt}
                        </p>
                      </div>
                      <div className="flex gap-2">
                         <button onClick={() => navigate(`/my-quotations/${q.quoteNo}/edit`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-all">
                          <Edit3 size={12} /> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                Request New Quote
              </button>
              <button
                onClick={() => navigate('/documents')}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-gray-700 font-bold bg-white border border-[#e8e2d8] hover:bg-gray-50 transition-all text-[13px]"
              >
                <FolderOpen size={16} className="mr-2" strokeWidth={2.5} />
                My Documents
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-[#e8e2d8]">
                <h4 className="text-[13px] font-bold text-gray-900 mb-3">Support</h4>
                <p className="text-[12px] text-gray-500 mb-4">Need help with your project? Contact our support team.</p>
                <button
                  className="w-full flex justify-center items-center py-2 px-4 rounded-xl text-indigo-700 font-bold bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-all text-[12px]"
                >
                  <LifeBuoy size={14} className="mr-2" />
                  Contact Support
                </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default CustomerDashboard;
