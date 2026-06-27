// components/providers/SessionProvider.tsx
// Wraps the app in NextAuth SessionProvider for client-side useSession()
// Add this to app/layout.tsx around {children}

"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
