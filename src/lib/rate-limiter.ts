/**
 * Best-effort in-memory sliding window rate limiter.
 *
 * NOTE ON SERVERLESS EXECUTION:
 * Serverless platforms (like Vercel Hobby) instantiate multiple independent, ephemeral
 * lambda instances that do not share process memory. This limiter provides best-effort
 * client throttling on single instances, but is not a distributed DDoS barrier.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const windowMs = 60 * 1000; // 1 minute sliding window
const maxRequestsPerWindow = 15; // 15 requests per minute client rate-limiting guard
const ipMap = new Map<string, RateLimitRecord>();

// Periodic memory cleanup to prevent memory bloat
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleEntries(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [ip, record] of ipMap.entries()) {
    const validTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);
    if (validTimestamps.length === 0) {
      ipMap.delete(ip);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}

export function checkRateLimit(ip: string): { success: boolean; remaining: number } {
  const now = Date.now();
  cleanupStaleEntries(now);

  const record = ipMap.get(ip) || { timestamps: [] };
  // Keep only timestamps within sliding window
  const activeTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (activeTimestamps.length >= maxRequestsPerWindow) {
    ipMap.set(ip, { timestamps: activeTimestamps });
    return { success: false, remaining: 0 };
  }

  activeTimestamps.push(now);
  ipMap.set(ip, { timestamps: activeTimestamps });
  return { success: true, remaining: maxRequestsPerWindow - activeTimestamps.length };
}

