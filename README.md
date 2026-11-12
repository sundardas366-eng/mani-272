# MANI 272 — Software Licensing Marketing Site & Portal Gateway

> **Production-grade marketing site & portal gateway for KeyAuth-style cryptographic software licensing.**
> Built with Next.js 15 (App Router), React 19, TypeScript (strict), and vanilla CSS Modules. Fully static, high performance, zero external UI/icon libraries.

---

## 1. Quick Start & Commands

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Create optimized production build
npm run build

# Start production server
npm run start
```

---

## 2. The One Line to Set Your Portal URL

All "Enter Portal", "Portal ↗", "Continue to Portal", and header status links across the application derive from a single source of truth in `lib/site.ts`:

Open [`lib/site.ts`](file:///d:/WEBSIDE%20MANI%20272/lib/site.ts) and edit line **14**:

```typescript
portalUrl: "https://REPLACE-WITH-YOUR-KEYAUTH-PORTAL", // ← Only place to edit!
```

Example:
```typescript
portalUrl: "https://portal.keyauth.cc/app/mani272",
```

- When using the placeholder, links will continue to function safely with a `data-placeholder="true"` attribute and a non-breaking dev-only warning in your browser console.
- When updated, all buttons and modal redirects instantaneously route to your real KeyAuth portal in a new tab (`target="_blank" rel="noopener noreferrer"`).

---

## 3. Where to Change Brand Name, Accent & Copy

| Element | Location | Description |
| :--- | :--- | :--- |
| **Site Name & Config** | [`lib/site.ts`](file:///d:/WEBSIDE%20MANI%20272/lib/site.ts) | Brand name (`MANI 272`), monogram (`M272`), tagline, engine version, support handles |
| **Marketing Copy & Data** | [`lib/content.ts`](file:///d:/WEBSIDE%20MANI%20272/lib/content.ts) | Hero text, trust badges, stats, features, 272 meaning cards, 3 steps, FAQ, contact cards |
| **Design Tokens & Accents** | [`app/globals.css`](file:///d:/WEBSIDE%20MANI%20272/app/globals.css) | Color variables (`--accent: #ef4444`, `--bg-primary`), radius, surfaces, and theme overrides |
| **SVG Mark & Logo** | [`public/assets/logo.svg`](file:///d:/WEBSIDE%20MANI%20272/public/assets/logo.svg) | Monogram tile (7px radius) and wordmark rendered in CSS accent-capable form |

### Theme Switcher System
Users can select between 5 built-in accent profiles using the interactive dots in the navigation bar and footer:
- **Crimson Red** (`#ef4444` - default)
- **Cobalt Blue** (`#3b82f6`)
- **Electric Violet** (`#8b5cf6`)
- **Matrix Emerald** (`#10b981`)
- **Cyber Amber** (`#f59e0b`)

The preference is stored in `localStorage` (`m272_accent`) and initialized via a zero-flash blocking inline script in `<head>`.

---

## 4. Implementation Checklist & Section Verification

| # | Section | Specification Details | Status |
| :---: | :--- | :--- | :---: |
| **1** | **Navbar** | Fixed 66px, `rgba(10,10,10,.82)` + 18px blur, 1px bottom border, `.scrolled` state at >12px scroll. Left: 32px M272 monogram tile + "MANI" (#f4f4f5) + "272" (accent red). Middle: "PORTAL · LIVE" pulsing status pill + anchor links. Right: theme switcher, "Portal ↗" solid button, "Sign in" outline button. Under 860px: 58px navbar with slide-down drawer featuring 2-col anchor cards. | **PROVEN** |
| **2** | **Hero** | Min-height 90vh, CSS gradient mesh + 64px masked cyber grid (no images/video). Left: mono protocol pill, H1 "MANI 272" with accent "272" + second line, subcopy, 3 CTAs (Portal ↗, See how it works #how, Sign in modal), trust bar with 1px dividers, brand-meaning mono line (`272 = 2 layers of protection · 7-second verification · 2 devices per key`). Right: interactive **Hero Console Card** with window chrome, 3 tabs (Verify, Keys, Devices), simulated 1.4s verification check with `✓ SIGNATURE VALID · HWID MATCH · 412ms`, 3 copyable keys, scrambleable devices grid, LED status footer, and 6-degree 3D mouse tilt with radial glare (disabled on mobile & `prefers-reduced-motion`). | **PROVEN** |
| **3** | **Stats Strip** | Max-width 1240px, negative margin `-26px` overlapping hero. 4 columns with vertical dividers: `154K+ Keys Verified`, `99.98% Service SLA`, `412ms Median Verification`, `2 Devices / Key`. Smooth count-up animation executed once via `IntersectionObserver`. Responsive 2×2 on tablet and 1-col on mobile. | **PROVEN** |
| **4** | **Licence / Features** | Centered badge (`CORE PROTECTION`), heading `One key. One machine. Zero leaks.`, subcopy. 2-column card: left has 4 feature blocks with accent checkmarks (HMAC-SHA256, Hardware HWID lock, Reseller quotas, Cross-platform SDKs) + primary CTA; right has realistic licence card mock with plan badge, masked key with eye/copy toggle, 2 bound hardware seat rows, and active chip. Followed directly by the **MeaningRow** (3 cards breaking down 2 layers, 7 seconds, 2 devices). | **PROVEN** |
| **5** | **How It Works** | 3 sequential workflow cards: `01 Generate or Acquire a Key` (portal dashboard), `02 Bind Your Hardware (HWID)` (deterministic hash), `03 Verify Every Session` (HMAC validation in <7s). Number bubbles styled in mono with accent borders. | **PROVEN** |
| **6** | **FAQ** | 6 static, factual technical questions arranged in a 2×2 grid (stacks to 1 col on mobile): covers HWID binding, hardware replacement, seat resets, reseller systems, SDK platform support, and 99.98% SLA / verification speed. | **PROVEN** |
| **7** | **Contact** | 3 interactive click-to-copy cards (Discord: `mani272`, Email: `support@mani272.com`, GitHub: `mani272`) featuring icon bubbles, mono labels, and transient 1.4s "COPIED" state feedback with clipboard fallback. | **PROVEN** |
| **8** | **Footer** | Background `#080808`, top border, M272 mark + wordmark + `© 2026 ● ALL SYSTEMS OPERATIONAL`, links to Portal ↗ (`site.portalUrl`), Privacy Policy (`/privacy`), Terms of Service (`/terms`), FAQ, Contact, and smooth "Back to top ↑" button. | **PROVEN** |
| **9** | **Auth Modal** | Accessible modal dialog with backdrop blur, 420px matte card, title `Sign in to MANI 272`, explanation `You'll be redirected to the secure licensing portal.`, visual credential & Google OAuth tabs, single primary submit button `Continue to Portal ↗` redirecting directly to `site.portalUrl`. Zero local storage of passwords/credentials, focus trap, escape key listener, and body scroll lock. | **PROVEN** |
| **10** | **Legal Pages & SEO** | Complete static `/privacy` and `/terms` pages, custom 404 page (`app/not-found.tsx`), dynamic `sitemap.xml`, `robots.txt`, OpenGraph + Twitter preview tags, JSON-LD Schema (Organization + WebSite), and skip-to-content accessibility link. | **PROVEN** |

---

## 5. Scope Verification Notice
This project strictly contains the landing page and portal gateway for the KeyAuth licensing engine. It contains **no** forbidden modules (no streaming/media players, no file upload vaults, no gaming tournaments, no SMS/call services, no cheats/exploits/spoofers, no binary downloads, no fake review marquees).

