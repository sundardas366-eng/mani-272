"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Icon } from "./ui/Icon";
import { Badge } from "./ui/Badge";
import styles from "./HeroConsole.module.css";

interface KeyItem {
  id: string;
  key: string;
  plan: string;
  duration: string;
}

interface DeviceItem {
  id: string;
  name: string;
  hwid: string;
  status: "BOUND" | "READY";
}

const INITIAL_KEYS: KeyItem[] = [
  { id: "k1", key: "M272-98F1-44A2-99B7", plan: "DEV TIER", duration: "30D" },
  { id: "k2", key: "M272-PRO7-3801-D361", plan: "PRO DUAL", duration: "1YR" },
  { id: "k3", key: "M272-ENT8-55C2-A004", plan: "ENTERPRISE", duration: "LIFETIME" },
];

const INITIAL_DEVICES: DeviceItem[] = [
  { id: "d1", name: "WS-ALPHA-WIN11", hwid: "8F2A-019B-4DCE", status: "BOUND" },
  { id: "d2", name: "SECURE-NODE-02", hwid: "17B4-E098-992C", status: "BOUND" },
  { id: "d3", name: "DEV-BOOK-M3", hwid: "994C-33F1-A801", status: "READY" },
  { id: "d4", name: "FIELD-STATION-X", hwid: "6D28-88A0-55BC", status: "READY" },
];

export function HeroConsole() {
  const [activeTab, setActiveTab] = useState<"verify" | "keys" | "devices">("verify");
  const [verifyState, setVerifyState] = useState<"idle" | "verifying" | "success">("idle");
  const [showMaskedKey, setShowMaskedKey] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [devices, setDevices] = useState<DeviceItem[]>(INITIAL_DEVICES);

  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // High-performance 3D Tilt & Dynamic Glare tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Up to 11.5 degrees 3D tilt
    const tiltX = ((y - centerY) / centerY) * -11.5;
    const tiltY = ((x - centerX) / centerX) * 11.5;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      card.style.setProperty("--glare-x", `${glareX.toFixed(1)}%`);
      card.style.setProperty("--glare-y", `${glareY.toFixed(1)}%`);
      card.style.setProperty("--glare-opacity", "0.28");
      card.style.setProperty("--is-hovered", "1");
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--glare-opacity", "0");
    card.style.setProperty("--is-hovered", "0");
  }, []);

  // Verification simulation
  const handleRunVerification = () => {
    if (verifyState === "verifying") return;

    setVerifyState("verifying");

    setTimeout(() => {
      setVerifyState("success");
    }, 1200);
  };

  // Copy key to clipboard
  const handleCopyKey = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKeyId(id);
      setTimeout(() => setCopiedKeyId(null), 1400);
    }
  };

  // Scramble / regenerate hardware fingerprints
  const handleRegenerateDevices = () => {
    const hex = "0123456789ABCDEF";
    const randPart = () =>
      Array.from({ length: 4 }, () => hex[Math.floor(Math.random() * hex.length)]).join("");

    setDevices((prev) =>
      prev.map((d) => ({
        ...d,
        hwid: `${randPart()}-${randPart()}-${randPart()}`,
      }))
    );
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={styles.consoleCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Cursor Glare Layer */}
      <div className={styles.glareLayer} aria-hidden="true" />

      {/* Window Chrome Header Bar */}
      <div className={styles.windowChrome}>
        <div className={styles.chromeDots} aria-hidden="true">
          <span className={`${styles.dot} ${styles.dotClose}`} />
          <span className={`${styles.dot} ${styles.dotMin}`} />
          <span className={`${styles.dot} ${styles.dotMax}`} />
        </div>

        <div className={styles.chromeTitle}>
          <span className={styles.consolePrompt}>keyauth — console</span>
        </div>

        <div className={styles.chromeVersion}>
          <Badge variant="subtle" size="sm">
            V2.6
          </Badge>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabBar} role="tablist" aria-label="Console diagnostic tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "verify"}
          className={`${styles.tabItem} ${activeTab === "verify" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("verify")}
        >
          <Icon name="shield" size={13} />
          <span>Verify</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "keys"}
          className={`${styles.tabItem} ${activeTab === "keys" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("keys")}
        >
          <Icon name="key" size={13} />
          <span>Keys</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "devices"}
          className={`${styles.tabItem} ${activeTab === "devices" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("devices")}
        >
          <Icon name="cpu" size={13} />
          <span>Devices</span>
        </button>
      </div>

      {/* Tab Content Panes */}
      <div className={styles.tabContent}>
        {/* PANE 1: VERIFY */}
        {activeTab === "verify" && (
          <div className={styles.verifyPane}>
            {/* Box 1: License Target with Eye Button */}
            <div className={styles.keyFieldBox}>
              <div className={styles.fieldHeader}>
                <span className={styles.fieldLabel}>LICENSE TARGET</span>
                <button
                  type="button"
                  className={styles.eyeToggleBtn}
                  onClick={() => setShowMaskedKey(!showMaskedKey)}
                  aria-label={showMaskedKey ? "Hide license key" : "Show license key"}
                  title={showMaskedKey ? "Click to mask key" : "Click to unmask key"}
                >
                  <Icon name={showMaskedKey ? "eye-off" : "eye"} size={14} />
                </button>
              </div>
              <div className={styles.monoKeyText}>
                {showMaskedKey
                  ? "M272-98F1-44A2-99B7-71CE"
                  : "M272-98F1-••••••••-71CE"}
              </div>
            </div>

            {/* Box 2: Local Machine Fingerprint */}
            <div className={styles.fingerprintBox}>
              <div className={styles.fieldLabel}>LOCAL MACHINE FINGERPRINT</div>
              <div className={styles.fingerprintValue}>
                <code>HWID: 8F2A-019B-4DCE-981A [SHA-256]</code>
              </div>
            </div>

            {/* Verification Action Button matching screenshot */}
            <div className={styles.verifyActionRow}>
              <button
                type="button"
                className={`${styles.verifyActionBtn} ${
                  verifyState === "verifying" ? styles.verifyActionBtnLoading : ""
                }`}
                onClick={handleRunVerification}
                disabled={verifyState === "verifying"}
              >
                {verifyState === "verifying" ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    <span>Verifying HMAC-SHA256...</span>
                  </>
                ) : (
                  <>
                    <span className={styles.terminalPrompt} aria-hidden="true">&gt;_</span>
                    <span>Run verification</span>
                  </>
                )}
              </button>
            </div>

            {/* Verification Result Display */}
            <div
              className={`${styles.resultBanner} ${
                verifyState === "success" ? styles.resultSuccess : ""
              }`}
              role="status"
              aria-live="polite"
            >
              {verifyState === "verifying" && (
                <div className={styles.pendingRow}>
                  <span className={styles.pulseDotYellow} aria-hidden="true" />
                  <span>Validating cryptographic handshake with KeyAuth...</span>
                </div>
              )}

              {verifyState === "success" && (
                <div className={styles.successRow}>
                  <span className={styles.successCheck}>✓</span>
                  <span className={styles.successText}>
                    SIGNATURE VALID · HWID MATCH · 142ms
                  </span>
                </div>
              )}

              {verifyState === "idle" && (
                <div className={styles.idleRow}>
                  <span className={styles.idleDot} />
                  <span>Awaiting handshake dispatch. Click &quot;Run verification&quot;.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PANE 2: KEYS */}
        {activeTab === "keys" && (
          <div className={styles.keysPane}>
            <div className={styles.keysList}>
              {INITIAL_KEYS.map((k) => (
                <div key={k.id} className={styles.keyRow}>
                  <div className={styles.keyMeta}>
                    <span className={styles.keyPlan}>{k.plan}</span>
                    <span className={styles.keyDuration}>{k.duration}</span>
                  </div>
                  <div className={styles.keyStringBox}>
                    <code className={styles.keyString}>{k.key}</code>
                    <button
                      type="button"
                      className={styles.copyKeyBtn}
                      onClick={() => handleCopyKey(k.id, k.key)}
                      aria-label={`Copy key ${k.key}`}
                    >
                      <Icon
                        name={copiedKeyId === k.id ? "check" : "copy"}
                        size={13}
                      />
                      <span>{copiedKeyId === k.id ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PANE 3: DEVICES */}
        {activeTab === "devices" && (
          <div className={styles.devicesPane}>
            <div className={styles.deviceGrid}>
              {devices.map((d) => (
                <div key={d.id} className={styles.deviceCard}>
                  <div className={styles.deviceHeader}>
                    <span className={styles.deviceName}>{d.name}</span>
                    <span
                      className={`${styles.deviceStatus} ${
                        d.status === "BOUND" ? styles.statusBound : styles.statusReady
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>
                  <code className={styles.deviceHwid}>{d.hwid}</code>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.scrambleBtn}
              onClick={handleRegenerateDevices}
            >
              <Icon name="refresh" size={12} />
              <span>Rotate HWID Hashes</span>
            </button>
          </div>
        )}
      </div>

      {/* Window Footer matching screenshot */}
      <div className={styles.footerBar}>
        <div className={styles.footerLeft}>
          <span className={styles.engineLed} aria-hidden="true" />
          <span className={styles.engineStatus}>engine ready</span>
          <span className={styles.engineDivider}>·</span>
          <span className={styles.engineVersion}>v2.6.4</span>
        </div>
        <div className={styles.telemetryTag}>DEMO TELEMETRY</div>
      </div>
    </div>
  );
}
