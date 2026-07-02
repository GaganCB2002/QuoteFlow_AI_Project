import React from 'react';

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 z-0 bg-surface dark:bg-surface-dark overflow-hidden pointer-events-none">
      <div className="absolute inset-0 noise-overlay"></div>
      
      {/* Elegant Mesh Gradient Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-brand-gold-300/20 dark:bg-brand-gold-500/10 blur-[120px] animate-pulse-soft mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] rounded-full bg-primary-400/20 dark:bg-primary-600/10 blur-[150px] animate-pulse-soft mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-accent-400/10 dark:bg-accent-600/10 blur-[100px] animate-pulse-soft mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '2s' }} />
      
      {/* Soft gradient mask to blend into the rest of the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-surface dark:via-surface-dark/30 dark:to-surface-dark" />
    </div>
  );
};

export default Hero3DScene;
