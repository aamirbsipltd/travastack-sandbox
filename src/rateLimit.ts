import type { RequestHandler } from "express";

const hits = new Map<string, { count: number; resetAt: number }>();

/** Fixed-window rate limit per IP: `perMinute` requests, then HTTP 429 with Retry-After. */
export function createRateLimiter(perMinute: number): RequestHandler {
  return (req, res, next) => {
    const key = req.ip ?? "unknown";
    const now = Date.now();
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
