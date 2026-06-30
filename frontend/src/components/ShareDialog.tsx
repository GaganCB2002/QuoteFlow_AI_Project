import React from 'react';
import { Share2, MessageCircle, Mail, Link, X, Check } from 'lucide-react';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quotationUrl?: string;
  quotationText?: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ isOpen, onClose, quotationUrl = window.location.href, quotationText = 'Check out this quotation from QuoteFlow AI' }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const encodedText = encodeURIComponent(quotationText);
  const encodedUrl = encodeURIComponent(quotationUrl);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(quotationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = quotationUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl border border-[#e8e2d8] p-6 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-extrabold text-gray-900 flex items-center gap-2">
            <Share2 size={18} className="text-brand-gold-600" /> Share Quotation
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <a
            href={`https://wa.me/?text=${encodedText}%0A${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl border border-[#e8e2d8] hover:bg-green-50 hover:border-green-300 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <MessageCircle size={20} className="text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-[14px] font-bold text-gray-900">WhatsApp</p>
              <p className="text-[12px] text-gray-500">Share via WhatsApp Web</p>
            </div>
          </a>

          <a
            href={`mailto:?subject=${encodedText}&body=${encodedText}%0A%0A${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl border border-[#e8e2d8] hover:bg-blue-50 hover:border-blue-300 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Mail size={20} className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-[14px] font-bold text-gray-900">Email</p>
              <p className="text-[12px] text-gray-500">Share via email client</p>
            </div>
          </a>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl border border-[#e8e2d8] hover:bg-gray-50 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              {copied ? <Check size={20} className="text-emerald-600" /> : <Link size={20} className="text-gray-600" />}
            </div>
            <div className="text-left">
              <p className="text-[14px] font-bold text-gray-900">{copied ? 'Copied!' : 'Copy Link'}</p>
              <p className="text-[12px] text-gray-500">Copy quotation URL to clipboard</p>
            </div>
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-[#e8e2d8]">
          <p className="text-[11px] text-gray-400 text-center">
            {quotationUrl}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;
