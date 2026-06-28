// middleware.ts
// Passthrough — no route blocking.
// Dashboard auth is handled client-side via localStorage (mock-auth).
// Admin auth is handled by the admin page itself.
export function middleware() {}
export const config = { matcher: [] }
