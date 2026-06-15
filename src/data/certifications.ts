export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verifyLink: string;
  skills: string[];
  logoType: 'google' | 'coursera' | 'huggingface' | 'deeplearning' | 'eduskills' | 'nptel' | 'lnt';
  badgeColor: string; // Tailwind gradient classes
}

export const certifications: Certification[] = [
  {
    id: 'cert-7',
    title: 'Generative AI, Deep Learning & Language Models Virtual Internship',
    issuer: 'EduSkills / AICTE',
    date: 'Jan - Mar 2026',
    verifyLink: 'https://virtualinternship.eduskillsfoundation.org/', // ID: 4802b50c11ee229d2585
    skills: ['Generative AI', 'Deep Learning', 'Large Language Models', 'NLP Agents'],
    logoType: 'eduskills',
    badgeColor: 'from-sky-400 via-blue-500 to-purple-600'
  },
  {
    id: 'cert-8',
    title: 'Professional UI/UX Design & Web Prototyping Virtual Internship',
    issuer: 'EduSkills / AICTE',
    date: 'Apr - Jun 2026',
    verifyLink: 'https://virtualinternship.eduskillsfoundation.org/', // ID: 40f88768baaca1321cf
    skills: ['UI/UX Design', 'Web Prototyping', 'Figma Wireframing', 'Responsive Systems'],
    logoType: 'eduskills',
    badgeColor: 'from-indigo-500 via-purple-500 to-pink-500'
  },
  {
    id: 'cert-9',
    title: 'Enhancing Soft Skills and Personality (Elite)',
    issuer: 'NPTEL (IIT Kanpur)',
    date: 'Feb - Apr 2026',
    verifyLink: 'https://nptel.ac.in/noc/', // Roll: NPTEL26HS47S1161802442
    skills: ['Interpersonal Dynamics', 'Professional Communication', 'Emotional Intelligence', 'Team Leadership'],
    logoType: 'nptel',
    badgeColor: 'from-rose-500 to-red-600'
  },
  {
    id: 'cert-10',
    title: 'Full-Stack Flask Development Mastery',
    issuer: 'L&T EduTech',
    date: 'May 2026',
    verifyLink: 'https://lntedutech.com/', // CID: LTE/EI/1000
    skills: ['Python Flask', 'Full-Stack Web', 'RESTful API Engineering', 'Database Management', 'Routing Orchestration'],
    logoType: 'lnt',
    badgeColor: 'from-cyan-500 to-blue-600'
  }
];
