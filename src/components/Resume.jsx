import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PROFILE } from '../data';
import { Download, Eye, FileText, X, MapPin, Mail, Phone, Calendar, ShieldCheck } from 'lucide-react';

export default function Resume() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <section id="resume" className="py-24 relative z-10 bg-[#030014] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Elegant Glass Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#07051b]/40 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
        >
          {/* Subtle brand neon glow border top */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            
            {/* LEFT: Heading, Description, Buttons */}
            <div>
              <div className="text-xs font-mono text-primary/70 tracking-widest mb-3 uppercase">06 // Credentials</div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Curriculum <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Vitae</span>
              </h2>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 font-light max-w-md">
                Download my latest resume containing projects, skills, internship experience, and technical expertise, or review it directly in the console.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="/resume.pdf"
                  download="Biyyani_Hari_Venkata_Gopal_Resume.pdf"
                  className="group relative flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl font-bold text-white shadow-[0_0_15px_rgba(14,165,233,0.25)] hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Download className="w-4.5 h-4.5 group-hover:translate-y-[1px] transition-transform" />
                  Download Resume
                </a>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center gap-2.5 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-bold text-gray-300 hover:text-white transition-all duration-300"
                >
                  <Eye className="w-4.5 h-4.5 group-hover:scale-105 transition-transform" />
                  View Online
                </button>
              </div>
            </div>

            {/* RIGHT: Minimal Resume Preview */}
            <div className="flex justify-center md:justify-end">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => setIsModalOpen(true)}
                className="w-full max-w-[260px] aspect-[1/1.41] rounded-2xl border border-white/10 bg-[#0a0822] p-5 cursor-pointer relative overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] group/card"
              >
                {/* Subtle card glow border */}
                <div className="absolute inset-0 border border-primary/0 group-hover/card:border-primary/30 rounded-2xl transition-colors duration-500" />

                {/* Minimal preview mockup */}
                <div className="w-full h-full flex flex-col justify-between text-[10px] text-gray-500 select-none">
                  <div>
                    {/* Header info */}
                    <div className="border-b border-white/10 pb-3 mb-3">
                      <div className="text-[12px] font-bold text-white">{PROFILE.name}</div>
                      <div className="text-[8px] text-primary/70 tracking-wide font-mono mt-0.5 uppercase">{PROFILE.roleHeadline}</div>
                    </div>

                    {/* Summary mock */}
                    <div className="w-full h-1.5 bg-white/5 rounded mb-2" />
                    <div className="w-5/6 h-1.5 bg-white/5 rounded mb-4" />

                    {/* Skills mock */}
                    <div className="text-[8px] font-mono text-purple-400 mb-2 uppercase">Core Engine Stack</div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {["Java", "Spring", "React", "Node"].map((tech, idx) => (
                        <span key={idx} className="text-[7px] bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-gray-300 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Experience mock */}
                    <div className="text-[8px] font-mono text-emerald-400 mb-1.5 uppercase">Experience</div>
                    <div className="w-3/4 h-2 bg-white/5 rounded mb-1" />
                    <div className="w-1/2 h-1.5 bg-white/5 rounded" />
                  </div>

                  {/* Verification stamp */}
                  <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[8px] font-mono">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3 h-3" />
                      CREDENTIAL
                    </span>
                    <span className="text-primary hover:text-white transition-colors">
                      VIEW FULL
                    </span>
                  </div>
                </div>

                {/* Glare overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* FULL RESUME MODAL POPUP */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="w-full max-w-4xl h-[90vh] bg-[#07051b] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(14,165,233,0.2)]"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#090724] relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 border border-primary/40 rounded-xl">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-white">Interactive Resume Reader</h3>
                    <p className="text-xs font-mono text-gray-500">SYSTEM:\HARI_BIYYANI\RESUME.LOG</p>
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
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 font-light text-gray-300 space-y-8 select-text">
                {/* Header Profile details */}
                <div className="text-center pb-8 border-b border-white/5">
                  <h1 className="text-3xl font-black text-white mb-2">{PROFILE.name}</h1>
                  <h2 className="text-base font-mono text-primary mb-4 uppercase tracking-wider">{PROFILE.roleHeadline}</h2>
                  
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
    </section>
  );
}
