// app/api/ai-advisor/route.ts
// AI Career Advisor API — calls Anthropic API (claude-sonnet-4-6)
// Returns structured JSON: headline, body, actions[], encouragement

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json();

    // Build prompt based on role
    const prompt =
      user.role === "intern"
        ? buildInternPrompt(user)
        : buildAmbassadorPrompt(user);

    // Call Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: `You are a supportive but direct career advisor for Connexode, a Pakistani tech education platform.
You give personalised, actionable advice to students based on their real activity data.
You must respond ONLY with valid JSON — no preamble, no markdown, no backticks.
Respond in this exact format:
{
  "headline": "One punchy sentence summarising the key insight (max 12 words)",
  "body": "2-3 sentences of honest, specific advice based on their numbers (not generic)",
  "actions": ["Specific action 1", "Specific action 2", "Specific action 3"],
  "encouragement": "One short, genuine motivational sentence (not cheesy)"
}`,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    // Parse the JSON response from Claude
    const text = data.content?.[0]?.text ?? "{}";

    let advice;
    try {
      advice = JSON.parse(text);
      if (!advice.headline || !advice.body || !Array.isArray(advice.actions)) {
        throw new Error("Invalid advice structure");
      }
    } catch {
      // Fallback if JSON parse fails or structure is invalid
      advice = {
        headline: "Keep building momentum",
        body: "You are making progress. Focus on consistency — small daily improvements compound into big results over 8 weeks.",
        actions: [
          "Complete one task today, no matter how small",
          "Review mentor feedback from your last submission",
          "Reach out to your mentor if you are stuck",
        ],
        encouragement: "Every expert was once a beginner — keep going.",
      };
    }

    return NextResponse.json({ advice });
  } catch (err) {
    console.error("AI Advisor error:", err);
    return NextResponse.json(
      { error: "Could not generate advice" },
      { status: 500 }
    );
  }
}

// ─── PROMPT BUILDERS ─────────────────────────────────────────────────────────

function buildInternPrompt(user: {
  name: string;
  track: string;
  tasksCompleted: number;
  totalTasks: number;
  averageScore: number;
  weakAreas: string[];
  completedTopics: string[];
}) {
  const progress = Math.round((user.tasksCompleted / user.totalTasks) * 100);
  const weak = user.weakAreas.length > 0 ? user.weakAreas.join(", ") : "none identified yet";
  const done = user.completedTopics.length > 0 ? user.completedTopics.join(", ") : "just starting";

  return `
Intern profile:
- Name: ${user.name}
- Track: ${user.track}
- Tasks completed: ${user.tasksCompleted} of ${user.totalTasks} (${progress}% progress)
- Average project score: ${user.averageScore}/100
- Weak areas flagged by mentor: ${weak}
- Topics completed: ${done}

Give this intern specific, honest career advice based on exactly these numbers.
If score is below 70, address that directly. If they are behind on tasks, say so.
If they are doing well, tell them what to do next to stay ahead.
Do not be vague. Reference their actual numbers.
`.trim();
}

function buildAmbassadorPrompt(user: {
  name: string;
  sessionsHosted: number;
  webinarsHosted: number;
  communityReach: number;
  currentBadge: string;
  nextBadgeTarget: number;
}) {
  const gap = user.nextBadgeTarget - user.communityReach;

  return `
Ambassador profile:
- Name: ${user.name}
- AI-awareness sessions hosted: ${user.sessionsHosted}
- Webinars hosted: ${user.webinarsHosted}
- Total community reach: ${user.communityReach} people
- Current badge: ${user.currentBadge}
- People needed to reach next badge: ${gap > 0 ? gap : "already at next level"}

Give this campus ambassador specific, honest advice on how to grow their impact.
Reference their actual numbers — if reach is low, say what to do. If sessions are zero, address that.
If they are close to the next badge, motivate them with the specific gap number.
`.trim();
}
