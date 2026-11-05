# Security & Production Hardening Guide

This document specifies the security controls, hosting configurations, anti-scraping measures, and operational defenses implemented for Spandan Roy's Developer Portfolio.

---

## 1. Architecture & Attack Surface Analysis

- **Application Type**: Client-side Single Page Application (React 18 + TypeScript + Vite + Tailwind CSS).
- **Backend / Storage Surface**: Static frontend asset delivery with no sensitive server-side database endpoints exposed directly to client unauthenticated write traffic.
- **Data Model**: All personal data is sanitized. Personal phone numbers have been completely purged from all schemas, state, and UI. Email addresses are assembled dynamically in JavaScript memory at runtime to prevent static scrapers from harvesting plain text.

---

## 2. Implemented Code-Level Hardening

1. **XSS Prevention**:
   - Zero instances of `dangerouslySetInnerHTML`, `innerHTML`, `eval`, or `new Function`.
   - All dynamic strings and user-entered terminal input are rendered strictly as escaped text children.
2. **Interactive Terminal Sanitization & Rate Limiting**:
   - Input length capped at 100 characters (`maxLength={100}`).
   - Strict command whitelisting: only pre-defined commands (`help`, `about`, `skills`, `projects`, `leadership`, `contact`, `ping`, `sudo hire`, `clear`) execute.
   - Throttling: Rapid keystroke/submission bursts are debounced/rate-limited with timestamp checks.
   - Bounded command history: Memory is capped to the last 50 entries to prevent memory exhaustion / client-side denial of service.
3. **Tabnabbing & Reverse Tabnabbing Protection**:
   - All outgoing `target="_blank"` anchor elements include `rel="noopener noreferrer"`.
4. **URL Protocol Whitelisting**:
   - Dedicated security validator (`src/utils/security.ts`) validates that URLs use only safe `https:` or `mailto:` schemes, rejecting `javascript:`, `data:`, or malformed relative schemes.
5. **Action Rate-Limiting**:
   - Clipboard copy and mailto interaction triggers are guarded by an in-memory rate limiter with visual debounce.
6. **Production Minification & Console Stripping**:
   - `vite.config.ts` configured with `esbuild.drop = ['console', 'debugger']` in production mode.
   - Source maps disabled (`sourcemap: false`) in production builds to prevent exposing source layout.
7. **Type-Safety & Compiler Hardening**:
   - `tsconfig.json` enforces `"strict": true` and `"noImplicitAny": true`.

---

## 3. Stability & Crash-Resistance ("Can't Be Crashed")

1. **Global React Error Boundary**:
   - Implemented in `src/components/ErrorBoundary.tsx` and wrapped around the root in `src/main.tsx`.
   - Formatted in the site's dark editorial aesthetic (`#030303`, `#ff8c59`, serif typography).
   - If an unexpected error occurs in any subtree, the site catches the error gracefully, offers a state reset and page reload button, and prevents a blank white screen.
2. **Lifecycle & Memory Management**:
   - `AsciiPortrait`: Listens to `visibilitychange`. When the user switches tabs, `requestAnimationFrame` stops running to conserve CPU, GPU, and battery.
   - Respects `prefers-reduced-motion`: When reduced motion is requested, renders a single high-fidelity static frame without running continuous ripple animation loops.
   - Self-hosted asset: Portrait image is loaded locally from `/assets/aistudio/...` rather than third-party CDNs to avoid CORS taint and cross-site failure.
   - Image error fallback: If the portrait file fails to load, the canvas handles `onerror` gracefully without hanging.
   - Observers & Timers: All `IntersectionObserver` instances invoke `.disconnect()` on unmount. All interactive simulation timers (`CivicFlowTracker`, `PharmaPipeline`) clear their timeouts on unmount.

---

## 4. Security Headers & Host Configurations

The site provides pre-configured security headers for **Vercel** (`vercel.json`) and **Netlify / Cloudflare Pages** (`public/_headers`):

### Headers Implemented:
| Header | Value | Purpose |
| :--- | :--- | :--- |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';` | Prevents unauthorized script execution, iframe embedding, and injection |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS strictly for 2 years and qualifies for browser preload list |
| `X-Content-Type-Options` | `nosniff` | Blocks MIME-type sniffing |
| `X-Frame-Options` | `DENY` | Prevents clickjacking by prohibiting framing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Protects visitor referral paths |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), screen-wake-lock=(), vr=()` | Restricts hardware APIs |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates browsing context from cross-origin popups |
| `Cross-Origin-Resource-Policy`| `same-origin` | Prevents other domains from reading site resources |
| `X-XSS-Protection` | `1; mode=block` | Legacy browser XSS filtering |

---

## 5. Privacy & Anti-Scraping

- **Robots Policy (`public/robots.txt`)**: Allows search indexing of public routes while disallowing crawl of administrative or JSON data paths.
- **Security Vulnerability Disclosure (`public/.well-known/security.txt`)**: Adheres to RFC 9116, directing security researchers to `spandanr098@gmail.com`.
- **Email De-obfuscation**: Assembled in memory via string chunks to deter basic regex-based email scrapers.
- **Phone Number Removal**: Completely purged from portfolio data, resume modal, and interactive terminal.

---

## 6. Recommended Cloudflare & Domain Setup

When deploying to a custom domain (e.g. `spandanroy.dev`):
1. **Proxy Status**: Set DNS records to **Proxied** (orange cloud) in Cloudflare.
2. **SSL/TLS Mode**: Set to **Full (Strict)** with **Always Use HTTPS** and **Automatic HTTPS Rewrites** enabled.
3. **HSTS**: Enable HSTS with `max-age=31536000` (1 year), `includeSubDomains`, and `preload`.
4. **Bot Fight Mode**: Enable under **Security > Bots > Bot Fight Mode** to challenge malicious scrapers and headless bots.
5. **DDoS Protection**: Under **Security > DDoS**, enable default HTTP DDoS mitigation rulesets.
6. **GitHub Account Security**:
   - Require 2FA (Two-Factor Authentication) on GitHub.
   - Enable Dependabot alerts and automated security updates.
   - Configure branch protection rules on `main` (require status checks to pass before merging).
