import React from 'react';
import Layout from './Layout';

const Notifications = () => {
  return (
    <Layout title="Notifications" subtitle="Stay updated with your business activity">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <p className="text-gray-500">View all your notifications and alerts.</p>
      </div>
    </Layout>
  );
};

export default Notifications;
