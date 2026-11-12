"use client";

import React from "react";
import { site } from "@/lib/site";
import styles from "./UidBypassSection.module.css";

export function UidBypassSection() {
  const userPriceList = [
    { duration: "1 Day Pass", price: "$2", badge: "TRIAL" },
    { duration: "3 Days Access", price: "$4", badge: "WEEKEND" },
    { duration: "1 Week VIP", price: "$5", badge: "POPULAR" },
    { duration: "1 Month Pro", price: "$12", badge: "BEST VALUE" },
    { duration: "Lifetime VIP", price: "$60", badge: "PERMANENT" },
  ];

  const apiPriceList = [
    { limit: "200 UID Limit", price: "$20", desc: "Starter Reseller" },
    { limit: "400 UID Limit", price: "$30", desc: "Growth Tier" },
    { limit: "600 UID Limit", price: "$40", desc: "Scale Tier" },
    { limit: "800 UID Limit", price: "$50", desc: "Enterprise Tier" },
    { limit: "1,000 UID Limit", price: "$60", desc: "Master Tier" },
    { limit: "Unlimited UID", price: "$100", desc: "Unlimited Reseller API" },
  ];

  return (
    <section
      id="uid-bypass"
      className={styles.sectionWrap}
      aria-labelledby="uid-bypass-heading"
    >
      <div className={styles.ambientBackdrop} aria-hidden="true" />

      <div className={`container ${styles.container}`}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.badgePill}>
            <span className={styles.liveDot} aria-hidden="true" />
            SAFE ALL SERVER · MAIN ID SAFE
          </div>

          <h2 id="uid-bypass-heading" className={styles.heading}>
            UID BYPASS | <span className={styles.headingAccent}>SAFE ALL SERVER</span>
          </h2>

          <p className={styles.subHeading}>
            Advanced Aimbot & Visuals · Internal Panel | Main ID Safe · Easy Setup & Full Support
          </p>
        </div>

        {/* 4 Feature Pillars */}
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconRow}>
              <span className={styles.featureIcon}>🎯</span>
              <h3 className={styles.featureTitle}>Advanced Aimbot & Visuals</h3>
            </div>
            <p className={styles.featureDesc}>
              High-precision target tracking, customized FOV slider, and clean streamproof ESP / skeleton rendering.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconRow}>
              <span className={styles.featureIcon}>🛡️</span>
              <h3 className={styles.featureTitle}>Internal Panel | Main ID Safe</h3>
            </div>
            <p className={styles.featureDesc}>
              Zero detection vectors with direct memory isolation. Tested 100% safe for main accounts across all servers.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconRow}>
              <span className={styles.featureIcon}>⚡</span>
              <h3 className={styles.featureTitle}>Easy Setup & Full Support</h3>
            </div>
            <p className={styles.featureDesc}>
              One-click setup with automated HWID binding. 24/7 dedicated engineering support via our Discord community.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconRow}>
              <span className={styles.featureIcon}>💻</span>
              <h3 className={styles.featureTitle}>Regular Emulators Active</h3>
            </div>
            <p className={styles.featureDesc}>
              Fully functional on all regular emulator setups worldwide (Except MEmu and LDPlayer).
            </p>
          </div>
        </div>

        {/* Dual Pricing Tables: User Licenses vs Reseller API */}
        <div className={styles.pricingDualGrid}>
          {/* Box 1: User Price List */}
          <div className={`${styles.pricingBox} ${styles.pricingBoxHighlight}`}>
            <div>
              <div className={styles.boxHeader}>
                <span className={styles.boxPill}>USER LICENSE KEYS</span>
                <h3 className={styles.boxTitle}>PRICE LIST</h3>
                <p className={styles.boxSubtitle}>
                  Instant automated license keys issued through the KeyAuth portal.
                </p>
              </div>

              <div className={styles.tierList}>
                {userPriceList.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`${styles.tierRow} ${
                      tier.badge === "BEST VALUE" || tier.badge === "PERMANENT"
                        ? styles.tierRowActive
                        : ""
                    }`}
                  >
                    <div className={styles.tierDuration}>
                      <span>{tier.duration}</span>
                      {tier.badge && (
                        <span className={styles.tierBadge}>{tier.badge}</span>
                      )}
                    </div>
                    <span className={styles.tierPrice}>{tier.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.boxFooter}>
              <a
                href={site.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
              >
                <span>Get UID Bypass Key</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Box 2: UID Bypass API */}
          <div className={styles.pricingBox}>
            <div>
              <div className={styles.boxHeader}>
                <span className={styles.boxPill}>DEVELOPER & RESELLER</span>
                <h3 className={styles.boxTitle}>UID BYPASS API</h3>
                <p className={styles.boxSubtitle}>
                  Programmatic API endpoints with configurable UID seat allowances.
                </p>
              </div>

              <div className={styles.tierList}>
                {apiPriceList.map((item, idx) => (
                  <div
                    key={idx}
                    className={`${styles.tierRow} ${
                      item.limit === "Unlimited UID" ? styles.tierRowActive : ""
                    }`}
                  >
                    <div>
                      <div className={styles.tierDuration}>{item.limit}</div>
                      <span className={styles.tierDescMono}>{item.desc}</span>
                    </div>
                    <span className={styles.tierPrice}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.boxFooter}>
              <a
                href={`https://discord.gg/${site.contacts.discord}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
              >
                <span>Order API Access via Discord</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Compatibility Notice Banner */}
        <div className={styles.noticeBanner}>
          <span className={styles.noticeIcon} aria-hidden="true">
            ℹ️
          </span>
          <div className={styles.noticeText}>
            <strong>Emulator Compatibility Notice:</strong> All Servers Working on Regular Emulators{" "}
            <span className={styles.noticeHighlight}>(Except MEmu and LDPlayer)</span>. All keys and API tokens are cryptographically secured with HMAC-SHA256 hardware handshakes.
          </div>
        </div>
      </div>
    </section>
  );
}
