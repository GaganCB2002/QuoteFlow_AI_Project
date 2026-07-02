import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LayoutDashboard, Users, FileText, Settings, Bell, Search, TrendingUp, IndianRupee, ArrowUpRight, ArrowDownRight, CreditCard, Activity } from 'lucide-react';

const DashboardZoomSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-surface dark:bg-surface-dark">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-5 perspective-[1000px] overflow-hidden pt-20">
        
        <motion.div style={{ opacity: textOpacity }} className="text-center mb-10 relative z-10 max-w-3xl">
          <h2 className="text-[clamp(32px,4vw,56px)] font-display font-black leading-tight tracking-tight mb-4">
            See the big picture.
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            A beautiful, intuitive dashboard designed for absolute clarity.
          </p>
        </motion.div>

        <motion.div
          style={{ 
            scale, 
            rotateX, 
            y,
            transformStyle: "preserve-3d" 
          }}
          className="w-full max-w-[1200px] h-[60vh] md:h-[75vh] rounded-2xl md:rounded-[32px] overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] border border-gray-200/50 dark:border-gray-700/50"
        >
          {/* Authentic High-Fidelity UI Mockup */}
          <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#09090b] flex flex-col font-sans">
            
            {/* Window Controls & Top Navbar */}
            <div className="h-14 border-b border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#09090b] flex items-center px-6 justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 max-w-md mx-6">
                <div className="h-8 bg-gray-100 dark:bg-[#18181b] rounded-md flex items-center px-3 border border-gray-200 dark:border-[#27272a]">
                  <Search size={14} className="text-gray-400" />
                  <span className="text-[12px] text-gray-400 ml-2">Search quotations, clients... (⌘K)</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Bell size={18} className="text-gray-500 dark:text-gray-400" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-gold-500 to-brand-gold-300 border-2 border-white dark:border-[#18181b]" />
              </div>
            </div>

            {/* Main Application Body */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#09090b] p-4 hidden md:flex flex-col gap-2 shrink-0">
                <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-100 dark:bg-[#18181b] rounded-lg text-sm font-semibold text-gray-900 dark:text-white">
                  <LayoutDashboard size={18} className="text-brand-gold-500" /> Dashboard
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#18181b] rounded-lg">
                  <FileText size={18} /> Quotations
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#18181b] rounded-lg">
                  <Users size={18} /> Clients
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#18181b] rounded-lg">
                  <CreditCard size={18} /> Invoices
                </div>
                <div className="mt-auto flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#18181b] rounded-lg">
                  <Settings size={18} /> Settings
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="flex-1 p-6 md:p-8 overflow-hidden flex flex-col gap-6">
                
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Here's your business performance for this month.</p>
                  </div>
                  <div className="h-9 px-4 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-lg flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                    Last 30 Days
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                  
                  {/* Stat Card 1 */}
                  <div className="bg-white dark:bg-[#09090b] rounded-xl border border-gray-200 dark:border-[#27272a] p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</div>
                      <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                        <IndianRupee size={16} className="text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">₹14,52,400</div>
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        <ArrowUpRight size={16} /> 12.5%
                      </div>
                    </div>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="bg-white dark:bg-[#09090b] rounded-xl border border-gray-200 dark:border-[#27272a] p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Quotes</div>
                      <div className="w-8 h-8 rounded-full bg-brand-gold-50 dark:bg-brand-gold-500/10 flex items-center justify-center">
                        <FileText size={16} className="text-brand-gold-600 dark:text-brand-gold-400" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">142</div>
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        <ArrowUpRight size={16} /> 4.2%
                      </div>
                    </div>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="bg-white dark:bg-[#09090b] rounded-xl border border-gray-200 dark:border-[#27272a] p-5 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</div>
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                        <Activity size={16} className="text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">68.4%</div>
                      <div className="flex items-center text-red-500 dark:text-red-400 text-sm font-medium">
                        <ArrowDownRight size={16} /> 2.1%
                      </div>
                    </div>
                  </div>

                </div>

                {/* Main Graph Area */}
                <div className="flex-1 bg-white dark:bg-[#09090b] rounded-xl border border-gray-200 dark:border-[#27272a] shadow-sm p-6 flex flex-col">
                  <div className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <TrendingUp size={16} className="text-brand-gold-500" /> Revenue Growth
                  </div>
                  <div className="flex-1 w-full flex items-end gap-2 sm:gap-4 px-2">
                    {/* CSS Bar Chart */}
                    {[40, 65, 45, 80, 55, 90, 75, 100, 60, 85, 70, 95].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2 group">
                        <div 
                          className="w-full bg-gray-100 dark:bg-[#18181b] hover:bg-brand-gold-100 dark:hover:bg-brand-gold-900/30 rounded-t-sm relative transition-colors"
                          style={{ height: '100%' }}
                        >
                          <div 
                            className="absolute bottom-0 left-0 w-full bg-brand-gold-500 rounded-t-sm transition-all duration-1000"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Glass reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 dark:from-white/0 dark:via-white/5 dark:to-white/0 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardZoomSection;
