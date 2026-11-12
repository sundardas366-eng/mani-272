import React from "react";
import styles from "./Badge.module.css";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "subtle" | "live";
  size?: "sm" | "md";
  className?: string;
  hasDot?: boolean;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  hasDot = false,
}: BadgeProps) {
  return (
    <span
      className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}
    >
      {(hasDot || variant === "live") && (
        <span className={styles.dot} aria-hidden="true" />
      )}
      <span className={styles.text}>{children}</span>
    </span>
  );
}

