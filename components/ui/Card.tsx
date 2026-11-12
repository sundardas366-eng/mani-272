import React from "react";
import styles from "./Card.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "matte" | "elevated" | "subtle" | "glow";
  interactive?: boolean;
  className?: string;
}

export function Card({
  children,
  variant = "matte",
  interactive = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${
        interactive ? styles.interactive : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

