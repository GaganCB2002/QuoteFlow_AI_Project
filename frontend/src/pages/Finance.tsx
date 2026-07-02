import React, { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, TrendingDown, PieChart, ArrowUpRight, ArrowDownRight, Calendar, Download, MoreHorizontal } from 'lucide-react';
import Layout from './Layout';
import { formatINR } from '../utils/format';

const transactionsData = [
  { id: 1, desc: 'Website Development - Ravi Constructions', type: 'Income', amount: 185000, date: '11 Jun 2026', category: 'Services', status: 'Completed' },
  { id: 2, desc: 'Hosting Renewal - AWS', type: 'Expense', amount: 25000, date: '10 Jun 2026', category: 'Infrastructure', status: 'Completed' },
  { id: 3, desc: 'Mobile App - Agarwal & Sons', type: 'Income', amount: 234000, date: '10 Jun 2026', category: 'Services', status: 'Completed' },
  { id: 4, desc: 'Office Rent - June', type: 'Expense', amount: 45000, date: '09 Jun 2026', category: 'Rent', status: 'Completed' },
  { id: 5, desc: 'SEO Package - SkyHigh Ventures', type: 'Income', amount: 15000, date: '08 Jun 2026', category: 'Services', status: 'Pending' },
  { id: 6, desc: 'Employee Salary', type: 'Expense', amount: 120000, date: '07 Jun 2026', category: 'Salary', status: 'Completed' },
  { id: 7, desc: 'CRM Software - Bharat Electronics', type: 'Income', amount: 315000, date: '07 Jun 2026', category: 'Services', status: 'Completed' },
  { id: 8, desc: 'Marketing Ads - Google', type: 'Expense', amount: 15000, date: '06 Jun 2026', category: 'Marketing', status: 'Completed' },
  { id: 9, desc: 'Consulting - Nova Designs', type: 'Income', amount: 56000, date: '05 Jun 2026', category: 'Consulting', status: 'Pending' },
  { id: 10, desc: 'Software Licenses', type: 'Expense', amount: 8500, date: '05 Jun 2026', category: 'Software', status: 'Completed' },
];

const Finance = () => {
  useEffect(() => {
    document.title = 'Finance & Analytics | QuoteFlow AI';
  }, []);
  const [filter, setFilter] = useState<'All' | 'Income' | 'Expense'>('All');

  const filtered = filter === 'All' ? transactionsData : transactionsData.filter(t => t.type === filter);
  const totalIncome = transactionsData.filter(t => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactionsData.filter(t => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : '0';

  return (
    <Layout title="Finance" subtitle="Income, expenses, and GST reports">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><TrendingUp size={18} className="text-emerald-600" /></div>
              <p className="text-[12px] text-gray-400 font-bold uppercase">Total Income</p>
            </div>
            <p className="text-[22px] font-black text-emerald-600">{formatINR(totalIncome)}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"><TrendingDown size={18} className="text-red-500" /></div>
              <p className="text-[12px] text-gray-400 font-bold uppercase">Total Expenses</p>
            </div>
            <p className="text-[22px] font-black text-red-500">{formatINR(totalExpense)}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center"><IndianRupee size={18} className="text-brand-gold-600" /></div>
              <p className="text-[12px] text-gray-400 font-bold uppercase">Net Profit</p>
            </div>
            <p className={`text-[22px] font-black ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{formatINR(netProfit)}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><PieChart size={18} className="text-blue-600" /></div>
              <p className="text-[12px] text-gray-400 font-bold uppercase">Profit Margin</p>
            </div>
            <p className="text-[22px] font-black text-blue-600">{profitMargin}%</p>
          </div>
        </div>

        {/* Income vs Expense Chart Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6 mb-6">
          <h3 className="text-[15px] font-extrabold text-gray-900 mb-4">Income vs Expenses</h3>
          <div className="flex items-end gap-4 h-32">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => {
              const income = Math.round(200000 + Math.random() * 300000);
              const expense = Math.round(100000 + Math.random() * 150000);
              const maxVal = 500000;
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center gap-0.5" style={{ height: '100px' }}>
                    <div className="w-full bg-emerald-100 rounded-t-md transition-all" style={{ height: `${(income / maxVal) * 80}px` }} title={`Income: ${formatINR(income)}`}>
                      <div className="w-full bg-emerald-500 rounded-t-md transition-all" style={{ height: '100%' }} />
                    </div>
                    <div className="w-full bg-red-100 rounded-b-md transition-all" style={{ height: `${(expense / maxVal) * 80}px` }} title={`Expense: ${formatINR(expense)}`}>
                      <div className="w-full bg-red-400 rounded-b-md transition-all" style={{ height: '100%' }} />
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400">{month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-[12px] text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500" /> Income</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-400" /> Expense</span>
          </div>
        </div>

        {/* Filters & Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-4 mb-6 flex flex-wrap items-center gap-4">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            {(['All', 'Income', 'Expense'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{f}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-[13px] text-gray-500 font-medium">June 2026</span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-gray-600 border border-[#e8e2d8] rounded-lg hover:bg-gray-50"><Download size={12} /> Export</button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8] bg-gray-50/50">
                <th className="p-4 pl-6">Description</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e2d8]/60">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-2">
                      {t.type === 'Income' ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-red-400" />}
                      <span className="font-medium text-gray-900">{t.desc}</span>
                    </div>
                  </td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-gray-100 rounded text-[11px] font-semibold text-gray-500">{t.category}</span></td>
                  <td className="p-4 text-gray-500">{t.date}</td>
                  <td className={`p-4 text-right font-bold ${t.type === 'Income' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {t.type === 'Income' ? '+' : '-'}{formatINR(t.amount)}
                  </td>
                  <td className="p-4 text-center"><span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${t.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{t.status}</span></td>
                  <td className="p-4 text-right"><button className="p-1.5 text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100"><MoreHorizontal size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Finance;
