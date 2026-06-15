import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Award, BookOpen, Star } from 'lucide-react';
import { socials } from '../../data/socials';
import { useIsMobile, usePrefersReducedMotion } from '../../utils';
import AboutMesh from '../canvas/AboutMesh';
import Loader from '../Loader';

export default function About() {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  // Milestone records matching the style of reference Image 2
  const milestones = [
    { role: 'AI Developer Intern', company: 'EduSkills / AICTE', period: 'Jan - Mar 2026' },
    { role: 'B.Tech AI Student', company: 'JD College of Eng.', period: '2023 - Present' },
    { role: 'Hackathon Finalist & Winner', company: 'Smart India Hackathon', period: '2025' },
    { role: 'Full-Stack Developer', company: 'L&T EduTech certified', period: '2026' }
  ];

  return (
    <section 
      id="about" 
      className="relative py-28 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-white/2 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/2 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Animated header */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase font-semibold px-3 py-1 bg-white/5 rounded-full border border-white/10">
            01 / Profile
          </span>
        </motion.div>

        {/* Info Grid - Asymmetric Layout like Reference Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Biography ("Meet Dhruv" Style) */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
                Meet Dhruv
              </h2>
              <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-sans font-light">
                I&apos;m a passionate B.Tech Artificial Intelligence researcher and Generative Model Engineer based in Nagpur. I specialize in crafting bold visual system interfaces, real-time agentic orchestrations, and high-performance language models that bridge complex mathematics with intuitive consumer experiences.
              </p>
            </div>

            {/* Quick Skills Tags row matching Image 2 */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Generative AI', 'Agentic Workflows', 'Deep Learning', 'Flask Mastery', 'UI/UX Design', 'Model Alignment'].map((skill) => (
                <span key={skill} className="px-3 py-1 text-xs font-mono text-neutral-300 border border-white/10 rounded-full bg-white/3">
                  {skill}
                </span>
              ))}
            </div>

            {/* Sleek Milestones List Table matching Image 2 tabular style */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] mb-4">
                Core Timeline & Placements
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm text-neutral-400">
                  <thead>
                    <tr className="border-b border-white/5 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                      <th className="pb-3 font-normal">Role / Milestone</th>
                      <th className="pb-3 font-normal">Organization</th>
                      <th className="pb-3 font-normal text-right">Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/2">
                    {milestones.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/1 transition-colors group">
                        <td className="py-3.5 pr-4 font-semibold text-white group-hover:text-white transition-colors">
                          {item.role}
                        </td>
                        <td className="py-3.5 text-neutral-400 group-hover:text-neutral-200 transition-colors">
                          {item.company}
                        </td>
                        <td className="py-3.5 text-right text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
                          {item.period}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Connection pills below bio */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a 
                href={socials.email}
                id="about-link-email"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 hover:border-white/35 text-xs text-neutral-300 transition-all duration-300 cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5 text-neutral-400" />
                <span>sujalpatil8657231278@gmail.com</span>
              </a>
              <a 
                href={socials.phone}
                id="about-link-phone"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 hover:border-white/35 text-xs text-neutral-300 transition-all duration-300 cursor-pointer"
              >
                <Phone className="h-3.5 w-3.5 text-neutral-400" />
                <span>+91 8857841863</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Beautiful Framed Grayscale Technical Image Panel block matching Reference Image 2 */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center w-full"
          >
            {/* Framed Graphic Visual */}
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] border border-white/10 bg-[#0f0f0f] shadow-2xl overflow-hidden p-3 group transition-transform duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%] z-10 pointer-events-none" />
              
              {/* Grayscale modern placeholder aesthetic fitting photo block */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#161616] flex flex-col justify-between p-8 group-hover:bg-[#1a1a1a] transition-all duration-500 border border-white/5">
                <div className="flex items-center justify-between z-20">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                    AI LABS // 2026
                  </span>
                  <div className="h-2 w-2 rounded-full bg-neutral-400 animate-pulse" />
                </div>

                <div className="my-auto space-y-3 z-20">
                  {/* Styled generative nodes art block resembling workspace */}
                  <svg viewBox="0 0 100 60" className="w-full text-neutral-600 h-28 opacity-40">
                    <path d="M10 30 Q30 10, 50 30 T90 30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="10" cy="30" r="3" fill="currentColor" />
                    <circle cx="50" cy="30" r="4" fill="currentColor" />
                    <circle cx="90" cy="30" r="3" fill="currentColor" />
                    <line x1="50" y1="30" x2="50" y2="10" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="10" r="2" fill="currentColor" />
                  </svg>
                  <div className="space-y-1 text-center">
                    <span className="font-display text-lg font-bold text-white tracking-wide block">
                      Dhruv Dinesh Patil
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 block tracking-wider uppercase">
                      B.Tech AI Engineer & Builder
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 z-20 pt-4 border-t border-white/5">
                  <span>Nagpur, IN</span>
                  <span className="text-white bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    CGPA 8.76
                  </span>
                </div>
              </div>
            </div>

            {/* Fallback Mesh embedded dynamically underneath on non-mobiles for gorgeous depth */}
            {!isMobile && (
              <div className="w-full h-24 mt-6 rounded-2xl border border-white/5 bg-white/1 overflow-hidden opacity-40 relative">
                <Suspense fallback={null}>
                  <AboutMesh />
                </Suspense>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
