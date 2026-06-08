import React, { useState } from 'react';
import { FileText, Plus, Trash2, Send, Save, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuotationBuilder = () => {
  const [items, setItems] = useState([
    { id: 1, desc: 'Web Development', qty: 1, price: 45000 },
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const addItem = () => {
    setItems([...items, { id: Date.now(), desc: '', qty: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <main className="flex-1 overflow-auto p-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-gray-400 hover:text-gray-900 transition-colors">
              &larr; Back
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">New Quotation</h2>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <Save size={18} className="mr-2" /> Save Draft
            </button>
            <button className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors shadow-sm font-medium">
              <Download size={18} className="mr-2" /> PDF
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-xl shadow-lg hover:bg-gray-800 transition-colors">
              <Send size={18} className="mr-2" /> Send to Client
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
                <span className="text-white font-bold text-xl">QF</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">QuoteFlow AI</h3>
              <p className="text-gray-500 text-sm">contact@quoteflow.ai</p>
              <p className="text-gray-500 text-sm">+91 9876543210</p>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-black text-gray-100 tracking-tighter uppercase">Quotation</h1>
              <div className="mt-4 flex flex-col items-end space-y-2">
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-24 text-right mr-4">Quote No:</span>
                  <span className="font-medium text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">QT-171810500</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-24 text-right mr-4">Date:</span>
                  <span className="font-medium text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">12 Jun 2024</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 mb-12">
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4">Billed To</h4>
              <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium">
                <option>Acme Corp</option>
                <option>TechFlow Inc</option>
              </select>
              <div className="mt-4 space-y-1 text-sm text-gray-500">
                <p>123 Business Avenue, Tech Park</p>
                <p>Mumbai, 400001</p>
                <p>GST: 22AAAAA0000A1Z5</p>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="py-2 space-y-3">
              {items.map((item, i) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-center group">
                  <div className="col-span-6">
                    <input type="text" value={item.desc} placeholder="Item description" className="w-full px-3 py-2 border border-transparent hover:border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg transition-all" />
                  </div>
                  <div className="col-span-2">
                    <input type="number" value={item.qty} className="w-full px-3 py-2 border border-transparent hover:border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg transition-all text-center" />
                  </div>
                  <div className="col-span-2">
                    <input type="number" value={item.price} className="w-full px-3 py-2 border border-transparent hover:border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg transition-all text-right" />
                  </div>
                  <div className="col-span-2 flex items-center justify-end space-x-2">
                    <span className="font-medium text-gray-900 w-full text-right">₹{(item.qty * item.price).toLocaleString()}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={addItem} className="mt-4 flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              <Plus size={16} className="mr-1" /> Add Item
            </button>
          </div>

          <div className="flex justify-end">
            <div className="w-72 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-3 text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-500">GST (18%)</span>
                <span className="font-medium text-gray-900">₹{tax.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-indigo-600">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default QuotationBuilder;
