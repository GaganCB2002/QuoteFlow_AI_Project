import React, { useState, useEffect } from 'react';
import { FileText, Plus, Send, Save, Download, User, Building2, Mail, Phone, MapPin, Hash, X, Sparkles, Zap, RefreshCw, Share2 } from 'lucide-react';
import ShareDialog from '../components/ShareDialog';
import Layout from './Layout';
import { aiApi } from '../api';
import { formatINR } from '../utils/format';

interface LineItem {
  id: number;
  desc: string;
  hsn: string;
  qty: number;
  unit: string;
  price: number;
  discount: number;
}

const defaultUnit = 'Nos';

const QuotationBuilder = () => {
  useEffect(() => {
    document.title = 'Quotation Builder | QuoteFlow AI';
  }, []);
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    gst: '',
  });
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, desc: '', hsn: '', qty: 1, unit: defaultUnit, price: 0, discount: 0 },
  ]);
  const [quoteNo] = useState('QT-' + Date.now().toString().slice(-8));
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const [validTill, setValidTill] = useState('');
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const updateItem = (id: number, field: keyof LineItem, value: any) =>
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));

  const addItem = () =>
    setItems([...items, { id: Date.now(), desc: '', hsn: '', qty: 1, unit: defaultUnit, price: 0, discount: 0 }]);

  const removeItem = (id: number) =>
    setItems(items.filter(item => item.id !== id));

  const updateCustomer = (field: string, value: string) =>
    setCustomer(prev => ({ ...prev, [field]: value }));

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const totalDiscount = items.reduce((acc, item) => acc + ((item.qty * item.price) * item.discount / 100), 0);
  const taxableAmount = subtotal - totalDiscount;
  const tax = taxableAmount * 0.18;
  const total = taxableAmount + tax;

  const canNextStep1 = () => customer.name && customer.email;
  const canNextStep2 = () => items.some(item => item.desc && item.price > 0);

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight">New Quotation</h2>
            <p className="text-[14px] text-gray-500 font-medium mt-1">Create a professional quotation with all details.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAiAssistant(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-purple-700 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-all"
            >
              <Sparkles size={15} /> AI Assistant
            </button>
            <div className="flex items-center gap-2 text-[13px] text-gray-400 font-medium">
              <span>Step {step} of 2</span>
              <div className="flex gap-1">
                <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-brand-gold-500' : 'bg-gray-200'}`} />
                <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-brand-gold-500' : 'bg-gray-200'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Modal */}
        {showAiAssistant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl border border-[#e8e2d8] p-6 w-full max-w-lg mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-extrabold text-gray-900 flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-600" /> AI Quotation Assistant
                </h3>
                <button onClick={() => { setShowAiAssistant(false); setAiPrompt(''); }} className="text-gray-400 hover:text-gray-600 p-1">
                  <X size={18} />
                </button>
              </div>
              <p className="text-[13px] text-gray-500 mb-3">Describe what you need and AI will auto-fill the line items.</p>
              <textarea
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                rows={4}
                placeholder='e.g. "School ERP system with student management, fee tracking, attendance, exam management, and teacher portal"'
                className="w-full px-4 py-3 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowAiAssistant(false)}
                  className="px-4 py-2.5 text-[13px] font-bold text-gray-600 border border-[#e8e2d8] rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!aiPrompt.trim()) return;
                    setAiProcessing(true);
                    try {
                      const result = await aiApi.analyze({ description: aiPrompt });
                      if (result.items && result.items.length > 0) {
                        const newItems: LineItem[] = result.items.map((item, idx) => ({
                          id: Date.now() + idx,
                          desc: item.itemName,
                          hsn: '',
                          qty: item.quantity || 1,
                          unit: defaultUnit,
                          price: item.unitPrice || 0,
                          discount: 0,
                        }));
                        setItems(newItems);
                        if (result.projectName && !customer.company) {
                          setCustomer(prev => ({ ...prev, company: result.projectName }));
                        }
                      }
                      setShowAiAssistant(false);
                      setAiPrompt('');
                    } catch {
                      const desc = aiPrompt.toLowerCase();
                      const fallbackItems: LineItem[] = [];
                      if (desc.includes('school') || desc.includes('erp') || desc.includes('education')) {
                        fallbackItems.push(
                          { id: Date.now(), desc: 'Student Management Module', hsn: '9983', qty: 1, unit: 'Set', price: 25000, discount: 0 },
                          { id: Date.now() + 1, desc: 'Fee Management System', hsn: '9983', qty: 1, unit: 'Set', price: 15000, discount: 0 },
                          { id: Date.now() + 2, desc: 'Attendance Tracking', hsn: '9983', qty: 1, unit: 'Set', price: 10000, discount: 0 },
                          { id: Date.now() + 3, desc: 'Exam & Result Management', hsn: '9983', qty: 1, unit: 'Set', price: 15000, discount: 0 },
                          { id: Date.now() + 4, desc: 'Teacher Portal', hsn: '9983', qty: 1, unit: 'Set', price: 12000, discount: 0 },
                          { id: Date.now() + 5, desc: 'Admin Dashboard', hsn: '9983', qty: 1, unit: 'Set', price: 18000, discount: 0 },
                          { id: Date.now() + 6, desc: 'Payment Gateway Integration', hsn: '9983', qty: 1, unit: 'Set', price: 10000, discount: 0 },
                          { id: Date.now() + 7, desc: 'SMS/Email Notifications', hsn: '9983', qty: 1, unit: 'Set', price: 8000, discount: 0 },
                          { id: Date.now() + 8, desc: 'Cloud Hosting Setup (Annual)', hsn: '9983', qty: 1, unit: 'Year', price: 25000, discount: 0 },
                          { id: Date.now() + 9, desc: 'Domain Registration (.com)', hsn: '9983', qty: 1, unit: 'Year', price: 1200, discount: 0 },
                        );
                      } else {
                        fallbackItems.push(
                          { id: Date.now(), desc: 'Requirement Analysis & Planning', hsn: '9983', qty: 1, unit: 'Set', price: 10000, discount: 0 },
                          { id: Date.now() + 1, desc: 'UI/UX Design', hsn: '9983', qty: 1, unit: 'Set', price: 15000, discount: 0 },
                          { id: Date.now() + 2, desc: 'Frontend Development', hsn: '9983', qty: 1, unit: 'Set', price: 25000, discount: 0 },
                          { id: Date.now() + 3, desc: 'Backend Development', hsn: '9983', qty: 1, unit: 'Set', price: 30000, discount: 0 },
                          { id: Date.now() + 4, desc: 'Database Design & Setup', hsn: '9983', qty: 1, unit: 'Set', price: 10000, discount: 0 },
                          { id: Date.now() + 5, desc: 'Testing & QA', hsn: '9983', qty: 1, unit: 'Set', price: 10000, discount: 0 },
                          { id: Date.now() + 6, desc: 'Deployment & Launch', hsn: '9983', qty: 1, unit: 'Set', price: 8000, discount: 0 },
                        );
                      }
                      setItems(fallbackItems);
                      setShowAiAssistant(false);
                      setAiPrompt('');
                    }
                    setAiProcessing(false);
                  }}
                  disabled={aiProcessing || !aiPrompt.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white font-bold text-[13px] rounded-xl hover:bg-purple-700 transition-all disabled:opacity-40 shadow-sm"
                >
                  {aiProcessing ? (
                    <><RefreshCw size={15} className="animate-spin" /> Generating...</>
                  ) : (
                    <><Zap size={15} /> Generate Items</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d8] p-8">
          {/* Step 1: Customer Details */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center">
                  <User size={20} className="text-brand-gold-600" />
                </div>
                <h3 className="text-[18px] font-extrabold text-gray-900">Customer Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[13px] font-bold text-gray-700 mb-1.5 block">Customer Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={customer.name} onChange={e => updateCustomer('name', e.target.value)} placeholder="Full name" className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-bold text-gray-700 mb-1.5 block">Company / Organization</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={customer.company} onChange={e => updateCustomer('company', e.target.value)} placeholder="Company name" className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-bold text-gray-700 mb-1.5 block">Email Address *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={customer.email} onChange={e => updateCustomer('email', e.target.value)} placeholder="client@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-bold text-gray-700 mb-1.5 block">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" value={customer.phone} onChange={e => updateCustomer('phone', e.target.value)} placeholder="+91 98765 43210" className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none transition-all" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[13px] font-bold text-gray-700 mb-1.5 block">Address</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-4 text-gray-400" />
                    <textarea value={customer.address} onChange={e => updateCustomer('address', e.target.value)} rows={2} placeholder="Street, city, state, pincode" className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none transition-all resize-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-bold text-gray-700 mb-1.5 block">GST Number</label>
                  <div className="relative">
                    <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={customer.gst} onChange={e => updateCustomer('gst', e.target.value)} placeholder="22AAAAA0000A1Z5" className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-bold text-gray-700 mb-1.5 block">Valid Till</label>
                  <input type="date" value={validTill} onChange={e => setValidTill(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#e8e2d8] text-[13px] focus:ring-2 focus:ring-brand-gold-500/20 focus:border-brand-gold-500 outline-none transition-all" />
                </div>
              </div>
              <div className="flex justify-end mt-8 pt-6 border-t border-[#e8e2d8]">
                <button onClick={() => setStep(2)} disabled={!canNextStep1()} className="flex items-center gap-2 px-6 py-3 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                  Next: Line Items
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Line Items */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center">
                  <FileText size={20} className="text-brand-gold-600" />
                </div>
                <h3 className="text-[18px] font-extrabold text-gray-900">Line Items</h3>
              </div>

              {/* Customer Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-[#e8e2d8] mb-6 flex flex-wrap gap-x-8 gap-y-1 text-[13px]">
                <span><span className="text-gray-500">Customer:</span> <strong className="text-gray-900">{customer.name}</strong></span>
                {customer.company && <span><span className="text-gray-500">Company:</span> <strong className="text-gray-900">{customer.company}</strong></span>}
                <span><span className="text-gray-500">Email:</span> <strong className="text-gray-900">{customer.email}</strong></span>
                <span><span className="text-gray-500">Quote No:</span> <strong className="text-gray-900">{quoteNo}</strong></span>
                <span><span className="text-gray-500">Date:</span> <strong className="text-gray-900">{today}</strong></span>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#e8e2d8]">
                      <th className="pb-3 w-8"></th>
                      <th className="pb-3 min-w-[180px]">Description</th>
                      <th className="pb-3 w-24">HSN/SAC</th>
                      <th className="pb-3 w-16 text-center">Qty</th>
                      <th className="pb-3 w-20">Unit</th>
                      <th className="pb-3 w-28 text-right">Rate (₹)</th>
                      <th className="pb-3 w-20 text-right">Disc %</th>
                      <th className="pb-3 w-28 text-right">Amount (₹)</th>
                      <th className="pb-3 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      const lineTotal = item.qty * item.price;
                      const lineDiscount = lineTotal * item.discount / 100;
                      const lineNet = lineTotal - lineDiscount;
                      return (
                        <tr key={item.id} className="border-b border-[#e8e2d8]/60 group">
                          <td className="py-2">
                            <span className="text-gray-300 text-[11px] font-mono">{item.id.toString().padStart(2, '0')}</span>
                          </td>
                          <td className="py-2 pr-2">
                            <input type="text" value={item.desc} onChange={e => updateItem(item.id, 'desc', e.target.value)} placeholder="Item description" className="w-full px-3 py-2 border border-transparent hover:border-[#e8e2d8] focus:border-brand-gold-500 rounded-lg text-[13px] outline-none transition-all bg-transparent focus:bg-white" />
                          </td>
                          <td className="py-2 pr-2">
                            <input type="text" value={item.hsn} onChange={e => updateItem(item.id, 'hsn', e.target.value)} placeholder="HSN" className="w-full px-2 py-2 border border-transparent hover:border-[#e8e2d8] focus:border-brand-gold-500 rounded-lg text-[13px] outline-none transition-all bg-transparent focus:bg-white text-center" />
                          </td>
                          <td className="py-2 pr-2">
                            <input type="number" value={item.qty} onChange={e => updateItem(item.id, 'qty', Math.max(1, parseInt(e.target.value) || 1))} min="1" className="w-full px-2 py-2 border border-transparent hover:border-[#e8e2d8] focus:border-brand-gold-500 rounded-lg text-[13px] outline-none transition-all bg-transparent focus:bg-white text-center" />
                          </td>
                          <td className="py-2 pr-2">
                            <input type="text" value={item.unit} onChange={e => updateItem(item.id, 'unit', e.target.value)} className="w-full px-2 py-2 border border-transparent hover:border-[#e8e2d8] focus:border-brand-gold-500 rounded-lg text-[13px] outline-none transition-all bg-transparent focus:bg-white text-center" />
                          </td>
                          <td className="py-2 pr-2">
                            <input type="number" value={item.price} onChange={e => updateItem(item.id, 'price', Math.max(0, parseInt(e.target.value) || 0))} min="0" className="w-full px-2 py-2 border border-transparent hover:border-[#e8e2d8] focus:border-brand-gold-500 rounded-lg text-[13px] outline-none transition-all bg-transparent focus:bg-white text-right" />
                          </td>
                          <td className="py-2 pr-2">
                            <input type="number" value={item.discount} onChange={e => updateItem(item.id, 'discount', Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))} min="0" max="100" className="w-full px-2 py-2 border border-transparent hover:border-[#e8e2d8] focus:border-brand-gold-500 rounded-lg text-[13px] outline-none transition-all bg-transparent focus:bg-white text-right" />
                          </td>
                          <td className="py-2 text-right font-semibold text-gray-900">
                            {formatINR(lineNet)}
                          </td>
                          <td className="py-2">
                            <button onClick={() => removeItem(item.id)} className="text-red-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                              <X size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <button onClick={addItem} className="flex items-center gap-2 text-[13px] font-bold text-brand-gold-600 hover:text-brand-gold-700 transition-colors mb-8">
                <Plus size={16} /> Add Line Item
              </button>

              {/* Summary */}
              <div className="flex justify-end">
                <div className="w-80 bg-gray-50 rounded-xl p-6 border border-[#e8e2d8]">
                  <div className="flex justify-between items-center mb-2.5 text-[13px]">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-900">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2.5 text-[13px]">
                    <span className="text-gray-500">Discount</span>
                    <span className="font-medium text-red-600">- {formatINR(totalDiscount)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2.5 text-[13px]">
                    <span className="text-gray-500">Taxable Amount</span>
                    <span className="font-medium text-gray-900">{formatINR(taxableAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 text-[13px]">
                    <span className="text-gray-500">GST (18%)</span>
                    <span className="font-medium text-gray-900">{formatINR(tax)}</span>
                  </div>
                  <div className="pt-4 border-t border-[#e8e2d8] flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-[15px]">Grand Total</span>
                    <span className="text-2xl font-black text-brand-gold-600">{formatINR(total)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between mt-8 pt-6 border-t border-[#e8e2d8]">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-3 text-gray-600 font-bold text-[13px] rounded-xl border border-[#e8e2d8] hover:bg-gray-50 transition-all">
                  Back: Customer
                </button>
                <div className="flex gap-3">
                  <button disabled={!canNextStep2()} className="flex items-center gap-2 px-5 py-3 text-gray-700 font-bold text-[13px] rounded-xl border border-[#e8e2d8] hover:bg-gray-50 transition-all disabled:opacity-40">
                    <Save size={16} /> Save Draft
                  </button>
                  <button disabled={!canNextStep2()} className="flex items-center gap-2 px-5 py-3 bg-white text-indigo-700 font-bold text-[13px] rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 transition-all disabled:opacity-40">
                    <Download size={16} /> PDF
                  </button>
                  <button onClick={() => setShowShare(true)} disabled={!canNextStep2()} className="flex items-center gap-2 px-5 py-3 text-white font-bold text-[13px] rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-all disabled:opacity-40">
                    <Share2 size={16} /> Share
                  </button>
                  <button disabled={!canNextStep2()} className="flex items-center gap-2 px-6 py-3 bg-brand-gold-600 text-white font-bold text-[13px] rounded-xl hover:bg-brand-gold-700 shadow-lg transition-all disabled:opacity-40">
                    <Send size={16} /> Send to Client
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ShareDialog
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        quotationText={`Quotation ${quoteNo} from QuoteFlow AI - ${customer.name} - Total: ${formatINR(total)}`}
      />
    </Layout>
  );
};

export default QuotationBuilder;
