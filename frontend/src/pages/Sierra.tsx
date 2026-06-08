import React from 'react';
import Layout from './Layout';

const Sierra = () => {
  return (
    <Layout title="Sierra" subtitle="Customer relationship management">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Sierra CRM</h3>
        <p className="text-gray-500">Manage leads, deals, and customer relationships.</p>
      </div>
    </Layout>
  );
};

export default Sierra;
