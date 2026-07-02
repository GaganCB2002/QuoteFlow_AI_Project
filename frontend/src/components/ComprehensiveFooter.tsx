import React from 'react';
import { Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComprehensiveFooter = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 bg-surface dark:bg-[#0a0f1c] border-t border-border dark:border-border-dark pt-20 pb-8">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 sm:gap-10 mb-16">
          <div className="footer-brand pr-8">
            <Link to="/" className="flex items-center gap-3 text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-6">
              <div className="w-10 h-10 bg-brand-gold-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Layers size={22} />
              </div>
              QuoteFlow
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 font-medium">
              AI-powered quotation, billing, CRM, marketing, and project estimation platform for Indian SMBs. Built with Spring Boot 4.0.6, Java 21, and advanced generative AI.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">Product</h4>
            <ul className="space-y-4">
              {[
                { label: 'Features', href: '#features' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Tech Stack', href: '#tech' },
                { label: 'Pricing', href: '#pricing' },
              ].map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-gold-500 dark:hover:text-brand-gold-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {[
                { label: 'Test Access', href: '#test-credentials' },
                { label: 'Reviews', href: '#testimonials' },
                { label: 'Dashboard', href: '/dashboard', isRoute: true },
                { label: 'Privacy Policy', href: '/privacy', isRoute: true },
                { label: 'Terms of Service', href: '/terms', isRoute: true },
              ].map(l => (
                <li key={l.label}>
                  {l.isRoute ? (
                    <Link to={l.href} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-gold-500 dark:hover:text-brand-gold-400 transition-colors">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-gold-500 dark:hover:text-brand-gold-400 transition-colors">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">Support</h4>
            <ul className="space-y-4">
              {[
                { label: 'Help Center', href: '/' },
                { label: 'API Docs', href: '/' },
                { label: 'System Status', href: '/' },
                { label: 'support@quoteflow.ai', href: 'mailto:support@quoteflow.ai' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-gold-500 dark:hover:text-brand-gold-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-400 font-medium">&copy; 2026 QuoteFlow AI. All rights reserved. Made in India.</span>
          <span className="text-sm text-gray-400 font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            v2.0 &middot; All Systems Operational
          </span>
        </div>
      </div>
    </footer>
  );
};

export default ComprehensiveFooter;
