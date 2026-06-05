"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Code2, 
  Check, 
  X, 
  ChevronRight,
  Flame,
  Lightbulb
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

// Mock Data
const FLASHCARDS = [
  {
    question: "What is the primary purpose of the React 'useRef' hook?",
    answer: "useRef returns a mutable ref object whose .current property is initialized to the passed argument. It persists values across renders without triggering a re-render when the value changes, and is commonly used to access DOM elements directly.",
    code: `const inputRef = useRef<HTMLInputElement>(null);

const focusInput = () => {
  // Focus the input DOM node directly
  inputRef.current?.focus();
};`
  },
  {
    question: "Explain the difference between SQL 'Inner Join' and 'Left Join'.",
    answer: "INNER JOIN returns records that have matching values in both tables. LEFT JOIN returns all records from the left table, and the matched records from the right table. If there is no match, the result is NULL from the right side.",
    code: `-- Inner Join returns matching only
SELECT users.name, enrollments.status
FROM users
INNER JOIN enrollments ON users.id = enrollments.userId;

-- Left Join returns all users even without enrollment
SELECT users.name, enrollments.status
FROM users
LEFT JOIN enrollments ON users.id = enrollments.userId;`
  }
];

const QUIZ_QUESTION = {
  question: "Which of the following describes Next.js dynamic routing folder syntax inside the App Router?",
  options: [
    { key: "A", text: "app/posts/:id/page.tsx" },
    { key: "B", text: "app/posts/[id]/page.tsx", isCorrect: true },
    { key: "C", text: "app/posts/(id)/page.tsx" },
    { key: "D", text: "app/posts/{id}/page.tsx" }
  ],
  explanation: "In Next.js App Router, dynamic route segments are defined by wrapping a folder name in square brackets: [segmentName]. For example, app/posts/[id]/page.tsx matches routes like /posts/123."
};

export default function MicroLearningPage() {
  const [completedCount, setCompletedCount] = useState(3);
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Quiz states
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashcardIdx((prev) => (prev + 1) % FLASHCARDS.length);
    }, 150);
  };

  const handleOptionSelect = (key: string) => {
    if (quizAnswered) return;
    setSelectedOption(key);
    setQuizAnswered(true);

    const isCorrect = QUIZ_QUESTION.options.find(o => o.key === key)?.isCorrect;
    if (isCorrect) {
      setCompletedCount((prev) => Math.min(prev + 1, 5));
    }
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setQuizAnswered(false);
  };

  const currentCard = FLASHCARDS[flashcardIdx];
  const goalTarget = 5;

  return (
    <main className="relative min-h-screen bg-[#020B18] text-slate-100 pb-20 pt-28 overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      <div className="relative mx-auto max-w-4xl px-6">
        
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Dashboard
        </Link>

        {/* Workspace Grid */}
        <div className="grid gap-8 md:grid-cols-3 items-start">
          
          {/* Left Column (Goal Ring & Flashcard) */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Header / Goal Progress Ring */}
            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl flex items-center justify-between shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <Sparkles size={12} className="animate-pulse" />
                  Connexode Micro-Labs
                </div>
                <h1 className="text-xl font-black text-white tracking-tight font-display mt-2">
                  AI Flashcards & Daily Quizzes
                </h1>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Reinforce core concepts daily. Flip cards to reveal answers and audit code examples.
                </p>
              </div>

              {/* Glowing Circular Progress SVG */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="url(#progressGradient)"
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 32}
                    strokeDashoffset={2 * Math.PI * 32 * (1 - completedCount / goalTarget)}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-sm font-black text-white">{completedCount}/{goalTarget}</span>
                  <span className="text-[7px] uppercase font-bold text-slate-500 tracking-wider">Goal</span>
                </div>
              </div>
            </div>

            {/* 3D Flip Flashcard */}
            <div className="perspective-1000 h-[360px] w-full relative">
              <div 
                className={cn(
                  "relative w-full h-full duration-500 transform-style-3d cursor-pointer select-none",
                  isFlipped && "rotate-y-180"
                )}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                
                {/* CARD FRONT */}
                <div className="absolute inset-0 backface-hidden rounded-2xl border border-white/8 bg-[#030c1c]/90 p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl" />
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-white/5 pb-3.5">
                    <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle size={13} className="text-cyan-400" />
                      Flashcard Question
                    </span>
                    <span>Card {flashcardIdx + 1} of {FLASHCARDS.length}</span>
                  </div>

                  <p className="text-md font-bold text-white text-center leading-relaxed px-4 my-auto">
                    {currentCard.question}
                  </p>

                  <div className="flex justify-center border-t border-white/5 pt-4">
                    <button 
                      type="button"
                      className="rounded-xl bg-cyan-400/10 border border-cyan-400/25 px-5 py-2.5 text-2xs font-bold text-cyan-400 hover:bg-cyan-400/15 transition-all"
                    >
                      Tap to Reveal Answer
                    </button>
                  </div>
                </div>

                {/* CARD BACK */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-white/8 bg-[#030c1c]/90 p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-white/5 pb-3.5">
                    <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      AI Solution Explainer
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Stop flipping trigger
                        handleNextCard();
                      }}
                      className="text-[10px] text-cyan-400 hover:text-white flex items-center gap-1"
                    >
                      Next Card <ChevronRight size={12} />
                    </button>
                  </div>

                  <div className="space-y-4 my-auto overflow-y-auto max-h-[200px] pr-2 custom-scrollbar">
                    <p className="text-2xs text-slate-300 leading-relaxed">
                      {currentCard.answer}
                    </p>
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1">
                        <Code2 size={11} className="text-cyan-400" />
                        Code Reference
                      </span>
                      <pre className="rounded-lg bg-black/40 border border-white/5 p-3 font-mono text-[9px] text-slate-400 overflow-x-auto select-text leading-relaxed">
                        {currentCard.code}
                      </pre>
                    </div>
                  </div>

                  <div className="flex justify-center border-t border-white/5 pt-4">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                      Tap card to flip back
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column (Daily Quiz UI) */}
          <div className="md:col-span-1 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl shadow-lg space-y-6">
            
            {/* Title / Header icon */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-2">
                <Flame className="text-yellow-500" size={14} />
                Daily Quiz Challenge
              </span>
              {quizAnswered && (
                <button 
                  onClick={resetQuiz}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <RotateCcw size={12} />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-200 leading-relaxed">
                {QUIZ_QUESTION.question}
              </h3>

              {/* Options lists */}
              <div className="space-y-2.5">
                {QUIZ_QUESTION.options.map((opt) => {
                  const isSelected = selectedOption === opt.key;
                  const showSuccess = quizAnswered && opt.isCorrect;
                  const showError = quizAnswered && isSelected && !opt.isCorrect;

                  return (
                    <button
                      key={opt.key}
                      disabled={quizAnswered}
                      onClick={() => handleOptionSelect(opt.key)}
                      className={cn(
                        "w-full rounded-xl border p-3.5 text-left text-xs transition-all flex items-start gap-3 outline-none cursor-pointer",
                        showSuccess 
                          ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                          : showError
                          ? "border-red-500/30 bg-red-500/5 text-red-300"
                          : isSelected
                          ? "border-cyan-400/40 bg-cyan-500/5 text-cyan-400"
                          : "border-white/5 bg-white/1 text-slate-400 hover:text-slate-200 hover:border-white/10"
                      )}
                    >
                      <span className={cn(
                        "h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-extrabold border shrink-0",
                        showSuccess
                          ? "border-emerald-400 text-[#020B18] bg-emerald-400"
                          : showError
                          ? "border-red-400 text-white bg-red-500"
                          : isSelected
                          ? "border-cyan-400 text-[#020B18] bg-cyan-400"
                          : "border-white/10 text-slate-500"
                      )}>
                        {showSuccess ? <Check size={10} /> : showError ? <X size={10} /> : opt.key}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explainer section */}
              {quizAnswered && (
                <div className="rounded-xl border border-white/5 bg-white/1 p-4.5 space-y-2 animate-fade-in">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Lightbulb className="text-yellow-500" size={13} />
                    <span>Explanation</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {QUIZ_QUESTION.explanation}
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
