import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Zap, Shield, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

const FeatureBentoGrid = () => {
  return (
    <section className="py-24 relative z-10 overflow-hidden bg-surface dark:bg-surface-dark" id="features">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-6"
          >
            <Sparkles size={16} className="text-brand-gold-500" />
            <span className="text-gradient">Everything Included</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(32px,4vw,48px)] font-display font-extrabold leading-tight tracking-tight mb-6"
          >
            AI Quotations · GST Invoicing · CRM · Marketing · Finance<br/>
             <span className="text-gray-400 dark:text-gray-500">Five tools. One platform. Zero switching.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[650px]">
          
          {/* Large Featured Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-2 md:row-span-2 glass dark:bg-[#111]/80 rounded-[32px] p-10 relative overflow-hidden group cursor-pointer"
            data-cursor="View Feature"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-brand-gold-500/30 transition-colors duration-700" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-6">
                  <Zap size={24} className="text-brand-gold-500" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900 dark:text-white">AI Quotations with GST Compliance</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md text-lg leading-relaxed">
                  Describe your project in plain English and our AI generates a professional quotation with line items, HSN codes, GST calculations, and market-aligned pricing. Supports tax invoices, proforma invoices, and payment receipts with automatic GSTIN validation.
                </p>
              </div>
              
              {/* Realistic Authentic UI Mockup instead of AI Generation / Generic Gradient */}
              <div className="mt-8 w-full flex-1 bg-white dark:bg-[#0a0a0a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden relative shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col">
                <div className="h-10 bg-gray-50 dark:bg-[#111] border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <div className="ml-4 h-5 w-48 bg-white dark:bg-gray-800 rounded text-[10px] text-gray-400 flex items-center px-2 font-mono border border-gray-200 dark:border-gray-700 shadow-sm">
                    https://quoteflow.ai/invoice/INV-2024-089
                  </div>
                </div>
                <div className="p-6 flex-1 bg-[#fafafa] dark:bg-[#050505] flex gap-6">
                   <div className="flex-1 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#111] p-4 flex flex-col gap-3">
                     <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                       <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                       <div className="w-16 h-4 bg-brand-gold-500/20 rounded text-[10px] text-brand-gold-600 font-bold flex items-center justify-center">PAID</div>
                     </div>
                     <div className="flex justify-between items-center mt-2">
                       <div className="w-32 h-3 bg-gray-100 dark:bg-gray-800 rounded" />
                       <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
                     </div>
                     <div className="flex justify-between items-center">
                       <div className="w-40 h-3 bg-gray-100 dark:bg-gray-800 rounded" />
                       <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
                     </div>
                     <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                       <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded font-bold" />
                       <div className="w-24 h-6 bg-brand-gold-500 rounded flex items-center justify-center text-[10px] text-white font-bold">Download PDF</div>
                     </div>
                   </div>
                   <div className="w-1/3 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-[#111] p-4 hidden sm:flex flex-col gap-3">
                      <div className="w-full h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-900/50 flex flex-col items-center justify-center gap-2">
                         <CheckCircle2 className="text-indigo-500" size={24} />
                         <div className="w-20 h-3 bg-indigo-200 dark:bg-indigo-800 rounded" />
                      </div>
                      <div className="w-full h-8 mt-auto bg-gray-100 dark:bg-gray-800 rounded flex items-center px-3 justify-between">
                        <div className="w-12 h-2 bg-gray-300 dark:bg-gray-600 rounded" />
                        <ChevronRight size={12} className="text-gray-400" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="glass dark:bg-[#111]/80 rounded-[32px] p-8 relative overflow-hidden cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-5 border border-gray-100 dark:border-gray-700">
              <BarChart3 size={20} className="text-indigo-500" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2 text-gray-900 dark:text-white">CRM with Pipeline Tracking</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Kanban-style lead management from New to Won. Track every deal, schedule follow-ups, and never lose a prospect again with automated reminders.</p>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="glass dark:bg-[#111]/80 rounded-[32px] p-8 relative overflow-hidden cursor-pointer"
          >
             <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-5 border border-gray-100 dark:border-gray-700">
              <Shield size={20} className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2 text-gray-900 dark:text-white">Marketing & Finance Suite</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">WhatsApp, Email, and SMS campaign automation with festival triggers. Real-time P&L dashboard with expense tracking and transaction management.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeatureBentoGrid;
