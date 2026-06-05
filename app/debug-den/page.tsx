"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Terminal, 
  MessageSquare, 
  ChevronUp, 
  ChevronDown, 
  CheckCircle2, 
  Award, 
  Tag, 
  Search, 
  CornerDownRight, 
  Code2, 
  Sparkles,
  ArrowRight,
  User as UserIcon
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

interface Reply {
  id: string;
  author: string;
  avatarInitials: string;
  content: string;
  time: string;
  isCorrect: boolean;
  pointsEarned?: number;
}

interface Question {
  id: string;
  title: string;
  snippet: string;
  codeBlock: string;
  author: string;
  avatarInitials: string;
  tags: string[];
  time: string;
  answersCount: number;
  votes: number;
  replies: Reply[];
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: "q_1",
    title: "How to fix Next.js hydration error when using localstorage items?",
    snippet: "const [data, setData] = useState(localStorage.getItem('user')); // Throws hydration failed warning",
    codeBlock: `// My component layout
export default function UserWidget() {
  const [data, setData] = useState(localStorage.getItem('user') || 'Guest');
  
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded">
      Welcome, {data}!
    </div>
  );
}`,
    author: "Fatima Shah",
    avatarInitials: "FS",
    tags: ["Next.js", "React", "State Management"],
    time: "2 hours ago",
    answersCount: 2,
    votes: 18,
    replies: [
      {
        id: "rep_1",
        author: "Zayn Malik",
        avatarInitials: "ZM",
        content: "Next.js executes code on the server first where `localStorage` is undefined, causing mismatches when the browser hydrates. You must retrieve the value inside a `useEffect` hook instead.",
        time: "1 hour ago",
        isCorrect: true,
        pointsEarned: 50
      },
      {
        id: "rep_2",
        author: "Maya Patel",
        avatarInitials: "MP",
        content: "You could also use a standard dynamic import with `ssr: false` if this entire widget only runs on the client.",
        time: "45 mins ago",
        isCorrect: false
      }
    ]
  },
  {
    id: "q_2",
    title: "Prisma throws SQL connection limit exceeded errors on Next dev rebuilds",
    snippet: "const prisma = new PrismaClient(); // Creates multiple instances on reload",
    codeBlock: `// lib/db.ts
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient(); // Runs multiple times on dev reload
export default db;`,
    author: "Bilal Ahmed",
    avatarInitials: "BA",
    tags: ["Prisma", "PostgreSQL", "Database"],
    time: "5 hours ago",
    answersCount: 1,
    votes: 12,
    replies: [
      {
        id: "rep_3",
        author: "Marcus Aurelius (Mentor)",
        avatarInitials: "MA",
        content: "You should attach the PrismaClient instance to the Node.js global context to prevent it from instantiating repeatedly on hot reloads.",
        time: "3 hours ago",
        isCorrect: true,
        pointsEarned: 50
      }
    ]
  },
  {
    id: "q_3",
    title: "How to validate Pakistani CNIC numbers using Zod schema constraints?",
    snippet: "const schema = z.object({ cnic: z.string().regex(/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/) });",
    codeBlock: `import { z } from "zod";

export const CheckCnicSchema = z.object({
  cnic: z.string()
    .min(15, "CNIC must be 15 chars")
    .regex(/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/, "Format must be XXXXX-XXXXXXX-X")
});`,
    author: "Sara Khan",
    avatarInitials: "SK",
    tags: ["Zod", "API Issues", "Validation"],
    time: "1 day ago",
    answersCount: 0,
    votes: 4,
    replies: []
  }
];

export default function DebugDenPage() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>("q_1");
  const [searchQuery, setSearchQuery] = useState("");
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down" | null>>({});

  const sidebarTags = ["All", "Next.js", "React", "Prisma", "Zod", "API Issues", "Database"];

  const filteredQuestions = MOCK_QUESTIONS.filter((q) => {
    const matchesTag = selectedTag === "All" || q.tags.includes(selectedTag);
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const activeQuestion = MOCK_QUESTIONS.find((q) => q.id === activeQuestionId) || MOCK_QUESTIONS[0];

  const handleVote = (id: string, type: "up" | "down") => {
    const current = userVotes[id];
    if (current === type) {
      setUserVotes({ ...userVotes, [id]: null });
    } else {
      setUserVotes({ ...userVotes, [id]: type });
    }
  };

  const getVoteCount = (question: Question) => {
    const voteState = userVotes[question.id];
    if (voteState === "up") return question.votes + 1;
    if (voteState === "down") return question.votes - 1;
    return question.votes;
  };

  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-100 pb-20 pt-28 overflow-hidden select-none">
      {/* Background radial effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      <div className="relative mx-auto max-w-5xl px-6">
        
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-8 border-b border-white/5 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Code2 size={12} className="animate-pulse" />
              Connexode Dev Forum
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight font-display">
              Debug Den — Community Q&A
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Stuck on a task? Ask questions, share snippets, and earn badge points by helping others.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search debug den threads..."
              className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-cyan-400/40"
            />
          </div>
        </div>

        {/* Forum Layout Grid */}
        <div className="grid gap-6 lg:grid-cols-4 items-start">
          
          {/* Tags Sidebar */}
          <div className="lg:col-span-1 rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-xl space-y-4 shadow-lg">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-2">
              <Tag size={13} className="text-cyan-400" />
              Filter By Tag
            </h3>

            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {sidebarTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    "w-full text-left rounded-lg px-3 py-2 text-xs font-bold transition-all border outline-none cursor-pointer",
                    selectedTag === tag
                      ? "bg-cyan-400/10 border-cyan-400/20 text-cyan-400"
                      : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/2"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Main Feed and Detailed Thread Container */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Split screen: left list, right details (or grid depending on state) */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Main Feed List */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-2">
                  Outreach Threads ({filteredQuestions.length})
                </h3>

                {filteredQuestions.length === 0 ? (
                  <div className="rounded-2xl border border-white/5 bg-white/1 p-8 text-center text-xs text-slate-500">
                    No matching threads found.
                  </div>
                ) : (
                  filteredQuestions.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => setActiveQuestionId(q.id)}
                      className={cn(
                        "rounded-xl border p-4.5 space-y-3 cursor-pointer transition-all hover:bg-white/2 select-none",
                        activeQuestionId === q.id 
                          ? "border-cyan-400/40 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
                          : "border-white/5 bg-white/1"
                      )}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <h4 className={cn("text-xs font-bold leading-snug", 
                          activeQuestionId === q.id ? "text-cyan-400" : "text-white"
                        )}>
                          {q.title}
                        </h4>
                      </div>

                      <pre className="rounded-lg bg-black/40 border border-white/5 p-2 font-mono text-[9px] text-slate-500 overflow-x-hidden text-ellipsis whitespace-nowrap">
                        {q.snippet}
                      </pre>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500 pt-1">
                        <div className="flex gap-1">
                          {q.tags.slice(0, 2).map((t) => (
                            <span key={t} className="rounded bg-white/5 border border-white/5 px-2 py-0.5 text-[8px] font-bold text-slate-400">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 font-medium font-mono text-[9px]">
                          <span>{q.time}</span>
                          <span className="flex items-center gap-1 text-cyan-400">
                            <MessageSquare size={10} />
                            {q.answersCount} answers
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Detailed Thread View */}
              {activeQuestion && (
                <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl shadow-xl space-y-6">
                  
                  {/* Title & Author header */}
                  <div className="flex items-start gap-4 border-b border-white/5 pb-4">
                    {/* Votes container */}
                    <div className="flex flex-col items-center rounded-lg bg-black/30 border border-white/5 p-1.5 text-center min-w-[36px]">
                      <button 
                        onClick={() => handleVote(activeQuestion.id, "up")}
                        className={cn("text-slate-500 hover:text-cyan-400 transition-colors", 
                          userVotes[activeQuestion.id] === "up" && "text-cyan-400"
                        )}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <span className="text-xs font-mono font-bold text-slate-200 my-0.5">
                        {getVoteCount(activeQuestion)}
                      </span>
                      <button 
                        onClick={() => handleVote(activeQuestion.id, "down")}
                        className={cn("text-slate-500 hover:text-red-400 transition-colors", 
                          userVotes[activeQuestion.id] === "down" && "text-red-400"
                        )}
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>

                    <div className="space-y-2 flex-1">
                      <h3 className="text-xs font-extrabold text-white leading-normal">
                        {activeQuestion.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[9px] text-slate-500">
                        <div className="h-4.5 w-4.5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[8px] text-slate-300 border border-white/5">
                          {activeQuestion.avatarInitials}
                        </div>
                        <span>Asked by <span className="font-semibold text-slate-400">{activeQuestion.author}</span> · {activeQuestion.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Formatted Code Block Section */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                      <Terminal size={11} className="text-cyan-400" />
                      Code Context
                    </span>
                    <div className="rounded-xl border border-white/5 bg-black/50 p-4 font-mono text-2xs overflow-x-auto text-slate-400 leading-relaxed shadow-inner">
                      <pre>{activeQuestion.codeBlock}</pre>
                    </div>
                  </div>

                  {/* Replies List */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 flex items-center gap-2.5">
                      <CornerDownRight size={12} className="text-slate-600" />
                      Replies ({activeQuestion.replies.length})
                    </h4>

                    {activeQuestion.replies.length === 0 ? (
                      <p className="text-[10px] text-slate-600 italic pl-6">No answers posted yet. Help your classmate!</p>
                    ) : (
                      <div className="space-y-3.5 pl-6 border-l border-white/5">
                        {activeQuestion.replies.map((reply) => (
                          <div 
                            key={reply.id} 
                            className={cn("rounded-xl border p-4 space-y-2.5 shadow-sm relative overflow-hidden",
                              reply.isCorrect 
                                ? "border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.03)]" 
                                : "border-white/5 bg-white/1"
                            )}
                          >
                            {/* Best reply ribbon */}
                            {reply.isCorrect && (
                              <div className="absolute top-0 right-0 rounded-bl-lg bg-emerald-500 px-2.5 py-0.5 text-[8px] font-black uppercase text-[#020B18] tracking-widest flex items-center gap-1">
                                <Award size={9} />
                                Correct Answer
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-[9px] text-slate-500">
                              <div className="h-4.5 w-4.5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[8px] text-slate-300 border border-white/5">
                                {reply.avatarInitials}
                              </div>
                              <span className="font-semibold text-slate-300">{reply.author}</span>
                              <span>· {reply.time}</span>
                            </div>

                            <p className="text-2xs text-slate-400 leading-relaxed">
                              {reply.content}
                            </p>

                            {/* Point notification reward display */}
                            {reply.isCorrect && reply.pointsEarned && (
                              <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-extrabold pt-0.5 select-none">
                                <Sparkles size={11} className="animate-pulse" />
                                <span>Earned +{reply.pointsEarned} Points (Milestone Achieved)</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
