import React, { useState } from 'react';
import { Package, Plus, Search, Edit3, Trash2, IndianRupee, Tag, Grid3X3, List, Box, Layers } from 'lucide-react';
import Layout from './Layout';

const formatINR = (amount: number) => '₹' + amount.toLocaleString('en-IN');

const initialProducts = [
  { id: 1, name: 'Website Development', category: 'Service', price: 45000, gst: 18, unit: 'Project', stock: '-', status: 'Active' },
  { id: 2, name: 'Mobile App Development', category: 'Service', price: 120000, gst: 18, unit: 'Project', stock: '-', status: 'Active' },
  { id: 3, name: 'SEO Package', category: 'Service', price: 15000, gst: 18, unit: 'Month', stock: '-', status: 'Active' },
  { id: 4, name: 'Web Hosting - Shared', category: 'Service', price: 3000, gst: 18, unit: 'Year', stock: '-', status: 'Active' },
  { id: 5, name: 'SSL Certificate', category: 'Product', price: 4000, gst: 18, unit: 'Nos', stock: '50', status: 'Active' },
  { id: 6, name: 'Domain Registration (.com)', category: 'Product', price: 1200, gst: 18, unit: 'Nos', stock: '100', status: 'Active' },
  { id: 7, name: 'Social Media Package', category: 'Service', price: 25000, gst: 18, unit: 'Month', stock: '-', status: 'Inactive' },
  { id: 8, name: 'UI/UX Design', category: 'Service', price: 10000, gst: 18, unit: 'Page', stock: '-', status: 'Active' },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || p.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <Layout title="Products & Services" subtitle="Manage your product and service catalog">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none" />
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              {['All', 'Service', 'Product'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
              <button onClick={() => setView('grid')} className={`p-1.5 rounded-md ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}><Grid3X3 size={16} className={view === 'grid' ? 'text-brand-gold-600' : 'text-gray-400'} /></button>
              <button onClick={() => setView('list')} className={`p-1.5 rounded-md ${view === 'list' ? 'bg-white shadow-sm' : ''}`}><List size={16} className={view === 'list' ? 'text-brand-gold-600' : 'text-gray-400'} /></button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 shadow-sm transition-all">
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        {/* Grid View */}
        {view === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-[#e8e2d8] p-5 hover:shadow-md hover:border-brand-gold-500/30 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-gold-500/10 flex items-center justify-center">
                    <Package size={20} className="text-brand-gold-600" />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-brand-gold-600"><Edit3 size={14} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                </div>
                <h3 className="text-[14px] font-bold text-gray-900 mb-1">{p.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-[11px] font-semibold text-gray-500">{p.category}</span>
                  <span className="text-[11px] text-gray-400">{p.unit}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#e8e2d8]">
                  <span className="text-[18px] font-black text-gray-900">{formatINR(p.price)}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8] bg-gray-50/50">
                  <th className="p-4 pl-6">Product / Service</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Unit</th>
                  <th className="p-4 text-right">Price</th>
                  <th className="p-4 text-center">GST</th>
                  <th className="p-4 text-center">Stock</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e2d8]/60">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 pl-6 font-semibold text-gray-900">{p.name}</td>
                    <td className="p-4"><span className="px-2 py-0.5 bg-gray-100 rounded text-[11px] font-semibold text-gray-500">{p.category}</span></td>
                    <td className="p-4 text-gray-500">{p.unit}</td>
                    <td className="p-4 text-right font-bold text-gray-900">{formatINR(p.price)}</td>
                    <td className="p-4 text-center text-gray-500">{p.gst}%</td>
                    <td className="p-4 text-center text-gray-500">{p.stock}</td>
                    <td className="p-4 text-center"><span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{p.status}</span></td>
                    <td className="p-4 text-right">
                      <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-brand-gold-600"><Edit3 size={14} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Package size={48} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No products found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
