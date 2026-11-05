# Production Audit & Hardening Log

## Iteration 1: Initial Comprehensive Audit

**Date/Time**: 2026-11-05
**Target**: Production-readiness for Vercel deployment (`https://spandanroy.dev`)
**Repository**: `portfolio` (React 19 + TypeScript + Vite 8 + Tailwind CSS 4)

---

### STEP A - AUDIT CHECKLIST RESULTS

| Area | Item | Status | Severity | Evidence / Findings |
| :--- | :--- | :---: | :---: | :--- |
| **1. Build & Health** | `npm run build` zero errors/warnings | **PASS** | - | Vite 8.3.5 built 1689 modules in 2.84s (0 errors, 0 warnings). |
| **1. Build & Health** | TypeScript strict mode | **PASS** | - | `tsconfig.json` has `strict: true`, `npx tsc --noEmit` exited code 0. |
| **1. Build & Health** | Unused files & components | **FAIL** | **P1** | `src/components/ProjectDataMetrics.tsx` unused; `public/assets/aistudio/` (12MB) unused; `public/assets/portrait-textart.png` leftover from ASCII portrait. |
| **1. Build & Health** | Unused dependencies | **FAIL** | **P1** | `@google/genai`, `dotenv`, `express`, `@types/express`, `tsx` in `package.json` unused by the client application. |
| **1. Build & Health** | Console.log / debugger / TODO / lorem | **PASS** | - | Zero instances found in `src/`. |
| **1. Build & Health** | No sourcemaps in production | **PASS** | - | `vite.config.ts` has `sourcemap: false`, 0 `.map` files in `dist/`. |
| **1. Build & Health** | `npm audit` | **PASS** | - | Found 0 vulnerabilities. |
| **1. Build & Health** | Lockfile & secrets in repo | **PASS** | - | `package-lock.json` committed, `.env*` gitignored, no API keys or tokens in code. |
| **2. Security** | No dangerouslySetInnerHTML / eval | **PASS** | - | Zero instances found across entire codebase. |
| **2. Security** | Outgoing links `rel="noopener noreferrer"` | **PASS** | - | All `target="_blank"` anchors have `rel="noopener noreferrer"`. |
| **2. Security** | Safe URL schemes | **PASS** | - | `isSafeUrl()` enforces `https:` and `mailto:`. |
| **2. Security** | Terminal input/history sanitization | **PASS** | - | Input capped at 100 chars, whitelist execution only, 250ms cooldown, 50-entry history. |
| **2. Security** | Terminal screen-reader accessibility | **FAIL** | **P1** | Terminal output container lacks `role="log"` and `aria-live="polite"`. |
| **2. Security** | Security headers in `vercel.json` | **FAIL** | **P1** | HSTS contains `preload` flag before apex custom domain is live; missing `rewrites` and `cleanUrls`. |
| **2. Security** | Asset self-hosting under strict CSP | **PASS** | - | All logos, portraits, and fonts verified self-hosted or allowed by CSP. |
| **2. Security** | Email & phone scraping defense | **PASS** | - | Phone purged. Email assembled dynamically in JS memory (`getContactEmail()`); 0 plain text in `dist/index.html`. |
| **2. Security** | `security.txt` & `SECURITY.md` | **PASS** | - | RFC 9116 security.txt present; SECURITY.md present. |
| **3. Truth & Content**| Resume fact verification | **PASS** | - | All claims verified against `Spandan_Roy_Resume.pdf`. |
| **3. Truth & Content**| "500+" and "99%" purged | **PASS** | - | Zero occurrences in prose text across all components. |
| **3. Truth & Content**| No CGPA or grades displayed | **PASS** | - | No GPA/grades shown anywhere on site. |
| **3. Truth & Content**| Fabricated GitHub metrics | **FAIL** | **P1** | `portfolioData.ts` defines mock `stars`, `commits`, `forks`, `healthScore` for projects. |
| **3. Truth & Content**| Terminal `api.spandanroy.dev` | **FAIL** | **P1** | Endpoint simulated on non-owned domain. Needs real self-hosted `public/api/profile.json` on `spandanroy.dev`. |
| **3. Truth & Content**| All links HTTP 200 | **PASS** | - | GitHub repos, LinkedIn, resume PDF confirmed 200/301. |
| **3. Truth & Content**| Consistent dates & copyright | **PASS** | - | VIT-AP (2025–2029), MSC Co-Lead (Sep 2026), dynamic `getFullYear()` copyright. |
| **4. SEO & Sharing** | Canonical URL | **FAIL** | **P0** | Missing `<link rel="canonical" href="https://spandanroy.dev/" />` in `index.html`. |
| **4. SEO & Sharing** | Open Graph & Twitter 1200x630 preview | **FAIL** | **P0** | Missing `og:image`, `twitter:image`, and self-hosted 1200x630 preview image asset. |
| **4. SEO & Sharing** | JSON-LD Person Structured Data | **FAIL** | **P1** | Missing schema.org Person structured data in `index.html`. |
| **4. SEO & Sharing** | Favicon, apple-touch-icon, manifest | **FAIL** | **P0** | Missing `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `site.webmanifest`, `theme-color`. |
| **4. SEO & Sharing** | Sitemap & 404 page | **FAIL** | **P1** | Missing `public/sitemap.xml` and styled `public/404.html`. |
| **5. Performance**   | Code-split heavy components | **FAIL** | **P1** | `ResumeModal` is eagerly loaded in `App.tsx` bundle instead of `React.lazy`. |
| **5. Performance**   | Preload hero portrait | **FAIL** | **P1** | Missing `<link rel="preload" as="image">` for `/assets/portrait-halftone.jpg`. |
| **5. Performance**   | Image attributes (width/height/lazy) | **FAIL** | **P1** | `About.tsx` logos missing explicit `width`, `height`, and `loading="lazy"`. |
| **5. Performance**   | CSS Reduced Motion support | **FAIL** | **P1** | `src/index.css` lacks `@media (prefers-reduced-motion: reduce)` and `.reduce-motion` overrides. |
| **5. Performance**   | WebGL lifecycle & fallback | **PASS** | - | WebGL handles context lost, visibilitychange, IntersectionObserver, and fallback img. |
| **6. Responsiveness** | Multi-breakpoint validation | **UNVERIFIED** | - | Will verify via headless automated viewport scan (320px–1920px). |
| **7. Accessibility** | Skip-to-content link | **FAIL** | **P1** | Missing accessible skip link in `App.tsx`. |
| **7. Accessibility** | Resume modal keyboard trap & Esc | **FAIL** | **P1** | `ResumeModal.tsx` does not close on Escape key and does not trap tab focus. |
| **7. Accessibility** | Accessible button labels | **FAIL** | **P2** | Modal close buttons in `ResumeModal.tsx` and `Navbar.tsx` need explicit `aria-label`. |
| **8. Stability**     | Global Error Boundary | **PASS** | - | `ErrorBoundary.tsx` wraps root with editorial dark theme fallback. |
| **8. Stability**     | Clipboard API graceful fallback | **FAIL** | **P1** | `ContactSection.tsx` and `ResumeModal.tsx` clipboard copy lacks try/catch fallback. |
| **9. Deployment**    | `vercel.json` config | **FAIL** | **P1** | Missing `buildCommand`, `outputDirectory`, `cleanUrls`, and SPA rewrite fallback. |
| **9. Deployment**    | Engine pinning | **FAIL** | **P1** | `package.json` missing `"engines": { "node": ">=20.0.0" }`. |
| **9. Deployment**    | GitHub Actions CI | **FAIL** | **P1** | Missing `.github/workflows/ci.yml` (install, lint, typecheck, build). |
| **9. Deployment**    | Dependabot & Secret Scanning | **FAIL** | **P1** | Missing `.github/dependabot.yml` and `.github/secret_scanning.yml`. |
| **9. Deployment**    | Deployment README guide | **FAIL** | **P1** | `README.md` is old AI Studio template; needs full setup, deploy, and DNS instructions. |
| **10. Extras**       | Print stylesheet for Resume modal | **FAIL** | **P1** | Missing `@media print` rules for clean CV printing. |
| **10. Extras**       | Public profile data endpoint | **FAIL** | **P1** | Missing `public/api/profile.json` for live curl inspection. |

---

### STEP B - PLAN (Iteration 1 Fixes)

Fixes will be applied in order from smallest/safest to structural, with ZERO changes to UI/UX, styling, typography, colors, or animations:

1. **Favicon, Social Sharing & SEO Meta (P0)**:
   - Create self-hosted SVGs/PNGs in `public/`: `favicon.svg`, `apple-touch-icon.png`, `og-image.png` (1200x630 matching site dark editorial palette).
   - Create `public/site.webmanifest` with theme color `#030303`.
   - Update `index.html` with canonical link, full Open Graph, Twitter card, theme-color, JSON-LD Person schema, favicon links, and hero portrait preload.
   - Create `public/sitemap.xml`.
   - Create branded `public/404.html` with link back to `/`.

2. **Security Headers & Vercel Config (P1)**:
   - Remove `preload` from HSTS in `vercel.json` and `public/_headers` (retaining `max-age=63072000; includeSubDomains`).
   - Add `buildCommand`, `outputDirectory`, `framework`, `cleanUrls`, and SPA rewrite rules to `vercel.json`.
   - Add `"engines": { "node": ">=20.0.0" }` to `package.json`.

3. **Data Integrity & Simulated API (P1)**:
   - Create `public/api/profile.json` containing verified profile data matching Spandan's resume.
   - Update `InteractiveTerminal.tsx` to query `/api/profile.json` (or self-hosted endpoint) and add `role="log" aria-live="polite"`.
   - Clean fabricated `metrics` (stars, forks, commits, healthScore) from `portfolioData.ts`.
   - Delete unused `src/components/ProjectDataMetrics.tsx`.
   - Remove unused bloated `public/assets/aistudio/` and unused `public/assets/portrait-textart.png`.

4. **Performance & Motion Accessibility (P1)**:
   - Add `@media (prefers-reduced-motion: reduce)` and `.reduce-motion` rules to `src/index.css`.
   - Add print media stylesheet `@media print` in `src/index.css`.
   - Lazy-load `ResumeModal` in `App.tsx` via `React.lazy` and `Suspense`.
   - Add explicit dimensions (`width`, `height`, `loading="lazy"`) to logo images in `About.tsx`.

5. **Keyboard & Accessibility Improvements (P1)**:
   - Add accessible Skip-to-Content link in `App.tsx`.
   - Add Escape key listener and focus management in `ResumeModal.tsx`.
   - Add `aria-label` to modal close buttons in `ResumeModal.tsx` and `Navbar.tsx`.
   - Add safe error catching for `navigator.clipboard.writeText` in `ContactSection.tsx` and `ResumeModal.tsx`.

6. **DevOps & CI/CD Readiness (P1)**:
   - Create `.github/workflows/ci.yml` (CI for install, type-check, and build).
   - Create `.github/dependabot.yml`.
   - Create `.github/secret_scanning.yml`.
   - Overhaul `README.md` with complete installation, build, verification, DNS records guide, and security checklist.
