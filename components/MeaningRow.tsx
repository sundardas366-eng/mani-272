import React from "react";
import { meaningData } from "@/lib/content";
import styles from "./MeaningRow.module.css";

export function MeaningRow() {
  return (
    <div className={styles.meaningContainer} role="region" aria-label="Brand Architecture (272 Breakdown)">
      <div className={styles.grid}>
        {meaningData.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.digitWrap}>
              <span className={styles.digitMono}>{item.digit}</span>
              <span className={styles.metricTitle}>{item.title}</span>
            </div>
            <div className={styles.subtitle}>{item.subtitle}</div>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

