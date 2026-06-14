import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Server, Shield, Wrench } from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { usePrefersReducedMotion } from '../../utils';

// Helper to assign a fitting icon to each skill classification
const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case 'AI/ML Core':
      return <Cpu className="h-5 w-5 text-brand-secondary" />;
    case 'Web & Backend':
      return <Server className="h-5 w-5 text-[#06b6d4]" />;
    case 'Systems & Security':
      return <Shield className="h-5 w-5 text-brand-primary" />;
    default:
      return <Wrench className="h-5 w-5 text-[#a855f7]" />;
  }
};

export default function Skills() {
  const prefersReduced = usePrefersReducedMotion();

  // Variants for staggered entrance animation of categories
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section 
      id="skills" 
      className="relative py-24 bg-[#020008] overflow-hidden"
    >
      {/* Visual neon grid mesh backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#020008_1px,transparent_1px),linear-gradient(to_bottom,#020008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      
      {/* Blurred background dots */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-brand-secondary tracking-widest uppercase font-bold px-3 py-1 bg-brand-secondary/10 rounded-full border border-brand-secondary/20">
            02 / Capabilities
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="mt-2 h-[2px] w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto"></div>
        </div>

        {/* Categories Stagger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, catIdx) => {
            const cleanId = `skills-category-${cat.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
            return (
              <motion.div
                key={cat.category}
                initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: catIdx * 0.12 }}
                id={cleanId}
                className="rounded-2xl border border-violet-500/20 bg-brand-primary/5 p-6 md:p-8 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Category Title & Icon Wrapper */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 rounded-xl border border-violet-500/30 bg-violet-950/20 shadow-[0_0_15px_rgba(139,92,246,0.2)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300">
                      {getCategoryIcon(cat.category)}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide uppercase drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] group-hover:text-violet-300 transition-colors duration-300">
                        {cat.category}
                      </h3>
                      <span className="text-[10px] font-mono text-violet-400/80 tracking-widest uppercase mt-0.5 font-bold animate-pulse">
                        Core Capability
                      </span>
                    </div>
                  </div>

                  {/* Skills badge container */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, skillIdx) => {
                      const skillUniqueId = `skill-pill-${catIdx}-${skillIdx}`;
                      return (
                        <div
                          key={skill}
                          id={skillUniqueId}
                          className="px-3.5 py-1.5 rounded-lg border border-violet-500/30 bg-violet-950/10 text-neutral-300 text-xs sm:text-sm font-sans tracking-wide hover:text-white hover:border-violet-500 hover:bg-violet-950/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 transition-all duration-300 uppercase cursor-default select-none"
                        >
                          {skill}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
