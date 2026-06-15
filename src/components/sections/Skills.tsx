import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Server, Shield, Wrench } from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { usePrefersReducedMotion } from '../../utils';

// Helper to assign a fitting icon to each skill classification
const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case 'AI/ML Core':
      return <Cpu className="h-5 w-5 text-white" />;
    case 'Web & Backend':
      return <Server className="h-5 w-5 text-white" />;
    case 'Systems & Security':
      return <Shield className="h-5 w-5 text-white" />;
    default:
      return <Wrench className="h-5 w-5 text-white" />;
  }
};

export default function Skills() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section 
      id="skills" 
      className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Visual neon grid mesh backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25"></div>
      
      {/* Blurred background dots */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-white/2 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-white/2 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header resembles Services Image 3 */}
        <div className="text-left mb-16 max-w-3xl">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase font-semibold px-3 py-1 bg-white/5 rounded-full border border-white/10">
            02 / Capabilities
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mt-4">
            Tech Arsenal
          </h2>
          <p className="text-neutral-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
            Fusing model training configurations, data embeddings, and cloud interfaces to establish reliable, agentic artificial pipelines.
          </p>
        </div>

        {/* Categories Stagger Grid resembling Card block pattern from Image 3 */}
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
                className="rounded-[2rem] border border-white/5 bg-white/2 p-6 md:p-8 hover:border-white/20 hover:shadow-[0_0_45px_rgba(255,255,255,0.02)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Category Title & Icon Wrapper */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl border border-white/10 bg-white/5 group-hover:scale-102 transition-all duration-300">
                      {getCategoryIcon(cat.category)}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide uppercase group-hover:text-neutral-200 transition-colors duration-300">
                        {cat.category}
                      </h3>
                      <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase mt-0.5 font-bold">
                        Core Stream
                      </span>
                    </div>
                  </div>

                  {/* Skills badge container */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, skillIdx) => {
                      const skillUniqueId = `skill-pill-${catIdx}-${skillIdx}`;
                      return (
                        <div
                          key={skill}
                          id={skillUniqueId}
                          className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/3 text-neutral-300 text-xs font-mono tracking-wide hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 uppercase cursor-default select-none"
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
