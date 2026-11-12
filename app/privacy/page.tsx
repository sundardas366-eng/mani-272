import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import styles from "./LegalPage.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — MANI 272",
  description:
    "Data privacy and telemetry standards for MANI 272 cryptographic licensing and hardware verification.",
};

export default function PrivacyPage() {
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
              <Badge variant="accent">LEGAL / COMPLIANCE</Badge>
            </div>
            <h1 className={styles.docTitle}>Privacy Policy</h1>
            <p className={styles.docSubtitle}>
              Cryptographic integrity, telemetry collection, and hardware binding governance.
            </p>
          </header>

          <div className={styles.sectionDivider} />

          <div className={styles.contentBody}>
            <section className={styles.legalSection}>
              <h2>1. Scope and Operational Purpose</h2>
              <p>
                {site.name} provides cryptographic software licensing infrastructure. This Privacy Policy details the technical telemetry, hardware fingerprints, and verification logs processed during client authentication.
              </p>
            </section>

            <section className={styles.legalSection}>
              <h2>2. Information Processed During Handshakes</h2>
              <p>
                To prevent unauthorized seat duplication and execute deterministic hardware locking, our edge verification nodes process:
              </p>
              <ul>
                <li><strong>Hardware Hash (HWID):</strong> Irreversible SHA-256 hashes generated from CPU processor identifiers, motherboard serials, and drive UUIDs. Raw serials are never transmitted in cleartext.</li>
                <li><strong>Cryptographic Timestamps:</strong> Unix epoch timestamps verifying non-replayed HMAC signatures.</li>
                <li><strong>Network Handshake Metadata:</strong> Client IP address and geographic edge route strictly utilized for rate-limiting, DDoS mitigation, and concurrent session policing.</li>
              </ul>
            </section>

            <section className={styles.legalSection}>
              <h2>3. Data Retention and Seat Revocation</h2>
              <p>
                Registered hardware bindings remain linked to a license key until the license expires or an authorized administrator or key holder triggers a remote seat reset through the KeyAuth portal gateway.
              </p>
            </section>

            <section className={styles.legalSection}>
              <h2>4. Security and Cryptographic Storage</h2>
              <p>
                All data transit is guarded by TLS 1.3 encryption. Payload validation utilizes HMAC-SHA256 digests verified using private secrets isolated in hardware security modules. We do not store end-user passwords, payment credentials, or unhashed hardware configurations.
              </p>
            </section>

            <section className={styles.legalSection}>
              <h2>5. Contact & Privacy Inquiries</h2>
              <p>
                For technical compliance questions or data erasure requests, contact our engineering office at <code>{site.contacts.email}</code>.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

