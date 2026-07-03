import React, { useEffect, useState } from 'react';
import { Building2, Save, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import Layout from './Layout';
import { apiRequest } from '../utils/api';
import { getErrorMessage } from '../utils/errors';

const CompanyProfile = () => {
  const [form, setForm] = useState({
    companyName: '',
    gstNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    bankName: '',
    bankAccount: '',
    ifscCode: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Company Profile | QuoteFlow AI';
    loadCompany();
  }, []);

  const loadCompany = async () => {
    setLoading(true);
    try {
      const companies = await apiRequest<Array<{ id: string; companyName: string; gstNumber: string; address: string; city: string; state: string; pincode: string; phone: string; email: string; bankName: string; bankAccount: string; ifscCode: string }>>('/api/admin/companies');
      if (companies.length > 0) {
        const c = companies[0];
        setForm({
          companyName: c.companyName || '',
          gstNumber: c.gstNumber || '',
          address: c.address || '',
          city: c.city || '',
          state: c.state || '',
          pincode: c.pincode || '',
          phone: c.phone || '',
          email: c.email || '',
          bankName: c.bankName || '',
          bankAccount: c.bankAccount || '',
          ifscCode: c.ifscCode || '',
        });
      }
    } catch {
      setError('Could not load company data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await apiRequest('/api/admin/companies', {
        method: 'PUT',
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="Company Profile" subtitle="Manage your business details">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="text-white w-6 h-6" />
                </div>
                <Building2 size={40} className="text-gray-300" />
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-2.5 bg-gray-900 text-white rounded-xl shadow-lg hover:bg-gray-800 transition-colors disabled:opacity-40"
            >
              {saving ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Save size={18} className="mr-2" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">{error}</div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-medium flex items-center gap-2">
              <CheckCircle2 size={16} /> Company profile saved successfully
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Profile</h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-gray-400" />
            </div>
          ) : (
            <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input type="text" value={form.companyName} onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g. Acme Corp" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input type="text" value={form.gstNumber} onChange={e => setForm(p => ({ ...p, gstNumber: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="22AAAAA0000A1Z5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                <textarea rows={3} value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="Enter complete billing address..." />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input type="text" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input type="text" value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="Maharashtra" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input type="text" value={form.pincode} onChange={e => setForm(p => ({ ...p, pincode: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="400001" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="text" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="contact@company.com" />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Details</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                    <input type="text" value={form.bankName} onChange={e => setForm(p => ({ ...p, bankName: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g. HDFC Bank" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                    <input type="text" value={form.bankAccount} onChange={e => setForm(p => ({ ...p, bankAccount: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="000000000000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                    <input type="text" value={form.ifscCode} onChange={e => setForm(p => ({ ...p, ifscCode: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="HDFC0000001" />
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CompanyProfile;
