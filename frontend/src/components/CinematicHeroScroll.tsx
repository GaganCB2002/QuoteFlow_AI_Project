import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';

const CinematicHeroScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const containerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.85]);
  const containerRadius = useTransform(scrollYProgress, [0, 0.5, 1], ["0px", "0px", "40px"]);
  const containerY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const headingText = "The Future of".split(" ");
  const headingText2 = "Business Management.".split(" ");

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-surface dark:bg-surface-dark">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            scale: containerScale,
            borderRadius: containerRadius,
            y: containerY,
          }}
          className="w-full h-full relative overflow-hidden shadow-2xl origin-bottom bg-black"
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover object-center opacity-60"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-startup-team-working-on-a-laptop-40348-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
          </div>

          {/* Hero Content */}
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-10 flex flex-col items-center justify-center h-full px-5 max-w-5xl mx-auto text-center w-full"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-xs font-bold uppercase tracking-widest text-white shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              Introducing QuoteFlow 2.0
            </motion.div>

            <h1 className="font-display font-black text-[clamp(48px,8vw,110px)] leading-[1.05] tracking-tight mb-8 text-white drop-shadow-2xl">
              <div className="overflow-hidden">
                {headingText.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block mr-[2vw]"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-white drop-shadow-lg">
                {headingText2.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block mr-[2vw]"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl text-white/80 max-w-2xl font-medium leading-relaxed mb-10 drop-shadow-md"
            >
              The world's most elegant platform to generate AI quotations, manage clients, and process payments instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            >
              <MagneticButton 
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-full font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Start Free Trial <ArrowRight size={20} />
              </MagneticButton>
              <MagneticButton 
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 rounded-full font-bold text-lg transition-all"
              >
                Watch Keynote
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicHeroScroll;
