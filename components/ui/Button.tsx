"use client";

import React from "react";
import Link from "next/link";
import { site, isPortalPlaceholder, warnIfPortalPlaceholder } from "@/lib/site";
import { Icon } from "./Icon";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  asPortalLink?: boolean;
  isExternal?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "solid",
  size = "md",
  href,
  asPortalLink = false,
  isExternal = false,
  fullWidth = false,
  children,
  className = "",
  onClick,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Handle portal link
  if (asPortalLink) {
    const isPlaceholder = isPortalPlaceholder(site.portalUrl);

    const handlePortalClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isPlaceholder) {
        warnIfPortalPlaceholder();
      }
      if (onClick) {
        onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
      }
    };

    return (
      <a
        href={site.portalUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-placeholder={isPlaceholder ? "true" : undefined}
        className={buttonClasses}
        onClick={handlePortalClick}
      >
        <span>{children}</span>
        <span className={styles.externalGlyph} aria-hidden="true">
          <Icon name="external" size={size === "sm" ? 11 : size === "lg" ? 14 : 12} />
        </span>
      </a>
    );
  }

  // Handle normal external link
  if (href && isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        <span>{children}</span>
        <span className={styles.externalGlyph} aria-hidden="true">
          <Icon name="external" size={size === "sm" ? 11 : size === "lg" ? 14 : 12} />
        </span>
      </a>
    );
  }

  // Handle internal link / anchor
  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  // Standard interactive button
  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

