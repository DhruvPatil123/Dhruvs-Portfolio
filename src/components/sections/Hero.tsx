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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
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

      {/* Futuristic Obsidian blurred ambient glows with active central contrast shield */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.72)_0%,rgba(5,5,5,0.3)_60%,rgba(5,5,5,0)_100%)] z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/3 rounded-full blur-3xl pointer-events-none animate-pulse-slow z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/2 ml-auto rounded-full blur-3xl pointer-events-none animate-pulse-slow z-10" />

      {/* Floating Left Sidebar Social Navigation (Hidden on small screens) */}
      <div className="absolute left-6 lg:left-10 bottom-1/4 hidden md:flex flex-col items-center space-y-6 z-25">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-white/20"></div>
        
        <a 
          href={socials.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          id="hero-social-github"
          className="p-2 text-neutral-400 hover:text-white hover:border-white/30 border border-white/5 rounded-lg transition-all duration-300 bg-white/3 backdrop-blur-xs"
          aria-label="GitHub Profile"
        >
          <Github className="h-5 w-5" />
        </a>
        <a 
          href={socials.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          id="hero-social-linkedin"
          className="p-2 text-neutral-400 hover:text-white hover:border-white/30 border border-white/5 rounded-lg transition-all duration-300 bg-white/3 backdrop-blur-xs"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a 
          href={socials.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          id="hero-social-instagram"
          className="p-2 text-neutral-400 hover:text-white hover:border-white/30 border border-white/5 rounded-lg transition-all duration-300 bg-white/3 backdrop-blur-xs"
          aria-label="Instagram Profile"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a 
          href={socials.leetcode} 
          target="_blank" 
          rel="noopener noreferrer" 
          id="hero-social-leetcode"
          className="p-2 text-neutral-400 hover:text-white hover:border-white/30 border border-white/5 rounded-lg transition-all duration-300 bg-white/3 backdrop-blur-xs"
          aria-label="LeetCode Profile"
        >
          <Code2 className="h-5 w-5" />
        </a>

        <div className="w-[1px] h-20 bg-gradient-to-t from-transparent to-white/20"></div>
      </div>

      {/* Main HTML Text Layout - Layered perfectly above the 3D WebGL Canvas Backdrop */}
      <div className="relative z-30 text-center px-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { y: 25, opacity: 0 }}
          animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          {/* Tagline floating badge resembling Image 1 */}
          <div>
            <span className="font-mono text-xs md:text-xs tracking-widest text-neutral-300 uppercase font-semibold px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md shadow-md inline-block">
              ✦ &nbsp; Crafting Intelligent Generative Architectures &nbsp; ✦
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-none select-text">
            <span className="block text-neutral-400 text-lg sm:text-2xl font-light tracking-widest uppercase mb-4">
              Hello, I&apos;m
            </span>
            <GlitchShaderText
              text="Dhruv Dinesh Patil"
              className="drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-clip-text text-white"
            />
          </h1>

          {/* Typewriter element inside a code container */}
          <div className="h-10 sm:h-12 flex items-center justify-center">
            <p className="font-mono text-base sm:text-lg md:text-xl text-neutral-300 flex items-center select-text bg-white/3 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
              <span className="text-white/40 mr-2.5 font-bold font-sans">&gt;</span>
              <span className="text-white font-bold">{currentText}</span>
              <span className="inline-block w-2 h-5 ml-1.5 bg-white animate-typewriter-blink"></span>
            </p>
          </div>

          <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-sans font-medium select-text">
            AI Engineer & Generative Model developer crafting high-performance agentic frameworks, large language models, and cloud-native solutions.
          </p>

          {/* CTA Buttons - Matching Image 1 pills */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              id="hero-cta-projects"
              className="neon-btn-primary px-8 py-3.5 rounded-full font-display text-sm font-semibold tracking-wider text-black bg-white w-full sm:w-auto text-center"
            >
              See Projects
            </a>
            <a
              href="/resume.pdf"
              download="Dhruv_Dinesh_Patil_Resume.pdf"
              id="hero-cta-resume"
              className="neon-btn-secondary px-8 py-3.5 rounded-full font-display text-sm font-semibold tracking-wider text-white border border-white/10 bg-white/5 w-full sm:w-auto flex items-center justify-center gap-2 text-center"
            >
              <Download className="h-4 w-4 text-neutral-300" />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Down arrow scroll helper with scrolling path line design mimicking Image 1 */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center">
        {/* Scroll down path ribbon */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-mono text-neutral-500 mb-4 px-6 py-1.5 rounded-full border border-white/5 bg-white/2 backdrop-blur-sm">
          <span>O Google Cloud</span>
          <span>✦ DeepLearning.AI</span>
          <span>O LLMs</span>
          <span>✦ PyTorch</span>
          <span>O Agentic Chains</span>
        </div>

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
          className="p-2 rounded-full border border-white/15 bg-white/5 hover:border-white/40 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="h-5 w-5 text-neutral-300" />
        </a>
      </div>
    </section>
  );
}
