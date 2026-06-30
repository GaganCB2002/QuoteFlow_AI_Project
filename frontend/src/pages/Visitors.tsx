import React, { useState, useEffect } from 'react';
import { Eye, Search, TrendingUp, Smartphone, Monitor, Clock, Users, BarChart3 } from 'lucide-react';
import Layout from './Layout';

const visitorsData = [
  { id: 1, page: '/', visits: 1245, uniqueVisitors: 890, bounceRate: 32.5, avgTime: '2m 45s', source: 'Direct', device: 'Desktop', location: 'Mumbai, IN' },
  { id: 2, page: '/pricing', visits: 456, uniqueVisitors: 320, bounceRate: 28.1, avgTime: '3m 12s', source: 'Google', device: 'Mobile', location: 'Delhi, IN' },
  { id: 3, page: '/features', visits: 389, uniqueVisitors: 275, bounceRate: 25.8, avgTime: '4m 05s', source: 'Google', device: 'Desktop', location: 'Bangalore, IN' },
  { id: 4, page: '/login', visits: 567, uniqueVisitors: 410, bounceRate: 45.2, avgTime: '1m 30s', source: 'Direct', device: 'Mobile', location: 'Pune, IN' },
  { id: 5, page: '/dashboard', visits: 823, uniqueVisitors: 645, bounceRate: 18.5, avgTime: '8m 20s', source: 'Email', device: 'Desktop', location: 'Hyderabad, IN' },
  { id: 6, page: '/contact', visits: 234, uniqueVisitors: 180, bounceRate: 35.0, avgTime: '2m 10s', source: 'Social', device: 'Mobile', location: 'Chennai, IN' },
  { id: 7, page: '/blog', visits: 678, uniqueVisitors: 490, bounceRate: 40.5, avgTime: '3m 45s', source: 'Organic', device: 'Desktop', location: 'Kolkata, IN' },
  { id: 8, page: '/demo', visits: 345, uniqueVisitors: 250, bounceRate: 22.3, avgTime: '5m 30s', source: 'Direct', device: 'Mobile', location: 'Ahmedabad, IN' },
];

const deviceIcon: Record<string, any> = { Desktop: Monitor, Mobile: Smartphone, Tablet: Smartphone };
const totalVisits = visitorsData.reduce((s, v) => s + v.visits, 0);
const totalUnique = visitorsData.reduce((s, v) => s + v.uniqueVisitors, 0);

const Visitors = () => {
  useEffect(() => {
    document.title = 'Visitor Tracking | QuoteFlow AI';
  }, []);
  const [search, setSearch] = useState('');

  const filtered = visitorsData.filter(v =>
    v.page.toLowerCase().includes(search.toLowerCase()) || v.source.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Website Visitors" subtitle="Track visitors and capture leads">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Eye size={18} className="text-blue-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Total Visits</p><p className="text-[22px] font-black text-gray-900">{totalVisits.toLocaleString()}</p></div></div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><Users size={18} className="text-emerald-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Unique Visitors</p><p className="text-[22px] font-black text-emerald-600">{totalUnique.toLocaleString()}</p></div></div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center"><TrendingUp size={18} className="text-amber-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Conversion</p><p className="text-[22px] font-black text-amber-600">3.2%</p></div></div>
          </div>
          <div className="bg-white rounded-xl border border-[#e8e2d8] p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><BarChart3 size={18} className="text-purple-600" /></div>
            <div><p className="text-[12px] text-gray-400 font-bold uppercase">Avg. Time</p><p className="text-[22px] font-black text-purple-600">3m 55s</p></div></div>
          </div>
        </div>

        {/* Sources */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6 mb-6">
          <h3 className="text-[15px] font-extrabold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { source: 'Direct', visits: 2135, color: 'bg-blue-500', pct: 38 },
              { source: 'Google', visits: 1280, color: 'bg-emerald-500', pct: 23 },
              { source: 'Social', visits: 845, color: 'bg-purple-500', pct: 15 },
              { source: 'Email', visits: 1340, color: 'bg-amber-500', pct: 24 },
            ].map(s => (
              <div key={s.source} className="text-center">
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div className={`${s.color} h-2 rounded-full transition-all`} style={{ width: `${s.pct}%` }} />
                </div>
                <p className="text-[13px] font-bold text-gray-900">{s.source}</p>
                <p className="text-[12px] text-gray-400">{s.visits.toLocaleString()} visits ({s.pct}%)</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-4 mb-6">
          <div className="relative max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pages..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8] bg-gray-50/50">
                <th className="p-4 pl-6">Page</th>
                <th className="p-4 text-right">Visits</th>
                <th className="p-4 text-right">Unique</th>
                <th className="p-4 text-right">Bounce Rate</th>
                <th className="p-4">Avg. Time</th>
                <th className="p-4">Source</th>
                <th className="p-4">Device</th>
                <th className="p-4">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e2d8]/60">
              {filtered.map(v => {
                const DevIcon = deviceIcon[v.device] || Monitor;
                return (
                  <tr key={v.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 pl-6"><span className="font-semibold text-gray-900">{v.page}</span></td>
                    <td className="p-4 text-right font-semibold text-gray-900">{v.visits.toLocaleString()}</td>
                    <td className="p-4 text-right text-gray-700">{v.uniqueVisitors.toLocaleString()}</td>
                    <td className="p-4 text-right"><span className={`font-semibold ${v.bounceRate > 35 ? 'text-red-500' : 'text-emerald-600'}`}>{v.bounceRate}%</span></td>
                    <td className="p-4 text-gray-500">{v.avgTime}</td>
                    <td className="p-4"><span className="px-2 py-0.5 bg-gray-100 rounded text-[11px] font-semibold text-gray-500">{v.source}</span></td>
                    <td className="p-4"><div className="flex items-center gap-1.5"><DevIcon size={12} className="text-gray-400" /><span className="text-gray-500">{v.device}</span></div></td>
                    <td className="p-4 text-gray-500">{v.location}</td>
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

export default Visitors;
