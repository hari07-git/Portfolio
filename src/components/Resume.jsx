import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export default function Resume() {
  return (
    <section id="resume" className="py-24 relative z-10 bg-[#030014] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Compact Elegant Glass Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-[#07051b]/40 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center group"
        >
          {/* Subtle brand neon glow border top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="text-xs font-mono text-primary/70 tracking-widest mb-3 uppercase select-none">
            Curriculum Vitae
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Resume</span>
          </h2>
          
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 font-light max-w-md">
            Download my latest resume containing projects, skills, internship experience, and technical expertise.
          </p>

          {/* Centered Premium CTA Button & Metadata */}
          <div className="flex flex-col items-center gap-3">
            <a
              href="/resume.pdf"
              download="Biyyani_Hari_Venkata_Gopal_Resume.pdf"
              className="group relative flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 rounded-xl font-bold text-white shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:shadow-[0_0_25px_rgba(14,165,233,0.35)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5 group-hover:translate-y-[1px] transition-transform duration-300" />
              Download Resume
            </a>
            
            <span className="text-xs font-mono text-gray-500 select-none">
              PDF • Updated 2026 • 1 Page
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
