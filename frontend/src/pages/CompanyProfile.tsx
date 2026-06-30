import React, { useEffect } from 'react';
import { Building2, Save, Upload } from 'lucide-react';
import Layout from './Layout';

const CompanyProfile = () => {
  useEffect(() => {
    document.title = 'Company Profile | QuoteFlow AI';
  }, []);

  return (
    <Layout title="Company Profile" subtitle="Manage your business details">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
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
              <button className="flex items-center px-6 py-2.5 bg-gray-900 text-white rounded-xl shadow-lg hover:bg-gray-800 transition-colors">
                <Save size={18} className="mr-2" />
                Save Changes
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Profile</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g. Acme Corp" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="22AAAAA0000A1Z5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                <textarea rows={4} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="Enter complete billing address..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g. HDFC Bank" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="000000000000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="HDFC0001234" />
                </div>
              </div>
            </form>
          </div>
        </div>
    </Layout>
  );
};

export default CompanyProfile;
