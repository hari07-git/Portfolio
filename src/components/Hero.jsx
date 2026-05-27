import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PROFILE } from '../data';
import { ChevronDown } from 'lucide-react';

function MagneticButton({ children, className, href }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % PROFILE.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden z-10 perspective-[1000px]">
      
      {/* Deep Background: Giant Blurred Planet */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/10 to-purple-500/5 blur-[120px] -z-20 pointer-events-none"
      />

      {/* Floating Holographic Rings */}
      <motion.div 
        animate={{ rotateX: 360, rotateY: 180, rotateZ: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 -z-10 pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      />
      <motion.div 
        animate={{ rotateX: -360, rotateY: 360, rotateZ: -180 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-secondary/10 -z-10 pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      />

      {/* Foreground Orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[10%] w-32 h-32 bg-primary/30 rounded-full blur-[60px] -z-10 pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-[10%] w-48 h-48 bg-secondary/30 rounded-full blur-[80px] -z-10 pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full glass text-primary font-mono text-sm tracking-wider uppercase border border-primary/30 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
        >
          {PROFILE.heroKicker}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary drop-shadow-[0_0_30px_rgba(14,165,233,0.5)]">
            {PROFILE.name.split(' ')[0]}
          </span>
          <br className="md:hidden" />
          {' '}
          <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {PROFILE.name.split(' ').slice(1).join(' ')}
          </span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-12 md:h-16 mb-6 flex items-center justify-center"
        >
          <p className="text-2xl md:text-4xl text-gray-300 font-light">
            I am a{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 inline-block min-w-[280px] md:min-w-[400px] text-left">
              {PROFILE.roles[currentRole]}
              <motion.span 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block ml-1 text-primary"
              >
                |
              </motion.span>
            </span>
          </p>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-lg md:text-xl text-gray-400 mb-12 leading-relaxed"
        >
          {PROFILE.heroSubtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 z-20"
        >
          <MagneticButton href="#projects" className="group relative px-8 py-4 bg-primary/10 text-primary font-bold rounded-xl overflow-hidden glass border border-primary/50 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_40px_rgba(14,165,233,0.6)] hover:bg-primary hover:text-white transition-all duration-300">
            <div className="absolute inset-0 w-1/4 h-full bg-white/30 skew-x-12 -translate-x-[150%] group-hover:animate-[shine_1s_ease-in-out]"></div>
            <span className="relative z-10">Explore Projects</span>
          </MagneticButton>
          
          <MagneticButton href="#contact" className="px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-300 backdrop-blur-md">
            Contact Me
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a 
          href="#about" 
          className="text-gray-400 hover:text-primary transition-colors flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </motion.div>
    </section>
  );
}
