import React, { useState, useEffect } from 'react';
import { Shield, Check, ChevronDown, ChevronUp } from 'lucide-react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setVisible(true), 500);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    document.cookie = "cookieConsent=accepted; path=/; max-age=" + (60 * 60 * 24 * 365);
    document.cookie = "quoteflow_consent=true; path=/; max-age=" + (60 * 60 * 24 * 365);
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    document.cookie = "cookieConsent=declined; path=/; max-age=" + (60 * 60 * 24 * 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl mx-4 mb-6 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <Shield size={22} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-[17px] font-extrabold text-gray-900">Terms & Conditions</h3>
              <p className="text-[13px] text-gray-500 mt-0.5">
                We value your privacy. Please review how we use your data.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-3 text-[13px] text-gray-600 leading-relaxed max-h-[260px] overflow-y-auto border border-gray-100">
            <p className="font-bold text-gray-900 mb-2">By using QuoteFlow, you agree to the following:</p>

            <ul className="space-y-1.5 list-disc pl-4">
              <li><strong>Location Tracking:</strong> We collect your geographic location (city, country, coordinates) to provide localized pricing, regional compliance, and personalized service recommendations.</li>
              <li><strong>Device Information:</strong> Your browser type, operating system, device type, screen resolution, language preference, and timezone are collected for analytics and optimal platform performance.</li>
              <li><strong>IP Address:</strong> Your IP address is logged for security, fraud prevention, and geo-specific content delivery.</li>
              <li><strong>Usage Data:</strong> Pages visited, actions performed, features used, and time spent on each section are tracked to improve our services.</li>
              <li><strong>Cookies:</strong> We use cookies to maintain your session, store preferences, remember login state, and enable seamless navigation. Essential cookies cannot be disabled.</li>
              <li><strong>User Information:</strong> Name, email, phone number, company details, and project requirements are stored to generate quotations and communicate with you.</li>
              <li><strong>Local Storage:</strong> Data is stored in your browser's local storage for offline access and faster loading. This includes your session token, preferences, and cached data.</li>
            </ul>

            <p className="mt-3 text-[12px] text-gray-400">
              Your data is never sold to third parties. All stored locally or on secure servers. 
              You can request data deletion at any time. By clicking "Accept All", you consent to all data collection described above.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[12px] text-gray-400 hover:text-gray-600 font-medium flex items-center gap-1"
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {expanded ? 'Show less' : 'Full details'}
            </button>
            <div className="flex gap-2">
              <button
                onClick={decline}
                className="px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
              >
                Decline
              </button>
              <button
                onClick={acceptAll}
                className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[13px] rounded-xl transition-all shadow-sm"
              >
                <Check size={15} />
                Accept All
              </button>
            </div>
          </div>

          {expanded && (
            <div className="mt-3 pt-3 border-t border-gray-100 text-[12px] text-gray-400 leading-relaxed">
              <p className="font-semibold text-gray-500 mb-1">Data Collection Details:</p>
              <p>Cookies set: cookieConsent, quoteflow_consent, JSESSIONID, XSRF-TOKEN. Local storage keys: token, userId, userData, cookieConsent, cookieConsentDate, theme, sidebarCollapsed.</p>
              <p className="mt-1">All tracking is opt-in. You may revoke consent at any time by clearing browser data. Contact support for data deletion requests.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
