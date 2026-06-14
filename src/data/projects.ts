export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  badge?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Raincrew.AI",
    description: "Next-Gen AI Talent Acquisition & Proctoring platform. Real-time oral interviews via Google Gemini Multimodal Live WebSocket API with biometric proctoring, candidate scorecards, pacing metrics, and gap analysis.",
    tags: ["Gemini API", "WebSocket", "AI Proctoring", "React", "Node.js"],
    githubUrl: "https://github.com/DhruvPatil123/Raincrew-ai",
    badge: "🔥 Flagship Project"
  },
  {
    id: 2,
    title: "Language Translation Tool",
    description: "Premium full-stack real-time multilingual translation console built with React 19, Vite, Express and Tailwind CSS. Features Bento Grid Dashboard layout, micro-interactions, telemetry, and dual-layer data storage.",
    tags: ["React 19", "Vite", "Express", "Tailwind", "NLP"],
    githubUrl: "https://github.com/DhruvPatil123/Language-Translation-Tool"
  },
  {
    id: 3,
    title: "VisionCraft.AI",
    description: "Text-to-image and video generation tool producing 2K/4K quality visuals using state-of-the-art generative models.",
    tags: ["Generative AI", "Computer Vision", "Python"],
    githubUrl: "https://github.com/DhruvPatil123/VisonCraft.AI"
  },
  {
    id: 4,
    title: "AI Resume Builder",
    description: "Intelligent resume builder that uses AI to generate, format, and optimize resumes tailored to job descriptions.",
    tags: ["LLM", "Python", "React", "FastAPI"],
    githubUrl: "https://github.com/DhruvPatil123/ai-resume-builder"
  },
  {
    id: 5,
    title: "TenderScan.AI",
    description: "AI-powered tender classification system that automatically sorts and categorizes government tenders across different domains.",
    tags: ["NLP", "Python", "LangChain", "Classification"],
    githubUrl: "https://github.com/DhruvPatil123/TenderScan.Ai"
  },
  {
    id: 6,
    title: "Readme.AI",
    description: "Automatically generates professional README files for any GitHub project using LLM analysis of the codebase.",
    tags: ["LLM", "GitHub API", "Python", "Prompt Engineering"],
    githubUrl: "https://github.com/DhruvPatil123/Readme.AI"
  },
  {
    id: 7,
    title: "UnoUI",
    description: "The fastest way to build, launch, and optimize stunning landing pages without writing code. No design skills required.",
    tags: ["React", "UI/UX", "No-Code", "Landing Pages"],
    githubUrl: "https://github.com/DhruvPatil123/UnoUI"
  },
  {
    id: 8,
    title: "EncryptX",
    description: "Java-based encryption and decryption tool implementing multiple cryptographic algorithms for secure data handling.",
    tags: ["Java", "Cryptography", "Security", "Cybersecurity"],
    githubUrl: "https://github.com/DhruvPatil123/EncryptX-Encryption-Decryption-Tool"
  },
  {
    id: 9,
    title: "Flappy Bird",
    description: "Classic Flappy Bird game recreated from scratch with smooth gameplay, collision detection, score tracking, and progressively increasing difficulty.",
    tags: ["JavaScript", "Game Dev", "HTML5 Canvas"],
    githubUrl: "https://github.com/DhruvPatil123/Flappy-Bird-game-"
  }
];
