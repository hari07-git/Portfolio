import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Certifications from './components/Certifications';
import Resume from './components/Resume';
import { PROFILE } from './data';

function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.07), transparent 40%)`
        }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border border-primary/50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(14, 165, 233, 0.2)' : 'transparent',
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 right-0 w-1 h-full bg-gradient-to-b from-primary to-secondary origin-top z-[100] shadow-[0_0_10px_rgba(14,165,233,0.5)]"
      style={{ scaleY }}
    />
  );
}

function CinematicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500); // Wait a bit before fading out
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#030014] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gathering particles effect (simulated with CSS for loader) */}
      <div className="absolute inset-0 flex justify-center items-center opacity-30 pointer-events-none">
        <div className="w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <div className="relative w-32 h-32 flex flex-col items-center justify-center z-10">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-l-2 border-primary rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]"
        ></motion.div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-b-2 border-r-2 border-secondary rounded-full"
        ></motion.div>
        
        {/* Glitch logo */}
        <motion.div 
          className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative"
          animate={{ 
            x: [0, -2, 2, -1, 1, 0],
            opacity: [1, 0.8, 1, 0.9, 1]
          }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1.5 }}
        >
          HB
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center z-10"
      >
        <div className="text-primary font-mono text-sm tracking-widest mb-2">INITIALIZING SYSTEM</div>
        <div className="text-white font-mono text-2xl font-bold">{progress}%</div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030014] text-slate-200 selection:bg-primary/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <CinematicLoader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ScrollProgress />
            <MouseFollower />
            <ParticlesBackground />
            <Navbar />
            
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Certifications />
              <Resume />
              <Contact />
            </main>

            <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5 relative z-10 bg-[#030014]/80 backdrop-blur-md">
              <p>© {new Date().getFullYear()} {PROFILE.preferredName}. All rights reserved.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
