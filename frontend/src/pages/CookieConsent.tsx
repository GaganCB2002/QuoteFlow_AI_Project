import React, { useState, useEffect } from 'react';
import { Shield, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { storage } from '../utils/storage';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = storage.getCookieConsent();
    if (!consent) {
      setTimeout(() => setVisible(true), 500);
    }
  }, []);

  const acceptAll = () => {
    storage.setCookieConsent('accepted');
    localStorage.setItem('qf_consent_date', new Date().toISOString());
    document.cookie = "cookieConsent=accepted; path=/; max-age=" + (60 * 60 * 24 * 365);
    document.cookie = "quoteflow_consent=true; path=/; max-age=" + (60 * 60 * 24 * 365);
    setVisible(false);
  };

  const decline = () => {
    storage.setCookieConsent('declined');
    localStorage.setItem('qf_consent_date', new Date().toISOString());
    document.cookie = "cookieConsent=declined; path=/; max-age=" + (60 * 60 * 24 * 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] flex pointer-events-none">
      <div className="pointer-events-auto w-[340px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-brand-gold-50 flex items-center justify-center shrink-0">
              <Shield size={16} className="text-brand-gold-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Privacy & Cookies</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                We use cookies and collect limited usage data to improve your experience.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
            <button
              onClick={decline}
              className="flex-1 py-1.5 px-3 text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
            >
              Decline
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 py-1.5 px-3 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Check size={14} />
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
