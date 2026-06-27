// auth.ts — root level
// NextAuth v5 (Auth.js) config
// Install: npm install next-auth@beta bcryptjs @auth/prisma-adapter
// Install types: npm install -D @types/bcryptjs

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // ── Providers ──────────────────────────────────────────────────────────────
  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) return null;

        // Find user in DB
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase().trim() },
        });

        if (!user || !user.hashedPassword) return null;

        // Verify password
        const valid = await bcrypt.compare(password, user.hashedPassword);
        if (!valid) return null;

        return {
          id:    user.id,
          name:  user.name,
          email: user.email,
          role:  user.role,
        };
      },
    }),
  ],

  // ── Session & JWT ──────────────────────────────────────────────────────────
  session: { strategy: "jwt" },

  callbacks: {
    // Embed role + id into JWT
    jwt({ token, user }) {
      if (user) {
        token.id   = user.id;
        token.role = (user as { role?: string }).role ?? "STUDENT";
      }
      return token;
    },
    // Expose role + id on session.user
    session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id   = token.id as string;
        (session.user as { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },

  // ── Custom pages ───────────────────────────────────────────────────────────
  pages: {
    signIn: "/auth/signin",
    error:  "/auth/signin", // auth errors redirect here with ?error=
  },

  // ── Security ───────────────────────────────────────────────────────────────
  secret: process.env.NEXTAUTH_SECRET,
});
