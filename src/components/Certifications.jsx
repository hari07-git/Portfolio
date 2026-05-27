import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PROFILE } from '../data';
import { Award, ShieldCheck, FileBadge, ExternalLink, Calendar } from 'lucide-react';

function CertificationCard({ cert, index }) {
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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

  // Neon glows based on issuer
  const getGlowColor = (issuer) => {
    switch (issuer.toLowerCase()) {
      case 'servicenow':
        return 'from-emerald-500/20 to-teal-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]';
      case 'ibm skillsbuild':
        return 'from-blue-500/20 to-cyan-500/20 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]';
      case 'hackerrank':
        return 'from-green-500/20 to-emerald-500/20 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]';
      case 'achievers it institution':
        return 'from-purple-500/20 to-indigo-500/20 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]';
      default:
        return 'from-primary/20 to-secondary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]';
    }
  };

  const getIcon = (issuer) => {
    switch (issuer.toLowerCase()) {
      case 'servicenow':
        return <ShieldCheck className="w-8 h-8 text-emerald-400" />;
      case 'ibm skillsbuild':
        return <Award className="w-8 h-8 text-blue-400" />;
      default:
        return <FileBadge className="w-8 h-8 text-primary-400" />;
    }
  };

  const cardColors = getGlowColor(cert.issuer);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="perspective-[1000px] w-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`w-full h-full relative rounded-3xl border border-white/10 bg-[#07051b]/80 backdrop-blur-xl p-8 transition-all duration-500 group cursor-pointer ${cardColors}`}
      >
        {/* Holographic Mouse Radial Glow */}
        <motion.div 
          className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 z-0 mix-blend-screen pointer-events-none"
          style={{
            background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(14,165,233,0.15), transparent 60%)`
          }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: "translateZ(30px)" }}>
          <div>
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                {getIcon(cert.issuer)}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <Calendar className="w-3.5 h-3.5" />
                {cert.date}
              </div>
            </div>

            {/* Title & Issuer */}
            <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
              {cert.name}
            </h3>
            <p className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-1.5">
              <span>{cert.issuer}</span>
              {cert.id && cert.id !== "Certified" && cert.id !== "Completed" && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span className="text-gray-500 font-mono text-xs">{cert.id}</span>
                </>
              )}
            </p>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
              {cert.summary}
            </p>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Verified Credential
            </span>
            <span className="text-gray-500 text-xs font-mono group-hover:text-white transition-colors flex items-center gap-1">
              Verify Link <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  const certs = PROFILE.certifications || [];

  return (
    <section id="certifications" className="py-32 relative z-10 overflow-hidden bg-[#030014]">
      {/* Background neon dust circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Credentials</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light">
            Professional certifications, industry credentials, and skill verifications.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {certs.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
