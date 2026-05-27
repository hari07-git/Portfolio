import { motion } from 'framer-motion';
import { PROFILE } from '../data';
import { Download, ShieldCheck } from 'lucide-react';

export default function Resume() {
  return (
    <section id="resume" className="py-24 relative z-10 bg-[#030014] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Elegant Glass Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#07051b]/40 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
        >
          {/* Subtle brand neon glow border top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            
            {/* LEFT: Heading, Description, Single Premium Button */}
            <div>
              <div className="text-xs font-mono text-primary/70 tracking-widest mb-3 uppercase">Curriculum Vitae</div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Resume</span>
              </h2>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 font-light max-w-md">
                Download my latest resume containing projects, skills, internship experience, and technical expertise.
              </p>

              {/* Single Premium CTA Button & Metadata */}
              <div className="flex flex-col items-start gap-3">
                <a
                  href="/resume.pdf"
                  download="Biyyani_Hari_Venkata_Gopal_Resume.pdf"
                  className="group relative flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 rounded-xl font-bold text-white shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:shadow-[0_0_25px_rgba(14,165,233,0.35)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-[1px] transition-transform duration-300" />
                  Download Resume
                </a>
                
                <span className="text-xs font-mono text-gray-500 pl-1 select-none">
                  PDF • Updated 2026 • 1 Page
                </span>
              </div>
            </div>

            {/* RIGHT: Minimal Resume Preview (Static/Non-interactive) */}
            <div className="flex justify-center md:justify-end">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-[260px] aspect-[1/1.41] rounded-2xl border border-white/10 bg-[#0a0822] p-5 relative overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] group/card select-none"
              >
                {/* Soft neon border glow */}
                <div className="absolute inset-0 border border-primary/0 group-hover/card:border-primary/20 rounded-2xl transition-colors duration-500" />

                {/* Minimal preview mockup */}
                <div className="w-full h-full flex flex-col justify-between text-[10px] text-gray-500">
                  <div>
                    {/* Header info */}
                    <div className="border-b border-white/10 pb-3 mb-3">
                      <div className="text-[12px] font-bold text-white">{PROFILE.name}</div>
                      <div className="text-[8px] text-primary/70 tracking-wide font-medium mt-0.5 uppercase">{PROFILE.roleHeadline}</div>
                    </div>

                    {/* Summary mock */}
                    <div className="w-full h-1.5 bg-white/5 rounded mb-2" />
                    <div className="w-5/6 h-1.5 bg-white/5 rounded mb-4" />

                    {/* Skills mock */}
                    <div className="text-[8px] font-medium text-purple-400 mb-2 uppercase">Core Tech Stack</div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {["Java", "Spring", "React", "Node"].map((tech, idx) => (
                        <span key={idx} className="text-[7px] bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-gray-300 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Experience mock */}
                    <div className="text-[8px] font-medium text-emerald-400 mb-1.5 uppercase">Experience</div>
                    <div className="w-3/4 h-2 bg-white/5 rounded mb-1" />
                    <div className="w-1/2 h-1.5 bg-white/5 rounded" />
                  </div>

                  {/* Verification stamp */}
                  <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[8px] font-mono">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Document
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
    </section>
  );
}
