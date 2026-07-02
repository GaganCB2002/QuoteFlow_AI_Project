import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 relative z-10 bg-surface dark:bg-surface-dark overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 relative">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-brand-gold-500 rounded-[40px] py-20 px-8 sm:px-12 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-[clamp(32px,5vw,56px)] font-display font-black text-white leading-tight tracking-tight mb-6">
              Replace 5 tools with one platform.
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium mb-10">
              Used by agencies, freelancers, and enterprises across India. Set up your account in under 2 minutes — no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MagneticButton 
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white text-black hover:bg-gray-50 rounded-full font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Start Free — No Card Needed <ArrowRight size={20} />
              </MagneticButton>
              <MagneticButton 
                className="px-8 py-4 bg-black/10 text-white backdrop-blur-sm border border-white/20 hover:bg-black/20 rounded-full font-bold text-lg transition-all w-full sm:w-auto"
              >
                Book a Demo
              </MagneticButton>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
