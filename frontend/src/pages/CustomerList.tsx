import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Mail, Phone, IndianRupee, Star, Users, UserCheck } from 'lucide-react';
import Layout from './Layout';
import { formatINR } from '../utils/format';

const customersData = [
  { id: 1, name: 'Acme Corp', contact: 'John Doe', email: 'john@acme.com', phone: '+91 9876543210', status: 'Active', totalSpent: 425000, invoices: 12, lastActive: '11 Jun 2026' },
  { id: 2, name: 'TechFlow Inc', contact: 'Sarah Smith', email: 'sarah@techflow.io', phone: '+91 9876543211', status: 'Active', totalSpent: 185000, invoices: 5, lastActive: '10 Jun 2026' },
  { id: 3, name: 'Global Retail', contact: 'Mike Johnson', email: 'mike@global.com', phone: '+91 9876543212', status: 'Inactive', totalSpent: 56000, invoices: 2, lastActive: '01 May 2026' },
  { id: 4, name: 'Bharat Electronics', contact: 'Anita Desai', email: 'anita@bharatelec.in', phone: '+91 9876543213', status: 'Active', totalSpent: 728000, invoices: 18, lastActive: '11 Jun 2026' },
  { id: 5, name: 'Metro Services', contact: 'Vikram Singh', email: 'vikram@metro.in', phone: '+91 9876543214', status: 'Active', totalSpent: 134000, invoices: 4, lastActive: '09 Jun 2026' },
  { id: 6, name: 'Nova Designs', contact: 'Rajesh Khanna', email: 'rajesh@novadesigns.in', phone: '+91 9876543215', status: 'Inactive', totalSpent: 28000, invoices: 1, lastActive: '15 Apr 2026' },
];

const CustomerList = () => {
  useEffect(() => {
    document.title = 'Customers | QuoteFlow AI';
  }, []);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = customersData.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <Layout title="Customers" subtitle="Manage your clients and their details">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Users size={18} className="text-blue-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Total</p><p className="text-[20px] font-black text-gray-900">{customersData.length}</p></div></div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><UserCheck size={18} className="text-emerald-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Active</p><p className="text-[20px] font-black text-emerald-600">{customersData.filter(c => c.status === 'Active').length}</p></div></div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center"><IndianRupee size={18} className="text-brand-gold-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Total Revenue</p><p className="text-[20px] font-black text-brand-gold-600">{formatINR(customersData.reduce((s, c) => s + c.totalSpent, 0))}</p></div></div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center"><Star size={18} className="text-amber-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Avg. Value</p><p className="text-[20px] font-black text-amber-600">{formatINR(Math.round(customersData.reduce((s, c) => s + c.totalSpent, 0) / customersData.length))}</p></div></div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none" />
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              {['All', 'Active', 'Inactive'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{f}</button>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all">
            <Plus size={16} /> Add Customer
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8] bg-gray-50/50">
                <th className="p-4 pl-6">Company</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4 text-right">Total Spent</th>
                <th className="p-4 text-center">Invoices</th>
                <th className="p-4">Last Active</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e2d8]/60">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 text-brand-gold-600 flex items-center justify-center font-bold">
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{c.contact}</td>
                  <td className="p-4">
                    <div className="flex flex-col text-[12px] text-gray-500">
                      <span className="flex items-center gap-1"><Mail size={11} /> {c.email}</span>
                      <span className="flex items-center gap-1"><Phone size={11} /> {c.phone}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900">{formatINR(c.totalSpent)}</td>
                  <td className="p-4 text-center text-gray-700">{c.invoices}</td>
                  <td className="p-4 text-gray-500">{c.lastActive}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={16} />
                    </button>
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

export default CustomerList;
