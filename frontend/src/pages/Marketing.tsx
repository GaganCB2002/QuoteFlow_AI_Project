import React, { useState, useEffect } from 'react';
import { Megaphone, Search, Plus, MessageCircle, Mail, Smartphone, TrendingUp, Users, IndianRupee } from 'lucide-react';
import Layout from './Layout';
import { formatINR } from '../utils/format';

const campaignsData = [
  { id: 1, name: 'Summer Sale 2026', channel: 'WhatsApp', status: 'Active', sent: 1250, opened: 845, clicked: 320, converted: 45, revenue: 185000, date: '10 Jun 2026' },
  { id: 2, name: 'New Product Launch', channel: 'Email', status: 'Scheduled', sent: 5000, opened: 0, clicked: 0, converted: 0, revenue: 0, date: '15 Jun 2026' },
  { id: 3, name: 'Festival Greetings', channel: 'SMS', status: 'Active', sent: 3200, opened: 2100, clicked: 0, converted: 28, revenue: 92000, date: '08 Jun 2026' },
  { id: 4, name: 'CRM Upgrade Offer', channel: 'Email', status: 'Completed', sent: 2000, opened: 1450, clicked: 520, converted: 72, revenue: 425000, date: '01 Jun 2026' },
  { id: 5, name: 'Referral Program', channel: 'WhatsApp', status: 'Draft', sent: 0, opened: 0, clicked: 0, converted: 0, revenue: 0, date: '-' },
  { id: 6, name: 'Diwali Campaign', channel: 'WhatsApp', status: 'Scheduled', sent: 8000, opened: 0, clicked: 0, converted: 0, revenue: 0, date: 'Oct 2026' },
];

const channelIcon: Record<string, any> = { WhatsApp: MessageCircle, Email: Mail, SMS: Smartphone };
const statusStyle = (s: string) => {
  const styles: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-700',
    Scheduled: 'bg-blue-50 text-blue-700',
    Completed: 'bg-gray-100 text-gray-600',
    Draft: 'bg-amber-50 text-amber-700',
  };
  return styles[s] || 'bg-gray-100 text-gray-600';
};

const Marketing = () => {
  useEffect(() => {
    document.title = 'Marketing Campaigns | QuoteFlow AI';
  }, []);
  const [search, setSearch] = useState('');
  const filtered = campaignsData.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout title="Marketing" subtitle="Campaign management and analytics">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><Megaphone size={18} className="text-purple-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Campaigns</p><p className="text-[20px] font-black text-gray-900">{campaignsData.length}</p></div></div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Users size={18} className="text-blue-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Reached</p><p className="text-[20px] font-black text-gray-900">{campaignsData.reduce((s, c) => s + c.sent, 0).toLocaleString()}</p></div></div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><TrendingUp size={18} className="text-emerald-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Conversions</p><p className="text-[20px] font-black text-emerald-600">{campaignsData.reduce((s, c) => s + c.converted, 0)}</p></div></div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center"><IndianRupee size={18} className="text-brand-gold-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Revenue</p><p className="text-[20px] font-black text-brand-gold-600">{formatINR(campaignsData.reduce((s, c) => s + c.revenue, 0))}</p></div></div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all">
            <Plus size={16} /> New Campaign
          </button>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8] bg-gray-50/50">
                <th className="p-4 pl-6">Campaign</th>
                <th className="p-4">Channel</th>
                <th className="p-4 text-right">Sent</th>
                <th className="p-4 text-right">Opened</th>
                <th className="p-4 text-right">Clicked</th>
                <th className="p-4 text-right">Conversions</th>
                <th className="p-4 text-right">Revenue</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e2d8]/60">
              {filtered.map(c => {
                const Icon = channelIcon[c.channel] || MessageCircle;
                return (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-gray-900">{c.name}</td>
                    <td className="p-4"><div className="flex items-center gap-2"><Icon size={14} className="text-gray-400" /><span>{c.channel}</span></div></td>
                    <td className="p-4 text-right text-gray-700">{c.sent > 0 ? c.sent.toLocaleString() : '—'}</td>
                    <td className="p-4 text-right text-gray-700">{c.opened > 0 ? c.opened.toLocaleString() : '—'}</td>
                    <td className="p-4 text-right text-gray-700">{c.clicked > 0 ? c.clicked.toLocaleString() : '—'}</td>
                    <td className="p-4 text-right font-semibold">{c.converted > 0 ? c.converted : '—'}</td>
                    <td className="p-4 text-right font-bold text-gray-900">{c.revenue > 0 ? formatINR(c.revenue) : '—'}</td>
                    <td className="p-4 text-center"><span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusStyle(c.status)}`}>{c.status}</span></td>
                    <td className="p-4 text-gray-500">{c.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Marketing;
