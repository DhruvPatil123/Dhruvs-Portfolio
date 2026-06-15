import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, HelpCircle, Code } from 'lucide-react';
import { Project, projects } from '../../data/projects';
import { usePrefersReducedMotion } from '../../utils';

// Single project component containing mouse physics tilt
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max 12 degrees rotation
    const rotateX = (centerY - y) / 12;
    const rotateY = (x - centerX) / 12;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
    setShowTooltip(false);
  };

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: prefersReduced 
            ? 'none' 
            : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transition: isHovered ? 'transform 0.05s ease-out' : 'transform 0.4s ease-out',
          transformStyle: 'preserve-3d',
        }}
        id={`project-card-${project.id}`}
        className="relative h-full flex flex-col justify-between py-8 px-8 rounded-[2rem] border border-white/5 bg-[#0f0f0f] hover:border-white/20 hover:text-white transition-all overflow-hidden"
      >
        {/* Glowing visual grid overlay backing of target card */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/2 via-transparent to-transparent opacity-40 pointer-events-none"></div>

        <div>
          {/* Badge & ID line */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
              PRJ_SYSTEM-0{project.id}
            </span>
            {project.badge && (
              <span className="px-3 py-1 text-[10px] font-mono tracking-wide text-white bg-white/5 rounded-full border border-white/10 animate-pulse">
                {project.badge}
              </span>
            )}
          </div>

          {/* Project Title */}
          <h3 className="font-display text-xl font-bold text-white mb-3 hover:text-neutral-300 transition-colors relative z-10">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans relative z-10 font-light">
            {project.description}
          </p>

          {/* Tags list */}
          <div className="flex flex-wrap gap-1.5 mb-6 relative z-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[10px] font-mono rounded-full bg-white/5 text-neutral-300 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button Controls */}
        <div className="relative mt-auto pt-4 border-t border-white/5 flex items-center justify-between z-10">
          
          {/* GitHub action anchor */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-github-btn-${project.id}`}
            aria-label={`View ${project.title} code repository on github`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-white/3 text-xs text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer font-mono"
          >
            <Github className="h-3.5 w-3.5 text-neutral-400" />
            <span>GitHub</span>
          </a>

          {/* Live Deme trigger with custom tooltip logic */}
          <div className="relative">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`project-live-btn-${project.id}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs text-white hover:border-white/40 hover:bg-white/10 transition-all cursor-pointer font-mono"
              >
                <ExternalLink className="h-3.5 w-3.5 text-neutral-300" />
                <span>Live Demo</span>
              </a>
            ) : (
              <button
                type="button"
                id={`project-live-btn-${project.id}`}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-neutral-900 bg-neutral-900/40 text-xs text-neutral-600 cursor-not-allowed font-mono relative"
              >
                <HelpCircle className="h-4 w-4 opacity-70" />
                <span>Coming Soon</span>

                {/* Styled Glowing Tooltip */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -40, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md border border-white/10 bg-[#0f0f0f] text-[9px] font-mono text-neutral-300 uppercase tracking-widest text-center whitespace-nowrap z-50 pointer-events-none"
                    >
                      Production Build Pending
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section 
      id="projects" 
      className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Visual neon radial background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/2 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/2 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16 max-w-3xl">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase font-semibold px-3 py-1 bg-white/5 rounded-full border border-white/10">
            03 / Portfolio
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mt-4">
            What I&apos;ve Built
          </h2>
          <p className="text-neutral-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
            Architecting intelligent consumer endpoints, conversational tools, and complex neural parsing mechanisms.
          </p>
        </div>

        {/* Projects Responsive Grid (3 columns desktop, 2 columns tablet, 1 column mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
