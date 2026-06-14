# Dhruv Dinesh Patil — AI Engineer & Generative Model Developer Portfolio

An immersive, high-fidelity developer portfolio designed to showcase advanced work in machine learning, generative model engineering, agentic systems, and cloud architecture.

Live Preview hosted on Cloud Run.

---

## 🚀 Key Features

### 1. 💬 Cohere & Claude-Powered AI Chat Agent Double
- A floating chat bubble residing persistently in the user view.
- Underpinned by an **Express.js full-stack proxy** with high-reliability routing.
- Runs on **Claude 3.5 Sonnet** (via the Anthropic API) with immediate **Gemini 3.5 Flash** fallback logic if the primary keys are absent. 
- Conducts smart, contextual conversation entirely in the **first-person vector perspective** (First-person "I" representation as Dhruv) representing professional strengths, current pursuing academic milestones, SIH finalist background, and skills.

### 2. 🏆 Dynamic Animated Achievements & Rankings Tracker
- Automatically counts up numbers in viewport when the visitor scrolls down to view achievements.
- Highlights:
  - **850+ LeetCode problems** solved spanning complex algorithms and data structures (Top 5% competitive coding).
  - **3 Hackathons** (SIH Finalist & Campus Winner) pioneering multi-modal real-time live proctors with WebSockets.
  - **1,200+ GitHub contributions** representing public open-source packages, libraries, and landing tools.
  - **12+ Deployed production applications** deployed and scaled successfully.

### 3. 🛡️ Interactive Industry Certifications Segment
- Clean interactive credentials board hosting dynamic custom-drawn vector badge emblems representing:
  - **Google Cloud** (Associate Cloud Engineer & Generative AI Fundamentals).
  - **DeepLearning.AI** (Agentic Workflows, Tool-Call engineering, TensorFlow NLP).
  - **Hugging Face** (NLP Transformers and model calibration specialization).
  - **Coursera** (Mathematical deep neural networks).
- Fully interactive with secure custom verify links, custom hover effects, and tag listings of verified competencies.

### 4. 🎨 Space Grotesk & JetBrains Mono Design
- Clean visual grid layout utilizing generous negative space, high contrast, responsive desktop-to-mobile scaling, and custom cursor telemetry.
- Smooth transition states managed by physical springs via `motion/react`.

---

## 🛠️ Stack Configuration

- **Frontend Core**: React 18+, TypeScript, Vite, Tailwind CSS, Lucide icons.
- **Physical Transitions**: `motion/react`.
- **Runtime Environment**: Express.js server on Node, `tsx` compilation, `esbuild` packaging.
- **AI Integrations**: Native Anthropic REST endpoints and `@google/genai` TypeScript SDK models.

---

## ⚙️ Environment Instructions

Configure your API keys in Google AI Studio or your local `.env` setup:

```env
# Define the Gemini key for model access and chatbot fallback pipelines
GEMINI_API_KEY="YOUR_GEMINI_KEY"

# Optional. Define the Anthropic Secret key to activate the primary Claude chat double experience
ANTHROPIC_API_KEY="YOUR_CLAUDE_KEY"
```

## 📦 Local Installation & Boot

Install base package dependencies:
```bash
npm install
```

Boot the joint development server:
```bash
npm run dev
```

Build the self-contained production commonJS artifact inside `dist` using esbuild and Vite:
```bash
npm run build
```

Verify your server is healthy and bindings are set up:
```bash
npm run start
```
The reverse proxy will dynamically route traffic to port `3000`.

---
⚠️ *Verify critical information independently. Designed with precision for showcasing state-of-the-art software systems.*
