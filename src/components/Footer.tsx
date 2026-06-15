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
    <footer className="relative bg-[#050505] pt-12 pb-24 md:pb-8 overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center">
        {/* Scroll back up button */}
        <button
          onClick={scrollToTop}
          id="footer-scroll-top"
          className="mb-8 p-3.5 rounded-full border border-white/10 bg-white/5 hover:border-white/25 transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4 text-neutral-300 group-hover:text-white group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Brand name */}
        <p 
          className="font-display text-lg font-bold tracking-widest text-[#f1f5f9] mb-4"
        >
          DHRUV DINESH PATIL
        </p>

        {/* Social interactions */}
        <div className="flex space-x-4 mb-8">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-social-github"
            className="p-3 rounded-2xl border border-white/5 bg-[#121212]/40 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-200"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-social-linkedin"
            className="p-3 rounded-2xl border border-white/5 bg-[#121212]/40 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-200"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-social-instagram"
            className="p-3 rounded-2xl border border-white/5 bg-[#121212]/40 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-200"
            aria-label="Instagram Profile"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href={socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-social-leetcode"
            className="p-3 rounded-2xl border border-white/5 bg-[#121212]/40 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-200"
            aria-label="LeetCode Profile"
          >
            <Code2 className="h-4 w-4" />
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
