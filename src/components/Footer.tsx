import React from 'react';
import { Github, Linkedin, Instagram, Code2, ArrowUp } from 'lucide-react';
import { socials } from '../data/socials';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-[#020008] pt-12 pb-24 md:pb-8 overflow-hidden">
      {/* Dynamic colorful blur backing */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed] to-[#06b6d4] opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Scroll back up button */}
        <button
          onClick={scrollToTop}
          id="footer-scroll-top"
          className="mb-8 p-3 rounded-full border border-brand-primary/30 bg-brand-primary/5 hover:border-brand-secondary hover:bg-brand-secondary/15 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 text-neutral-300 group-hover:text-brand-secondary group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Brand name */}
        <p 
          className="font-display text-lg font-bold tracking-widest text-[#f1f5f9] mb-4"
        >
          DHRUV DINESH PATIL
        </p>

        {/* Social interactions */}
        <div className="flex space-x-6 mb-8">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-social-github"
            className="p-2 rounded-lg border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-brand-primary hover:border-brand-primary/50 hover:shadow-[0_0_12px_rgba(124,58,237,0.4)] transition-all duration-200"
            aria-label="GitHub Profile"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-social-linkedin"
            className="p-2 rounded-lg border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-brand-secondary hover:border-brand-secondary/50 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-200"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-social-instagram"
            className="p-2 rounded-lg border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-brand-primary hover:border-brand-primary/50 hover:shadow-[0_0_12px_rgba(124,58,237,0.4)] transition-all duration-200"
            aria-label="Instagram Profile"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-social-leetcode"
            className="p-2 rounded-lg border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-brand-secondary hover:border-brand-secondary/50 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-200"
            aria-label="LeetCode Profile"
          >
            <Code2 className="h-5 w-5" />
          </a>
        </div>

        {/* Text credits & copyright */}
        <div className="text-center">
          <p className="text-xs text-neutral-500 font-mono mb-2">
            Designed & Built by <span className="text-neutral-300 font-display font-medium">Dhruv Dinesh Patil</span>
          </p>
          <p className="text-xs text-neutral-600 font-mono">
            © 2025 Dhruv Dinesh Patil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
