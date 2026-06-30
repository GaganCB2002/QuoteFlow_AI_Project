import React, { useState, useEffect } from 'react';
import { Receipt, Search, Plus, IndianRupee, Download, Send, MoreHorizontal } from 'lucide-react';
import Layout from './Layout';

const formatINR = (amount: number) => '₹' + amount.toLocaleString('en-IN');

const invoicesData = [
  { id: 'INV-2026-001', customer: 'Ravi Constructions', date: '10 Jun 2026', dueDate: '25 Jun 2026', amount: 185000, status: 'Paid', type: 'Tax Invoice' },
  { id: 'INV-2026-002', customer: 'Priya Enterprises', date: '09 Jun 2026', dueDate: '24 Jun 2026', amount: 42500, status: 'Pending', type: 'Tax Invoice' },
  { id: 'INV-2026-003', customer: 'GreenLeaf Solutions', date: '08 Jun 2026', dueDate: '23 Jun 2026', amount: 92000, status: 'Overdue', type: 'Proforma' },
  { id: 'INV-2026-004', customer: 'Agarwal & Sons', date: '07 Jun 2026', dueDate: '22 Jun 2026', amount: 234000, status: 'Paid', type: 'Tax Invoice' },
  { id: 'INV-2026-005', customer: 'SkyHigh Ventures', date: '06 Jun 2026', dueDate: '21 Jun 2026', amount: 15000, status: 'Draft', type: 'Proforma' },
  { id: 'INV-2026-006', customer: 'Metro Services', date: '05 Jun 2026', dueDate: '20 Jun 2026', amount: 78000, status: 'Pending', type: 'Tax Invoice' },
  { id: 'INV-2026-007', customer: 'Bharat Electronics', date: '04 Jun 2026', dueDate: '19 Jun 2026', amount: 315000, status: 'Paid', type: 'Tax Invoice' },
  { id: 'INV-2026-008', customer: 'Nova Designs', date: '03 Jun 2026', dueDate: '18 Jun 2026', amount: 56000, status: 'Overdue', type: 'Proforma' },
];

const statusStyle = (s: string) => {
  const styles: Record<string, string> = {
    Paid: 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Overdue: 'bg-red-50 text-red-600',
    Draft: 'bg-gray-100 text-gray-600',
  };
  return styles[s] || 'bg-gray-100 text-gray-600';
};

const Invoices = () => {
  useEffect(() => {
    document.title = 'Invoices | QuoteFlow AI';
  }, []);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');

  const filtered = invoicesData.filter(inv => {
    const matchSearch = inv.customer.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchType = type === 'All' || inv.type === type;
    return matchSearch && matchType;
  });

  const totalDue = filtered.filter(i => i.status === 'Pending' || i.status === 'Overdue').reduce((s, i) => s + i.amount, 0);

  return (
    <Layout title="Invoices" subtitle="Manage GST, tax, and proforma invoices">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4 text-center">
            <p className="text-[12px] text-gray-400 font-bold uppercase">Total Invoices</p>
            <p className="text-[24px] font-black text-gray-900 mt-1">{invoicesData.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4 text-center">
            <p className="text-[12px] text-gray-400 font-bold uppercase">Paid</p>
            <p className="text-[24px] font-black text-emerald-600 mt-1">{invoicesData.filter(i => i.status === 'Paid').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4 text-center">
            <p className="text-[12px] text-gray-400 font-bold uppercase">Pending</p>
            <p className="text-[24px] font-black text-amber-600 mt-1">{invoicesData.filter(i => i.status === 'Pending').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4 text-center">
            <p className="text-[12px] text-gray-400 font-bold uppercase">Due Amount</p>
            <p className="text-[24px] font-black text-red-600 mt-1">{formatINR(totalDue)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search invoices..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none" />
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              {['All', 'Tax Invoice', 'Proforma'].map(t => (
                <button key={t} onClick={() => setType(t)} className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold whitespace-nowrap transition-all ${type === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{t}</button>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all">
            <Plus size={16} /> New Invoice
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8] bg-gray-50/50">
                <th className="p-4 pl-6">Invoice</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Due Date</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e2d8]/60">
              {filtered.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-2">
                      <Receipt size={14} className="text-gray-400" />
                      <span className="font-semibold text-gray-900">{inv.id}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-700">{inv.customer}</td>
                  <td className="p-4 text-gray-500">{inv.date}</td>
                  <td className="p-4 text-gray-500">{inv.dueDate}</td>
                  <td className="p-4 text-right font-bold text-gray-900">{formatINR(inv.amount)}</td>
                  <td className="p-4 text-center"><span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusStyle(inv.status)}`}>{inv.status}</span></td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-brand-gold-600"><Send size={14} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-brand-gold-600"><Download size={14} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-700"><MoreHorizontal size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Invoices;
