"use client";

import React, { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

export type AccentColor = "blue" | "violet" | "emerald" | "amber" | "rose";

interface ThemeOption {
  id: AccentColor;
  label: string;
  hex: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { id: "blue", label: "Cobalt Blue", hex: "#3b82f6" },
  { id: "violet", label: "Electric Violet", hex: "#8b5cf6" },
  { id: "emerald", label: "Matrix Emerald", hex: "#10b981" },
  { id: "amber", label: "Cyber Amber", hex: "#f59e0b" },
  { id: "rose", label: "Neon Rose", hex: "#f43f5e" },
];

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className = "" }: ThemeSwitcherProps) {
  const [currentAccent, setCurrentAccent] = useState<AccentColor>("blue");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("m272_accent") as AccentColor;
    if (saved && ["blue", "violet", "emerald", "amber", "rose"].includes(saved)) {
      setCurrentAccent(saved);
      document.documentElement.setAttribute("data-accent", saved);
    } else {
      const activeAttr = document.documentElement.getAttribute("data-accent") as AccentColor;
      if (activeAttr && ["blue", "violet", "emerald", "amber", "rose"].includes(activeAttr)) {
        setCurrentAccent(activeAttr);
      }
    }
  }, []);

  const handleSelectAccent = (color: AccentColor) => {
    setCurrentAccent(color);
    document.documentElement.setAttribute("data-accent", color);
    try {
      localStorage.setItem("m272_accent", color);
    } catch {
      // ignore storage access issues
    }
  };

  if (!mounted) {
    return (
      <div className={`${styles.switcherContainer} ${className}`} aria-hidden="true">
        <div className={styles.dotsRow}>
          {THEME_OPTIONS.map((opt) => (
            <span
              key={opt.id}
              className={styles.dotPlaceholder}
              style={{ backgroundColor: opt.hex }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.switcherContainer} ${className}`}
      role="group"
      aria-label="Theme accent color switcher"
    >
      <div className={styles.dotsRow}>
        {THEME_OPTIONS.map((opt) => {
          const isActive = currentAccent === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className={`${styles.dotButton} ${isActive ? styles.activeDot : ""}`}
              onClick={() => handleSelectAccent(opt.id)}
              aria-label={`Set theme accent to ${opt.label}`}
              aria-pressed={isActive}
              title={`Switch to ${opt.label}`}
            >
              <span
                className={styles.colorPill}
                style={{ backgroundColor: opt.hex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

