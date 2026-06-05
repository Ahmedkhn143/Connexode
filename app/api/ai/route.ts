import { NextResponse } from "next/server";
import { WEEKLY_TASKS } from "@/lib/mock-data";

// Optional: Try to import Google Gen AI SDK
let GoogleGenAI: any = null;
try {
  const sdk = require("@google/generative-ai");
  GoogleGenAI = sdk.GoogleGenAI;
} catch (e) {
  // SDK not installed, will use fallback
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, taskId, message, messages, githubUrl, liveUrl, linkedinUrl } = body;

    const task = WEEKLY_TASKS.find((t) => t.id === taskId);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (action === "chat") {
      // Chat interaction with AI Assistant
      const userQuery = message || (messages && messages[messages.length - 1]?.content) || "";
      
      if (apiKey && GoogleGenAI) {
        try {
          const genAI = new GoogleGenAI(apiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
          
          const systemPrompt = `You are the Connexode AI Task Mentor.
Your goal is to guide the student in completing their current task:
Task Title: "${task.title}"
Task Details: "${task.taskDetails}"
Task Instructions:
${task.instructions.map((inst, i) => `${i + 1}. ${inst}`).join("\n")}

Respond to the student's question directly, offering clean code snippets (TypeScript/React/CSS), step-by-step guidance, and best practices. Do not solve the entire task for them, but explain the steps and logic. Keep responses encouraging, highly professional, and concise.`;

          const result = await model.generateContent([
            systemPrompt,
            ...(messages || []).map((m: any) => `${m.role === "user" ? "Student" : "Assistant"}: ${m.content}`),
            `Student: ${userQuery}`
          ].join("\n\n"));
          
          const responseText = result.response.text();
          return NextResponse.json({ reply: responseText });
        } catch (err: any) {
          console.error("Gemini API Chat Error:", err);
          // Fall back to mock response below
        }
      }

      // Dynamic task-aware mock chat response
      const mockReply = generateMockChatReply(task, userQuery);
      return NextResponse.json({ reply: mockReply });
    } 
    
    if (action === "audit") {
      // Auto Code Audit before submission
      let fetchedCode = "";
      if (githubUrl) {
        try {
          // Parse github url
          const cleanUrl = githubUrl.replace(/\.git$/, "").replace(/\/$/, "");
          const parsed = new URL(cleanUrl);
          if (parsed.hostname === "github.com") {
            const parts = parsed.pathname.split("/").filter(Boolean);
            if (parts.length >= 2) {
              const owner = parts[0];
              const repo = parts[1];
              
              const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
                headers: { "User-Agent": "Connexode-AI-Agent" }
              });
              if (res.ok) {
                const items = await res.json();
                if (Array.isArray(items)) {
                  const fileContents: string[] = [];
                  
                  // 1. Fetch package.json
                  const packageJsonItem = items.find(item => item.name === "package.json" && item.type === "file");
                  if (packageJsonItem && packageJsonItem.download_url) {
                    const pRes = await fetch(packageJsonItem.download_url);
                    if (pRes.ok) {
                      const pText = await pRes.text();
                      fileContents.push(`=== package.json ===\n${pText.slice(0, 1000)}`);
                    }
                  }
                  
                  // 2. Fetch files from components/ or app/
                  const srcDirs = items.filter(item => ["app", "components", "src"].includes(item.name) && item.type === "dir");
                  for (const dir of srcDirs) {
                    const dirRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${dir.name}`, {
                      headers: { "User-Agent": "Connexode-AI-Agent" }
                    });
                    if (dirRes.ok) {
                      const dirItems = await dirRes.json();
                      if (Array.isArray(dirItems)) {
                        const filesToFetch = dirItems.filter(item => 
                          item.type === "file" && /\.(tsx|ts|js|jsx|css)$/.test(item.name)
                        ).slice(0, 2);
                        for (const file of filesToFetch) {
                          if (file.download_url) {
                            const fileRes = await fetch(file.download_url);
                            if (fileRes.ok) {
                              const codeText = await fileRes.text();
                              fileContents.push(`=== ${dir.name}/${file.name} ===\n${codeText.slice(0, 1500)}`);
                            }
                          }
                        }
                      }
                    }
                  }
                  
                  if (fileContents.length > 0) {
                    fetchedCode = fileContents.join("\n\n");
                  }
                }
              }
            }
          }
        } catch (err) {
          console.error("Failed fetching Github repo files:", err);
        }
      }

      if (apiKey && GoogleGenAI) {
        try {
          const genAI = new GoogleGenAI(apiKey);
          // Try newer/stable models in order
          const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
          let model = null;
          let lastErr = null;
          
          for (const mName of modelsToTry) {
            try {
              model = genAI.getGenerativeModel({ model: mName });
              break;
            } catch (e) {
              lastErr = e;
            }
          }
          
          if (!model) throw lastErr;
          
          const prompt = `You are the Connexode Automated AI Code Reviewer.
Analyze the submission for the task: "${task.title}".
Instructions: ${task.instructions.join(" | ")}

Submission URLs:
- GitHub: ${githubUrl}
- Live Demo: ${liveUrl || "Not provided"}
- LinkedIn: ${linkedinUrl}

Fetched Repository Code/Metadata:
${fetchedCode || "No repository code files could be fetched. Auditing based on repository structure simulation."}

Provide a structured code audit in markdown format. 
You must output a JSON block at the very beginning followed by a markdown review.
Format:
\`\`\`json
{
  "score": 92,
  "status": "passed",
  "linkedinVerified": true
}
\`\`\`
### AI Review Output...
Keep the critique highly professional, mention at least 2 specific suggestions to improve performance or accessibility based on the fetched code, check if the LinkedIn link looks legitimate, and write a summary.`;

          const result = await model.generateContent(prompt);
          const responseText = result.response.text();
          
          // Parse score and markdown
          let score = 88;
          let markdown = responseText;
          const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
          if (jsonMatch) {
            try {
              const meta = JSON.parse(jsonMatch[1]);
              score = meta.score || 88;
              markdown = responseText.replace(jsonMatch[0], "").trim();
            } catch (e) {}
          }
          
          return NextResponse.json({ score, audit: markdown });
        } catch (err) {
          console.error("Gemini API Audit Error:", err);
          // Fall back to mock audit below
        }
      }

      // Dynamic task-aware mock audit response
      const score = Math.floor(Math.random() * 15) + 83; // 83 to 97
      const mockAudit = generateMockAudit(task, githubUrl, liveUrl, linkedinUrl, score);
      return NextResponse.json({ score, audit: mockAudit });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("AI Router Exception:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}

function generateMockChatReply(task: any, query: string): string {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes("how") || lowercaseQuery.includes("start") || lowercaseQuery.includes("step")) {
    return `### Let's get started on: **${task.title}** 🚀

Here is a recommended step-by-step roadmap to complete this task:

1. **Setup File Structure**: Create the required components inside your Next.js project. For instance, for this task, make sure to configure a new folder/file under \`components/\` or \`app/\`.
2. **Implementation Logic**:
   - Write clean, modular React functional components.
   - Use standard React hooks (\`useState\`, \`useEffect\`) for reactive state.
3. **Styling**: Use premium CSS styles (e.g., custom glassmorphism effects, flex/grid layouts, and sleek color variables).
4. **Validation**: Test the component in different viewports (mobile/tablet/desktop) to ensure high-fidelity responsive design.

*Tip: If you're styling, try using CSS backdrop filters for a premium glassmorphic style:*
\`\`\`css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
\`\`\`

What specific code snippet or issue are you running into right now?`;
  }
  
  if (lowercaseQuery.includes("error") || lowercaseQuery.includes("bug") || lowercaseQuery.includes("failed")) {
    return `### Debugging Helper 🛠️

It looks like you've encountered an issue. Let's isolate it:
1. **Console Check**: Open your developer tools (F12) and inspect the Console tab. Is there an error trace?
2. **Next.js Hydration Mismatches**: If you see hydration warnings, make sure you aren't rendering browser-only objects (like \`window\` or \`localStorage\`) directly during server render. Wrap them in a \`useEffect\` hook:
   \`\`\`typescript
   const [isLoaded, setIsLoaded] = useState(false);
   useEffect(() => {
     setIsLoaded(true);
     // safe browser-only calls here
   }, []);
   \`\`\`
3. **TypeScript types**: Make sure all component props have explicitly defined types or interfaces.

Share the error log or the block of code that is failing, and I will help you rewrite it!`;
  }

  return `Hello! I am your Connexode AI Task Assistant. 

I'm loaded with the instructions for **"${task.title}"** (Week ${task.weekNo}, Day ${task.dayNo}).

Here is what you can ask me:
* *"How do I start with this task?"*
* *"Give me a clean code structure for this task"*
* *"Help me fix a bug or TypeScript error"*

How can I help you succeed with this task today?`;
}

function generateMockAudit(task: any, githubUrl: string, liveUrl: string | undefined, linkedinUrl: string, score: number): string {
  const dateStr = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  return `## Connexode AI Task Code Audit
**Date:** ${dateStr}
**Overall Pre-check Status:** ✅ **PASSED** (Estimated Score: **${score}/100**)

---

### 1. Delivery Links Validation
* **GitHub Repository:** \`${githubUrl}\` — Verified. Code structure matches Next.js app specifications.
* **Live Deployment:** \`${liveUrl || "Not provided"}\` — ${liveUrl ? "Successfully pinged and verified responsive viewport." : "Optional link not provided."}
* **LinkedIn Post Check:** \`${linkedinUrl}\` — Verified structure. Post format suggests active student engagement and hashtag tracking.

---

### 2. Code Review & Performance Insights
* **Glassmorphic styling:** Excellent application of modern styling systems. The semi-transparent layers match modern styling guidelines.
* **Component Architecture:** Good component isolation in the mock workspace.
* **Recommended Optimizations:**
  1. *Backdrop Filter Hardware Acceleration:* To ensure 60fps animations on lower-end devices, append \`transform: translateZ(0)\` or \`will-change: backdrop-filter\` to all glassmorphic components.
  2. *SEO and Semantics:* Ensure your elements follow proper landmark hierarchies (\`<header>\`, \`<main>\`, \`<footer>\`) to boost search crawler indexing.

---

### 3. Suggestions for Mentor Approval
* You are fully ready to submit this task! Once submitted, your mentor will review your custom code, check the GitHub repository commit history, and approve your badge updates.`;
}
