import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Code2, Sun, Moon, Home, User, Cpu, Briefcase, GraduationCap, Mail } from 'lucide-react';
import { socials } from '../data/socials';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

const navTabs = [
  { name: 'Home', href: '#home', Icon: Home },
  { name: 'About', href: '#about', Icon: User },
  { name: 'Skills', href: '#skills', Icon: Cpu },
  { name: 'Projects', href: '#projects', Icon: Briefcase },
  { name: 'Edu', href: '#education', Icon: GraduationCap },
  { name: 'Contact', href: '#contact', Icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  // Apply theme to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Monitor basic page scroll for navbar frosted backdrop effect and active section glow
  useEffect(() => {
    const handleScroll = () => {
      // Scrolled backdrop effect
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect intersecting section
      const scrollPos = window.scrollY + 160;
      const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'education', 'certifications', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const scrollTarget = href === '#home' ? 0 : (targetElement as HTMLElement).offsetTop - 85;
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Desktop Responsive Top Navbar */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <a 
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center"
              id="nav-logo"
            >
              <span className="font-display text-2xl font-bold tracking-wider bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(124,58,237,0.3)]">
                DDP
              </span>
            </a>

            {/* Core Desktop Navigation */}
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    id={`nav-link-${link.name.toLowerCase()}`}
                    className={`font-display text-sm tracking-wide font-medium transition-all duration-300 relative py-1 px-3 rounded-md ${
                      isActive 
                        ? 'text-brand-secondary bg-brand-primary/10 shadow-[0_0_12px_rgba(124,58,237,0.15)] border border-brand-primary/35'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800/20'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-brand-secondary rounded-full"></span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Social icons row */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                id="theme-toggle"
                className="p-1.5 rounded-lg border border-violet-500/20 bg-violet-950/10 text-neutral-400 hover:text-white hover:border-violet-500 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-200 cursor-pointer flex items-center justify-center mr-2"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-violet-500" />
                )}
              </button>

              <a 
                href={socials.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                id="nav-social-github"
                className="text-neutral-400 hover:text-brand-primary hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.8)] transition-all duration-200"
                aria-label="GitHub profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href={socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                id="nav-social-linkedin"
                className="text-neutral-400 hover:text-brand-secondary hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-200"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href={socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                id="nav-social-instagram"
                className="text-neutral-400 hover:text-brand-primary hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.8)] transition-all duration-200"
                aria-label="Instagram profile"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={socials.leetcode} 
                target="_blank" 
                rel="noopener noreferrer" 
                id="nav-social-leetcode"
                className="text-neutral-400 hover:text-brand-secondary hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-200"
                aria-label="LeetCode profile"
              >
                <Code2 className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Top Brand Header */}
      <header className={`md:hidden fixed top-0 left-0 right-0 z-40 backdrop-blur-md py-3.5 px-6 flex items-center justify-between border-b transition-all duration-300 ${
        theme === 'light'
          ? 'bg-white/80 border-violet-500/10 shadow-sm'
          : 'bg-[#020008ef] border-violet-500/15 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
      }`}>
        <a 
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center"
          id="nav-logo-mobile"
        >
          <span className="font-display text-xl font-bold tracking-wider bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(124,58,237,0.25)]">
            DDP
          </span>
        </a>

        {/* Brand Theme Switch Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          id="theme-toggle-mobile"
          className="p-1.5 rounded-lg border border-violet-500/20 bg-violet-950/10 text-neutral-400 hover:text-white hover:border-violet-500 transition-all duration-200 cursor-pointer flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-4.5 w-4.5 text-amber-400" />
          ) : (
            <Moon className="h-4.5 w-4.5 text-violet-500" />
          )}
        </button>
      </header>

      {/* Mobile Sticky App-Style Bottom Tab Bar */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-45 backdrop-blur-md py-2.5 px-3 pb-safe border-t transition-all duration-300 ${
        theme === 'light'
          ? 'bg-white/90 border-violet-500/10 shadow-[0_-8px_30px_rgba(124,58,237,0.06)]'
          : 'bg-[#020008f5] border-violet-500/15 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]'
      }`}>
        <div className="flex items-center justify-between max-w-lg mx-auto gap-1">
          {navTabs.map((tab) => {
            const isActive = activeSection === tab.href.slice(1);
            const Icon = tab.Icon;
            return (
              <a
                key={tab.name}
                href={tab.href}
                onClick={(e) => handleLinkClick(e, tab.href)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-300 flex-1 min-h-[44px] ${
                  isActive
                    ? theme === 'light'
                      ? 'text-violet-600 bg-violet-100/60 font-semibold'
                      : 'text-brand-secondary bg-brand-primary/15 font-semibold border border-brand-primary/20 shadow-[0_0_10px_rgba(124,58,237,0.1)]'
                    : theme === 'light'
                      ? 'text-slate-500 hover:text-violet-600'
                      : 'text-neutral-400 hover:text-neutral-200'
                }`}
                id={`nav-tab-mobile-${tab.name.toLowerCase()}`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} />
                <span className="text-[10px] font-sans font-medium tracking-wide mt-1 uppercase">
                  {tab.name}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
