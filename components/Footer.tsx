"use client";

import React from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { ExternalLink } from "./ui/ExternalLink";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Icon } from "./ui/Icon";
import styles from "./Footer.module.css";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.container}`}>
        <div className={styles.topRow}>
          {/* Brand Mark + Wordmark */}
          <div className={styles.brandGroup}>
            <div className={styles.brandRow}>
              <div className={styles.monogramTile} aria-hidden="true">
                <img
                  src="/assets/logo-animated.gif"
                  alt="MANI 272"
                  width={32}
                  height={32}
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.wordmark}>
                <span className={styles.wordmarkPrimary}>MANI</span>
                <span className={styles.wordmarkAccent}>272</span>
              </div>
            </div>

            <div className={styles.operationalStatus}>
              <span className={styles.dotPulse} aria-hidden="true" />
              <span className={styles.statusText}>
                © {site.copyrightYear} ● {site.systemStatusText}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.linksGroup}>
            <ExternalLink
              href={site.portalUrl}
              className={styles.footerLink}
              showIcon={true}
            >
              Portal
            </ExternalLink>
            <Link href="/privacy" className={styles.footerLink}>
              Privacy
            </Link>
            <Link href="/terms" className={styles.footerLink}>
              Terms
            </Link>
            <a href="#faq" className={styles.footerLink}>
              FAQ
            </a>
            <a href="#contact" className={styles.footerLink}>
              Contact
            </a>
          </div>

          {/* Right Controls: Theme + Back to top */}
          <div className={styles.rightGroup}>
            <ThemeSwitcher />
            <button
              type="button"
              className={styles.backToTopBtn}
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
            >
              <span>Back to top</span>
              <Icon name="arrow-up" size={13} />
            </button>
          </div>
        </div>

        {/* Bottom Sub-row */}
        <div className={styles.bottomRow}>
          <div className={styles.legalNotice}>
            HMAC-SHA256 Cryptographic Engine · Machine Fingerprinting · 99.98% SLA
          </div>
          <div className={styles.versionBadge}>
            VERSION {site.engineVersion}
          </div>
        </div>
      </div>
    </footer>
  );
}

