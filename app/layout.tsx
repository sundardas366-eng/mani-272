import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { CursorTrail } from "@/components/CursorTrail";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MANI 272 — Software Licensing, Locked Down",
  description:
    "Issue keys, bind them to hardware, and verify every session in under 7 seconds. Cryptographic integrity meets friction-free developer operations.",
  metadataBase: new URL(site.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MANI 272 — Software Licensing, Locked Down",
    description:
      "Issue keys, bind them to hardware, and verify every session in under 7 seconds. Cryptographic integrity meets friction-free developer operations.",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/logo.svg",
        width: 1200,
        height: 630,
        alt: "MANI 272 — Cryptographic Licensing Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MANI 272 — Software Licensing, Locked Down",
    description:
      "Issue keys, bind them to hardware, and verify every session in under 7 seconds.",
    images: ["/assets/logo.svg"],
  },
  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.tagline,
      },
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/assets/logo.svg`,
        sameAs: [
          `https://github.com/${site.contacts.github}`,
          `https://discord.gg/${site.contacts.discord}`,
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} data-accent="red" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var a=localStorage.getItem("m272_accent");if(a&&["red","blue","violet","emerald","amber"].indexOf(a)!==-1){document.documentElement.setAttribute("data-accent",a);}else{document.documentElement.setAttribute("data-accent","red");}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <CursorTrail />
        <div className="ambient-glow-mesh" aria-hidden="true" />
        <div className="cyber-grid-overlay" aria-hidden="true" />
        <div className="vignette-overlay" aria-hidden="true" />
        <div className="site-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}

