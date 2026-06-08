import React from 'react';
import Layout from './Layout';

const Estimation = () => {
  return (
    <Layout title="Estimation" subtitle="AI-powered quotation estimation">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">AI Estimation Engine</h3>
        <p className="text-gray-500">Create professional estimates with AI assistance.</p>
      </div>
    </Layout>
  );
};

export default Estimation;
