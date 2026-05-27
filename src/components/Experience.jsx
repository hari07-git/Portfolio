import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PROFILE } from '../data';
import { Briefcase, GraduationCap } from 'lucide-react';

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const allItems = [
    ...PROFILE.experience.map(item => ({ ...item, type: 'experience' })),
    ...PROFILE.education.map(item => ({ ...item, type: 'education' }))
  ];

  return (
    <section id="experience" className="py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Journey</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light">The timeline of my academic and professional evolution.</p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative" ref={containerRef}>
          {/* Static Background Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2 z-0"></div>
          
          {/* Animated Glowing Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 z-0">
            <motion.div 
              className="absolute top-0 w-[3px] bg-gradient-to-b from-primary via-purple-500 to-secondary -translate-x-[1px] shadow-[0_0_20px_rgba(14,165,233,1)]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-24">
            {allItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const isEdu = item.type === 'education';
              const Icon = isEdu ? GraduationCap : Briefcase;
              const colorClass = isEdu ? "text-secondary" : "text-primary";
              const borderColor = isEdu ? "border-secondary" : "border-primary";
              const shadowColor = isEdu ? "shadow-[0_0_20px_rgba(139,92,246,0.6)]" : "shadow-[0_0_20px_rgba(14,165,233,0.6)]";
              
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                  
                  {/* Left Side (Desktop) */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`md:w-1/2 w-full pl-20 md:pl-0 md:pr-16 flex ${!isEven ? 'md:justify-end md:text-right' : 'md:justify-start md:order-2 md:pl-16'}`}
                  >
                    <div className="glass p-8 rounded-3xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-500 w-full relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r ${isEdu ? 'from-secondary/5' : 'from-primary/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`}></div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">{isEdu ? item.degree : item.title}</h3>
                      <p className={`${colorClass} font-semibold text-lg mb-2`}>{isEdu ? item.school : item.company}</p>
                      <p className="text-gray-500 text-sm mb-4 font-mono">{item.start} - {item.end} {item.location && `| ${item.location}`}</p>
                      
                      {isEdu ? (
                        <p className="text-gray-300 leading-relaxed">{item.notes}</p>
                      ) : (
                        <>
                          <p className="text-gray-300 leading-relaxed mb-4">{item.summary}</p>
                          <ul className="list-disc list-inside text-gray-400 text-sm space-y-2 marker:text-primary">
                            {item.bullets.map((bullet, i) => (
                              <li key={i}>{bullet}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </motion.div>
                  
                  {/* Node */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                    className={`absolute left-8 md:left-1/2 w-12 h-12 rounded-full bg-[#030014] border-4 ${borderColor} flex items-center justify-center -translate-x-1/2 ${shadowColor} z-10`}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Icon className={`w-5 h-5 ${colorClass}`} />
                    </motion.div>
                  </motion.div>

                  {/* Empty Spacer for Desktop Layout */}
                  <div className={`hidden md:block md:w-1/2 ${!isEven ? 'md:order-1' : ''}`}></div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
