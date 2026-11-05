/**
 * Security & Privacy Utilities
 * Provides runtime email de-obfuscation (anti-scraping),
 * URL protocol validation, and action rate-limiting.
 */

// Parts assembled at runtime to prevent automated scraping of static HTML
const EMAIL_USER = 'spandanr098';
const EMAIL_HOST = 'gmail.com';

/**
 * Reassembles the contact email at runtime in JS memory.
 */
export const getContactEmail = (): string => {
  return `${EMAIL_USER}@${EMAIL_HOST}`;
};

/**
 * Validates that a link URL uses only safe protocols (https: or mailto:).
 * Blocks javascript:, data:, vbscript:, and relative malicious vectors.
 */
export const isSafeUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  
  // Safe internal anchor links
  if (trimmed.startsWith('#')) return true;
  
  // Whitelisted protocols
  return trimmed.startsWith('https://') || trimmed.startsWith('mailto:');
};

/**
 * Sanitizes an href attribute. If unsafe, returns '#' as a fallback.
 */
export const sanitizeHref = (url: string): string => {
  return isSafeUrl(url) ? url : '#';
};

/**
 * Basic in-memory rate limiter to prevent automated rapid clicks
 */
export const createRateLimiter = (cooldownMs: number = 1000) => {
  let lastExecution = 0;

  return (callback: () => void): boolean => {
    const now = Date.now();
    if (now - lastExecution < cooldownMs) {
      return false; // Throttled
    }
    lastExecution = now;
    callback();
    return true;
  };
};
