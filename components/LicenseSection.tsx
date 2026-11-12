"use client";

import React, { useState } from "react";
import { featuresContent } from "@/lib/content";
import { SectionHeader } from "./ui/SectionHeader";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Icon } from "./ui/Icon";
import { MeaningRow } from "./MeaningRow";
import styles from "./LicenseSection.module.css";

export function LicenseSection() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const mock = featuresContent.mockLicense;
  const rawKey = mock.licenseKey;
  const displayedKey = showKey
    ? rawKey
    : "M272-88FA-••••-••••-2B18";

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rawKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  };

  return (
    <section id="features" className={styles.section} aria-labelledby="features-title">
      <div className={`container ${styles.container}`}>
        {/* Section Header */}
        <SectionHeader
          badge={featuresContent.badge}
          title={featuresContent.heading}
          subtitle={featuresContent.subcopy}
          align="center"
        />

        {/* 2-Column Main Feature & Licence Mock Card */}
        <div className={styles.mainCard}>
          {/* Left Column: 4 Feature Blocks + Primary CTA */}
          <div className={styles.featuresCol}>
            <div className={styles.featuresList}>
              {featuresContent.features.map((feat, idx) => (
                <div key={idx} className={styles.featureItem}>
                  <div className={styles.checkIconWrap} aria-hidden="true">
                    <Icon name="check" size={14} className={styles.accentCheck} />
                  </div>
                  <div className={styles.featureBody}>
                    <div className={styles.featureTitleRow}>
                      <h3 className={styles.featureTitle}>{feat.title}</h3>
                      <span className={styles.featureTag}>{feat.tag}</span>
                    </div>
                    <p className={styles.featureDesc}>{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.ctaWrap}>
              <Button asPortalLink variant="solid" size="md">
                Enter KeyAuth Portal
              </Button>
            </div>
          </div>

          {/* Right Column: Licence Card Mock */}
          <div className={styles.mockCol}>
            <div className={styles.mockLicenseCard}>
              {/* Card Header */}
              <div className={styles.mockHeader}>
                <div className={styles.mockPlanWrap}>
                  <Badge variant="accent" size="sm">
                    {mock.plan}
                  </Badge>
                </div>
                <div className={styles.mockStatusWrap}>
                  <Badge variant="live" size="sm" hasDot>
                    {mock.status}
                  </Badge>
                </div>
              </div>

              {/* Masked Key Row with Eye and Copy */}
              <div className={styles.keyBox}>
                <div className={styles.keyHeader}>
                  <span className={styles.keyLabel}>AUTHENTICATION KEY</span>
                  <div className={styles.keyActions}>
                    <button
                      type="button"
                      className={styles.iconActionBtn}
                      onClick={() => setShowKey(!showKey)}
                      aria-label={showKey ? "Hide license key" : "Reveal license key"}
                      title={showKey ? "Hide key" : "Reveal key"}
                    >
                      <Icon name={showKey ? "eye-off" : "eye"} size={13} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconActionBtn}
                      onClick={handleCopy}
                      aria-label="Copy license key"
                      title="Copy key"
                    >
                      <Icon name={copied ? "copied" : "copy"} size={13} />
                    </button>
                  </div>
                </div>
                <div className={styles.keyStringRow}>
                  <code className={styles.keyString}>{displayedKey}</code>
                  {copied && <span className={styles.copiedPill}>COPIED</span>}
                </div>
              </div>

              {/* 2 Device Rows with "BOUND" chips */}
              <div className={styles.devicesBox}>
                <div className={styles.devicesLabel}>
                  REGISTERED HARDWARE SEATS (2/2)
                </div>
                <div className={styles.devicesList}>
                  {mock.devices.map((dev) => (
                    <div key={dev.id} className={styles.deviceRow}>
                      <div className={styles.devIconWrap}>
                        <Icon name="cpu" size={14} />
                      </div>
                      <div className={styles.devMeta}>
                        <span className={styles.devName}>{dev.name}</span>
                        <code className={styles.devHwid}>{dev.hwid}</code>
                      </div>
                      <span className={styles.boundChip}>{dev.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expiry Line */}
              <div className={styles.expiryRow}>
                <Icon name="shield" size={12} className={styles.expiryIcon} />
                <span className={styles.expiryText}>{mock.expiry}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Item MeaningRow Below */}
        <MeaningRow />
      </div>
    </section>
  );
}

