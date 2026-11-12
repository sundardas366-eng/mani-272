"use client";

import React, { useEffect } from "react";
import { site } from "@/lib/site";
import { navLinks } from "@/lib/content";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import styles from "./MobileDrawer.module.css";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

export function MobileDrawer({ isOpen, onClose, onOpenAuth }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Status Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.portalPill}>
            <Badge variant="live" size="sm" hasDot>
              KEYAUTH PORTAL · {site.portalStatus}
            </Badge>
          </div>
          <ThemeSwitcher />
        </div>

        {/* 2-col Anchor Navigation Cards */}
        <div className={styles.cardsGrid}>
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.anchorCard}
              onClick={onClose}
            >
              <span className={styles.anchorLabel}>{item.label}</span>
              <span className={styles.anchorArrow}>→</span>
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className={styles.actionsGroup}>
          <Button
            asPortalLink
            variant="solid"
            size="md"
            fullWidth
            onClick={onClose}
          >
            Enter KeyAuth Portal
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
          >
            Sign in / Access Gateway
          </Button>
        </div>

        {/* Footer meta */}
        <div className={styles.drawerFooter}>
          <span className={styles.footerMono}>
            MONEY 272 · 2 LAYERS · 7S VERIFY · 2 SEATS
          </span>
        </div>
      </div>
    </div>
  );
}

