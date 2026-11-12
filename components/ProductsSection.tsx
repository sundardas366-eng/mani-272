"use client";

import React, { useState } from "react";
import { site } from "@/lib/site";
import { productsData } from "@/lib/content";
import { UidBypassDetailsModal } from "./UidBypassDetailsModal";
import styles from "./ProductsSection.module.css";

interface ProductsSectionProps {
  onOpenModal?: () => void;
}

export function ProductsSection({ onOpenModal }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [isUidDetailsOpen, setIsUidDetailsOpen] = useState<boolean>(false);

  const categoryList = [
    { id: "ALL", label: `ALL PRODUCTS (${productsData.length})` },
    { id: "BYPASS", label: `BYPASS (${productsData.filter((p) => p.category === "BYPASS").length})` },
    { id: "VIP", label: `VIP EXCLUSIVE (${productsData.filter((p) => p.category === "VIP").length})` },
    { id: "TOOL", label: `TOOLS (${productsData.filter((p) => p.category === "TOOL").length})` },
  ];

  const filteredProducts = productsData.filter((item) =>
    activeCategory === "ALL" ? true : item.category === activeCategory
  );

  return (
    <section
      id="product-total"
      className={styles.sectionWrap}
      aria-labelledby="product-total-heading"
    >
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={`container ${styles.container}`}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.badgeWrap}>
            <span className={styles.pillBadge}>
              <span className={styles.liveDot} aria-hidden="true" />
              PRODUCT TOTAL · DIRECTORY
            </span>
          </div>

          <h2 id="product-total-heading" className={styles.heading}>
            PRODUCT <span className={styles.headingAccent}>TOTAL</span>
          </h2>

          <p className={styles.subHeading}>
            Explore our cryptographic software inventory, hardware-locked VIP
            tools, and bypass loaders authenticated via KeyAuth.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterRow} role="tablist" aria-label="Product categories">
          {categoryList.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`${styles.categoryTab} ${
                activeCategory === cat.id ? styles.categoryTabActive : ""
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {filteredProducts.map((prod) => (
            <div key={prod.id} className={styles.productCard}>
              <div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{prod.name}</h3>
                  <span
                    className={`${styles.cardTag} ${
                      prod.status === "UPDATED" ? styles.cardTagUpdated : ""
                    }`}
                  >
                    ● {prod.status}
                  </span>
                </div>

                <p className={styles.cardDesc}>{prod.tagline}</p>

                <div className={styles.planList}>
                  {prod.plans.map((plan, idx) => (
                    <span key={idx} className={styles.planBadge}>
                      {plan}
                    </span>
                  ))}
                </div>

                <ul className={styles.featureList}>
                  {prod.features.map((feat, fIdx) => (
                    <li key={fIdx} className={styles.featureRow}>
                      <span className={styles.checkMark}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>Pricing Tier</span>
                  <span className={styles.priceVal}>{prod.price}</span>
                </div>

                <div className={styles.actionBtns}>
                  {prod.id === "prod-uid-bypass" && (
                    <button
                      type="button"
                      className={styles.inquireBtn}
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
                    className={styles.orderBtn}
                  >
                    <span>Get Key</span>
                    <span>↗</span>
                  </a>
                  <a
                    href={`https://discord.gg/${site.contacts.discord}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inquireBtn}
                  >
                    Discord
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UID Bypass Specification Modal */}
      <UidBypassDetailsModal
        isOpen={isUidDetailsOpen}
        onClose={() => setIsUidDetailsOpen(false)}
      />
    </section>
  );
}

