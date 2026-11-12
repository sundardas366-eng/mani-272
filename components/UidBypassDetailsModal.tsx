"use client";

import React, { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { Icon } from "./ui/Icon";
import styles from "./UidBypassDetailsModal.module.css";

interface UidBypassDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UidBypassDetailsModal({
  isOpen,
  onClose,
}: UidBypassDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rawDetailsText = `# UID BYPASS | SAFE ALL SERVER

Advanced Aimbot & Visuals  
Internal Panel | Main ID Safe  
Easy Setup & Full Support  
All Servers Working on Regular Emulators (Except MEmu and LDPlayer)

―――――――――――――――――――
PRICE LIST
―――――――――――――――――――

> 1 Day - $2  
> 3 Days - $4  
> 1 Week - $5  
> 1 Month - $12  
> Lifetime - $60  

―――――――――――――――――――
UID BYPASS API
―――――――――――――――――――

$20 — 200 UID Limit  
$30 — 400 UID Limit  
$40 — 600 UID Limit  
$50 — 800 UID Limit  
$60 — 1,000 UID Limit  
$100 — Unlimited UID`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rawDetailsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
      aria-label="Modal backdrop"
    >
      <div
        className={styles.modalWindow}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="uid-details-title"
      >
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTitleCol}>
            <span className={styles.badgeLive}>
              <span className={styles.pulseDot} aria-hidden="true" />
              OFFICIAL SPECIFICATION
            </span>
            <h2 id="uid-details-title" className={styles.modalTitle}>
              UID BYPASS | SAFE ALL SERVER
            </h2>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close details modal"
          >
            <Icon name="close" size={17} />
          </button>
        </div>

        {/* BODY */}
        <div className={styles.modalBody}>
          <div className={styles.terminalCard}>
            <div className={styles.terminalTopHeading}>
              <span># UID BYPASS | SAFE ALL SERVER</span>
            </div>

            <div className={styles.featuresBlock}>
              <div className={styles.featurePoint}>
                <span className={styles.featureDot}>●</span>
                <span>Advanced Aimbot & Visuals</span>
              </div>
              <div className={styles.featurePoint}>
                <span className={styles.featureDot}>●</span>
                <span>Internal Panel | Main ID Safe</span>
              </div>
              <div className={styles.featurePoint}>
                <span className={styles.featureDot}>●</span>
                <span>Easy Setup & Full Support</span>
              </div>
              <div className={styles.featurePoint}>
                <span className={styles.featureDot}>●</span>
                <span>All Servers Working on Regular Emulators (Except MEmu and LDPlayer)</span>
              </div>
            </div>

            <div className={styles.dividerLine} aria-hidden="true" />

            {/* PRICE LIST */}
            <div className={styles.sectionHeaderMono}>PRICE LIST</div>
            <div className={styles.priceRowsList}>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>1 Day Pass</span>
                <span className={styles.priceVal}>$2</span>
              </div>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>3 Days Access</span>
                <span className={styles.priceVal}>$4</span>
              </div>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>1 Week VIP</span>
                <span className={styles.priceVal}>$5</span>
              </div>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>1 Month Pro</span>
                <span className={styles.priceVal}>$12</span>
              </div>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>Lifetime Permanent</span>
                <span className={styles.priceVal}>$60</span>
              </div>
            </div>

            <div className={styles.dividerLine} aria-hidden="true" />

            {/* UID BYPASS API */}
            <div className={styles.sectionHeaderMono}>UID BYPASS API</div>
            <div className={styles.priceRowsList}>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>200 UID Limit</span>
                <span className={styles.priceVal}>$20</span>
              </div>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>400 UID Limit</span>
                <span className={styles.priceVal}>$30</span>
              </div>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>600 UID Limit</span>
                <span className={styles.priceVal}>$40</span>
              </div>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>800 UID Limit</span>
                <span className={styles.priceVal}>$50</span>
              </div>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>1,000 UID Limit</span>
                <span className={styles.priceVal}>$60</span>
              </div>
              <div className={styles.priceRowItem}>
                <span className={styles.priceLabel}>Unlimited UID Limit</span>
                <span className={styles.priceVal}>$100</span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className={styles.modalFooter}>
          <button
            type="button"
            className={`${styles.copyDetailsBtn} ${copied ? styles.copyDetailsBtnSuccess : ""}`}
            onClick={handleCopy}
            title="Copy full text formatting to clipboard"
          >
            <Icon name={copied ? "check" : "copy"} size={14} />
            <span>{copied ? "Copied to Clipboard!" : "Copy Full Details"}</span>
          </button>

          <div className={styles.ctaGroup}>
            <a
              href={site.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.portalBtn}
            >
              <span>Get Key</span>
              <span>↗</span>
            </a>
            <a
              href={`https://discord.gg/${site.contacts.discord}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discordBtn}
            >
              <span>Order via Discord</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
