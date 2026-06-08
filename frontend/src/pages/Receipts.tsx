import React from 'react';
import Layout from './Layout';

const Receipts = () => {
  return (
    <Layout title="Receipts" subtitle="Track all payment receipts">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Receipts</h3>
        <p className="text-gray-500">View and manage payment receipts.</p>
      </div>
    </Layout>
  );
};

export default Receipts;
