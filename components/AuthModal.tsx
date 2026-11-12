"use client";

import React, { useEffect, useRef, useState } from "react";
import { site, isPortalPlaceholder, warnIfPortalPlaceholder } from "@/lib/site";
import { Icon } from "./ui/Icon";
import { Badge } from "./ui/Badge";
import styles from "./AuthModal.module.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"credentials" | "google">("credentials");
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const isPlaceholder = isPortalPlaceholder(site.portalUrl);

  // Focus restoration & body scroll locking
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      // Focus first focusable element inside modal
      const timer = setTimeout(() => {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          focusable[0].focus();
        }
      }, 50);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Handle escape key & tab focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePortalRedirect = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    if (isPlaceholder) {
      warnIfPortalPlaceholder();
    }
    window.open(site.portalUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="presentation"
      aria-hidden="false"
    >
      <div
        className={styles.modalCard}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.brandRow}>
            <div className={styles.markBadge}>
              <span className={styles.markM}>M</span>
              <span className={styles.markNum}>272</span>
            </div>
            <Badge variant="live" size="sm">
              KEYAUTH GATEWAY
            </Badge>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close sign in dialog"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* Modal Title & Notice */}
        <div className={styles.titleSection}>
          <h2 id="auth-modal-title" className={styles.title}>
            Sign in to MANI 272
          </h2>
          <p id="auth-modal-description" className={styles.description}>
            You&apos;ll be redirected to the secure licensing portal.
          </p>
        </div>

        {/* Visual-only Tabs */}
        <div className={styles.tabContainer} role="tablist" aria-label="Sign in method options">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "credentials"}
            className={`${styles.tabBtn} ${activeTab === "credentials" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("credentials")}
          >
            License Key / Account
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "google"}
            className={`${styles.tabBtn} ${activeTab === "google" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("google")}
          >
            Google OAuth
          </button>
        </div>

        {/* Tab Content (Directs cleanly to site.portalUrl - No fake auth) */}
        {activeTab === "credentials" ? (
          <form onSubmit={handlePortalRedirect} className={styles.formContent}>
            <div className={styles.inputGroup}>
              <label htmlFor="auth-username" className={styles.inputLabel}>
                KEY / USERNAME
              </label>
              <input
                id="auth-username"
                type="text"
                className={styles.textInput}
                placeholder="M272-XXXX-XXXX-XXXX"
                autoComplete="off"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="auth-password" className={styles.inputLabel}>
                PASSWORD OR ACCESS PIN
              </label>
              <input
                id="auth-password"
                type="password"
                className={styles.textInput}
                placeholder="••••••••••••"
                autoComplete="off"
              />
            </div>

            <p className={styles.gatewayNotice}>
              <Icon name="shield" size={13} className={styles.noticeIcon} />
              <span>Authenticates via external KeyAuth API server with HMAC-SHA256 signature verification.</span>
            </p>

            <button
              type="submit"
              className={styles.primarySubmitBtn}
              data-placeholder={isPlaceholder ? "true" : undefined}
            >
              <span>Continue to KeyAuth Portal</span>
              <Icon name="external" size={14} />
            </button>
          </form>
        ) : (
          <div className={styles.googleContent}>
            <p className={styles.oauthNotice}>
              Redirect to KeyAuth OAuth connector for single sign-on verification.
            </p>
            <button
              type="button"
              onClick={handlePortalRedirect}
              className={styles.googleButton}
              data-placeholder={isPlaceholder ? "true" : undefined}
            >
              <svg className={styles.googleIcon} viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
              <Icon name="external" size={14} />
            </button>
          </div>
        )}

        {/* Modal Footer Note */}
        <div className={styles.footerNote}>
          <span className={styles.lockIconWrap}>
            <Icon name="lock" size={12} />
          </span>
          <span>Zero passwords or keys stored locally. Direct transport to {site.shortName} portal.</span>
        </div>
      </div>
    </div>
  );
}

