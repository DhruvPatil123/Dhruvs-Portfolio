export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "AI/ML Core",
    skills: [
      "Python",
      "PyTorch/TensorFlow",
      "Hugging Face",
      "LangChain/LlamaIndex",
      "Prompt Engineering",
      "RAG",
      "LLM",
      "Agentic AI",
      "AI/ML Projects"
    ]
  },
  {
    category: "Web & Backend",
    skills: [
      "React",
      "Node.js",
      "Express.js",
      "FastAPI",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind",
      "Next.js",
      "Vercel",
      "Firebase",
      "API",
      "JDBC",
      "SQL",
      "PostgreSQL"
    ]
  },
  {
    category: "Systems & Security",
    skills: [
      "C",
      "C++",
      "C#",
      "Java",
      "Advance Java",
      ".NET",
      "Cybersecurity",
      "Cryptography",
      "Software Testing"
    ]
  },
  {
    category: "Tools & Soft Skills",
    skills: [
      "Git",
      "GitHub",
      "UI/UX",
      "Problem Solving",
      "Communication Skills",
      "Hardworking"
    ]
  }
];
