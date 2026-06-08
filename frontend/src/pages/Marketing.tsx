import React from 'react';
import Layout from './Layout';

const Marketing = () => {
  return (
    <Layout title="Marketing" subtitle="Campaign management and analytics">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Marketing Campaigns</h3>
        <p className="text-gray-500">Manage email and WhatsApp marketing campaigns.</p>
      </div>
    </Layout>
  );
};

export default Marketing;
