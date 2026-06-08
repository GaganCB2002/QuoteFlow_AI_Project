import React from 'react';
import Layout from './Layout';

const Products = () => {
  return (
    <Layout title="Products & Services" subtitle="Manage your product and service catalog">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Product Catalog</h3>
        <p className="text-gray-500">Manage your products and services.</p>
      </div>
    </Layout>
  );
};

export default Products;
