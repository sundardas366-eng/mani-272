"use client";

import React, { useState } from "react";
import { contactData } from "@/lib/content";
import { SectionHeader } from "./ui/SectionHeader";
import { Icon } from "./ui/Icon";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, textToCopy: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1400);
    }
  };

  const getPlatformIcon = (id: string): "discord" | "email" | "github" => {
    if (id === "discord") return "discord";
    if (id === "email") return "email";
    return "github";
  };

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={`container ${styles.container}`}>
        <SectionHeader
          badge="DEVELOPER RELATIONS"
          title="Connect with our team"
          subtitle="Direct technical communication channels for integration assistance, enterprise terms, and community updates."
          align="center"
        />

        <div className={styles.grid}>
          {contactData.map((card) => {
            const isCopied = copiedId === card.id;
            return (
              <div
                key={card.id}
                className={`${styles.card} ${isCopied ? styles.cardCopied : ""}`}
                onClick={() => handleCopy(card.id, card.handle)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCopy(card.id, card.handle);
                  }
                }}
                aria-label={`Copy ${card.platform}: ${card.handle}`}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconBubble} aria-hidden="true">
                    <Icon name={getPlatformIcon(card.id)} size={18} />
                  </div>
                  <span className={styles.platformLabel}>{card.platform}</span>
                </div>

                <div className={styles.valueRow}>
                  <code className={styles.handleText}>{card.displayValue}</code>
                  <span
                    className={`${styles.copyPill} ${
                      isCopied ? styles.pillCopied : ""
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Icon name="check" size={11} />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Icon name="copy" size={11} />
                        <span>CLICK TO COPY</span>
                      </>
                    )}
                  </span>
                </div>

                <p className={styles.description}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

