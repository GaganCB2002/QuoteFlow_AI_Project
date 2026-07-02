import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useNavigate } from 'react-router-dom';

const pricingPlans = [
  {
    name: 'Starter', price: '₹0', period: '/month', desc: 'For freelancers testing the platform', featured: false,
    features: [
      { text: '100 quotations/month', included: true },
      { text: 'Basic invoices', included: true },
      { text: 'WhatsApp sharing', included: true },
      { text: 'PDF generation', included: true },
      { text: 'AI quotation generator', included: false },
      { text: 'Marketing campaigns', included: false },
    ]
  },
  {
    name: 'Professional', price: '₹499', period: '/month', desc: 'For growing Indian businesses', featured: true, badge: 'Most Popular',
    features: [
      { text: 'Unlimited quotations', included: true },
      { text: 'GST / Tax / Proforma invoices', included: true },
      { text: 'AI quotation generator', included: true },
      { text: 'AI profit optimizer', included: true },
      { text: 'Voice quotations', included: true },
      { text: 'CRM & follow-ups', included: true },
      { text: 'Customer credit score', included: true },
      { text: 'Marketing campaigns', included: false },
    ]
  },
  {
    name: 'Business', price: '₹999', period: '/month', desc: 'For teams and growing agencies', featured: false,
    features: [
      { text: 'Everything in Professional', included: true },
      { text: 'Up to 10 users', included: true },
      { text: 'WhatsApp campaigns', included: true },
      { text: 'Email & SMS campaigns', included: true },
      { text: 'Festival automation', included: true },
      { text: 'API access', included: true },
      { text: 'Priority support', included: true },
    ]
  },
  {
    name: 'Enterprise', price: '₹4,999', period: '/month', desc: 'For large teams and franchises', featured: false,
    features: [
      { text: 'Everything in Business', included: true },
      { text: 'Unlimited users', included: true },
      { text: 'Franchise management', included: true },
      { text: 'White label', included: true },
      { text: 'Dedicated manager', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true },
    ]
  },
];

const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 relative z-10" id="pricing">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-6 text-primary-500 dark:text-primary-400"
          >
            Simple Pricing
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(32px,4vw,48px)] font-display font-extrabold leading-tight tracking-tight mb-6"
          >
            Plans built for Indian businesses.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 150, scale: 0.8, rotateX: 30, rotateY: i === 0 ? 30 : i === 2 ? -30 : 0 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05, y: -20, rotateZ: i === 0 ? -2 : i === 2 ? 2 : 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.2 }}
              className={`glass dark:bg-[#111]/80 rounded-[32px] p-8 relative flex flex-col cursor-pointer ${plan.featured ? 'border-2 border-brand-gold-500 shadow-2xl scale-105 md:scale-110 z-10' : 'border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl'}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-gold-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                  {plan.badge}
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px]">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-4xl font-display font-extrabold">{plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400 font-medium">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className={`flex items-start gap-3 text-sm font-medium ${f.included ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600 line-through'}`}>
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.included ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {f.text}
                  </li>
                ))}
              </ul>
              <MagneticButton 
                onClick={() => navigate('/login')}
                className={`w-full py-4 rounded-xl font-bold transition-all ${plan.featured ? 'bg-brand-gold-500 hover:bg-brand-gold-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'}`}
              >
                {plan.price === '₹0' ? 'Get Started' : 'Subscribe'}
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
