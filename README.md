# Spandan Roy — Developer Portfolio

[![CI](https://github.com/matrixminer07/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/matrixminer07/portfolio/actions)
![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19-blue)
![TypeScript](https://img.shields.io/badge/typescript-strict-blue)
![Vite](https://img.shields.io/badge/vite-8-purple)
![Tailwind](https://img.shields.io/badge/tailwindcss-4-teal)

Interactive systems engineering and backend portfolio for **Spandan Roy**, Computer Science & Engineering undergraduate specializing in Data Analytics at VIT-AP University.

Live URL: [https://spandanroy.dev](https://spandanroy.dev)

---

## Architecture & Tech Stack

- **Framework**: React 19 + TypeScript (Strict Mode)
- **Bundler**: Vite 8 with code-splitting (`React.lazy`)
- **Styling**: Tailwind CSS v4 with custom editorial tokens and reduced-motion support
- **Visualizations**: Custom WebGL Halftone Portrait shader with fallback, interactive sonar telemetry radar, and clinical risk pipelines
- **Hardening**: Content Security Policy (CSP), Strict Transport Security (HSTS), RFC 9116 security disclosure, rate-limited and sanitized terminal

---

## Local Development Setup

### Prerequisites
- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Installation
```bash
# Clone the repository
git clone https://github.com/matrixminer07/portfolio.git
cd portfolio

# Install dependencies
npm ci

# Start the local development server
npm run dev
```

The application will start on `http://localhost:3000`.

---

## Verification & Build Commands

```bash
# Type check with strict TypeScript compiler
npm run lint

# Compile production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment to Vercel

The repository is pre-configured with `vercel.json` including strict security headers, SPA rewrite fallbacks, and clean URLs.

### Deploying via Vercel CLI
```bash
# Login to Vercel
npx vercel login

# Link and deploy to production
npx vercel --prod
```

### Deploying via GitHub Git Integration
1. Push this repository to GitHub on `main`.
2. In the Vercel Dashboard, import the repository.
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.

---

## Custom Domain Setup (`spandanroy.dev`)

When connecting your apex domain on Vercel:

1. **DNS Records (at your domain registrar or Cloudflare)**:
   - **Apex (`@`)**: `A` record pointing to `76.76.21.21` (Vercel Anycast IP).
   - **Subdomain (`www`)**: `CNAME` record pointing to `cname.vercel-dns.com`.
2. **Redirect Configuration**:
   - In Vercel Project Settings > Domains, configure `www.spandanroy.dev` to automatically redirect to `spandanroy.dev` (308 Permanent Redirect).
3. **SSL / TLS**:
   - Vercel automatically provisions a Let's Encrypt certificate.
   - Once HTTPS is active and confirmed on the apex domain, you may add the `preload` directive to HSTS in `vercel.json`.

---

## Security & Reliability Checklist

- [x] Strict Content Security Policy (self-hosted assets, Google Fonts)
- [x] Zero `dangerouslySetInnerHTML`, `eval()`, or unescaped HTML injections
- [x] Runtime anti-scraping email assembly (`spandanr098@gmail.com`)
- [x] Personal phone number purged from all schemas and UI
- [x] Accessible skip-to-content link and keyboard focus trap in CV modal
- [x] Global React Error Boundary with themed fallback UI
- [x] WebGL context loss handling and static image fallback
- [x] Responsive from 320px to 1920px viewports
- [x] Open Graph (1200x630) and Twitter Card tags self-hosted
- [x] RFC 9116 security policy at `/.well-known/security.txt`
