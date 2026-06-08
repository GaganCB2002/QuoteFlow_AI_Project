import React from 'react';
import Layout from './Layout';

const Visitors = () => {
  return (
    <Layout title="Website Visitors" subtitle="Track visitors and capture leads">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Visitor Analytics</h3>
        <p className="text-gray-500">Monitor website visitors and captured leads.</p>
      </div>
    </Layout>
  );
};

export default Visitors;
