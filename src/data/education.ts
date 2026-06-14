export interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  grade?: string;
  badge?: string;
  details?: string[];
}

export const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "B.Tech — Artificial Intelligence",
    institution: "J.D. College of Engineering and Management, Nagpur, Maharashtra",
    duration: "August 2025 – May 2028 | Full-time",
    grade: "CGPA: 8.76 ⭐",
    badge: "Currently Pursuing",
    details: [
      "Specializing in NLP, LLMs, Generative AI, and Agentic workflows",
      "Secured an outstanding academic standing with 8.76 CGPA"
    ]
  },
  {
    id: 2,
    degree: "Diploma — Computer Science",
    institution: "NIT Polytechnic, Nagpur-Mahurzari, Nagpur, Maharashtra",
    duration: "July 2022 – May 2025",
    grade: "Score: 78%",
    details: [
      "Notable projects: Jarvis (Personal AI Assistant), Flappy Bird (Game)",
      "Strong foundation in Algorithms, Object-Oriented Programming, and Databases"
    ]
  },
  {
    id: 3,
    degree: "10th Grade",
    institution: "Yugantar High School, Sadar, Nagpur, Maharashtra",
    duration: "Year: 2022 | English Medium",
    grade: "Score: 81%",
    details: [
      "Secured high scores in mathematics, computer applications, and sciences"
    ]
  }
];
