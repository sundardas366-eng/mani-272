"use client";

import React, { useState } from "react";
import { site } from "@/lib/site";
import { productsData } from "@/lib/content";
import styles from "./ProductsSection.module.css";

interface ProductsSectionProps {
  onOpenModal?: () => void;
}

export function ProductsSection({ onOpenModal }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = ["ALL", "VIP", "BYPASS", "TOOL", "LOADER"];

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
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`${styles.categoryTab} ${
                activeCategory === cat ? styles.categoryTabActive : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "ALL" ? `ALL PRODUCTS (${productsData.length})` : cat}
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
    </section>
  );
}
