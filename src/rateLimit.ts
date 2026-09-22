import type { RequestHandler } from "express";

const hits = new Map<string, { count: number; resetAt: number }>();

/** How often to sweep expired windows out of `hits`, so the map cannot grow without bound. */
const SWEEP_INTERVAL_MS = 60_000;
let lastSweep = Date.now();

function sweepExpired(now: number): void {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key);
  }
}

/** Fixed-window rate limit per IP: `perMinute` requests, then HTTP 429 with Retry-After. */
export function rateLimit(perMinute: number): RequestHandler {
  return (req, res, next) => {
    const key = req.ip ?? "unknown";
    const now = Date.now();
    sweepExpired(now);
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + 60_000 });
      return next();
    }
    entry.count += 1;
    if (entry.count > perMinute) {
      res.setHeader("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ error: "rate limit exceeded" });
    }
    next();
  };
}
