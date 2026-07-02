import React from 'react';
import { motion } from 'framer-motion';

const detailedFeatures = [
  {
    tag: 'AI-Powered', title: 'AI Quotation Generator', desc: 'Describe your service in plain English. AI generates a complete professional quotation with itemized pricing, scope, deliverables, and timeline. Supports websites, mobile apps, SEO, marketing, AMC, and more.',
    benefits: ['30-second generation from natural language', '10+ project types with pre-built templates', 'Auto-calculated pricing with profit analysis', 'Review, edit, and regenerate as needed'],
    stats: [
      { value: '30s', label: 'Generation time' },
      { value: '10+', label: 'Project types' },
      { value: '94%', label: 'AI accuracy' },
      { value: '35+', label: 'Feature modules' },
    ],
    reverse: false,
  },
  {
    tag: 'Finance', title: 'GST Billing & Invoicing', desc: 'Generate GST-compliant tax invoices, proforma invoices, and payment receipts. Auto-calculated CGST, SGST, and IGST. Track paid, due, and overdue invoices. Send via WhatsApp with one click.',
    benefits: ['Auto GST (CGST + SGST / IGST)', 'Tax invoices, proforma, receipts', 'Invoice status tracking', 'WhatsApp delivery in one click'],
    stats: [
      { value: '100%', label: 'GST compliant' },
      { value: '1-clk', label: 'WhatsApp send' },
      { value: '3', label: 'Invoice types' },
      { value: 'Auto', label: 'Tax calculation' },
    ],
    reverse: true,
  },
  {
    tag: 'Growth', title: 'CRM & Marketing Automation', desc: 'Track leads through a kanban pipeline. Log customer interactions. AI auto-follow-ups. Run WhatsApp campaigns, email newsletters, and festival wishes. All from one place.',
    benefits: ['Kanban pipeline with lead management', 'Customer credit scoring (Green/Yellow/Red)', 'WhatsApp, email, and SMS campaigns', 'Automated festival and birthday wishes'],
    stats: [
      { value: 'Kanban', label: 'Pipeline view' },
      { value: '3', label: 'Campaign channels' },
      { value: 'Auto', label: 'Follow-ups' },
      { value: 'Smart', label: 'Scoring' },
    ],
    reverse: false,
  },
  {
    tag: 'Intelligence', title: 'Analytics & Project Estimation', desc: 'Real-time P&L, GST reconciliation, revenue reports, cash flow. The estimation engine covers 10 project types with 35+ features, pricing tiers, and underquoting detection.',
    benefits: ['P&L, revenue, and cash flow reports', 'Cost estimation with AI optimization', 'Profit margin analysis (20%/30%/50% tiers)', 'Underquoting detection with alerts'],
    stats: [
      { value: 'Live', label: 'P&L tracking' },
      { value: '35+', label: 'Costed features' },
      { value: '3', label: 'Profit tiers' },
      { value: 'Auto', label: 'Alerts' },
    ],
    reverse: true,
  },
];

const DetailedFeaturesSection = () => {
  return (
    <section className="py-16 relative z-10 bg-surface dark:bg-surface-dark overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-6 text-primary-500 dark:text-primary-400"
          >
            What You Get
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(32px,4vw,56px)] font-display font-extrabold leading-tight tracking-tight mb-6"
          >
            Everything your business needs<br />
            <span className="text-gray-400 dark:text-gray-500">in one dashboard.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium"
          >
            12 modules working together. No integrations to set up. No data to move between tools.
          </motion.p>
        </div>

        <div className="space-y-32">
          {detailedFeatures.map((item, idx) => (
            <div key={idx} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
              <motion.div 
                initial={{ opacity: 0, x: item.reverse ? 150 : -150, rotateY: item.reverse ? -20 : 20, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                className="flex-1 max-w-xl perspective-[1000px]"
              >
                <span className="inline-block px-3 py-1 bg-brand-gold-50 dark:bg-brand-gold-900/20 rounded-lg text-xs font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-400 mb-6">
                  {item.tag}
                </span>
                <h3 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                  {item.desc}
                </p>
                <ul className="space-y-4">
                  {item.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-4 text-base text-gray-700 dark:text-gray-300 font-medium">
                      <span className="w-2 h-2 rounded-full bg-brand-gold-500 shrink-0 mt-2" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotateX: 45, rotateY: item.reverse ? -45 : 45, y: 150 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05, rotateZ: item.reverse ? 2 : -2, y: -15, rotateY: item.reverse ? -10 : 10 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex-1 w-full max-w-lg perspective-[1000px] cursor-pointer"
              >
                <div className="glass dark:bg-[#111]/80 rounded-[40px] p-10 border border-gray-200/50 dark:border-gray-800/50 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500/10 rounded-full blur-[80px]" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />
                  
                  <div className="grid grid-cols-2 gap-6 relative z-10">
                    {item.stats.map((s, i) => (
                      <div key={i} className="p-6 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/10 text-center shadow-sm">
                        <div className="text-3xl sm:text-4xl font-display font-black text-brand-gold-600 dark:text-brand-gold-400 mb-2">
                          {s.value}
                        </div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedFeaturesSection;
