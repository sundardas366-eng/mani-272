import React from "react";
import { Badge } from "./Badge";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  badge?: string;
  badgeHasDot?: boolean;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  badgeHasDot = false,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`${styles.header} ${styles[align]} ${className}`}
    >
      {badge && (
        <div className={styles.badgeWrap}>
          <Badge variant="accent" hasDot={badgeHasDot}>
            {badge}
          </Badge>
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

