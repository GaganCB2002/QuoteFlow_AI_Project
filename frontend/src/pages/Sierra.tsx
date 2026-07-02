import React, { useState, useEffect } from 'react';
import { BarChart3, Search, Plus, Phone, Mail, MoreHorizontal, IndianRupee, TrendingUp, Users, Target } from 'lucide-react';
import Layout from './Layout';
import { formatINR } from '../utils/format';

const leadsData = [
  { id: 1, name: 'Ravi Kumar', company: 'Ravi Constructions', email: 'ravi@constructions.com', phone: '+91 98765 43210', stage: 'New', value: 185000, date: '11 Jun 2026' },
  { id: 2, name: 'Priya Sharma', company: 'Priya Enterprises', email: 'priya@enterprises.in', phone: '+91 98765 43211', stage: 'Contacted', value: 42500, date: '10 Jun 2026' },
  { id: 3, name: 'Amit Verma', company: 'GreenLeaf Solutions', email: 'amit@greenleaf.com', phone: '+91 98765 43212', stage: 'Proposal', value: 92000, date: '09 Jun 2026' },
  { id: 4, name: 'Sunil Agarwal', company: 'Agarwal & Sons', email: 'sunil@agarwal.in', phone: '+91 98765 43213', stage: 'Negotiation', value: 234000, date: '08 Jun 2026' },
  { id: 5, name: 'Neha Patel', company: 'SkyHigh Ventures', email: 'neha@skyhigh.in', phone: '+91 98765 43214', stage: 'Won', value: 15000, date: '07 Jun 2026' },
  { id: 6, name: 'Vikram Singh', company: 'Metro Services', email: 'vikram@metro.in', phone: '+91 98765 43215', stage: 'New', value: 78000, date: '06 Jun 2026' },
  { id: 7, name: 'Anita Desai', company: 'Bharat Electronics', email: 'anita@bharatelec.in', phone: '+91 98765 43216', stage: 'Proposal', value: 315000, date: '05 Jun 2026' },
  { id: 8, name: 'Rajesh Khanna', company: 'Nova Designs', email: 'rajesh@novadesigns.in', phone: '+91 98765 43217', stage: 'Lost', value: 56000, date: '04 Jun 2026' },
];

const stages = ['New', 'Contacted', 'Proposal', 'Negotiation', 'Won', 'Lost'];
const stageColors: Record<string, string> = {
  New: 'bg-blue-50 text-blue-700 border-blue-200',
  Contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  Proposal: 'bg-purple-50 text-purple-700 border-purple-200',
  Negotiation: 'bg-orange-50 text-orange-700 border-orange-200',
  Won: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Lost: 'bg-gray-100 text-gray-500 border-gray-200',
};

const Sierra = () => {
  useEffect(() => {
    document.title = 'Sierra CRM | QuoteFlow AI';
  }, []);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'pipeline' | 'table'>('pipeline');

  const filtered = leadsData.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Sierra CRM" subtitle="Customer relationship management">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Users size={18} className="text-blue-600" /></div>
              <div><p className="text-[12px] text-gray-400 font-bold uppercase">Total Leads</p><p className="text-[20px] font-black text-gray-900">{leadsData.length}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><TrendingUp size={18} className="text-emerald-600" /></div>
              <div><p className="text-[12px] text-gray-400 font-bold uppercase">Won</p><p className="text-[20px] font-black text-emerald-600">{leadsData.filter(l => l.stage === 'Won').length}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><Target size={18} className="text-purple-600" /></div>
              <div><p className="text-[12px] text-gray-400 font-bold uppercase">Pipeline Value</p><p className="text-[20px] font-black text-gray-900">{formatINR(filtered.reduce((s, l) => s + l.value, 0))}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center"><BarChart3 size={18} className="text-amber-600" /></div>
              <div><p className="text-[12px] text-gray-400 font-bold uppercase">Conversion</p><p className="text-[20px] font-black text-gray-900">22%</p></div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none" />
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              <button onClick={() => setView('pipeline')} className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all ${view === 'pipeline' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Pipeline</button>
              <button onClick={() => setView('table')} className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all ${view === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Table</button>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all">
            <Plus size={16} /> Add Lead
          </button>
        </div>

        {/* Pipeline View */}
        {view === 'pipeline' && (
          <div className="grid grid-cols-6 gap-3 overflow-x-auto pb-4 min-w-[900px]">
            {stages.map(stage => {
              const stageLeads = filtered.filter(l => l.stage === stage);
              return (
                <div key={stage} className="bg-gray-50/80 rounded-xl border border-[#e8e2d8] min-w-[140px]">
                  <div className={`p-3 border-b border-[#e8e2d8] text-center rounded-t-xl ${stageColors[stage]}`}>
                    <p className="text-[11px] font-bold uppercase tracking-wider">{stage}</p>
                    <p className="text-[18px] font-black">{stageLeads.length}</p>
                  </div>
                  <div className="p-2 space-y-2">
                    {stageLeads.map(lead => (
                      <div key={lead.id} className="bg-white rounded-xl p-3 border border-[#e8e2d8] shadow-sm hover:shadow transition-shadow cursor-pointer">
                        <p className="text-[13px] font-bold text-gray-900">{lead.name}</p>
                        <p className="text-[11px] text-gray-500">{lead.company}</p>
                        <div className="flex items-center gap-1 mt-2 text-[11px] text-gray-400">
                          <IndianRupee size={11} />
                          <span className="font-semibold text-gray-700">{formatINR(lead.value)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table View */}
        {view === 'table' && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8] bg-gray-50/50">
                  <th className="p-4 pl-6">Name</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Value</th>
                  <th className="p-4 text-center">Stage</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e2d8]/60">
                {filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 pl-6 font-semibold text-gray-900">{lead.name}</td>
                    <td className="p-4 text-gray-600">{lead.company}</td>
                    <td className="p-4">
                      <div className="flex flex-col text-[12px] text-gray-500">
                        <span className="flex items-center gap-1"><Mail size={11} /> {lead.email}</span>
                        <span className="flex items-center gap-1"><Phone size={11} /> {lead.phone}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">{lead.date}</td>
                    <td className="p-4 text-right font-bold text-gray-900">{formatINR(lead.value)}</td>
                    <td className="p-4 text-center"><span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${stageColors[lead.stage].split(' ')[0]} ${stageColors[lead.stage].split(' ')[1]}`}>{lead.stage}</span></td>
                    <td className="p-4 text-right"><button className="p-1.5 text-gray-400 hover:text-gray-700"><MoreHorizontal size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Sierra;
