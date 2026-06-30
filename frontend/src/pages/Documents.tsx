import React, { useState, useEffect } from 'react';
import { Search, FileText, Receipt, File, Download, Eye, Upload } from 'lucide-react';
import Layout from './Layout';

const docsData = [
  { id: 1, name: 'Quotation - Ravi Constructions.pdf', type: 'Quotation', size: '245 KB', date: '11 Jun 2026', status: 'Sent' },
  { id: 2, name: 'Invoice - Agarwal & Sons.pdf', type: 'Invoice', size: '180 KB', date: '10 Jun 2026', status: 'Paid' },
  { id: 3, name: 'Proposal - GreenLeaf Solutions.pdf', type: 'Proposal', size: '520 KB', date: '09 Jun 2026', status: 'Draft' },
  { id: 4, name: 'BRD - School Management System.docx', type: 'Document', size: '1.2 MB', date: '08 Jun 2026', status: 'Final' },
  { id: 5, name: 'Receipt - Bharat Electronics.pdf', type: 'Receipt', size: '95 KB', date: '07 Jun 2026', status: 'Generated' },
  { id: 6, name: 'Contract - Nova Designs.pdf', type: 'Contract', size: '340 KB', date: '06 Jun 2026', status: 'Signed' },
  { id: 7, name: 'GST Report - Q2 2026.xlsx', type: 'Report', size: '780 KB', date: '05 Jun 2026', status: 'Final' },
  { id: 8, name: 'Project Plan - Metro Services.pdf', type: 'Document', size: '1.5 MB', date: '04 Jun 2026', status: 'Draft' },
];

const typeIcon: Record<string, any> = { Quotation: FileText, Invoice: Receipt, Proposal: FileText, Document: File, Receipt: Receipt, Contract: FileText, Report: File };
const typeColor: Record<string, string> = {
  Quotation: 'text-purple-600 bg-purple-50',
  Invoice: 'text-blue-600 bg-blue-50',
  Proposal: 'text-orange-600 bg-orange-50',
  Document: 'text-gray-600 bg-gray-100',
  Receipt: 'text-emerald-600 bg-emerald-50',
  Contract: 'text-rose-600 bg-rose-50',
  Report: 'text-cyan-600 bg-cyan-50',
};

const Documents = () => {
  useEffect(() => {
    document.title = 'Documents | QuoteFlow AI';
  }, []);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');

  const filtered = docsData.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchType = type === 'All' || d.type === type;
    return matchSearch && matchType;
  });

  const types = ['All', ...new Set(docsData.map(d => d.type))];

  return (
    <Layout title="Documents" subtitle="All your business documents in one place">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none" />
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 overflow-x-auto">
              {types.map(t => (
                <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-lg text-[12px] font-bold whitespace-nowrap transition-all ${type === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{t}</button>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all">
            <Upload size={16} /> Upload
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(d => {
            const Icon = typeIcon[d.type] || File;
            return (
              <div key={d.id} className="bg-white rounded-2xl border border-[#e8e2d8] p-5 hover:shadow-md hover:border-brand-gold-500/30 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${typeColor[d.type] || 'bg-gray-100 text-gray-600'}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-brand-gold-600"><Eye size={14} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-brand-gold-600"><Download size={14} /></button>
                  </div>
                </div>
                <p className="text-[13px] font-bold text-gray-900 truncate mb-1" title={d.name}>{d.name}</p>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span className="px-2 py-0.5 bg-gray-100 rounded font-semibold">{d.type}</span>
                  <span>{d.size}</span>
                  <span className="ml-auto">{d.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
