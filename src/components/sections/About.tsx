import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Award, BookOpen, Star } from 'lucide-react';
import { socials } from '../../data/socials';
import { useIsMobile, usePrefersReducedMotion } from '../../utils';
import AboutMesh from '../canvas/AboutMesh';
import Loader from '../Loader';

export default function About() {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section 
      id="about" 
      className="relative py-24 bg-[#020008] overflow-hidden"
    >
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Animated header */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-brand-secondary tracking-widest uppercase font-bold px-3 py-1 bg-brand-secondary/10 rounded-full border border-brand-secondary/20">
            01 / Profile
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
            About <span className="gradient-text">Myself</span>
          </h2>
          <div className="mt-2 h-[2px] w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto"></div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Biography */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl glass border-l-4 border-l-brand-primary glow-violet">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
                Dhruv Dinesh Patil — AI Engineer & LLM Developer
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                I&apos;m a 3rd year B.Tech AI student at JD College of Engineering, Nagpur with a CGPA of 8.76. 
                I specialize in building LLM-powered products, Agentic AI systems, and real-time GenAI applications.
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-brand-primary/25 bg-brand-primary/5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-mono">Current CGPA</p>
                  <p className="text-sm font-semibold text-white">8.76 ⭐</p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-brand-secondary/25 bg-brand-secondary/5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-secondary/10 text-brand-secondary">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-mono">Generative AI</p>
                  <p className="text-sm font-semibold text-white">Agentic Focus</p>
                </div>
              </div>
            </div>

            {/* Connection pills below bio */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href={socials.email}
                id="about-link-email"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-brand-primary/20 bg-brand-primary/5 hover:border-brand-primary hover:bg-brand-primary/15 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] text-xs sm:text-sm text-neutral-300 transition-all duration-300 cursor-pointer"
              >
                <Mail className="h-4 w-4 text-brand-secondary" />
                <span>sujalpatil8657231278@gmail.com</span>
              </a>
              <a 
                href={socials.phone}
                id="about-link-phone"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-brand-secondary/20 bg-brand-secondary/5 hover:border-brand-secondary hover:bg-brand-secondary/15 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-xs sm:text-sm text-neutral-300 transition-all duration-300 cursor-pointer"
              >
                <Phone className="h-4 w-4 text-[#06b6d4]" />
                <span>+91 8857841863</span>
              </a>
              <div 
                id="about-location-pill"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900/20 text-xs sm:text-sm text-neutral-400"
              >
                <MapPin className="h-4 w-4 text-brand-secondary" />
                <span>Nagpur, Maharashtra, India</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Torus Knot or clean alternate placeholder for mobile */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm rounded-2xl border border-brand-primary/25 bg-brand-primary/5 shadow-[0_0_20px_rgba(124,58,237,0.1)] overflow-hidden">
              {isMobile ? (
                // Beautiful fluid high-performance static fallback vector card for mobile devices
                <div className="w-full h-72 py-12 px-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10">
                  <div className="absolute top-4 right-4 text-neutral-400 font-mono text-[10px]">
                    WEBGL DEACTIVATED
                  </div>
                  <div className="h-16 w-16 rounded-full border border-brand-primary/40 flex items-center justify-center bg-brand-primary/5 animate-pulse mb-4">
                    <BookOpen className="h-8 w-8 text-brand-secondary" />
                  </div>
                  <span className="font-display text-lg font-bold text-white mb-2">Deep Tech Student</span>
                  <p className="text-xs text-neutral-400 max-w-xs leading-relaxed font-sans">
                    Fusing neural processing architectures with real-time UI nodes to bridge the gap between heavy models and consumer browsers.
                  </p>
                </div>
              ) : (
                <Suspense fallback={
                  <div className="w-full h-72 md:h-96 flex items-center justify-center bg-neutral-950/20">
                    <div className="animate-spin h-8 w-8 border-t-2 border-brand-secondary rounded-full"></div>
                  </div>
                }>
                  <AboutMesh />
                </Suspense>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
