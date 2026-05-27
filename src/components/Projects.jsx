import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PROFILE } from '../data';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

function ProjectCard({ project, index }) {
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Holographic Glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    
    // For Tilt
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    // For Glow
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      className="min-h-screen flex flex-col md:flex-row items-center sticky top-0 bg-[#030014] overflow-hidden border-t border-white/5"
      style={{ zIndex: index + 10 }}
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-24">
        
        {/* LEFT: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative z-30"
        >
          <div className="text-[140px] md:text-[180px] font-black text-white/5 absolute -top-20 -left-10 select-none pointer-events-none">
            0{index + 1}
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{project.name}</h3>
          <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 font-semibold relative z-10">{project.tagline}</p>
          
          <p className="text-gray-400 text-lg mb-8 leading-relaxed relative z-10 max-w-lg">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-10 relative z-10 max-w-lg">
            {project.tech.map((t, i) => (
              <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 relative z-10">
            {project.links.map((link, i) => (
              <a 
                key={i}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  link.label === 'Live Preview' 
                    ? 'bg-primary/20 text-primary border border-primary/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] hover:bg-primary hover:text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                {link.label === 'GitHub' ? <GithubIcon className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: 3D Holographic Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-[4/3] z-30 perspective-[1000px] mt-10 md:mt-0"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full relative rounded-3xl border border-white/20 bg-[#0a0a1a]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer group"
          >
            {/* Holographic Border Glow */}
            <motion.div 
              className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 z-0 mix-blend-screen"
              style={{
                background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(14,165,233,0.8), transparent 40%)`
              }}
            />
            
            {/* Image Container with inner shadow */}
            <div className="absolute inset-2 rounded-2xl overflow-hidden bg-black z-10 border border-white/10" style={{ transform: "translateZ(40px)" }}>
              {project.image ? (
                <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-slate-600 font-mono">Preview Area</span>
                </div>
              )}
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            {/* Floating Elements on top of image */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary/30 rounded-full blur-[40px] z-0 pointer-events-none group-hover:bg-secondary/50 transition-all duration-500" style={{ transform: "translateZ(20px)" }}></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/30 rounded-full blur-[50px] z-0 pointer-events-none group-hover:bg-primary/50 transition-all duration-500" style={{ transform: "translateZ(20px)" }}></div>

          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 bg-[#030014]">
      {/* Intro Header */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center relative z-10"
        >
          <h2 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent uppercase tracking-tighter">
            Selected
            <br/>
            Works
          </h2>
        </motion.div>
      </div>

      <div className="relative z-10 mt-[-100vh]">
        {PROFILE.projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
