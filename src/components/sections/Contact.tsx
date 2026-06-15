import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, X, Github, Linkedin, Instagram, Code2 } from 'lucide-react';
import { socials } from '../../data/socials';
import { useIsMobile, usePrefersReducedMotion } from '../../utils';
import ContactOrb from '../canvas/ContactOrb';

export default function Contact() {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  // Controlled form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate sending network latency
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      // Flush fields
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Clear toast after 4s
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 1200);
  };

  return (
    <section 
      id="contact" 
      className="relative py-28 bg-[#050505] overflow-hidden flex items-center min-h-screen border-t border-white/5"
    >
      {/* 3D background rotating orb or high-performance CSS gradient fallback on mobile */}
      {isMobile ? (
        <div className="absolute inset-0 static-gradient-bg opacity-30 pointer-events-none" />
      ) : (
        <Suspense fallback={null}>
          <ContactOrb />
        </Suspense>
      )}

      {/* Auxiliary colorful background elements */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-white/2 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-white/2 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="text-left mb-16 max-w-3xl">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase font-semibold px-3 py-1 bg-white/5 rounded-full border border-white/10">
            05 / Connect
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mt-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-neutral-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
            Interested in starting a project, validating neural topologies, or collaborating on conversational interfaces? Get in touch!
          </p>
        </div>

        {/* Form & Connection split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-12">
          
          {/* Left Column: Form component */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="h-full rounded-[2rem] border border-white/5 p-6 sm:p-8 bg-[#0a0a0ab8] backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-white">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-white tracking-wide">
                  Transmission Console
                </h3>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="form-name" className="text-xs font-mono tracking-wider text-neutral-400 uppercase font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Dhruv Patil"
                      className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-[#121212]/40 text-sm font-sans tracking-wide text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="form-email" className="text-xs font-mono tracking-wider text-neutral-400 uppercase font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="client@net.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-[#121212]/40 text-sm font-sans tracking-wide text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="form-subject" className="text-xs font-mono tracking-wider text-neutral-400 uppercase font-medium">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    id="form-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="AI System Development Collaboration"
                    className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-[#121212]/40 text-sm font-sans tracking-wide text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="form-message" className="text-xs font-mono tracking-wider text-neutral-400 uppercase font-medium">
                    Secure Payload (Message)
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter details of your project context..."
                    className="w-full px-4 py-3.5 rounded-xl border border-white/5 bg-[#121212]/40 text-sm font-sans tracking-wide text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-submit-btn"
                  className="w-full select-none font-mono py-3.5 rounded-full font-bold tracking-widest text-[#050505] bg-white hover:bg-neutral-200 flex items-center justify-center gap-2.5 cursor-pointer text-sm transition-colors duration-300"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-900 border-b-transparent"></div>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>INITIALIZE TRANSMISSION</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Connection Cards */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            {/* Context contact parameters card */}
            <div id="contact-info-card" className="rounded-[2.5rem] border border-white/5 p-6 sm:p-8 bg-[#0a0a0ab8] backdrop-blur-md space-y-6 flex-1">
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 tracking-wide uppercase">
                Contact Parameters
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                Connect via encrypted mail nodes, standard telecom frequencies, or browse active repositories across public registries.
              </p>

              <div className="space-y-4 pt-4">
                {/* Email line */}
                <a 
                  href={socials.email}
                  id="contact-side-email"
                  className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/3 transition-colors group cursor-pointer"
                >
                  <div className="p-3.5 rounded-2xl border border-white/5 bg-white/5 text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">EMAIL ADDRESS</p>
                    <p className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors font-sans font-medium">
                      sujalpatil8657231278@gmail.com
                    </p>
                  </div>
                </a>

                {/* Phone line */}
                <a 
                  href={socials.phone}
                  id="contact-side-phone"
                  className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/3 transition-colors group cursor-pointer"
                >
                  <div className="p-3.5 rounded-2xl border border-white/5 bg-white/5 text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">TELEPHONE</p>
                    <p className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors font-sans font-medium">
                      +91 8857841863
                    </p>
                  </div>
                </a>

                {/* Location line */}
                <div 
                  id="contact-side-location"
                  className="flex items-center gap-4 p-3 rounded-2xl"
                >
                  <div className="p-3.5 rounded-2xl border border-white/5 bg-white/5 text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">HQ INSTANCE</p>
                    <p className="text-sm font-semibold text-neutral-400 font-sans font-medium">
                      Nagpur, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Large Social connections card */}
            <div className="rounded-[2rem] border border-white/5 p-6 sm:p-7 bg-[#0a0a0ab8] backdrop-blur-md">
              <h4 className="font-display text-sm font-bold text-neutral-300 uppercase tracking-widest mb-4">
                Public Registries
              </h4>
              <div className="grid grid-cols-4 gap-4">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-btn-social-github"
                  className="p-3.5 rounded-2xl border border-white/5 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  aria-label="GitHub profile link"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-btn-social-linkedin"
                  className="p-3.5 rounded-2xl border border-white/5 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  aria-label="LinkedIn profile link"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-btn-social-instagram"
                  className="p-3.5 rounded-2xl border border-white/5 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  aria-label="Instagram profile link"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-btn-social-leetcode"
                  className="p-3.5 rounded-2xl border border-white/5 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  aria-label="LeetCode profile link"
                >
                  <Code2 className="h-5 w-5" />
                </a>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Glowing Success Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            id="glowing-success-toast"
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border border-white/10 bg-[#0a0a0aea] backdrop-blur-md shadow-2xl flex items-center gap-3.5 max-w-sm"
          >
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/25 text-white flex-shrink-0">
              <Check className="h-4 w-4" />
            </div>
            
            <div className="flex-1">
              <p className="font-display text-sm font-semibold text-white">
                Transmission Confirmed
              </p>
              <p className="text-xs text-neutral-400 font-sans mt-0.5 font-[400]">
                Dhruv&apos;s AI node received your details. Will respond shortly!
              </p>
            </div>

            <button
              onClick={() => setShowToast(false)}
              className="text-neutral-500 hover:text-white p-1 transition-colors self-start"
              aria-label="Close toast notification"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
