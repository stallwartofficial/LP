"use client";

// Client-only preference store for genuinely useful, non-sensitive UI state
// (for example, which posts a returning reader has already opened).
//
// Why localStorage and NOT cookies: this site is statically rendered and has no
// server-side personalization, so a cookie would be attached to every single
// HTTP request, adding weight to the exact Core Web Vitals we work to protect,
// while no server code would ever read it. localStorage carries zero request
// weight, never leaves the device, and is never transmitted, which also makes
// it the more privacy-preserving choice. Theme and the cookie notice already
// use it; this is the shared, versioned home for the rest.
//
// Everything stored here is non-identifying UI state. No names, emails, or form
// input ever go through this module. Every access is wrapped: storage can be
// disabled, full, or throw in private modes, and that must never reach render.

// Versioned namespace so the stored shape can evolve without colliding with
// values written by an older build.
const NS = "stallwart:v1:";

export function getItem(key: string): string | null {
  try {
    return localStorage.getItem(NS + key);
  } catch {
    return null;
  }
}

export function setItem(key: string, value: string): void {
  try {
    localStorage.setItem(NS + key, value);
  } catch {
    /* storage unavailable, preference simply will not persist, non-fatal */
  }
}

// --- Read posts -----------------------------------------------------------
// A small set of blog slugs the visitor has opened, so the index can quietly
// mark them for returning readers. Capped and FIFO-trimmed so it can never grow
// without bound, and stored as a plain JSON array of slugs under one key.

const READ_POSTS_KEY = "read-posts";
const READ_POSTS_MAX = 80;

export function getReadPosts(): Set<string> {
  const raw = getItem(READ_POSTS_KEY);
  if (!raw) return new Set();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((s): s is string => typeof s === "string"));
  } catch {
    return new Set();
  }
}

export function markPostRead(slug: string): void {
  const set = getReadPosts();
  if (set.has(slug)) return;
  set.add(slug);
  // Keep only the most recent READ_POSTS_MAX slugs (drop the oldest).
  const next = Array.from(set).slice(-READ_POSTS_MAX);
  setItem(READ_POSTS_KEY, JSON.stringify(next));
}
