import React, { useEffect, useRef, useState } from 'react';
import { Code2, Database, Layout, Server, Layers, Smartphone, Globe, Cpu } from 'lucide-react';

const techStack = [
  { name: 'React.js', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  { name: 'TypeScript', icon: Code2, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'Tailwind CSS', icon: Layout, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
  { name: 'Java', icon: Cpu, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { name: 'Spring Boot', icon: Server, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { name: 'PostgreSQL', icon: Database, color: 'text-blue-300', bg: 'bg-blue-300/10', border: 'border-blue-300/20' },
  { name: 'Vite', icon: ZapIcon, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { name: 'Docker', icon: Layers, color: 'text-blue-600', bg: 'bg-blue-600/10', border: 'border-blue-600/20' }
];

function ZapIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const TechStackSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      observer.observe(container);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 bg-[#0a0f1c] overflow-hidden"
    >
      {/* Spotlight Effect that tracks mouse */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 40%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Built with Modern Tech Stack
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Powered by enterprise-grade technologies for maximum performance and reliability.
          </p>
        </div>

        {/* Tree Structure */}
        <div className="relative flex flex-col items-center">
          
          {/* Top Node (Logo) */}
          <div className={`relative group cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative w-24 h-24 bg-[#111827] border border-gray-800 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-300 z-20">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                QF
              </span>
            </div>
          </div>

          {/* SVG Connecting Lines */}
          <div className="w-full h-32 relative -mt-4 opacity-30">
            {isVisible && (
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
                <path d="M 500 0 L 500 40 L 100 40 L 100 100" fill="none" stroke="white" strokeWidth="2" className="animate-draw-line" />
                <path d="M 500 0 L 500 40 L 350 40 L 350 100" fill="none" stroke="white" strokeWidth="2" className="animate-draw-line" />
                <path d="M 500 0 L 500 40 L 650 40 L 650 100" fill="none" stroke="white" strokeWidth="2" className="animate-draw-line" />
                <path d="M 500 0 L 500 40 L 900 40 L 900 100" fill="none" stroke="white" strokeWidth="2" className="animate-draw-line" />
              </svg>
            )}
          </div>

          {/* Grid of Tech Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl z-20">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div 
                  key={tech.name}
                  className={`group relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: isVisible ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className={`relative p-6 bg-[#111827] border ${tech.border} rounded-2xl flex flex-col items-center justify-center gap-4 hover:scale-110 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-pointer overflow-hidden`}>
                    
                    {/* Inner Spotlight for card on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 -translate-x-full"></div>

                    <div className={`w-16 h-16 ${tech.bg} rounded-xl flex items-center justify-center ${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={32} />
                    </div>
                    <span className="text-gray-300 font-bold group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
