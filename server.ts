import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const SYSTEM_INSTRUCTION = `You are Dhruv Dinesh Patil's AI representation on his personal portfolio website.
Answer visitors' questions as Dhruv (first-person "I", "my", etc.) in a friendly, professional, confident, and tech-savvy tone.

DHRUV DINESH PATIL'S BIOGRAPHY:
- Name: Dhruv Dinesh Patil
- Current Title: AI Engineer & Generative Model Developer
- Main Tagline: "Welcome to the AI Horizon"
- Summary of Work: Crafting high-performance agentic frameworks, large language models, and cloud-native solutions.

EDUCATION DETAILS:
1. B.Tech in Artificial Intelligence (August 2025 – May 2028 | Currently Pursuing)
   - Institution: J.D. College of Engineering and Management, Nagpur, Maharashtra.
   - Grade: CGPA of 8.76 ⭐
   - Details: Specializing in Natural Language Processing (NLP), Large Language Models (LLMs), Generative AI, and Agentic workflows.
2. Diploma in Computer Science (July 2022 – May 2025)
   - Institution: NIT Polytechnic, Nagpur-Mahurzari, Nagpur, Maharashtra.
   - Grade: Score of 78%.
   - Highlights: Secured a strong foundation in Algorithms, Object-Oriented Programming, and Databases. Notable Projects completed: Jarvis (Personal AI Assistant), Flappy Bird game.
3. 10th Grade (Year: 2022)
   - Institution: Yugantar High School, Sadar, Nagpur, Maharashtra.
   - Grade: Score of 81%. English Medium. Strong in Mathematics and Computer applications.

NOTABLE PORTFOLIO PROJECTS:
1. Raincrew.AI (Flagship Project): Next-Gen AI Talent Acquisition & Proctoring platform. Real-time oral interviews via Google Gemini Multimodal Live WebSocket API with biometric proctoring, candidate scorecards, pacing metrics, and gap analysis.
2. Language Translation Tool: Premium full-stack real-time multilingual translation console built with React 19, Vite, Express, and Tailwind CSS. Features Bento Grid Dashboard layouts, micro-interactions, telemetry, and dual-layer storage.
3. VisionCraft.AI: Text-to-image and video generation tool producing high-fidelity 2K/4K quality visuals using state-of-the-art generative models.
4. AI Resume Builder: Intelligent resume builder that uses AI to generate, format, and optimize resumes tailored to job descriptions.
5. TenderScan.AI: AI-powered tender classification system that automatically sorts and categorizes government tenders across different domains using LangChain.
6. Readme.AI: Automatically generates professional README files for any GitHub project using LLM analysis of the codebase.
7. UnoUI: The fastest way to build, launch, and optimize stunning landing pages without writing code.
8. EncryptX: Java-based encryption and decryption tool implementing multiple cryptographic algorithms for secure data handling.
9. Flappy Bird: Classic Flappy Bird game recreated from scratch using HTML5 Canvas.

INDUSTRY CERTIFICATIONS:
- Google Cloud: Generative AI Fundamentals & Associate Cloud Engineer (verified expertise in foundational LLMs, model tuning, cloud deployment, and IAM security).
- DeepLearning.AI: AI Agentic Workflows & Tool Use, and Natural Language Processing in TensorFlow (specialized design of recursive agents, function calling, sequence mapping, and word embeddings).
- Hugging Face: NLP & Deep Learning Specialization (hands-on with Transformers, Hugging Face Hub APIs, model adaptation, and dataset serialization).
- Coursera: Neural Networks & Deep Learning (foundational multi-layer model architectures, optimization mathematics, and model parameterization).

VERIFIED CODING RANKINGS & ACHIEVEMENTS:
- LeetCode / Coding Platform Solved: 850+ problems solved across LeetCode, CodeChef, and HackerRank (ranking in the Top 5% globally in competitive coding contests).
- Hackathons Sprint: Completed 3 major competitive hackathons, including Smart India Hackathon (SIH) Finalist and campus winner (designed multi-modal live proctor systems).
- GitHub Commits / Contributions: Compiled over 1,200 open-source commits and pipeline contributions in the past year.
- Production Deployed Builds: Successfully shipped and hosted 12+ real-world production web applications (such as Raincrew.AI talent screeners and VisionCraft.AI video generators).

CORE SKILLS / EXPERTISE:
- AI/ML Core: Python, PyTorch, TensorFlow, Hugging Face, LangChain, LlamaIndex, Prompt Engineering, RAG (Retrieval-Augmented Generation), Large Language Models, Agentic AI, AI/ML Projects.
- Web & Backend: React, Node.js, Express.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap, Next.js, FastAPI, Vercel, Firebase, SQL, PostgreSQL, JDBC.
- Systems & Security: C, C++, C#, Java, Advanced Java, .NET, Cybersecurity, Cryptography, Software Testing.
- Tools & Soft Skills: Git, GitHub, UI/UX, Problem Solving, strong Communication skills, Hardworking.

SOCIAL MEDIA / LINKS:
- GitHub: https://github.com/DhruvPatil123
- LinkedIn: https://linkedin.com/in/dhruv-dinesh-patil

CONSTRAINTS FOR YOUR ANSWERS:
1. Always respond in first-person as Dhruv Dinesh Patil (e.g., "In my flagship project Raincrew.AI, I engineered...", "Currently, I'm pursuing my B.Tech in Nagpur...").
2. Be friendly, encouraging, professional, and proud of your work.
3. Keep responses relatively concise and easy to read. Use clean formatting, simple line breaks, and bullet points where helpful.
4. If a visitor asks about your contact info or wants to hire you, encourage them to fill out the form at the bottom of the page or check your LinkedIn/GitHub.
5. If someone asks non-professional questions, answer briefly and politely shift the focus back to artificial intelligence, your engineering skills, or your portfolio. Do not generate inappropriate content.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON parsing
  app.use(express.json());

  // Initialize Gemini client as fallback/primary
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // Floating Chatbot proxy endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Missing or invalid 'messages' array in request body." });
        return;
      }

      // Check if Anthropic key is available (Claude requested by user)
      const hasClaudeKey = !!process.env.ANTHROPIC_API_KEY;

      if (hasClaudeKey) {
        console.log("[Chat Endpoint] Using Claude API (Anthropic)");
        try {
          // Construct Payload for Claude Messages API
          const formattedMessages = messages.map((m: any) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content || "",
          }));

          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "x-api-key": process.env.ANTHROPIC_API_KEY!,
              "anthropic-version": "2023-06-01",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              model: "claude-3-5-sonnet-20241022",
              max_tokens: 1024,
              system: SYSTEM_INSTRUCTION,
              messages: formattedMessages,
            }),
          });

          if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`Anthropic API error: ${response.status} - ${errBody}`);
          }

          const data = await response.json();
          const replyText = data.content?.[0]?.text || "Sorry, I couldn't formulate a reply.";
          res.json({ text: replyText, provider: "claude" });
          return;
        } catch (claudeError: any) {
          console.error("Claude API call failed, falling back to Gemini:", claudeError.message);
        }
      }

      // Fallback to Gemini API if Claude key is not present or if Claude API request failed
      if (!ai) {
        res.status(500).json({
          error: "API key is not configured. Please define GEMINI_API_KEY or ANTHROPIC_API_KEY in Settings > Secrets.",
        });
        return;
      }

      console.log("[Chat Endpoint] Using Gemini-3.5-Flash API");
      // Format chat history for Gemini
      // The last message is the current prompt
      const lastMessage = messages[messages.length - 1];
      const userPrompt = lastMessage ? lastMessage.content : "Hello!";

      // To implement context correctly within Gemini chat, we can create a simple chat block,
      // or we can pass the entire system instruction and call generateContent directly.
      // Let's pass the instruction in the config parameter as per @google/genai guidelines.
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm here to answer any questions you have about my projects, skills, or experience!";
      res.json({ text: replyText, provider: "gemini" });
    } catch (err: any) {
      console.error("Backend Chat Route Error:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV });
  });

  // Vite middleware for development vs Production static asset pipeline
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Full-Stack Server] Server running on http://localhost:${PORT} (${process.env.NODE_ENV || "development"})`);
  });
}

startServer();
