import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers] = useState([
    { id: 1, name: 'Acme Corp', contact: 'John Doe', email: 'john@acme.com', phone: '+91 9876543210', status: 'Active' },
    { id: 2, name: 'TechFlow Inc', contact: 'Sarah Smith', email: 'sarah@techflow.io', phone: '+91 9876543211', status: 'Active' },
    { id: 3, name: 'Global Retail', contact: 'Mike Johnson', email: 'mike@global.com', phone: '+91 9876543212', status: 'Inactive' },
  ]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <main className="flex-1 overflow-auto p-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Link to="/dashboard" className="text-gray-400 hover:text-gray-900 transition-colors">
                &larr; Back to Dashboard
              </Link>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Customers</h2>
            <p className="text-gray-500 mt-1">Manage your clients and their details.</p>
          </div>
          <button className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
            <Plus size={18} className="mr-2" />
            Add Customer
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-shadow text-sm"
              />
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">Filter</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">Export</button>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Company</th>
                <th className="p-4">Contact Person</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{c.contact}</td>
                  <td className="p-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="w-3.5 h-3.5 mr-2 text-gray-400" /> {c.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="w-3.5 h-3.5 mr-2 text-gray-400" /> {c.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CustomerList;
