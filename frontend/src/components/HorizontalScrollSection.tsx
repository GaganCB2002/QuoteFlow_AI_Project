import React from 'react';
import { motion } from 'framer-motion';
import { FileText, BrainCircuit, IndianRupee, FileDown, MessageSquare, CreditCard, PenTool, Globe, BarChart3, Coins, Receipt, Sparkles, ShieldCheck, Cloud, Bell, Eye, History, FileOutput, Languages, Code2 } from 'lucide-react';

const steps = [
  { title: "Natural Language Input", desc: "Just type your requirements in plain English.", icon: <FileText size={32} /> },
  { title: "AI Context Engine", desc: "Understands project scope and hidden requirements.", icon: <BrainCircuit size={32} /> },
  { title: "Dynamic Pricing", desc: "Automatically calculates market-adjusted costs.", icon: <IndianRupee size={32} /> },
  { title: "Instant PDF Generation", desc: "Creates beautiful, branded PDF documents instantly.", icon: <FileDown size={32} /> },
  { title: "WhatsApp Integration", desc: "Send quotes directly to clients via WhatsApp.", icon: <MessageSquare size={32} /> },
  { title: "One-Click Payments", desc: "Integrated payment links to collect deposits faster.", icon: <CreditCard size={32} /> },
  { title: "E-Signatures", desc: "Collect legally binding digital signatures.", icon: <PenTool size={32} /> },
  { title: "Client Portal", desc: "A dedicated dashboard for your clients to view quotes.", icon: <Globe size={32} /> },
  { title: "Revenue Analytics", desc: "Track conversions, revenue, and pending deals.", icon: <BarChart3 size={32} /> },
  { title: "Multi-Currency", desc: "Quote in USD, EUR, INR, and 50+ other currencies.", icon: <Coins size={32} /> },
  { title: "Tax Automation", desc: "Calculates GST, VAT, and local taxes automatically.", icon: <Receipt size={32} /> },
  { title: "Custom Branding", desc: "Add your logo, brand colors, and custom fonts.", icon: <Sparkles size={32} /> },
  { title: "Role-Based Access", desc: "Separate dashboards for admins, agents, and clients.", icon: <ShieldCheck size={32} /> },
  { title: "Cloud Sync", desc: "Your data is instantly synced across all devices.", icon: <Cloud size={32} /> },
  { title: "Follow-up Alerts", desc: "Automated reminders for pending quotations.", icon: <Bell size={32} /> },
  { title: "Read Receipts", desc: "Know exactly when a client opens your quote.", icon: <Eye size={32} /> },
  { title: "Revision History", desc: "Track all changes and versions of a quote.", icon: <History size={32} /> },
  { title: "Accounting Export", desc: "Export data to QuickBooks, Xero, or Tally.", icon: <FileOutput size={32} /> },
  { title: "Multi-Language", desc: "Generate quotes in over 30 different languages.", icon: <Languages size={32} /> },
  { title: "Developer API", desc: "Connect QuoteFlow directly to your own software.", icon: <Code2 size={32} /> }
];

// Helper to assign random exciting entry directions
const getAnimationDirection = (index: number) => {
  const directions = [
    { x: 100, y: 100 },   // Bottom Right
    { x: -100, y: -100 }, // Top Left
    { x: 0, y: 150 },     // Straight Bottom
    { x: 150, y: 0 },     // Right
    { x: -150, y: 0 },    // Left
    { x: -100, y: 100 },  // Bottom Left
  ];
  return directions[index % directions.length];
};

const HorizontalScrollSection = () => {
  return (
    <section className="py-24 relative bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark overflow-hidden">
      {/* Animated floating background elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-gold-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto px-5 relative z-10">
        
        <div className="text-center mb-16 relative max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-[clamp(32px,4vw,56px)] font-display font-black leading-tight tracking-tight mb-4"
          >
            How QuoteFlow Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 font-medium"
          >
            20 powerful features designed to completely automate your sales cycle from start to finish.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 perspective-[1000px]">
          {steps.map((step, idx) => {
            const initialPos = getAnimationDirection(idx);
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: initialPos.x, y: initialPos.y, rotateX: 45, rotateY: idx % 2 === 0 ? 45 : -45, scale: 0.5 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -10,
                  rotateZ: idx % 2 === 0 ? 2 : -2,
                  boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 12, 
                  delay: (idx % 5) * 0.1 
                }}
                className="p-6 rounded-[24px] glass dark:bg-black/60 border border-gray-200/50 dark:border-gray-800/50 hover:border-brand-gold-500/50 hover:bg-brand-gold-50/80 dark:hover:bg-brand-gold-900/20 transition-colors duration-300 group cursor-pointer backdrop-blur-xl"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="mb-6 origin-center inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gold-50 dark:bg-brand-gold-900/20 text-brand-gold-600 dark:text-brand-gold-400"
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white leading-tight group-hover:text-brand-gold-600 dark:group-hover:text-brand-gold-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
