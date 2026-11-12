"use client";

import React from "react";
import { site } from "@/lib/site";
import { heroContent } from "@/lib/content";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { HeroConsole } from "./HeroConsole";
import styles from "./Hero.module.css";

interface HeroProps {
  onOpenAuth?: () => void;
}

export function Hero({ onOpenAuth }: HeroProps = {}) {
  return (
    <section className={styles.heroSection} aria-labelledby="hero-heading">
      <div className={styles.heroBackgroundMesh} aria-hidden="true" />

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroGrid}>
          {/* LEFT: Copy & Direct Call to Actions */}
          <div className={styles.leftCol}>
            {/* Security Protocol Pill */}
            <div className={styles.badgeWrap}>
              <Badge variant="live" size="md" hasDot>
                {heroContent.pillText}
              </Badge>
            </div>

            {/* Single H1 with Accent 272 */}
            <h1 id="hero-heading" className={styles.headline}>
              <span className={styles.headlineBrand}>
                {heroContent.headlinePrefix}{" "}
                <span className={styles.accentDigit}>{heroContent.headlineAccent}</span>
              </span>
              <span className={styles.headlineSub}>
                {heroContent.headlineSub}
              </span>
            </h1>

            {/* Sub-copy (max 600px) */}
            <p className={styles.subCopy}>
              {heroContent.description}
            </p>

            {/* 2 CTAs: Portal (Solid), How it Works (Outline) */}
            <div className={styles.ctaGroup}>
              <Button
                asPortalLink
                variant="solid"
                size="lg"
                className={styles.ctaPrimary}
              >
                {heroContent.ctaPrimary}
              </Button>

              <Button
                href="#how"
                variant="outline"
                size="lg"
                className={styles.ctaSecondary}
              >
                {heroContent.ctaSecondary}
              </Button>
            </div>

            {/* Trust Bar with 1px Dividers */}
            <div className={styles.trustBar} role="list" aria-label="Key security guarantees">
              {heroContent.trustBadges.map((item, idx) => (
                <div key={idx} className={styles.trustItem} role="listitem">
                  <span className={styles.trustDot} aria-hidden="true" />
                  <span className={styles.trustLabel}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Brand Meaning Line (Mono 11px, Accent Numbers) */}
            <div className={styles.meaningLine} aria-label="Brand Meaning">
              <span className={styles.meaningPrefix}>
                <span className={styles.numAccent}>272</span> =
              </span>
              <span className={styles.meaningPart}>
                <span className={styles.numAccent}>2</span> layers of protection
              </span>
              <span className={styles.meaningDivider}>·</span>
              <span className={styles.meaningPart}>
                <span className={styles.numAccent}>7</span>-second verification
              </span>
              <span className={styles.meaningDivider}>·</span>
              <span className={styles.meaningPart}>
                <span className={styles.numAccent}>2</span> devices per key
              </span>
            </div>
          </div>

          {/* RIGHT: Hero Console Card */}
          <div className={styles.rightCol}>
            <HeroConsole />
          </div>
        </div>
      </div>
    </section>
  );
}

