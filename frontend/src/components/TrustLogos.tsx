import React from 'react';
import { motion } from 'framer-motion';

const TrustLogos = () => {
  const logos = [
    { name: 'Stripe', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-logo.svg' },
    { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
    { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
    { name: 'Amazon', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Google', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg' },
    { name: 'Github', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  ];

  return (
    <section className="py-12 bg-surface dark:bg-surface-dark border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, i) => (
            <motion.img 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              src={logo.url} 
              alt={logo.name} 
              className="h-8 md:h-10 object-contain hover:scale-110 transition-transform cursor-pointer" 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
