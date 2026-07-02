import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark pt-24 pb-12 px-5">
      <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-[40px]">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-gold-500 font-bold mb-8 hover:opacity-80 transition-opacity">
          &larr; Back to Home
        </Link>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <Shield size={24} />
          </div>
          <h1 className="text-3xl font-display font-extrabold text-gray-900 dark:text-white">Privacy Policy</h1>
        </div>
        
        <div className="prose prose-lg dark:prose-invert prose-indigo max-w-none">
          <h3>1. Data Collection</h3>
          <p>We collect information you provide directly to us when you create an account, subscribe to our newsletter, or contact us for support.</p>
          
          <h3>2. How We Use Your Information</h3>
          <p>We use the information we collect to operate, maintain, and improve our services, as well as to communicate with you about updates and offers.</p>
          
          <h3>3. Data Sharing</h3>
          <p>We do not sell your personal data. We may share your data with trusted third-party service providers who assist us in operating our platform.</p>
          
          <h3>4. Security</h3>
          <p>We implement strict security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
