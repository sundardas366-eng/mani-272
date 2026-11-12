"use client";

import React, { useEffect, useRef, useState } from "react";
import { statsData } from "@/lib/content";
import styles from "./StatsStrip.module.css";

export function StatsStrip() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [id: string]: number }>({
    "keys-verified": 0,
    uptime: 0,
    latency: 0,
    devices: 0,
  });

  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCounts({
        "keys-verified": 154,
        uptime: 99.98,
        latency: 412,
        devices: 2,
      });
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              "keys-verified": Math.floor(154 * easeOut),
              uptime: parseFloat((99.98 * easeOut).toFixed(2)),
              latency: Math.floor(412 * easeOut),
              devices: Math.floor(2 * easeOut),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                "keys-verified": 154,
                uptime: 99.98,
                latency: 412,
                devices: 2,
              });
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (stripRef.current) {
      observer.observe(stripRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className={styles.sectionWrap} aria-label="Key performance telemetry metrics">
      <div className={`container ${styles.statsContainer}`}>
        <div ref={stripRef} className={styles.stripCard}>
          <div className={styles.stripGrid}>
            {statsData.map((item, idx) => {
              const displayVal = hasAnimated ? counts[item.id] : 0;
              return (
                <div key={item.id} className={styles.statCol}>
                  {idx > 0 && <div className={styles.divider} aria-hidden="true" />}
                  <div className={styles.colInner}>
                    <div className={styles.numberRow}>
                      <span className={styles.numberMono}>
                        {item.id === "uptime" ? displayVal.toFixed(2) : displayVal}
                      </span>
                      <span className={styles.suffix}>{item.suffix}</span>
                    </div>
                    <div className={styles.label}>{item.label}</div>
                    <div className={styles.description}>{item.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

