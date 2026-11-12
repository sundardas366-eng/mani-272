import React from "react";
import { stepsData } from "@/lib/content";
import { SectionHeader } from "./ui/SectionHeader";
import { Icon } from "./ui/Icon";
import styles from "./StepsSection.module.css";

export function StepsSection() {
  const stepIcons: ("key" | "cpu" | "shield")[] = ["key", "cpu", "shield"];

  return (
    <section id="how" className={styles.section} aria-labelledby="how-title">
      <div className={`container ${styles.container}`}>
        <SectionHeader
          badge="WORKFLOW EXECUTION"
          title="3 steps to immutable licensing"
          subtitle="From initial portal issuance to runtime hardware verification in milliseconds."
          align="center"
        />

        <div className={styles.grid}>
          {stepsData.map((step, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.cardTop}>
                <div className={styles.numberBubble} aria-label={`Step ${step.number}`}>
                  <span className={styles.numText}>{step.number}</span>
                </div>
                <div className={styles.stepIconWrap} aria-hidden="true">
                  <Icon name={stepIcons[idx]} size={18} />
                </div>
              </div>

              <div className={styles.metaLabel}>{step.meta}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

