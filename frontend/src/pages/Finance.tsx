import React from 'react';
import Layout from './Layout';

const Finance = () => {
  return (
    <Layout title="Finance" subtitle="Income, expenses, and GST reports">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Financial Dashboard</h3>
        <p className="text-gray-500">Track income, expenses, and generate GST reports.</p>
      </div>
    </Layout>
  );
};

export default Finance;
