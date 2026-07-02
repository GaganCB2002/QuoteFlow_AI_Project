import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Save, Download, ArrowLeft, Plus, Trash2, Edit3,
  Check, X, Sparkles, RefreshCw
} from 'lucide-react';
import Layout from './Layout';
import { agentApi } from '../api';
import { formatINR } from '../utils/format';
import { getErrorMessage } from '../utils/errors';

const QuotationEditor = () => {
  const { quoteNo } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quotation, setQuotation] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Standard');
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [newFeature, setNewFeature] = useState({ name: '', description: '', price: 0 });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Edit Quotation | QuoteFlow AI';
    if (!quoteNo) { setLoading(false); return; }
    loadQuotation();
  }, [quoteNo]);

  const loadQuotation = async () => {
    setError('');
    try {
      const data = await agentApi.getQuotation(quoteNo!) as any;
      setQuotation(data);
      const loadedItems = data.items || data.quotation?.lineItems || [];
      setItems(loadedItems);

      const tier = data.quotation?.selectedTier || data.quotation?.costSummary?.recommendedTier || 'Standard';
      setSelectedTier(tier);

      const pt = data.quotation?.executiveSummary?.projectType || data.quotation?.marketAnalysis?.projectType || '';
      if (pt) {
        try {
          const sugg = await agentApi.getSuggestions(pt, data.quotation?.executiveSummary?.description || '', 100000) as any;
          setSuggestions(sugg);
        } catch {
          // Suggestions are optional
        }
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
    setLoading(false);
  };

  const calcTotals = (itemList: any[]) => {
    const subtotal = itemList.reduce((s, i) => s + (i.total || i.unitPrice * i.quantity || 0), 0);
    const gst = Math.round(subtotal * 0.18);
    return { subtotal, gst, grandTotal: subtotal + gst };
  };

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      await agentApi.editItems(quoteNo!, items);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(getErrorMessage(err));
    }
    setSaving(false);
  };

  const handleAddFeature = async () => {
    if (!newFeature.name || !newFeature.price) return;
    setError('');
    try {
      const result = await agentApi.addFeature(quoteNo!, newFeature) as any;
      setItems(result.items || []);
      setNewFeature({ name: '', description: '', price: 0 });
      setShowAddFeature(false);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleRemoveItem = async (itemName: string) => {
    setError('');
    try {
      const result = await agentApi.removeFeature(quoteNo!, itemName) as any;
      setItems(result.items || []);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleOverridePrice = async (itemName: string) => {
    setError('');
    try {
      const result = await agentApi.overridePrice(quoteNo!, itemName, editPrice) as any;
      setItems(result.items || []);
      setEditingItem(null);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleApplyTier = async (tier: string) => {
    setError('');
    try {
      await agentApi.applyTier(quoteNo!, tier);
      setSelectedTier(tier);
      await loadQuotation();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const addSuggestedFeature = async (s: any) => {
    await handleAddFeatureWithData({ name: s.name, description: s.description, price: s.sellingPrice });
  };

  const handleAddFeatureWithData = async (feat: any) => {
    setError('');
    try {
      const result = await agentApi.addFeature(quoteNo!, feat) as any;
      setItems(result.items || []);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const clearError = () => setError('');

  const q = quotation?.quotation || {};
  const market = q.marketAnalysis || {};
  const totals = calcTotals(items);
  const tiers = quotation?.tieredPricing || {};

  if (loading) {
    return <Layout><div className="p-8 text-center text-gray-400">Loading...</div></Layout>;
  }

  if (!quotation) {
    return (
      <Layout>
        <div className="p-8 text-center text-gray-400">
          <p className="text-lg font-bold mb-2">No Quotation Selected</p>
          <p className="text-sm">Please select a quotation from My Quotations to edit.</p>
          <button onClick={() => navigate('/my-quotations')} className="mt-4 px-4 py-2 bg-brand-gold-500 text-white rounded-lg">Go to My Quotations</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/my-quotations')} className="p-2 text-gray-400 hover:text-gray-600 border border-[#e8e2d8] rounded-xl">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-[24px] font-extrabold text-gray-900">Edit Quotation</h2>
              <p className="text-[13px] text-gray-500">{quoteNo} · {q.executiveSummary?.projectName || 'Project'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => agentApi.downloadAll(quoteNo!)} className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-gray-600 border border-[#e8e2d8] rounded-xl hover:bg-gray-50">
              <Download size={15} /> Download
            </button>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 shadow-sm disabled:opacity-40">
              {saving ? <><RefreshCw size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}</>}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-700 font-bold flex items-center justify-between gap-2">
            <span>{error}</span>
            <button onClick={clearError} className="text-red-400 hover:text-red-600"><X size={16} /></button>
          </div>
        )}

        {saved && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[13px] text-emerald-700 font-bold flex items-center gap-2">
            <Check size={16} /> Changes saved successfully
          </div>
        )}

        {/* Pricing Tiers */}
        {tiers.basic && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {['basic', 'standard', 'premium'].map(tierKey => {
              const t = tiers[tierKey] as any;
              if (!t) return null;
              const isSelected = selectedTier.toLowerCase() === tierKey;
              const isRec = tierKey === 'standard';
              return (
                <div key={tierKey}
                  onClick={() => handleApplyTier(t.name)}
                  className={`rounded-2xl border-2 p-5 cursor-pointer transition-all ${
                    isSelected ? 'border-brand-gold-500 bg-brand-gold-50 shadow-md' :
                    isRec ? 'border-purple-300 bg-white' : 'border-[#e8e2d8] bg-white hover:border-gray-300'
                  }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[15px] font-extrabold text-gray-900">{t.name}</h3>
                    {isRec && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full">Recommended</span>}
                  </div>
                  <p className="text-[12px] text-gray-500 mb-3">{t.description}</p>
                  <p className="text-[28px] font-black text-gray-900">{formatINR(t.grandTotal)}</p>
                  <div className="mt-3 space-y-1.5 text-[12px]">
                    <div className="flex justify-between"><span className="text-gray-500">Customer pays</span><span className="font-bold">{formatINR(t.grandTotal)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Admin earns</span><span className="font-bold text-emerald-600">{formatINR(t.adminRevenuePerSale)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Margin</span><span className="font-bold">{t.marginPct?.toFixed ? t.marginPct.toFixed(0) : t.marginPct}%</span></div>
                    {t.customerSavings > 0 && <div className="flex justify-between"><span className="text-gray-500">Customer saves</span><span className="font-bold text-emerald-600">{formatINR(t.customerSavings)}</span></div>}
                  </div>
                  {isSelected && <div className="mt-3 text-center text-[12px] font-bold text-brand-gold-700">✓ Currently Applied</div>}
                </div>
              );
            })}
          </div>
        )}

        {/* Line Items Editor */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-extrabold text-gray-900">Line Items</h3>
            <div className="flex gap-2">
              <button onClick={() => setShowSuggestions(!showSuggestions)} className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50">
                <Sparkles size={13} /> AI Suggestions
              </button>
              <button onClick={() => setShowAddFeature(true)} className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-brand-gold-600 border border-brand-gold-300 rounded-lg hover:bg-brand-gold-50">
                <Plus size={13} /> Add Item
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8]">
                  <th className="pb-3 min-w-[200px]">Item</th>
                  <th className="pb-3 w-20 text-center">Qty</th>
                  <th className="pb-3 w-28 text-right">Rate (₹)</th>
                  <th className="pb-3 w-28 text-right">Total (₹)</th>
                  <th className="pb-3 w-24 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  const total = item.total || item.unitPrice * item.quantity || 0;
                  const isEditing = editingItem === item.itemName;
                  return (
                    <tr key={i} className="border-b border-[#e8e2d8]/60 group">
                      <td className="py-3 pr-3">
                        <p className="font-semibold text-gray-900">{item.itemName}</p>
                        <p className="text-[12px] text-gray-400">{item.description}</p>
                      </td>
                      <td className="py-3 text-center">{item.quantity || 1}</td>
                      <td className="py-3 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1">
                            <input type="number" value={editPrice} onChange={e => setEditPrice(Number(e.target.value))}
                              className="w-24 px-2 py-1 border border-brand-gold-500 rounded-lg text-[13px] text-right outline-none" />
                            <button onClick={() => handleOverridePrice(item.itemName)} className="text-emerald-600 p-1"><Check size={14} /></button>
                            <button onClick={() => setEditingItem(null)} className="text-gray-400 p-1"><X size={14} /></button>
                          </div>
                        ) : (
                          <span>{formatINR(item.unitPrice || 0)}</span>
                        )}
                      </td>
                      <td className="py-3 text-right font-semibold">{formatINR(total)}</td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditingItem(item.itemName); setEditPrice(item.unitPrice || 0); }}
                            className="p-1.5 text-gray-400 hover:text-brand-gold-600 rounded-lg hover:bg-brand-gold-50" title="Edit price">
                            <Edit3 size={13} />
                          </button>
                          <button onClick={() => handleRemoveItem(item.itemName)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50" title="Remove">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="w-72 bg-gray-50 rounded-xl p-4 border border-[#e8e2d8] space-y-1.5 text-[13px]">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-bold">{formatINR(totals.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">GST (18%)</span><span className="font-bold">{formatINR(totals.gst)}</span></div>
              <div className="pt-2 border-t border-[#e8e2d8] flex justify-between">
                <span className="font-extrabold text-[15px]">Grand Total</span>
                <span className="text-[20px] font-black text-brand-gold-600">{formatINR(totals.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Feature Form */}
        {showAddFeature && (
          <div className="bg-white rounded-2xl shadow-sm border border-brand-gold-300 p-6 mb-6">
            <h3 className="text-[14px] font-extrabold text-gray-900 mb-4">Add Custom Feature / Module</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[12px] font-bold text-gray-600 block mb-1">Feature Name</label>
                <input type="text" value={newFeature.name} onChange={e => setNewFeature(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Advanced Analytics" className="w-full px-3 py-2.5 rounded-xl border border-[#e8e2d8] text-[13px] outline-none focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500" />
              </div>
              <div>
                <label className="text-[12px] font-bold text-gray-600 block mb-1">Description</label>
                <input type="text" value={newFeature.description} onChange={e => setNewFeature(p => ({ ...p, description: e.target.value }))}
                  placeholder="Brief description" className="w-full px-3 py-2.5 rounded-xl border border-[#e8e2d8] text-[13px] outline-none focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500" />
              </div>
              <div>
                <label className="text-[12px] font-bold text-gray-600 block mb-1">Price (₹)</label>
                <div className="flex gap-2">
                  <input type="number" value={newFeature.price || ''} onChange={e => setNewFeature(p => ({ ...p, price: Number(e.target.value) }))}
                    placeholder="25000" className="flex-1 px-3 py-2.5 rounded-xl border border-[#e8e2d8] text-[13px] outline-none focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500" />
                  <button onClick={handleAddFeature} disabled={!newFeature.name || !newFeature.price}
                    className="px-4 py-2.5 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 disabled:opacity-40">
                    <Plus size={16} />
                  </button>
                  <button onClick={() => setShowAddFeature(false)} className="px-3 py-2.5 text-gray-500 border border-[#e8e2d8] rounded-xl hover:bg-gray-50">
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Feature Suggestions */}
        {showSuggestions && suggestions && (
          <div className="bg-white rounded-2xl shadow-sm border border-purple-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-extrabold text-gray-900 flex items-center gap-2">
                <Sparkles size={16} className="text-purple-600" /> AI-Recommended Add-On Features
              </h3>
              <button onClick={() => setShowSuggestions(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-200">
                <p className="text-[12px] text-purple-700 font-bold">Potential Revenue</p>
                <p className="text-[18px] font-black text-purple-700">{formatINR(suggestions.totalPotentialRevenue || 0)}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-200">
                <p className="text-[12px] text-emerald-700 font-bold">Admin Profit</p>
                <p className="text-[18px] font-black text-emerald-700">{formatINR(suggestions.totalPotentialProfit || 0)}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-200">
                <p className="text-[12px] text-amber-700 font-bold">Customer Value</p>
                <p className="text-[18px] font-black text-amber-700">{formatINR(suggestions.totalCustomerValue || 0)}</p>
              </div>
            </div>

            {suggestions.highPriorityFeatures?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">High Priority — Maximum Impact</h4>
                <div className="space-y-2">
                  {suggestions.highPriorityFeatures.map((s: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-900">{s.name} <span className="text-purple-600 font-bold">{formatINR(s.sellingPrice)}</span></p>
                        <p className="text-[12px] text-gray-500">{s.description}</p>
                        <p className="text-[11px] text-emerald-600 mt-0.5">{s.businessValue} · {s.estimatedSavings}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-3 shrink-0">
                        <div className="text-right text-[11px]">
                          <p className="text-emerald-600 font-bold">+{formatINR(s.adminProfit)} profit</p>
                          <p className="text-gray-400">{s.profitMarginPct?.toFixed(0)}% margin</p>
                        </div>
                        <button onClick={() => addSuggestedFeature(s)}
                          className="px-3 py-2 bg-purple-600 text-white text-[12px] font-bold rounded-lg hover:bg-purple-700 transition-all">
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {suggestions.mediumPriorityFeatures?.length > 0 && (
              <div>
                <h4 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">Additional Features</h4>
                <div className="space-y-2">
                  {suggestions.mediumPriorityFeatures.map((s: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-[#e8e2d8]">
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-900">{s.name} <span className="text-gray-600">{formatINR(s.sellingPrice)}</span></p>
                        <p className="text-[12px] text-gray-500">{s.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-3 shrink-0">
                        <span className="text-[11px] text-emerald-600 font-bold">+{formatINR(s.adminProfit)}</span>
                        <button onClick={() => addSuggestedFeature(s)}
                          className="p-1.5 text-gray-400 hover:text-brand-gold-600 border border-[#e8e2d8] rounded-lg hover:border-brand-gold-300">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Storage Info */}
        <div className="p-4 bg-gray-50 border border-[#e8e2d8] rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-bold text-gray-900">Local Storage Location</p>
              <p className="text-[11px] text-gray-500 font-mono break-all mt-1">{quotation?.metadata?.folderPath || quotation?.storage?.folderPath || 'N/A'}</p>
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-brand-gold-600 border border-brand-gold-300 rounded-lg hover:bg-brand-gold-50 shrink-0 ml-4">
              <Save size={13} /> Save to Disk
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuotationEditor;
