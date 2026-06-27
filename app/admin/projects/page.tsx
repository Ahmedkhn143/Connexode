// app/admin/projects/page.tsx
// Admin — Projects management
// Publish projects to showcase, mark as featured, update scores

import { prisma } from "@/lib/prisma";
import { FolderOpen } from "lucide-react";
import { ProjectToggleButtons } from "@/components/admin/ProjectToggleButtons";

export const dynamic = "force-dynamic";

async function getProjects() {
  return prisma.project.findMany({
    orderBy: [{ published: "desc" }, { createdAt: "desc" }],
    include: {
      intern: { select: { name: true, email: true } },
      application: { select: { track: true, university: true } },
    },
  });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  const unpublished = projects.filter((p) => !p.published);
  const published   = projects.filter((p) => p.published);

  return (
    <div className="px-8 py-8 max-w-5xl">

      <div className="mb-8">
        <h1 style={{ color: "#E8F4F8" }} className="text-2xl font-bold">Projects</h1>
        <p style={{ color: "rgba(126,200,216,0.45)" }} className="mt-1 text-sm">
          {published.length} published to showcase · {unpublished.length} awaiting review
        </p>
      </div>

      {/* Unpublished — needs review */}
      {unpublished.length > 0 && (
        <section className="mb-10">
          <p style={{ color: "#F59E0B" }} className="mb-4 text-xs font-semibold uppercase tracking-widest">
            ⏳ Awaiting review
          </p>
          <div className="space-y-3">
            {unpublished.map((p) => (
              <div
                key={p.id}
                style={{ backgroundColor: "#082038", border: "1px solid rgba(245,158,11,0.18)" }}
                className="rounded-xl px-5 py-4"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold">{p.title}</p>
                    <p style={{ color: "rgba(126,200,216,0.4)" }} className="mt-0.5 text-xs">
                      {p.intern.name} · {p.application.track ?? "General"} · {p.application.university}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 flex-shrink-0">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#7EC8D8", border: "1px solid rgba(126,200,216,0.2)" }}
                        className="rounded-full px-3 py-1 text-xs transition-colors hover:border-[rgba(126,200,216,0.4)]">
                        GitHub
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#7EC8D8", border: "1px solid rgba(126,200,216,0.2)" }}
                        className="rounded-full px-3 py-1 text-xs transition-colors hover:border-[rgba(126,200,216,0.4)]">
                        Live
                      </a>
                    )}
                  </div>
                </div>
                <p style={{ color: "rgba(126,200,216,0.5)" }} className="mb-4 text-xs leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.map((s) => (
                    <span key={s}
                      style={{ backgroundColor: "rgba(4,12,24,0.5)", border: "1px solid rgba(126,200,216,0.1)", color: "rgba(126,200,216,0.45)" }}
                      className="rounded-full px-2.5 py-0.5 text-[10px]">{s}</span>
                  ))}
                </div>
                <ProjectToggleButtons
                  projectId={p.id}
                  currentPublished={p.published}
                  currentFeatured={p.featured}
                  currentScore={p.score}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Published */}
      <section>
        <p style={{ color: "rgba(126,200,216,0.35)" }} className="mb-4 text-xs font-semibold uppercase tracking-widest">
          Published to showcase
        </p>
        {published.length === 0 ? (
          <div
            style={{ backgroundColor: "#082038", border: "1px solid rgba(126,200,216,0.08)" }}
            className="rounded-xl py-12 text-center"
          >
            <FolderOpen size={24} style={{ color: "rgba(126,200,216,0.15)" }} className="mx-auto mb-3" />
            <p style={{ color: "rgba(126,200,216,0.3)" }} className="text-sm">No projects published yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {published.map((p) => (
              <div
                key={p.id}
                style={{ backgroundColor: "#082038", border: `1px solid ${p.featured ? "rgba(245,158,11,0.25)" : "rgba(126,200,216,0.1)"}` }}
                className="rounded-xl px-5 py-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p style={{ color: "#E8F4F8" }} className="text-sm font-semibold">{p.title}</p>
                    {p.featured && (
                      <span style={{ backgroundColor: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B" }}
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold">⭐ Featured</span>
                    )}
                  </div>
                  <span style={{ color: "#7EC8D8" }} className="text-sm font-bold">{p.score}/100</span>
                </div>
                <p style={{ color: "rgba(126,200,216,0.4)" }} className="mb-3 text-xs">
                  {p.intern.name} · {p.application.track ?? "General"}
                </p>
                <ProjectToggleButtons
                  projectId={p.id}
                  currentPublished={p.published}
                  currentFeatured={p.featured}
                  currentScore={p.score}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
