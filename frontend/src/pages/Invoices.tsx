import React from 'react';
import Layout from './Layout';

const Invoices = () => {
  return (
    <Layout title="Invoices" subtitle="Manage GST, tax, and proforma invoices">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Invoices</h3>
        <p className="text-gray-500">Create and manage all your invoices.</p>
      </div>
    </Layout>
  );
};

export default Invoices;
