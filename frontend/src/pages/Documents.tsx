import React from 'react';
import Layout from './Layout';

const Documents = () => {
  return (
    <Layout title="Documents" subtitle="All your business documents in one place">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Document Management</h3>
        <p className="text-gray-500">Access quotations, invoices, receipts, and uploads.</p>
      </div>
    </Layout>
  );
};

export default Documents;
