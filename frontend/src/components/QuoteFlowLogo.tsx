import React from 'react';

interface QuoteFlowLogoProps {
  size?: number;
  className?: string;
}

const QuoteFlowLogo: React.FC<QuoteFlowLogoProps> = ({ size = 32, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <linearGradient id="qf-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="qf-grad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {/* Hexagonal shape */}
      <path
        d="M50 5 L88 27.5 L88 72.5 L50 95 L12 72.5 L12 27.5 Z"
        fill="none"
        stroke="url(#qf-grad1)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Inner Q letterform */}
      <circle cx="50" cy="46" r="20" fill="none" stroke="url(#qf-grad2)" strokeWidth="5" />
      <line x1="58" y1="56" x2="72" y2="72" stroke="url(#qf-grad2)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

export default QuoteFlowLogo;
