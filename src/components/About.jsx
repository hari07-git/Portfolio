import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PROFILE } from '../data';
import { User, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for the image container
  const yImage = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" className="py-32 relative z-10" ref={ref}>
      {/* Energy Line from Hero to About */}
      <motion.div 
        className="absolute top-0 left-1/2 w-[2px] h-32 bg-gradient-to-b from-primary to-transparent -translate-x-1/2 origin-top"
        style={{ scaleY: useTransform(scrollYProgress, [0, 0.3], [0, 1]) }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center">
          
          {/* Left: Image & Holographic Orbit */}
          <motion.div 
            style={{ y: yImage }}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center h-[400px]"
          >
            {/* Holographic glowing background */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] -z-20"></div>

            {/* Orbit Rings */}
            <motion.div 
              animate={{ rotate: 360, rotateX: 60, rotateY: 30 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-80 h-80 md:w-[400px] md:h-[400px] border border-primary/40 rounded-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute top-0 left-1/2 w-6 h-6 bg-primary rounded-full shadow-[0_0_20px_rgba(14,165,233,1)] -translate-x-1/2 -translate-y-1/2"></div>
            </motion.div>
            
            <motion.div 
              animate={{ rotate: -360, rotateX: 45, rotateY: 45 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 md:w-[320px] md:h-[320px] border border-secondary/40 rounded-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-secondary rounded-full shadow-[0_0_20px_rgba(139,92,246,1)] -translate-x-1/2 translate-y-1/2"></div>
            </motion.div>

            {/* Central Avatar container */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/20 z-10 glass backdrop-blur-md flex flex-col items-center justify-center text-slate-500 shadow-[0_0_40px_rgba(14,165,233,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 z-0"></div>
              <User className="w-24 h-24 mb-2 opacity-50 z-10 text-white" />
              <span className="text-sm z-10 text-white/70 tracking-widest uppercase">Profile</span>
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">Me</span>
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 font-light"
            >
              {PROFILE.summary}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
            >
              {[
                { icon: MapPin, text: PROFILE.location, color: "text-blue-400" },
                { icon: Mail, text: PROFILE.email, color: "text-purple-400" },
                { icon: Phone, text: PROFILE.phone, color: "text-emerald-400" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className={`w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center ${item.color} group-hover:scale-110 group-hover:border-white/30 transition-all duration-300`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">{item.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              <a 
                href={PROFILE.github} 
                target="_blank" 
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                <span className="font-semibold text-white tracking-wide">GitHub Profile</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href={PROFILE.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary/10 text-primary border border-primary/30 rounded-xl hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                <span className="font-semibold tracking-wide text-white">LinkedIn Profile</span>
                <ExternalLink className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
