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
    label: 'LeetCode World Rank',
    targetValue: 1686729,
    suffix: '',
    highlightText: 'Global Profile Standing',
    description: 'Consistently optimizing analytical proficiency by tackling complex algorithmic and structural problems.',
    accentClass: 'from-amber-400 to-yellow-500',
    icon: Code2
  },
  {
    id: 'hackathons',
    label: 'Hackathons Championed',
    targetValue: 1,
    suffix: '',
    highlightText: 'SIH Finalist & Builder',
    description: 'Pioneered custom multimodal proctoring schemas and live streaming integrations under time-constrained sprint events.',
    accentClass: 'from-violet-600 to-fuchsia-500',
    icon: Trophy
  },
  {
    id: 'github',
    label: 'GitHub Contributions',
    targetValue: 10,
    suffix: '+',
    highlightText: 'Open Source Committer',
    description: 'Maintaining robust codebase templates, encryption utilities, interactive canvases, and portfolio modules.',
    accentClass: 'from-emerald-500 to-teal-400',
    icon: GitMerge
  },
  {
    id: 'deployed',
    label: 'Projects Deployed',
    targetValue: 6,
    suffix: '',
    highlightText: 'Active Hosted Builds',
    description: 'Successfully hosting fully responsive full-stack applications, intelligent codebases, and custom neural suites.',
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
    const totalDuration = 1800; // milliseconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(totalDuration / frameRate);
    let frame = 0;

    const counterTimer = setInterval(() => {
      frame++;
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
      className="group relative flex flex-col justify-between p-8 rounded-[2rem] border border-white/5 bg-[#0f0f0f] hover:border-white/20 hover:shadow-[0_0_45px_rgba(255,255,255,0.02)] transition-all duration-300 overflow-hidden"
    >
      <div>
        {/* Card Header & Icon */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-white">
            <IconComponent className="h-5 w-5 text-neutral-200 group-hover:scale-105 transition-transform duration-300" />
          </div>
          
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/3 border border-white/5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
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
          <span className="text-white/40 font-mono text-base font-bold select-none">&gt;</span>
        </div>

        {/* Highlight Label */}
        <p className="font-mono text-xs font-bold text-neutral-300 uppercase tracking-widest mb-4">
          {stat.label}
        </p>

        {/* Explanatory description */}
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans mb-5 font-light">
          {stat.description}
        </p>
      </div>

      {/* Verified stamp button bottom bar */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono mt-auto">
        <span className="text-neutral-500 flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-neutral-600" />
          SYSTEM_STAT_OK
        </span>
        <span className="text-white/80 font-semibold flex items-center gap-1">
          ✦ {stat.highlightText}
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
      className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Background network grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header Block resembling Client Reviews block of Image 4 */}
        <div className="text-left mb-16 max-w-3xl">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase font-semibold px-3 py-1 bg-white/5 rounded-full border border-white/10">
            04 / Benchmarks
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mt-4">
            Rankings & Achievements
          </h2>
          <p className="text-neutral-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
            Proving analytical capabilities, technical consistency, and deployment scale through tracked open-source work and competitive code statistics.
          </p>
        </div>

        {/* Counter Panel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statsData.map((stat, idx) => (
            <CounterCard key={stat.id} stat={stat} delayMultiplier={idx} />
          ))}
        </div>

        {/* Bottom Banner Stats Horizontal Block imitating Image 4 metrics footers */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
        >
          <div className="space-y-1">
            <h5 className="font-display text-3xl font-extrabold text-white">850+</h5>
            <p className="text-xs text-neutral-400 font-sans tracking-wide">LeetCode Algorithms Solved</p>
          </div>
          <div className="space-y-1 border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0 md:px-8">
            <h5 className="font-display text-3xl font-extrabold text-white">Top 1%</h5>
            <p className="text-xs text-neutral-400 font-sans tracking-wide">SIH Virtual Proctoring Finalists</p>
          </div>
          <div className="space-y-1 md:pl-8">
            <h5 className="font-display text-3xl font-extrabold text-white">Grade O</h5>
            <p className="text-xs text-neutral-400 font-sans tracking-wide">Outstanding Core UI & Prototyping virtual interns</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
