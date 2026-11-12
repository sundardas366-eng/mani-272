import React from "react";
import { faqData } from "@/lib/content";
import { SectionHeader } from "./ui/SectionHeader";
import styles from "./FaqSection.module.css";

export function FaqSection() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={`container ${styles.container}`}>
        <SectionHeader
          badge="INTELLIGENCE / FAQ"
          title="Frequently asked questions"
          subtitle="Direct, technical answers regarding our cryptographic architecture, seat bindings, and SLA."
          align="center"
        />

        <div className={styles.grid}>
          {faqData.map((faq) => (
            <div key={faq.id} className={styles.faqCard}>
              <div className={styles.cardHeader}>
                <span className={styles.tag}>{faq.tag}</span>
              </div>
              <h3 className={styles.question}>{faq.question}</h3>
              <p className={styles.answer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

