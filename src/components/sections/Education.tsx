import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, Award, CheckCircle2 } from 'lucide-react';
import { educationData } from '../../data/education';
import { usePrefersReducedMotion } from '../../utils';

export default function Education() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section 
      id="education" 
      className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Background visual cues */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-white/2 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-2/3 right-0 w-80 h-80 bg-white/2 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16 max-w-3xl">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase font-semibold px-3 py-1 bg-white/5 rounded-full border border-white/10">
            04 / Resume
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mt-4">
            Academic Journey
          </h2>
          <p className="text-neutral-400 mt-4 text-base sm:text-lg font-light leading-relaxed select-text">
            Tracing foundations from pure computer science principles, mathematical frameworks, and advanced system designs.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative mt-12 max-w-4xl mx-auto">
          {/* Central subtle track line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px] bg-white/10 opacity-60"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {educationData.map((item, index) => {
              const isEven = index % 2 === 0;

              // Sliding keyframes depending on odd vs even column layout
              const slideDirectionX = prefersReduced ? 0 : (isEven ? -60 : 60);

              const cardId = `edu-card-${item.id}`;
              const markerId = `edu-marker-${item.id}`;

              return (
                <div 
                  key={item.id} 
                  className={`flex flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } items-start md:items-center relative`}
                >
                  {/* Sphere marker dot on Central spine track line */}
                  <div 
                    id={markerId}
                    className="absolute left-4 md:left-1/2 -translate-x-[13px] z-10 flex items-center justify-center"
                    style={{ top: '24px' }}
                  >
                    <div className="h-6 w-6 rounded-full bg-[#050505] border-2 border-neutral-400 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-neutral-400"></div>
                    </div>
                  </div>

                  {/* Spacer Column in desktop grid alignment */}
                  <div className="hidden md:block w-1/2"></div>

                  {/* Main Timeline Card Column */}
                  <motion.div
                    initial={prefersReduced ? {} : { opacity: 0, x: slideDirectionX }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    id={cardId}
                    className="ml-12 md:ml-0 md:w-1/2 px-4 md:px-8"
                  >
                    <div className="relative flex flex-col justify-between py-8 px-8 rounded-[2rem] border border-white/5 bg-[#0f0f0f] hover:border-white/20 hover:shadow-[0_0_45px_rgba(255,255,255,0.02)] transition-all duration-300">
                      {/* Top banner labels */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 border-b border-white/5 pb-4">
                        <span className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                          <Calendar className="h-4 w-4 text-neutral-500" />
                          {item.duration}
                        </span>
                        {item.badge && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-white/5 text-neutral-300 border border-white/10 uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Header title */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 mt-1 text-white">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-white tracking-wide">
                            {item.degree}
                          </h3>
                          <p className="text-neutral-400 text-sm leading-snug mt-1 flex items-center gap-1.5 font-sans">
                            {item.institution}
                          </p>
                        </div>
                      </div>

                      {/* Score metrics */}
                      {item.grade && (
                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121212] border border-white/5 text-sm text-white font-mono font-bold">
                          <Award className="h-4 w-4 text-neutral-400" />
                          <span>{item.grade}</span>
                        </div>
                      )}

                      {/* Custom points bullet details */}
                      {item.details && (
                        <ul className="space-y-2 mt-2">
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx} className="text-xs sm:text-sm text-neutral-400 flex items-start gap-2.5 leading-relaxed font-sans font-[400]">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-neutral-500 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
