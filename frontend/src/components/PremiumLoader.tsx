import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuoteFlowLogo from './QuoteFlowLogo';

const PremiumLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we've already shown the loader in this session
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Simulate initial heavy asset loading
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('hasLoaded', 'true');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface dark:bg-surface-dark"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <QuoteFlowLogo size={64} />
              
              {/* Spinning ring for loading indication */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute -inset-4 border-[1px] border-transparent border-t-brand-gold-500/50 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute -inset-2 border-[1px] border-transparent border-b-primary-500/50 rounded-full"
              />
            </div>
            
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="font-display font-extrabold text-3xl tracking-tight text-gray-900 dark:text-white"
              >
                QuoteFlow AI
              </motion.div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="absolute bottom-16 w-48 h-[2px] bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-brand-gold-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumLoader;
