"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { LicenseSection } from "@/components/LicenseSection";
import { StepsSection } from "@/components/StepsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      {/* 1. Fixed Header Navigation */}
      <Navbar />

      {/* Main Page Landmark */}
      <main id="main-content">
        {/* 2. Hero Section (90vh min-height, grid, interactive console) */}
        <Hero />

        {/* 3. Stats Strip (4 columns, count-up animation, overlapping hero) */}
        <StatsStrip />

        {/* 4. Licence / Features Section (4 blocks + mock card + MeaningRow) */}
        <LicenseSection />

        {/* 5. How It Works (3 step cards) */}
        <StepsSection />

        {/* 6. FAQ Section (2x2 grid cards) */}
        <FaqSection />

        {/* 7. Contact Section (3 click-to-copy cards) */}
        <ContactSection />
      </main>

      {/* 8. Operational Footer */}
      <Footer />
    </>
  );
}

