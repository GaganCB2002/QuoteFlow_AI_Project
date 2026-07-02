import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import CinematicHeroScroll from '../components/CinematicHeroScroll';
import FeatureBentoGrid from '../components/FeatureBentoGrid';
import TestimonialMarquee from '../components/TestimonialMarquee';
import PricingSection from '../components/PricingSection';
import TechStackSection from '../components/TechStackSection';
import DashboardZoomSection from '../components/DashboardZoomSection';
import TrustLogos from '../components/TrustLogos';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import DetailedFeaturesSection from '../components/DetailedFeaturesSection';
import ContactSection from '../components/ContactSection';
import CTASection from '../components/CTASection';
import ComprehensiveFooter from '../components/ComprehensiveFooter';
import MagneticButton from '../components/MagneticButton';
import { ArrowRight, Moon, Sun, Layers } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  // Smart Navbar State
  const { scrollY } = useScroll();
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.85)", "rgba(255, 255, 255, 0.95)"]
  );
  
  const navBackgroundDark = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0.75)", "rgba(10, 10, 10, 0.9)"]
  );

  const navBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(12px)", "blur(16px)"]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 0) return;
    if (latest < 100) {
      setNavVisible(true);
    } else if (latest > lastScrollY) {
      setNavVisible(false); // scrolling down
    } else {
      setNavVisible(true); // scrolling up
    }
    setLastScrollY(latest);
  });

  // Character-by-character reveal for the main heading
  const headingText = "The Future of".split(" ");
  const headingText2 = "Business Management.".split(" ");

  useEffect(() => {
    document.title = 'QuoteFlow AI — Premium Business OS';
  }, []);

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark overflow-hidden font-sans">
      {/* Premium Smart Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: navVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 w-full z-50 pt-6 px-6 pointer-events-none"
      >
        <motion.div 
          style={{ 
            backgroundColor: theme === 'dark' ? navBackgroundDark : navBackground,
            backdropFilter: navBlur,
            WebkitBackdropFilter: navBlur
          }}
          className="max-w-7xl mx-auto flex items-center justify-between rounded-full px-6 py-4 pointer-events-auto shadow-sm border border-black/5 dark:border-white/5"
        >
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Layers className="text-primary-500 w-6 h-6" />
            <span className="font-display font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">QuoteFlow</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-500 dark:text-gray-400">
            <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors" data-cursor="Scroll">Features</a>
            <a href="#how-it-works" className="hover:text-gray-900 dark:hover:text-white transition-colors" data-cursor="Scroll">Process</a>
            <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors" data-cursor="Scroll">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton onClick={toggleTheme} className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </MagneticButton>
            <button onClick={() => navigate('/login')} className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" data-cursor="Click">
              Sign In
            </button>
            <MagneticButton onClick={() => navigate('/login')} className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform" data-cursor="Join">
              Get Started
            </MagneticButton>
          </div>
        </motion.div>
      </motion.nav>

      {/* Cinematic Scroll Hero Section */}
      <CinematicHeroScroll />

      {/* Trust Logos Banner */}
      <TrustLogos />

      {/* Dashboard 3D Zoom on Scroll */}
      <DashboardZoomSection />

      {/* Horizontal Scroll Workflow Story */}
      <HorizontalScrollSection />

      {/* Bento Grid Features */}
      <FeatureBentoGrid />

      {/* Detailed feature breakdown */}
      <DetailedFeaturesSection />

      {/* Tech Stack */}
      <TechStackSection />

      {/* Pricing */}
      <PricingSection />

      {/* Marquee */}
      <TestimonialMarquee />

      {/* Contact Section */}
      <ContactSection />

      {/* Final CTA */}
      <CTASection />

      {/* Comprehensive Footer */}
      <ComprehensiveFooter />
    </div>
  );
};

export default LandingPage;
