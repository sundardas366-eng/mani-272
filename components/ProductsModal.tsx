"use client";

import React, { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { productsData, ProductItem } from "@/lib/content";
import { Icon } from "./ui/Icon";
import { UidBypassDetailsModal } from "./UidBypassDetailsModal";
import styles from "./ProductsModal.module.css";

interface ProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection?: () => void;
}

export function ProductsModal({
  isOpen,
  onClose,
  onNavigateToSection,
}: ProductsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isUidDetailsOpen, setIsUidDetailsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categoryList = [
    { id: "ALL", label: `ALL (${productsData.length})` },
    { id: "BYPASS", label: `BYPASS (${productsData.filter((p) => p.category === "BYPASS").length})` },
    { id: "VIP", label: `VIP (${productsData.filter((p) => p.category === "VIP").length})` },
    { id: "TOOL", label: `TOOLS (${productsData.filter((p) => p.category === "TOOL").length})` },
  ];

  const filteredProducts = productsData.filter((item) => {
    const matchesCategory =
      selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some((f) =>
        f.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
      aria-label="Modal backdrop"
    >
      <div
        className={styles.modalWindow}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="products-modal-title"
      >
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.topPillRow}>
              <span className={styles.badgeLive}>
                <span className={styles.pulseDot} aria-hidden="true" />
                PRODUCT TOTAL · CATALOG
              </span>
            </div>
            <h2 id="products-modal-title" className={styles.modalTitle}>
              MANI 272 — Product Showcase
            </h2>
            <p className={styles.modalSubtitle}>
              Hardware-locked builds, anti-tamper loaders, and VIP cryptographic suites.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close product modal"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* CONTROLS (TABS + SEARCH) */}
        <div className={styles.controlsBar}>
          <div className={styles.filterTabs} role="tablist" aria-label="Product categories">
            {categoryList.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`${styles.filterBtn} ${
                  selectedCategory === cat.id ? styles.filterBtnActive : ""
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className={styles.searchInputWrap}>
            <input
              type="text"
              placeholder="Search products & features..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>
        </div>

        {/* PRODUCTS CARDS GRID */}
        <div className={styles.modalBody}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div>
                <div className={styles.productTopRow}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <span className={styles.statusTag}>
                    ● {product.status}
                  </span>
                </div>
                <p className={styles.tagline}>{product.tagline}</p>

                <div className={styles.plansWrap}>
                  {product.plans.map((p, idx) => (
                    <span key={idx} className={styles.planChip}>
                      {p}
                    </span>
                  ))}
                </div>

                <ul className={styles.featuresList}>
                  {product.features.map((feat, fIdx) => (
                    <li key={fIdx} className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.priceCol}>
                  <span className={styles.priceLabel}>Pricing Tier</span>
                  <span className={styles.priceValue}>{product.price}</span>
                </div>

                <div className={styles.btnActions}>
                  {product.id === "prod-uid-bypass" && (
                    <button
                      type="button"
                      className={styles.discordBtn}
                      onClick={() => setIsUidDetailsOpen(true)}
                      title="View Full UID Bypass Details"
                      style={{ color: "#ef4444", borderColor: "rgba(239, 68, 68, 0.45)", fontWeight: 700 }}
                    >
                      View Details 📋
                    </button>
                  )}
                  <a
                    href={site.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.buyBtn}
                  >
                    <span>Get Key</span>
                    <span>↗</span>
                  </a>
                  <a
                    href={`https://discord.gg/${site.contacts.discord}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.discordBtn}
                    title="Inquire on Discord"
                  >
                    Discord
                  </a>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#a1a1aa" }}>
              No products found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className={styles.modalFooter}>
          <span className={styles.footerNote}>
            All licenses are HMAC-SHA256 authenticated via the official KeyAuth portal.
          </span>
          <div className={styles.footerActions}>
            {onNavigateToSection && (
              <button
                type="button"
                className={styles.sectionLink}
                onClick={() => {
                  onClose();
                  onNavigateToSection();
                }}
              >
                View full section on page ↓
              </button>
            )}
          </div>
        </div>
      </div>

      {/* UID Bypass Specification Modal */}
      <UidBypassDetailsModal
        isOpen={isUidDetailsOpen}
        onClose={() => setIsUidDetailsOpen(false)}
      />
    </div>
  );
}

