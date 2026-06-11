import React, { useState } from 'react';
import { Receipt, Search, IndianRupee, Download, MoreHorizontal, Banknote, CreditCard, Smartphone } from 'lucide-react';
import Layout from './Layout';

const formatINR = (amount: number) => '₹' + amount.toLocaleString('en-IN');

const receiptsData = [
  { id: 'RCP-2026-001', invoice: 'INV-2026-001', customer: 'Ravi Constructions', date: '11 Jun 2026', amount: 185000, mode: 'Bank Transfer', ref: 'HDFC/TRF/12345', status: 'Cleared' },
  { id: 'RCP-2026-002', invoice: 'INV-2026-004', customer: 'Agarwal & Sons', date: '10 Jun 2026', amount: 234000, mode: 'Cheque', ref: 'CHQ/98765', status: 'Pending' },
  { id: 'RCP-2026-003', invoice: 'INV-2026-007', customer: 'Bharat Electronics', date: '09 Jun 2026', amount: 315000, mode: 'UPI', ref: 'UPI/GPay/789012', status: 'Cleared' },
  { id: 'RCP-2026-004', invoice: 'INV-2026-002', customer: 'Priya Enterprises', date: '08 Jun 2026', amount: 42500, mode: 'Cash', ref: 'CASH/001', status: 'Cleared' },
  { id: 'RCP-2026-005', invoice: 'INV-2026-005', customer: 'SkyHigh Ventures', date: '07 Jun 2026', amount: 15000, mode: 'Bank Transfer', ref: 'ICICI/TRF/54321', status: 'Cleared' },
  { id: 'RCP-2026-006', invoice: 'INV-2026-006', customer: 'Metro Services', date: '06 Jun 2026', amount: 78000, mode: 'UPI', ref: 'UPI/PhonePe/345678', status: 'Failed' },
];

const modeIcon: Record<string, any> = {
  'Bank Transfer': Banknote,
  'Cheque': CreditCard,
  'UPI': Smartphone,
  'Cash': Banknote,
};

const statusStyle = (s: string) => {
  const styles: Record<string, string> = {
    Cleared: 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Failed: 'bg-red-50 text-red-600',
  };
  return styles[s] || 'bg-gray-100 text-gray-600';
};

const Receipts = () => {
  const [search, setSearch] = useState('');

  const filtered = receiptsData.filter(r =>
    r.customer.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Receipts" subtitle="Track all payment receipts">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4 text-center">
            <p className="text-[12px] text-gray-400 font-bold uppercase">Total Receipts</p>
            <p className="text-[24px] font-black text-gray-900 mt-1">{receiptsData.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4 text-center">
            <p className="text-[12px] text-gray-400 font-bold uppercase">Cleared</p>
            <p className="text-[24px] font-black text-emerald-600 mt-1">{receiptsData.filter(r => r.status === 'Cleared').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4 text-center">
            <p className="text-[12px] text-gray-400 font-bold uppercase">Total Collected</p>
            <p className="text-[24px] font-black text-gray-900 mt-1">{formatINR(receiptsData.reduce((s, r) => s + r.amount, 0))}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4 text-center">
            <p className="text-[12px] text-gray-400 font-bold uppercase">Pending</p>
            <p className="text-[24px] font-black text-amber-600 mt-1">{receiptsData.filter(r => r.status === 'Pending').length}</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-4 mb-6">
          <div className="relative max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search receipts..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8] bg-gray-50/50">
                <th className="p-4 pl-6">Receipt #</th>
                <th className="p-4">Invoice</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Mode</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e2d8]/60">
              {filtered.map(r => {
                const Icon = modeIcon[r.mode] || Banknote;
                return (
                  <tr key={r.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 pl-6 font-semibold text-gray-900">{r.id}</td>
                    <td className="p-4 text-gray-500">{r.invoice}</td>
                    <td className="p-4 font-medium text-gray-700">{r.customer}</td>
                    <td className="p-4 text-gray-500">{r.date}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className="text-gray-400" />
                        <span className="text-gray-700">{r.mode}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-bold text-gray-900">{formatINR(r.amount)}</td>
                    <td className="p-4 text-center"><span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusStyle(r.status)}`}>{r.status}</span></td>
                    <td className="p-4 text-right"><button className="p-1.5 text-gray-400 hover:text-gray-700"><Download size={14} /></button></td>
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

export default Receipts;
