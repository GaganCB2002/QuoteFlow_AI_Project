import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Rajesh Mehta', role: 'Owner, Mehta Construction', text: 'We send 30+ quotations a week for renovation projects. QuoteFlow cut our turnaround from half a day to 10 minutes. The GST invoices are spot-on.', img: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Ananya Sharma', role: 'Founder, PixelCraft Studio', text: 'The AI quotation builder understands exactly what a web project needs — hosting, domains, SSL, even payment gateway integration. It\'s like having an experienced project manager.', img: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Vikram Patel', role: 'Director, Patel Enterprises', text: 'WhatsApp sharing alone saved us hours of follow-up. Clients view the quote, accept it, and the invoice is generated automatically. Our payment cycle shortened by 2 weeks.', img: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Priya Krishnan', role: 'Brand Consultant', text: 'I run my entire business from QuoteFlow — quotations, invoices, expense tracking, and monthly P&L. It replaced four different subscriptions I was paying for.', img: 'https://i.pravatar.cc/150?img=9' },
  { name: 'Suresh Reddy', role: 'CEO, Reddy Tech Solutions', text: 'The CRM pipeline integration with quotations is brilliant. Every quote that goes out is automatically tracked. We closed 40% more leads last quarter.', img: 'https://i.pravatar.cc/150?img=12' },
];

const TestimonialMarquee = () => {
  return (
    <section className="py-24 overflow-hidden relative border-y border-border dark:border-border-dark bg-surface dark:bg-[#0a0a0a]">
      <div className="text-center mb-16">
        <h2 className="text-[clamp(28px,3vw,40px)] font-display font-black leading-tight tracking-tight mb-4 text-gray-900 dark:text-white">
          Loved by top professionals.
        </h2>
      </div>

      <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-surface dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-surface dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      <div className="flex">
        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex gap-6 px-3"
        >
          {testimonials.map((t, i) => (
            <div key={i} className="w-[450px] shrink-0 glass dark:bg-[#111]/90 rounded-3xl p-10 hover:scale-[1.02] transition-transform cursor-grab active:cursor-grabbing border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold-500 shadow-md" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm font-medium text-brand-gold-600 dark:text-brand-gold-400">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-medium">"{t.text}"</p>
            </div>
          ))}
          {/* Duplicate for seamless infinite scroll */}
          {testimonials.map((t, i) => (
            <div key={`dup-${i}`} className="w-[450px] shrink-0 glass dark:bg-[#111]/90 rounded-3xl p-10 hover:scale-[1.02] transition-transform cursor-grab active:cursor-grabbing border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold-500 shadow-md" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm font-medium text-brand-gold-600 dark:text-brand-gold-400">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-medium">"{t.text}"</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialMarquee;
