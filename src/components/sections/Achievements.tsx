import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Trophy, Code2, GitMerge, Rocket, Award, Zap, Terminal, Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from '../../utils';

interface AchievementStat {
  id: string;
  label: string;
  targetValue: number;
  suffix: string;
  highlightText: string;
  description: string;
  accentClass: string; // Tailwind color class for borders/glows
  icon: React.ComponentType<{ className?: string }>;
}

const statsData: AchievementStat[] = [
  {
    id: 'leetcode',
    label: 'LeetCode Problems',
    targetValue: 850,
    suffix: '+',
    highlightText: 'Top 5% Coding Contest Ranking',
    description: 'Expert algorithms & data structures practice solved across LeetCode, CodeChef, and HackerRank.',
    accentClass: 'from-amber-500 to-yellow-400',
    icon: Code2
  },
  {
    id: 'hackathons',
    label: 'Hackathons Sprint',
    targetValue: 3,
    suffix: '',
    highlightText: 'SIH Finalist & Campus Winner',
    description: 'Pioneered multimodal proctoring and real-time LLM agents in competitive, time-critical 36hr hackathons.',
    accentClass: 'from-violet-600 to-fuchsia-500',
    icon: Trophy
  },
  {
    id: 'github',
    label: 'GitHub Contributions',
    targetValue: 1200,
    suffix: '+',
    highlightText: 'Active Open Source Dev',
    description: 'Maintained AI agent libraries, UI frameworks (UnoUI), secure crypto packages, and system templates.',
    accentClass: 'from-emerald-500 to-teal-400',
    icon: GitMerge
  },
  {
    id: 'deployed',
    label: 'Production Deployed',
    targetValue: 12,
    suffix: '+',
    highlightText: 'Full-Stack Agentic Webapps',
    description: 'Ranging from global interview proctoring systems to high-fidelity diffusion canvases and NLP consoles.',
    accentClass: 'from-[#06b6d4] to-blue-500',
    icon: Rocket
  }
];

// Single counter element that counts up when it appears in the viewport
function CounterCard({ stat, delayMultiplier }: { stat: AchievementStat; delayMultiplier: number }) {
  const [currentVal, setCurrentVal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isCurrentlyInView = useInView(cardRef, { once: true, margin: '-60px' });
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!isCurrentlyInView) return;
    if (prefersReduced) {
      setCurrentVal(stat.targetValue);
      return;
    }

    let start = 0;
    const end = stat.targetValue;
    // Set duration proportionate to target but capped for standard responsive loading
    const totalDuration = 1800; // milliseconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(totalDuration / frameRate);
    let frame = 0;

    const counterTimer = setInterval(() => {
      frame++;
      // Easing out quadratic function for smooth final count decelerating
      const progress = frame / totalFrames;
      const easeOutQuad = progress * (2 - progress);
      const currentNumber = Math.round(easeOutQuad * end);

      if (currentNumber >= end) {
        setCurrentVal(end);
        clearInterval(counterTimer);
      } else {
        setCurrentVal(currentNumber);
      }
    }, frameRate);

    return () => clearInterval(counterTimer);
  }, [isCurrentlyInView, stat.targetValue, prefersReduced]);

  const IconComponent = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReduced ? {} : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: delayMultiplier * 0.15 }}
      className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass border border-brand-primary/10 bg-brand-primary/4 hover:border-brand-secondary/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.15)] transition-all duration-300 overflow-hidden"
    >
      {/* Background soft color splash on hover */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tr ${stat.accentClass} opacity-0 group-hover:opacity-[0.06] rounded-full blur-2xl pointer-events-none transition-all duration-500`} />

      <div>
        {/* Card Header & Icon */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-tr ${stat.accentClass} bg-opacity-10 text-white shadow-lg`}>
            <IconComponent className="h-6 w-6 text-white group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
          </div>
          
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className={`w-2 h-2 rounded-full bg-gradient-to-tr ${stat.accentClass} animate-pulse`} />
            <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider">
              {stat.id}
            </span>
          </div>
        </div>

        {/* Counter Number */}
        <div className="flex items-baseline gap-1 mb-2">
          <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
            {currentVal.toLocaleString()}{stat.suffix}
          </h3>
          <span className="text-brand-secondary font-mono text-lg font-bold select-none">&gt;</span>
        </div>

        {/* Highlight Label */}
        <p className="font-mono text-xs font-bold text-neutral-200 uppercase tracking-widest mb-4">
          {stat.label}
        </p>

        {/* Explanatory description */}
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans mb-5 font-[400]">
          {stat.description}
        </p>
      </div>

      {/* Verified stamp button bottom bar */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono mt-auto">
        <span className="text-neutral-500 flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-neutral-600" />
          SYSTEM_STAT_OK
        </span>
        <span className="text-[#06b6d4] font-semibold flex items-center gap-1">
          <Zap className="h-3.5 w-3.5 animate-bounce" style={{ animationDuration: '2.5s' }} />
          {stat.highlightText}
        </span>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section 
      id="achievements" 
      className="relative py-24 bg-[#020008] overflow-hidden border-t border-violet-500/10"
    >
      {/* Background network grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none opacity-20"></div>

      {/* Cyber glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-primary/4 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-secondary/4 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-brand-secondary tracking-widest uppercase font-bold px-3 py-1 bg-brand-secondary/10 rounded-full border border-brand-secondary/20">
            04 / Benchmarks
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
            Rankings & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed font-sans font-[400]">
            Proving analytical capabilities, technical consistency, and deployment scale through tracked open-source work and competitive code statistics.
          </p>
          <div className="mt-4 h-[2px] w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto" />
        </div>

        {/* Counter Panel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <CounterCard key={stat.id} stat={stat} delayMultiplier={idx} />
          ))}
        </div>

        {/* Bottom Banner info */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 p-4 rounded-xl border border-white/5 bg-white/2 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-yellow-500/10 text-yellow-500 hidden sm:block">
              <Award className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold tracking-wide font-display">
                Competitive Coding Profile Verified
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-sans">
                My LeetCode submissions are benchmarked under optimized space complexity constraints.
              </p>
            </div>
          </div>
          
          <a
            href="https://linkedin.com/in/dhruv-dinesh-patil"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[11px] text-white font-mono font-bold hover:text-brand-secondary transition-colors duration-200 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10"
            id="achievements-profile-verify-button"
          >
            View GitHub Commits
          </a>
        </motion.div>

      </div>
    </section>
  );
}
