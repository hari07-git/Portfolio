import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PROFILE } from '../data';

export default function Skills() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Flatten all skills and categorize them into 3 rings
  const rings = [
    PROFILE.skills[0]?.items || [],
    PROFILE.skills[1]?.items || [],
    [...(PROFILE.skills[2]?.items || []), ...(PROFILE.skills[3]?.items || [])]
  ];

  const ringSizes = [300, 450, 600];
  const ringSpeeds = [25, 35, 45];
  const ringDirections = [1, -1, 1]; // 1 for clockwise, -1 for counter-clockwise

  return (
    <section id="skills" className="py-32 relative z-10 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Galaxy</span>
          </h2>
          <p className="text-gray-400 text-lg">My ecosystem of languages, frameworks, and tools.</p>
        </motion.div>

        {/* Orbit Galaxy Container */}
        <div className="relative w-full h-[500px] md:h-[800px] flex items-center justify-center scale-75 sm:scale-90 md:scale-100">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

          {/* Central Core */}
          <motion.div 
            className="absolute z-20 w-32 h-32 md:w-40 md:h-40 rounded-full glass border border-primary/40 flex items-center justify-center flex-col shadow-[0_0_40px_rgba(14,165,233,0.3)] backdrop-blur-xl"
            whileHover={{ scale: 1.1, boxShadow: "0 0 60px rgba(14,165,233,0.6)" }}
          >
            <div className="text-white font-bold text-xl md:text-2xl text-glow tracking-wider">CORE</div>
            <div className="text-primary text-xs md:text-sm font-mono mt-1">STACK</div>
          </motion.div>

          {/* Rings */}
          {rings.map((ringSkills, ringIndex) => {
            const radius = ringSizes[ringIndex] / 2;
            const duration = ringSpeeds[ringIndex];
            const direction = ringDirections[ringIndex];
            
            return (
              <motion.div
                key={`ring-${ringIndex}`}
                className="absolute rounded-full border border-white/5"
                style={{
                  width: ringSizes[ringIndex],
                  height: ringSizes[ringIndex],
                }}
                animate={{ rotate: 360 * direction }}
                transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
              >
                {ringSkills.map((skill, skillIndex) => {
                  const angle = (skillIndex / ringSkills.length) * 2 * Math.PI;
                  // Calculate position on the circle boundary
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={skill}
                      className="absolute flex items-center justify-center"
                      style={{
                        left: '50%',
                        top: '50%',
                        x,
                        y,
                        // Offset by -50% to center the node exactly on the line
                        marginLeft: '-50px', // assuming node max width 100px
                        marginTop: '-20px',  // assuming node max height 40px
                        width: '100px',
                        height: '40px'
                      }}
                    >
                      {/* Counter-rotation to keep text upright */}
                      <motion.div
                        animate={{ rotate: -360 * direction }}
                        transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                        className="group relative flex flex-col items-center justify-center w-full h-full cursor-pointer"
                        whileHover={{ scale: 1.3, zIndex: 50 }}
                      >
                        <div className="px-4 py-2 bg-[#0a0a1a]/80 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-gray-300 group-hover:text-white group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all whitespace-nowrap">
                          {skill}
                        </div>
                        {/* Hover Proficiency Tooltip */}
                        <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md border border-white/20 text-xs px-2 py-1 rounded text-primary whitespace-nowrap">
                          Proficiency: High
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
