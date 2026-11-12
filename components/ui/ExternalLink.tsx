"use client";

import React, { useEffect } from "react";
import { site, isPortalPlaceholder, warnIfPortalPlaceholder } from "@/lib/site";
import { Icon } from "./Icon";
import styles from "./ExternalLink.module.css";

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

export function ExternalLink({
  href = site.portalUrl,
  children,
  showIcon = true,
  className = "",
  onClick,
  ...props
}: ExternalLinkProps) {
  const isPlaceholder = href === site.portalUrl ? isPortalPlaceholder(href) : false;

  useEffect(() => {
    if (isPlaceholder) {
      warnIfPortalPlaceholder();
    }
  }, [isPlaceholder]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPlaceholder) {
      warnIfPortalPlaceholder();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-placeholder={isPlaceholder ? "true" : undefined}
      className={`${styles.externalLink} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      {showIcon && (
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon name="external" size={13} />
        </span>
      )}
    </a>
  );
}

