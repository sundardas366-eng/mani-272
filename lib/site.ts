/**
 * MANI 272 — SITE CONFIGURATION & SINGLE SOURCE OF TRUTH
 *
 * TO CONNECT YOUR KEYAUTH PORTAL:
 * Change `portalUrl` below to your real portal address (e.g., https://portal.keyauth.cc/app/...).
 * Every CTA across the landing page, navigation, modals, and footer will instantly point there.
 */

export const site = {
  name: "MANI 272",
  shortName: "M272",
  tagline: "Software licensing, locked down.",
  oneLiner: "Issue keys, bind them to hardware, and verify every session in under 7 seconds.",
  portalUrl: "https://REPLACE-WITH-YOUR-KEYAUTH-PORTAL", // ← only place to edit
  portalStatus: "LIVE",
  engineVersion: "v2.6.4",
  systemStatusText: "ALL SYSTEMS OPERATIONAL",
  copyrightYear: 2026,
  url: "https://money-272.vercel.app",
  contacts: {
    discord: "mani272",
    email: "support@mani272.com",
    github: "mani272",
  },
} as const;

/**
 * Checks if the configured portalUrl is still the default template placeholder.
 */
export function isPortalPlaceholder(url: string = site.portalUrl): boolean {
  return !url || url.includes("REPLACE-WITH-YOUR-KEYAUTH-PORTAL") || url.startsWith("https://REPLACE-");
}

/**
 * Helper to emit dev-only warning when clicking or rendering placeholder links.
 */
export function warnIfPortalPlaceholder(): void {
  if (process.env.NODE_ENV !== "production" && isPortalPlaceholder()) {
    console.warn(
      "[MANI 272] Portal link is using the placeholder: 'https://REPLACE-WITH-YOUR-KEYAUTH-PORTAL'. Set `site.portalUrl` in `lib/site.ts` to your actual KeyAuth portal."
    );
  }
}
