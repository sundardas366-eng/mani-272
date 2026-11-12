"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { ProductsSection } from "@/components/ProductsSection";
import { UidBypassSection } from "@/components/UidBypassSection";
import { ProductsModal } from "@/components/ProductsModal";
import { LicenseSection } from "@/components/LicenseSection";
import { SdksSection } from "@/components/SdksSection";
import { StepsSection } from "@/components/StepsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const handleOpenProducts = () => {
    setIsProductsOpen(true);
  };

  const handleCloseProducts = () => {
    setIsProductsOpen(false);
  };

  const handleScrollToProductsSection = () => {
    const el = document.getElementById("product-total");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. Fixed Header Navigation */}
      <Navbar onOpenProducts={handleOpenProducts} />

      {/* Main Page Landmark */}
      <main id="main-content">
        {/* 2. Hero Section (90vh min-height, grid, interactive console) */}
        <Hero onOpenProducts={handleOpenProducts} />

        {/* 3. Stats Strip (4 columns, count-up animation, overlapping hero) */}
        <StatsStrip />

        {/* 4. Product Total Showcase Section */}
        <ProductsSection onOpenModal={handleOpenProducts} />

        {/* 5. Dedicated UID Bypass Showcase & Pricing Section */}
        <UidBypassSection />

        {/* 6. Licence / Features Section (4 blocks + mock card + MeaningRow) */}
        <LicenseSection />

        {/* 6. Developer SDKs Section (Integrate in Under 3 Minutes) */}
        <SdksSection />

        {/* 7. How It Works (3 step cards) */}
        <StepsSection />

        {/* 8. FAQ Section (2x2 grid cards) */}
        <FaqSection />

        {/* 9. Contact Section (3 click-to-copy cards) */}
        <ContactSection />
      </main>

      {/* 10. Operational Footer */}
      <Footer />

      {/* 11. Product Total Modal Popup */}
      <ProductsModal
        isOpen={isProductsOpen}
        onClose={handleCloseProducts}
        onNavigateToSection={handleScrollToProductsSection}
      />
    </>
  );
}

