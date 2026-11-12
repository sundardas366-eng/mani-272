import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.notFoundCard}>
        <div className={styles.badgeWrap}>
          <Badge variant="accent" size="sm">
            404 · ROUTE FAULT
          </Badge>
        </div>

        <h1 className={styles.codeMono}>
          4<span className={styles.accentDigit}>0</span>4
        </h1>

        <h2 className={styles.title}>Cryptographic Route Not Found</h2>
        <p className={styles.description}>
          The requested path does not resolve to an active verification node or portal gateway on the MANI 272 network.
        </p>

        <div className={styles.actionWrap}>
          <Button href="/" variant="solid" size="md">
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

