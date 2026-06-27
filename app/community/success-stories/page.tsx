// app/community/success-stories/page.tsx
// Success Stories — real student outcomes
// Stories are added manually via Prisma Studio or admin panel later

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Heart, Quote, ArrowRight } from "lucide-react";

// Fetch published stories from DB
// Model added in consolidated schema below
async function getStories() {
  try {
    return await prisma.successStory.findMany({
      where:   { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function SuccessStoriesPage() {
  const stories = await getStories();

  return (
    <main
      style={{ backgroundColor: "#040C18" }}
      className="min-h-screen pt-24 pb-20 antialiased"
    >
      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <span
          style={{
            border: "1px solid rgba(126,200,216,0.2)",
            color: "#7EC8D8",
            backgroundColor: "rgba(8,32,56,0.6)",
          }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          <Heart size={11} /> Stories
        </span>
        <h1
          style={{ color: "#E8F4F8" }}
          className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Real students.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #7EC8D8 0%, #188080 60%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Real growth.
          </span>
        </h1>
        <p
          style={{ color: "rgba(126,200,216,0.5)" }}
          className="mx-auto max-w-xl text-base leading-relaxed"
        >
          Hear from the ambassadors and interns who grew their skills,
          built their network, and changed their trajectory through Connexode.
        </p>
      </section>

      {/* ── Stories ── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        {stories.length === 0 ? (
          /* Empty state — shows until real stories are added */
          <div className="mx-auto max-w-lg text-center py-16">
            <div
              style={{
                border: "1px dashed rgba(126,200,216,0.15)",
                backgroundColor: "rgba(8,32,56,0.3)",
              }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            >
              <Heart size={24} style={{ color: "rgba(126,200,216,0.2)" }} />
            </div>
            <p
              style={{ color: "rgba(126,200,216,0.4)" }}
              className="mb-2 text-sm font-medium"
            >
              Stories coming soon
            </p>
            <p
              style={{ color: "rgba(126,200,216,0.25)" }}
              className="text-xs leading-relaxed"
            >
              We are collecting stories from our first cohort of ambassadors
              and interns. Check back soon — or become part of the first wave.
            </p>
            <Link
              href="/join"
              style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
            >
              Join Connexode <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <div
                key={story.id}
                style={{
                  backgroundColor: "#082038",
                  border: "1px solid rgba(126,200,216,0.1)",
                }}
                className="flex flex-col rounded-2xl p-6 transition-all hover:border-[rgba(126,200,216,0.25)]"
              >
                {/* Quote icon */}
                <Quote
                  size={20}
                  style={{ color: "rgba(24,128,128,0.4)" }}
                  className="mb-4"
                />

                {/* Quote text */}
                <p
                  style={{ color: "rgba(126,200,216,0.7)" }}
                  className="mb-6 flex-1 text-sm leading-relaxed"
                >
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* Person info */}
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      backgroundColor: "rgba(24,128,128,0.2)",
                      border: "1px solid rgba(24,128,128,0.3)",
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0"
                  >
                    <span
                      style={{ color: "#7EC8D8" }}
                      className="text-sm font-bold"
                    >
                      {story.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p
                      style={{ color: "#E8F4F8" }}
                      className="text-sm font-semibold"
                    >
                      {story.name}
                    </p>
                    <p
                      style={{ color: "rgba(126,200,216,0.4)" }}
                      className="text-xs"
                    >
                      {story.role} · {story.university}
                    </p>
                  </div>
                </div>

                {/* Outcome stat (optional) */}
                {story.outcomeStat && (
                  <div
                    style={{
                      backgroundColor: "rgba(24,128,128,0.08)",
                      border: "1px solid rgba(24,128,128,0.2)",
                    }}
                    className="mt-4 rounded-lg px-4 py-2.5"
                  >
                    <p
                      style={{ color: "#7EC8D8" }}
                      className="text-xs font-semibold"
                    >
                      {story.outcomeStat}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-3xl px-6 text-center">
        <p
          style={{ color: "rgba(126,200,216,0.35)" }}
          className="mb-4 text-sm"
        >
          Want to write your own success story?
        </p>
        <Link
          href="/join"
          style={{ backgroundColor: "#188080", color: "#E8F4F8" }}
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:brightness-110 active:scale-95"
        >
          Join Connexode <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
