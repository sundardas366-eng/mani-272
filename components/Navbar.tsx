"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { navLinks } from "@/lib/content";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Icon } from "./ui/Icon";
import { MobileDrawer } from "./MobileDrawer";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onOpenAuth?: () => void;
}

export function Navbar({ onOpenAuth }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        role="banner"
      >
        <div className={`container ${styles.navInner}`}>
          {/* Left: Brand Monogram Tile + Wordmark */}
          <Link href="/" className={styles.brandLink} aria-label="MANI 272 Home">
            <div className={styles.monogramTile} aria-hidden="true">
              <span className={styles.monoM}>M</span>
              <span className={styles.monoAccent}>272</span>
            </div>
            <div className={styles.wordmark}>
              <span className={styles.wordmarkPrimary}>MANI</span>
              <span className={styles.wordmarkAccent}>272</span>
            </div>
          </Link>

          {/* Middle: Live Portal Pill + Anchor Nav Links (Hidden under 860px) */}
          <nav className={styles.centerNav} aria-label="Main Navigation">
            <a
              href={site.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.statusPillLink}
              title="Open KeyAuth Licensing Portal (External)"
            >
              <Badge variant="live" size="sm" hasDot>
                PORTAL · {site.portalStatus}
              </Badge>
            </a>

            <div className={styles.navLinksList}>
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={styles.navAnchor}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Right: Theme Switcher + Portal CTA + Sign in (Desktop) */}
          <div className={styles.rightActions}>
            <div className={styles.themeWrap}>
              <ThemeSwitcher />
            </div>

            <Button
              asPortalLink
              variant="solid"
              size="sm"
              className={styles.portalCtaBtn}
            >
              Portal
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={styles.hamburgerBtn}
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={drawerOpen}
            >
              <Icon name={drawerOpen ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Down Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenAuth={() => {
          setDrawerOpen(false);
          onOpenAuth?.();
        }}
      />
    </>
  );
}

