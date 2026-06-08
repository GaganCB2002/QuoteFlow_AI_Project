import React from 'react';
import Layout from './Layout';

const Admin = () => {
  return (
    <Layout title="Admin" subtitle="User management and system settings">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Admin Panel</h3>
        <p className="text-gray-500">Manage users, permissions, and view audit logs.</p>
      </div>
    </Layout>
  );
};

export default Admin;
