import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Resume', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map(item => item.toLowerCase());
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
        <a href="#home" className="text-2xl font-black text-white tracking-tighter hover:scale-105 transition-transform flex items-center gap-1 group">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 group-hover:from-purple-400 group-hover:to-primary transition-all duration-500">HB</span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(14,165,233,1)]"></span>
        </a>
        
        {/* Desktop Nav Items */}
        <div className="hidden md:flex gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {item}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/20 -z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-primary transition-colors focus:outline-none cursor-pointer"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-[#030014]/95 backdrop-blur-xl border-b border-white/5 md:hidden overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-40"
          >
            <div className="flex flex-col px-6 py-8 gap-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold transition-all py-2.5 border-b border-white/5 flex justify-between items-center cursor-pointer ${activeSection === item.toLowerCase() ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
                >
                  <span>{item}</span>
                  {activeSection === item.toLowerCase() && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(14,165,233,1)]"></span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
