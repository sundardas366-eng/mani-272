import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import styles from "./LegalPage.module.css";

export const metadata: Metadata = {
  title: "Terms of Service — MANI 272",
  description:
    "Licensing conditions, seat policies, and acceptable platform use for MANI 272.",
};

export default function TermsPage() {
  return (
    <div className={styles.legalWrapper}>
      <div className={`container ${styles.container}`}>
        <div className={styles.navBackRow}>
          <Link href="/" className={styles.backLink}>
            <Icon name="arrow-right" size={14} className={styles.flipArrow} />
            <span>Return to MANI 272</span>
          </Link>
          <Badge variant="subtle" size="sm">
            LAST REVISED: NOV 2026
          </Badge>
        </div>

        <article className={styles.documentCard}>
          <header className={styles.docHeader}>
            <div className={styles.badgeWrap}>
              <Badge variant="accent">TERMS & CONDITIONS</Badge>
            </div>
            <h1 className={styles.docTitle}>Terms of Service</h1>
            <p className={styles.docSubtitle}>
              Platform governance, seat allowances, and cryptographic service level commitments.
            </p>
          </header>

          <div className={styles.sectionDivider} />

          <div className={styles.contentBody}>
            <section className={styles.legalSection}>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By generating, distributing, or authenticating licenses using {site.name} infrastructure, you agree to comply with these Terms of Service. These terms govern the relationship between {site.name} and the licensee or authorized reseller.
              </p>
            </section>

            <section className={styles.legalSection}>
              <h2>2. License Seats and Hardware Binding (HWID)</h2>
              <p>
                Unless explicitly customized within an enterprise contract, each standard license key provisions <strong>two (2) concurrent hardware seat bindings</strong>.
              </p>
              <ul>
                <li>The runtime extracts deterministic hardware hashes on first boot to bind machine slots.</li>
                <li>Concurrent attempts from unauthorized foreign machines will return an authentication fault code.</li>
                <li>Seat resets may be performed according to policy thresholds established within your KeyAuth portal console.</li>
              </ul>
            </section>

            <section className={styles.legalSection}>
              <h2>3. Reseller Quotas and Scoped Delegation</h2>
              <p>
                Resellers provisioned under {site.name} are granted bounded license generation quotas. Resellers agree never to execute denial-of-service tests, tamper with cryptographic headers, or redistribute API keys outside authorized scopes.
              </p>
            </section>

            <section className={styles.legalSection}>
              <h2>4. Platform SLA & Service Guarantees</h2>
              <p>
                {site.name} commits to maintaining a <strong>99.98% uptime SLA</strong> on core HMAC-SHA256 handshake endpoints, with median verification latency capped at less than 7 seconds (median 412ms).
              </p>
            </section>

            <section className={styles.legalSection}>
              <h2>5. Contact & Contract Amendments</h2>
              <p>
                For custom licensing terms or enterprise SLA agreements, reach our operations desk at <code>{site.contacts.email}</code>.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

