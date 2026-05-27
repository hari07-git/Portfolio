import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Send, Mail } from 'lucide-react';
import { PROFILE } from '../data';
import { useState } from 'react';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  // Magnetic Button Logic
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);

  const buttonMouseXSpring = useSpring(buttonX, { stiffness: 150, damping: 15, mass: 0.1 });
  const buttonMouseYSpring = useSpring(buttonY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleButtonMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    buttonX.set(middleX * 0.2);
    buttonY.set(middleY * 0.2);
  };

  const handleButtonMouseLeave = () => {
    buttonX.set(0);
    buttonY.set(0);
  };

  return (
    <section id="contact" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto glass rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Background Glow */}
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="grid lg:grid-cols-2 gap-16 relative z-10 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">Connect</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light">
                I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open!
              </p>
              
              <div className="flex gap-6">
                {[
                  { icon: GithubIcon, href: PROFILE.github, color: "hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" },
                  { icon: LinkedinIcon, href: PROFILE.linkedin, color: "hover:border-primary hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]" },
                  { icon: Mail, href: `mailto:${PROFILE.email}`, color: "hover:border-secondary hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]" }
                ].map((item, i) => (
                  <motion.a 
                    key={i}
                    href={item.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 ${item.color}`}
                  >
                    <item.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 bg-[#030014]/50 p-8 rounded-3xl border border-white/5 backdrop-blur-md" 
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors focus:shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="Your Email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors focus:shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea 
                  id="message" 
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  placeholder="Your Message"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors resize-none focus:shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                ></textarea>
              </div>
              <motion.button 
                type="submit"
                style={{ x: buttonMouseXSpring, y: buttonMouseYSpring }}
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
