import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import QuoteFlowLogo from './QuoteFlowLogo';

const slides = [
  {
    video: '/videos/video1.mp4',
    badge: 'Introducing QuoteFlow 2.0',
    titleLine1: 'The Future of',
    titleLine2: 'Business Management.',
    description: "The world's most elegant platform to generate AI quotations, manage clients, and process payments instantly.",
    logoText: 'QuoteFlow AI',
  },
  {
    video: '/videos/video2.mp4',
    badge: 'Experience Design Excellence',
    titleLine1: 'Create Your',
    titleLine2: 'Next Masterpiece.',
    description: "Unleash your creativity with powerful AI-driven design tools built for modern creators.",
    logoText: 'QuoteFlow AI',
  }
];

const CinematicHeroScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const containerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.85]);
  const containerRadius = useTransform(scrollYProgress, [0, 0.5, 1], ["0px", "0px", "40px"]);
  const containerY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const slide = slides[currentSlide];
  const headingText = slide.titleLine1.split(" ");
  const headingText2 = slide.titleLine2.split(" ");

  useEffect(() => {
    videoRefs.current.forEach((vid, index) => {
      if (vid) {
        if (index === currentSlide) {
          vid.currentTime = 0;
          vid.play().catch(e => console.error("Video play failed:", e));
        } else {
          vid.pause();
        }
      }
    });
  }, [currentSlide]);

  const handleVideoEnded = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

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
          <div className="absolute inset-0 z-0 bg-black">
            {slides.map((s, index) => (
              <video 
                key={s.video}
                ref={el => { videoRefs.current[index] = el; }}
                src={s.video}
                autoPlay={index === currentSlide}
                muted 
                playsInline
                loop={false}
                onEnded={handleVideoEnded}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-20 pointer-events-none" />
          </div>

          {/* Hero Content */}
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-20 flex flex-col items-center justify-center h-full px-5 max-w-5xl mx-auto text-center w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Dynamic Logo */}
                <div className="flex items-center gap-3 mb-8 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-xl">
                  <QuoteFlowLogo size={36} />
                  <span className="font-display font-extrabold text-2xl tracking-tight text-white">{slide.logoText}</span>
                </div>

                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-xs font-bold uppercase tracking-widest text-white shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                  {slide.badge}
                </motion.div>

                <h1 className="font-display font-black text-[clamp(48px,8vw,110px)] leading-[1.05] tracking-tight mb-8 text-white drop-shadow-2xl">
                  <div className="overflow-hidden">
                    {headingText.map((word, i) => (
                      <span key={i} className="inline-block mr-[2vw]">
                        {word}
                      </span>
                    ))}
                  </div>
                  <div className="overflow-hidden bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-white drop-shadow-lg">
                    {headingText2.map((word, i) => (
                      <span key={i} className="inline-block mr-[2vw]">
                        {word}
                      </span>
                    ))}
                  </div>
                </h1>

                <p className="text-lg md:text-2xl text-white/80 max-w-2xl font-medium leading-relaxed mb-10 drop-shadow-md">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
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
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicHeroScroll;
