import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark pt-24 pb-12 px-5">
      <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-[40px]">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-gold-500 font-bold mb-8 hover:opacity-80 transition-opacity">
          &larr; Back to Home
        </Link>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
            <ShieldAlert size={24} />
          </div>
          <h1 className="text-3xl font-display font-extrabold text-gray-900 dark:text-white">Terms of Service</h1>
        </div>
        
        <div className="prose prose-lg dark:prose-invert prose-indigo max-w-none">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using QuoteFlow, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h3>2. User Accounts</h3>
          <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
          
          <h3>3. Acceptable Use</h3>
          <p>You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of QuoteFlow.</p>
          
          <h3>4. Modifications</h3>
          <p>QuoteFlow reserves the right to revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
