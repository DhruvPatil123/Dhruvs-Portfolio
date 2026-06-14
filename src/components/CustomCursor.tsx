import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Position coordinates using motion values for performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth trailing spring settings for the outer ring
  const trailX = useSpring(mouseX, { damping: 30, stiffness: 220, mass: 0.6 });
  const trailY = useSpring(mouseY, { damping: 30, stiffness: 220, mass: 0.6 });

  useEffect(() => {
    // Check for touch device capabilities to disable on mobile natively
    const checkIsMobile = () => {
      const mobileStatus = 
        window.matchMedia('(pointer: coarse)').matches || 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0;
      setIsMobile(mobileStatus);
    };

    checkIsMobile();

    if (isMobile) return;

    // Mouse movement listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track active interactable hover state
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Match trigger elements (links, buttons, action elements, custom tabs)
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null || 
        target.closest('.cursor-pointer') !== null ||
        target.classList.contains('cursor-pointer');

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Add CSS global helper to remove the standard default cursor on desktop
    document.documentElement.style.cursor = 'none';
    const allElements = document.querySelectorAll('*');
    allElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        // Safe check
      }
    });

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.style.cursor = '';
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  // Hide custom cursor completely on mobile/touch screens
  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-screen">
      {/* 1. Leading sharp center micro-dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? '#06b6d4' : '#8b5cf6', // cyan on hover, violet as standard
        }}
        transition={{ duration: 0.15 }}
        className="w-2 h-2 rounded-full absolute shadow-[0_0_10px_rgba(139,92,246,0.8)]"
      />

      {/* 2. Soft, lazy glowing violet trailing halo */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          borderColor: isHovered ? 'rgba(6, 182, 212, 0.5)' : 'rgba(139, 92, 246, 0.4)',
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.08)' : 'rgba(139, 92, 246, 0.03)',
        }}
        transition={{ duration: 0.15 }}
        className="w-8 h-8 rounded-full border border-violet-500/40 absolute flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.15)]"
      />
    </div>
  );
}
