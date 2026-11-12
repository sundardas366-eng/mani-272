"use client";

import React, { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { ProductItem } from "@/lib/content";
import { Icon } from "./ui/Icon";
import styles from "./ProductDetailsModal.module.css";

interface ProductDetailsModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
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

  if (!isOpen || !product) return null;

  const defaultDetailsText = `# ${product.name}

${product.tagline}

Category: ${product.category}
Status: ${product.status}
Pricing: ${product.price}
Compatibility: ${product.compatibility}

―――――――――――――――――――
FEATURES
―――――――――――――――――――
${product.features.map((f) => `> ${f}`).join("\n")}

―――――――――――――――――――
AVAILABLE PLANS
―――――――――――――――――――
${product.plans.map((p) => `> ${p}`).join("\n")}`;

  const textToCopy = product.fullDetails || defaultDetailsText;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
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
        aria-labelledby="product-details-title"
      >
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTitleCol}>
            <div className={styles.badgeRow}>
              <span className={styles.badgeLive}>
                <span className={styles.pulseDot} aria-hidden="true" />
                {product.status}
              </span>
              <span className={styles.badgeCategory}>{product.category}</span>
            </div>
            <h2 id="product-details-title" className={styles.modalTitle}>
              {product.name}
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
            {product.fullDetails ? (
              <pre className={styles.terminalPre}>{product.fullDetails}</pre>
            ) : (
              <div>
                <div style={{ color: "#ef4444", fontWeight: 800, marginBottom: "12px", fontSize: "15px" }}>
                  # {product.name}
                </div>
                <p style={{ color: "#a1a1aa", fontSize: "13px", lineHeight: "1.6", margin: "0 0 16px 0" }}>
                  {product.tagline}
                </p>

                <div className={styles.dividerLine} aria-hidden="true" />

                <div className={styles.sectionHeaderMono}>PLANS & PRICING</div>
                <div className={styles.plansList}>
                  {product.plans.map((p, idx) => (
                    <span key={idx} className={styles.planPill}>
                      {p}
                    </span>
                  ))}
                </div>

                <div className={styles.dividerLine} aria-hidden="true" />

                <div className={styles.sectionHeaderMono}>CORE SPECIFICATIONS</div>
                <div className={styles.featuresBlock}>
                  {product.features.map((feat, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.dividerLine} aria-hidden="true" />

                <div className={styles.compatRow}>
                  <strong>Compatibility:</strong> {product.compatibility}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className={styles.modalFooter}>
          <button
            type="button"
            className={`${styles.copyDetailsBtn} ${copied ? styles.copyDetailsBtnSuccess : ""}`}
            onClick={handleCopy}
            title="Copy formatted product details"
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
              <span>Discord</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

