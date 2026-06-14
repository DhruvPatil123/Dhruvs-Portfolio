import React from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, Calendar, ShieldCheck, BadgeCheck, Sparkles } from 'lucide-react';
import { certifications, Certification } from '../../data/certifications';
import { usePrefersReducedMotion } from '../../utils';

// Brand-specific custom vectors to render as highly polished credentials/badge symbols
const BrandBadgeVector = ({ type }: { type: Certification['logoType'] }) => {
  switch (type) {
    case 'google':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(37,99,235,0.4)] animate-pulse-slow">
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-blue-500/30" />
          {/* Inner Hexagram Layout representing GCP */}
          <path d="M60 20 L95 40 L95 80 L60 100 L25 80 L25 40 Z" fill="rgba(37,99,235,0.05)" stroke="currentColor" strokeWidth="3" className="text-blue-500" />
          <path d="M60 28 L88 44 L88 76 L60 92 L32 76 L32 44 Z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400" />
          {/* Hexagon vertices details */}
          <circle cx="60" cy="20" r="4.5" fill="#ef4444" />
          <circle cx="95" cy="40" r="4.5" fill="#3b82f6" />
          <circle cx="95" cy="80" r="4.5" fill="#f59e0b" />
          <circle cx="60" cy="100" r="4.5" fill="#10b981" />
          <circle cx="25" cy="80" r="4.5" fill="#3b82f6" />
          <circle cx="25" cy="40" r="4.5" fill="#f59e0b" />
          {/* Center Cloud Core Symbol */}
          <path d="M48 68 C45 68 43 66 43 63 C43 60 45 58 48 58 C49 54 53 51 57 51 C61 51 65 54 66 58 C69 58 71 60 71 63 C71 66 69 68 66 68 Z" fill="currentColor" className="text-blue-400" />
        </svg>
      );
    case 'deeplearning':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" className="text-emerald-500/30" />
          {/* Ring Lattice Structure */}
          <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500/40" />
          <circle cx="60" cy="60" r="16" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-emerald-300" />
          
          {/* Interconnected Neural Nodes */}
          <line x1="60" y1="24" x2="88" y2="72" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" />
          <line x1="88" y1="72" x2="32" y2="72" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" />
          <line x1="32" y1="72" x2="60" y2="24" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" />
          
          <line x1="60" y1="60" x2="60" y2="24" stroke="currentColor" strokeWidth="1" className="text-teal-400" />
          <line x1="60" y1="60" x2="88" y2="72" stroke="currentColor" strokeWidth="1" className="text-teal-400" />
          <line x1="60" y1="60" x2="32" y2="72" stroke="currentColor" strokeWidth="1" className="text-teal-400" />

          {/* Glowing node vertices */}
          <circle cx="60" cy="24" r="6" fill="#10b981" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="60" cy="24" r="5" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
          
          <circle cx="88" cy="72" r="5" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="32" cy="72" r="5" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="7" fill="#34d399" />
          <circle cx="60" cy="60" r="4" fill="#ffffff" />
        </svg>
      );
    case 'huggingface':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500/20" />
          {/* Certificate Badge Starburst Border */}
          <path d="M 60,15 L 70,30 L 86,26 L 85,42 L 100,48 L 91,62 L 100,76 L 85,82 L 86,98 L 70,94 L 60,109 L 50,94 L 34,98 L 35,82 L 20,76 L 29,62 L 20,48 L 35,42 L 34,26 L 50,30 Z" fill="rgba(245,158,11,0.06)" stroke="currentColor" strokeWidth="2" className="text-amber-500" />
          
          {/* Adorable Emoticon Shape customized for tech credits */}
          <circle cx="60" cy="60" r="24" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          {/* Cute face components */}
          <ellipse cx="51" cy="56" rx="2" ry="3.5" fill="#78350f" />
          <ellipse cx="69" cy="56" rx="2" ry="3.5" fill="#78350f" />
          {/* Smiling mouth */}
          <path d="M 52,65 A 8,8 0 0,0 68,65" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
          {/* Cute pink cheeks */}
          <circle cx="45" cy="61" r="2.5" fill="#f472b6" opacity="0.8" />
          <circle cx="75" cy="61" r="2.5" fill="#f472b6" opacity="0.8" />
          {/* Glowing Crown Star */}
          <polygon points="60,30 63,37 70,37 65,42 67,49 60,45 53,49 55,42 50,37 57,37" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        </svg>
      );
    case 'coursera':
      return (
        <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(59,130,246,0.35)]">
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-500/20" />
          {/* Double ring structure */}
          <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500" />
          {/* Crest emblem inside */}
          <path d="M44 48 C44 40, 76 40, 76 48 L76 72 C76 80, 44 80, 44 72 Z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-blue-500" />
          {/* Modern Ribbon Accent */}
          <path d="M48 80 L35 106 L55 98 L75 106 L62 80" fill="currentColor" stroke="none" className="text-indigo-600" opacity="0.6" />
          <path d="M52 80 L42 106 L55 98 L68 106 L58 80" fill="currentColor" stroke="none" className="text-indigo-400" />
          {/* Verification checkmark crown */}
          <circle cx="60" cy="56" r="10" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
          <path d="M56 56 L59 59 L65 53" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Certifications() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section 
      id="certifications" 
      className="relative py-24 bg-[#020008] overflow-hidden border-t border-violet-500/10"
    >
      {/* Dynamic light/dark theme grid mesh backdrop matching the stack style perfectly */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-25"></div>
      
      {/* Cyber ambient purple glows behind cards */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-brand-secondary tracking-widest uppercase font-bold px-3 py-1 bg-brand-secondary/10 rounded-full border border-brand-secondary/20">
            05 / Credentials
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
            Industry <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed font-sans font-[400] select-text">
            Verified expertise in Deep Learning, Large Language Models, Agentic reasoning, and cloud-native machine learning architectures.
          </p>
          <div className="mt-4 h-[2px] w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto"></div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            const cleanId = `cert-card-${cert.id}`;
            return (
              <motion.div
                key={cert.id}
                initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                id={cleanId}
                className="group relative flex flex-col justify-between py-6 px-6 rounded-2xl glass border border-brand-primary/10 bg-brand-primary/4 hover:border-brand-secondary/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.18)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Embedded Glow Accents */}
                <div className="absolute -top-1.5 -right-1.5 w-12 h-12 bg-brand-secondary/5 rounded-full blur-xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                
                {/* Brand Badge Icon & Header Header Row */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="shrink-0 scale-95 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <BrandBadgeVector type={cert.logoType} />
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                      <Calendar className="h-3.5 w-3.5 text-brand-secondary" />
                      {cert.date}
                    </span>
                    <span className="px-2.5 py-0.5 mt-2 rounded-full text-[9px] font-mono font-semibold tracking-wider bg-white/5 border border-white/10 text-neutral-300 uppercase">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                {/* Certification Title & Issuer details */}
                <div className="mb-4">
                  <h3 className="font-display text-lg font-bold text-white tracking-wide group-hover:text-brand-secondary transition-colors duration-200">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-400/90 font-mono font-semibold uppercase tracking-wide">
                      Verified Skill-Set
                    </span>
                  </div>
                </div>

                {/* Skill Badges Acquired */}
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-[10px] font-sans font-medium bg-brand-primary/10 border border-brand-primary/25 text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer interactive buttons (Verify Link) */}
                <div className="pt-4 border-t border-white/5 mt-auto flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5 text-brand-primary" />
                    Authentic Credential
                  </span>
                  
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-secondary hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] px-3 py-1.5 rounded-lg border border-brand-secondary/20 hover:bg-brand-secondary/10 hover:border-brand-secondary/40"
                    id={`cert-${cert.id}-verify-button`}
                  >
                    Verify
                    <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
