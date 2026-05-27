import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { PROFILE } from '../data';
import { Download, Eye, FileText, Terminal, Cpu, CheckCircle, ExternalLink, X, MapPin, Mail, Phone, Calendar } from 'lucide-react';

function AnimatedCounter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let startTime = null;
    const endValue = parseInt(value);
    if (isNaN(endValue)) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * endValue));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  const suffix = value.toString().includes('+') ? '+' : '';

  return (
    <span ref={ref} className="font-mono">
      {count}
      {suffix}
    </span>
  );
}

export default function Resume() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);

  // 3D Tilt for Right side holographic preview
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Holographic Glow Coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Handle body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const stats = [
    { label: "Projects Completed", value: "3+", color: "text-cyan-400", border: "border-cyan-500/20", glow: "rgba(34,211,238,0.15)" },
    { label: "Technologies Mastered", value: "15+", color: "text-purple-400", border: "border-purple-500/20", glow: "rgba(168,85,247,0.15)" },
    { label: "DSA Problems Solved", value: "250+", color: "text-emerald-400", border: "border-emerald-500/20", glow: "rgba(16,185,129,0.15)" },
    { label: "Work Internships", value: "1", color: "text-amber-400", border: "border-amber-500/20", glow: "rgba(245,158,11,0.15)" }
  ];

  return (
    <section id="resume" className="py-32 relative z-10 overflow-hidden bg-[#030014]">
      {/* Background glow meshes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Info & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col h-full justify-center"
          >
            <div className="text-sm font-mono text-primary tracking-widest mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 animate-pulse" />
              <span>06 // PROFILE ARCHIVE</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Terminal</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl font-light">
              Access my fully compiled credentials, project history, and core engine specs. Download the verified system PDF or boot the interactive reader directly from the console.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border ${stat.border} bg-[#07051b]/40 backdrop-blur-md relative group overflow-hidden`}
                  style={{ boxShadow: `inset 0 0 12px ${stat.glow}` }}
                >
                  <div className={`text-3xl font-black ${stat.color} mb-1 flex items-center gap-1`}>
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">{stat.label}</div>
                  
                  {/* Subtle hover sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href="/resume.pdf"
                download="Biyyani_Hari_Venkata_Gopal_Resume.pdf"
                className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 rounded-2xl font-bold text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden w-full sm:w-auto justify-center"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Download className="w-5 h-5 group-hover:translate-y-[2px] transition-transform duration-300" />
                Download Verified PDF
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl font-bold text-gray-300 hover:text-white transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Boot Interactive Reader
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Immersive Mockup Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="perspective-[1000px] w-full"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsModalOpen(true)}
              className="w-full relative aspect-[3/4] rounded-3xl border border-white/10 bg-[#07051b]/80 backdrop-blur-xl p-6 transition-all duration-500 group cursor-pointer overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            >
              {/* Holographic Border Glow */}
              <motion.div 
                className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 z-0 mix-blend-screen pointer-events-none"
                style={{
                  background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(14,165,233,0.2), transparent 50%)`
                }}
              />

              {/* Glowing Scan Line */}
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 shadow-[0_0_15px_rgba(14,165,233,1)] z-20 pointer-events-none" 
                   style={{
                     animation: 'scan 4s linear infinite',
                     top: '0%',
                   }}
              />

              {/* Holographic Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,35,0)_95%,rgba(14,165,233,0.05)_95%),linear-gradient(90deg,rgba(18,16,35,0)_95%,rgba(14,165,233,0.05)_95%)] bg-[size:24px_24px] pointer-events-none z-10" />

              {/* Simulated Resume Document Content */}
              <div className="w-full h-full bg-[#0a0822] rounded-2xl p-6 border border-white/5 relative z-10 overflow-hidden flex flex-col justify-between select-none" style={{ transform: "translateZ(30px)" }}>
                <div>
                  {/* Header info */}
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <div className="text-xs font-mono text-primary mb-1">C:\HARI_BIYYANI\SYSTEM_RESUME</div>
                    <div className="text-xl font-bold text-white">{PROFILE.name}</div>
                    <div className="text-xs font-semibold text-gray-500 tracking-wide mt-0.5">{PROFILE.roleHeadline}</div>
                  </div>

                  {/* Summary Block */}
                  <div className="mb-4 group-hover:border-primary/20 border border-transparent p-2.5 rounded-lg transition-colors">
                    <div className="text-[10px] font-mono text-primary mb-1 uppercase tracking-wider">01 / Executive Summary</div>
                    <div className="text-[11px] text-gray-400 font-light leading-relaxed">
                      CSE undergraduate student at MLRIT with virtual internship experience at Infosys. Specialized in Core Java, React, and REST APIs.
                    </div>
                  </div>

                  {/* Skills Block */}
                  <div className="mb-4 group-hover:border-purple-500/20 border border-transparent p-2.5 rounded-lg transition-colors">
                    <div className="text-[10px] font-mono text-purple-400 mb-1.5 uppercase tracking-wider">02 / Tech Stack Array</div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Java", "Spring Boot", "React", "Node.js", "MySQL", "DSA"].map((tech, idx) => (
                        <span key={idx} className="text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience Block */}
                  <div className="group-hover:border-emerald-500/20 border border-transparent p-2.5 rounded-lg transition-colors">
                    <div className="text-[10px] font-mono text-emerald-400 mb-1 uppercase tracking-wider">03 / Professional Logs</div>
                    <div className="text-[11px] font-bold text-white">Full Stack Intern // Infosys</div>
                    <div className="text-[9px] text-gray-500 font-mono mb-1">Feb 2026 - Apr 2026</div>
                    <div className="text-[11px] text-gray-400 font-light leading-relaxed">
                      Completed structured labs focused on C++ and REST APIs. Designed scalable application layers under guide review.
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Action */}
                <div className="border-t border-white/10 pt-4 flex justify-between items-center bg-gradient-to-t from-[#0a0822] via-[#0a0822] to-transparent">
                  <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    INTEGRITY CHECK PASSED
                  </span>
                  <span className="text-xs font-mono text-primary group-hover:text-white transition-colors flex items-center gap-1 group-hover:translate-x-1 duration-300">
                    ACCESS terminal <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Glass glare effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* INTERACTIVE FULL RESUME READER MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-4xl h-[90vh] bg-[#07051b] border border-white/15 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(14,165,233,0.3)]"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#090724] relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 border border-primary/40 rounded-xl">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">System Profile Terminal</h3>
                    <p className="text-xs font-mono text-gray-500">SYSTEM:\HARI_BIYYANI\RESUME_RAW.LOG</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="/resume.pdf"
                    download="Biyyani_Hari_Venkata_Gopal_Resume.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/50 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Raw Content Console */}
              <div className="flex-1 overflow-y-auto p-8 font-light text-gray-300 space-y-8 select-text">
                {/* Header Profile details */}
                <div className="text-center pb-8 border-b border-white/5">
                  <h1 className="text-3xl font-black text-white mb-2">{PROFILE.name}</h1>
                  <h2 className="text-lg font-mono text-primary mb-4 uppercase tracking-wider">{PROFILE.roleHeadline}</h2>
                  
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-500" /> {PROFILE.location}</span>
                    <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors"><Mail className="w-4 h-4 text-gray-500" /> {PROFILE.email}</a>
                    <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-gray-500" /> {PROFILE.phone}</span>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="text-xs font-mono text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    01 / Professional Summary
                  </h3>
                  <p className="text-gray-300 leading-relaxed pl-4 border-l border-white/10">
                    {PROFILE.summary}
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    02 / Employment Experience Log
                  </h3>
                  <div className="space-y-6 pl-4 border-l border-white/10">
                    {PROFILE.experience.map((exp, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                          <div>
                            <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                            <p className="text-sm font-semibold text-primary">{exp.company}</p>
                          </div>
                          <span className="text-xs font-mono text-gray-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.start} - {exp.end}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 font-light leading-relaxed">{exp.summary}</p>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-400 marker:text-primary">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Arrays */}
                <div>
                  <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    03 / Skills & Architecture Modules
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 pl-4 border-l border-white/10">
                    {PROFILE.skills.map((skill, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="font-mono text-xs text-emerald-400 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                          {skill.category}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {skill.items.map((item, i) => (
                            <span key={i} className="text-xs bg-white/5 px-2.5 py-1 rounded border border-white/5 text-gray-300">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education Log */}
                <div>
                  <h3 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    04 / Academic Logs
                  </h3>
                  <div className="space-y-6 pl-4 border-l border-white/10">
                    {PROFILE.education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h4 className="text-md font-bold text-white">{edu.school}</h4>
                          <p className="text-sm text-amber-400 font-semibold">{edu.degree}</p>
                          {edu.notes && <p className="text-xs text-gray-500 font-mono mt-1">{edu.notes}</p>}
                        </div>
                        <span className="text-xs font-mono text-gray-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                          {edu.start} - {edu.end}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Console Footer */}
              <div className="p-4 border-t border-white/10 bg-[#090724] text-center text-[10px] font-mono text-gray-500">
                VERIFIED TRANSACTION COMPLETED. TERMINAL CLOSED AUTOMATICALLY ON TERMINATION.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for the scanning animation */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </section>
  );
}
