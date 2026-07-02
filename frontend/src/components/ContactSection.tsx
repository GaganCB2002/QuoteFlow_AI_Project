import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, CheckCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';

const ContactSection = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send an API request to the backend
    // e.g. await axios.post('/api/contact', formData);
    console.log("Contact form submitted for admin dashboard:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section className="py-16 relative z-10 bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-6 text-primary-500 dark:text-primary-400">
              Get in Touch
            </div>
            <h2 className="text-[clamp(32px,4vw,48px)] font-display font-extrabold leading-tight tracking-tight mb-6">
              Have questions or need a demo?
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
              Whether you are migrating from another platform, setting up your team, or exploring enterprise features — our team is available to walk you through everything.
            </p>

            <div className="space-y-6">
              <a href="mailto:support@quoteflow.ai" className="flex items-center gap-4 group p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-brand-gold-50 dark:bg-brand-gold-900/20 flex items-center justify-center text-brand-gold-600 dark:text-brand-gold-400 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Email Support</h4>
                  <p className="text-sm text-gray-500">support@quoteflow.ai</p>
                </div>
              </a>

              <a href="tel:+918001234567" className="flex items-center gap-4 group p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Sales & Enquiries</h4>
                  <p className="text-sm text-gray-500">+91 (800) 123-4567</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-transparent">
                <div className="w-12 h-12 rounded-full bg-accent-50 dark:bg-accent-900/20 flex items-center justify-center text-accent-600 dark:text-accent-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Headquarters</h4>
                  <p className="text-sm text-gray-500">Bangalore, Karnataka, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass dark:bg-[#111]/80 rounded-[40px] p-10 lg:p-12 border border-gray-200/50 dark:border-gray-800/50 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500/10 rounded-full blur-[80px]" />
            <h3 className="text-2xl font-bold mb-8 relative z-10">Send us a message</h3>
            
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                  <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Work Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 transition-all" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 transition-all resize-none" placeholder="How can we help?" />
              </div>
              <MagneticButton type="submit" className={`w-full py-4 ${submitted ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-brand-gold-500 hover:bg-brand-gold-600'} text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-colors`}>
                {submitted ? <><CheckCircle size={18} /> Sent Successfully</> : <>Send Message <ExternalLink size={18} /></>}
              </MagneticButton>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
