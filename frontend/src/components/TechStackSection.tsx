import React from 'react';
import { motion } from 'framer-motion';

const techData = [
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', title: 'Spring Boot 4', desc: 'Latest Spring Framework 7.x with auto-configuration and Actuator' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', title: 'Java 21', desc: 'Records, pattern matching, virtual threads, and modern features' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', title: 'PostgreSQL 16', desc: 'ACID compliance, JSONB, full-text search for data integrity' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', title: 'Redis 7', desc: 'In-memory caching, session management, rate limiting' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', title: 'React 18', desc: 'Highly reactive user interfaces with framer-motion physics' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', title: 'Tailwind V4', desc: 'Utility-first CSS framework for ultra-fast, responsive styling' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', title: 'TypeScript', desc: 'Static typing for incredibly robust and maintainable frontend logic' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', title: 'Flutter', desc: 'Cross-platform mobile apps for iOS and Android with full parity' },
];

const TechStackSection = () => {
  return (
    <section className="py-16 relative z-10 border-t border-border dark:border-border-dark" id="tech">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-6 text-primary-500 dark:text-primary-400"
          >
            Production-Grade Stack
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(32px,4vw,48px)] font-display font-extrabold leading-tight tracking-tight mb-6"
          >
            What powers QuoteFlow under the hood.
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techData.map((tech, i) => {
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass dark:bg-[#111]/80 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center mb-4 shadow-sm border border-gray-100 dark:border-gray-700 group-hover:shadow-md transition-shadow`}>
                  <img src={tech.icon} alt={tech.title} className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{tech.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tech.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
