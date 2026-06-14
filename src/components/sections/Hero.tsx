import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Code2, ArrowDown, Download } from 'lucide-react';
import { socials } from '../../data/socials';
import { useIsMobile, usePrefersReducedMotion } from '../../utils';
import HeroScene from '../canvas/HeroScene';
import Loader from '../Loader';
import GlitchShaderText from '../canvas/GlitchShaderText';

const titles = [
  "AI Engineer",
  "LLM Developer",
  "GenAI Builder",
  "Prompt Engineer",
  "Agentic AI Developer"
];

export default function Hero() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriting state machine
  useEffect(() => {
    const currentFullTitle = titles[currentTitleIndex];
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(currentFullTitle.substring(0, currentText.length + 1));
        if (currentText === currentFullTitle) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1400);
          return;
        }
      } else {
        // Deleting
        setCurrentText(currentFullTitle.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          return;
        }
      }

      const delay = isDeleting ? 30 : 80;
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, isDeleting ? 40 : 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex]);

  // Transition handler
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      window.scrollTo({
        top: projectsEl.offsetTop - 85,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020008]"
    >
      {/* 3D Wireframe Canvas Backdrop or high performance css gradient for mobiles */}
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          <div className="absolute inset-0 static-gradient-bg" />
        ) : (
          <Suspense fallback={<Loader />}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      {/* Futuristic Purple & Cyan blurred ambient glows with active central contrast shield */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,0,8,0.72)_0%,rgba(2,0,8,0.3)_60%,rgba(2,0,8,0)_100%)] z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-secondary/8 ml-auto rounded-full blur-3xl pointer-events-none animate-pulse-slow z-10" />

      {/* Floating Left Sidebar Social Navigation (Hidden on small screens) */}
      <div className="absolute left-6 lg:left-10 bottom-1/4 hidden md:flex flex-col items-center space-y-6 z-25">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-brand-primary/60"></div>
        
        <a 
          href={socials.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          id="hero-social-github"
          className="p-2 text-neutral-300 hover:text-white hover:shadow-[0_0_15px_rgba(124,58,237,0.7)] hover:border-brand-primary/50 border border-transparent rounded-lg transition-all duration-300 bg-neutral-900/10 backdrop-blur-xs"
          aria-label="GitHub Profile"
        >
          <Github className="h-5 w-5" />
        </a>
        <a 
          href={socials.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          id="hero-social-linkedin"
          className="p-2 text-neutral-300 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.7)] hover:border-brand-secondary/50 border border-transparent rounded-lg transition-all duration-300 bg-neutral-900/10 backdrop-blur-xs"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a 
          href={socials.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          id="hero-social-instagram"
          className="p-2 text-neutral-300 hover:text-white hover:shadow-[0_0_15px_rgba(124,58,237,0.7)] hover:border-brand-primary/50 border border-transparent rounded-lg transition-all duration-300 bg-neutral-900/10 backdrop-blur-xs"
          aria-label="Instagram Profile"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a 
          href={socials.leetcode} 
          target="_blank" 
          rel="noopener noreferrer" 
          id="hero-social-leetcode"
          className="p-2 text-neutral-300 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.7)] hover:border-brand-secondary/50 border border-transparent rounded-lg transition-all duration-300 bg-neutral-900/10 backdrop-blur-xs"
          aria-label="LeetCode Profile"
        >
          <Code2 className="h-5 w-5" />
        </a>

        <div className="w-[1px] h-20 bg-gradient-to-t from-transparent to-brand-secondary/60"></div>
      </div>

      {/* Main HTML Text Layout - Layered perfectly above the 3D WebGL Canvas Backdrop */}
      <div className="relative z-30 text-center px-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { y: 25, opacity: 0 }}
          animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          {/* Tagline floating badge */}
          <div>
            <span className="font-mono text-xs md:text-sm tracking-widest text-[#22d3ee] uppercase font-bold px-4 py-1.5 bg-[#06b6d4]/15 rounded-full border border-[#26c6da]/40 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.25)] inline-block">
              Welcome to the AI Horizon
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-none select-text">
            <span className="block text-white text-3xl sm:text-5xl font-light tracking-wide mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Hello, I&apos;m
            </span>
            <GlitchShaderText
              text="Dhruv Dinesh Patil"
              className="drop-shadow-[0_0_35px_rgba(124,58,237,0.25)]"
            />
          </h1>

          {/* Typewriter element */}
          <div className="h-10 sm:h-12 flex items-center justify-center">
            <p className="font-mono text-lg sm:text-xl md:text-2xl text-neutral-200 flex items-center select-text drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
              <span className="text-[#22d3ee] mr-2.5 font-bold font-sans">&gt;</span>
              <span className="text-white font-bold">{currentText}</span>
              <span className="inline-block w-2.5 h-6 ml-1.5 bg-[#22d3ee] animate-typewriter-blink"></span>
            </p>
          </div>

          <p className="text-neutral-100 max-w-xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-sans font-medium select-text drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
            AI Engineer & Generative Model developer crafting high-performance agentic frameworks, large language models, and cloud-native solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              id="hero-cta-projects"
              className="neon-btn-primary px-8 py-3.5 rounded-full font-display text-sm font-semibold tracking-wider text-white w-full sm:w-auto text-center"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download="Dhruv_Dinesh_Patil_Resume.pdf"
              id="hero-cta-resume"
              className="neon-btn-secondary px-8 py-3.5 rounded-full font-display text-sm font-semibold tracking-wider text-neutral-200 border w-full sm:w-auto flex items-center justify-center gap-2 text-center"
            >
              <Download className="h-4 w-4 text-brand-secondary" />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Down arrow scroll helper */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            const aboutEl = document.getElementById('about');
            if (aboutEl) {
              window.scrollTo({
                top: aboutEl.offsetTop - 85,
                behavior: 'smooth'
              });
            }
          }}
          id="hero-scroll-btn"
          className="p-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-brand-secondary/50 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="h-5 w-5 text-brand-secondary" />
        </a>
      </div>
    </section>
  );
}
