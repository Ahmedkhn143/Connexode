// app/loading.tsx
// Root-level loading skeleton — shown during page transitions
// Next.js automatically shows this while server components load

export default function Loading() {
  return (
    <main
      style={{ backgroundColor: "#040C18" }}
      className="flex min-h-screen items-center justify-center antialiased"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div
          style={{
            border: "2px solid rgba(126,200,216,0.1)",
            borderTopColor: "#188080",
          }}
          className="h-10 w-10 animate-spin rounded-full"
        />
        {/* Pulse logo text */}
        <p
          style={{ color: "rgba(126,200,216,0.3)" }}
          className="animate-pulse text-sm font-semibold tracking-widest"
        >
          Conne<span style={{ color: "rgba(24,128,128,0.6)" }}>x</span>ode
        </p>
      </div>
    </main>
  );
}
