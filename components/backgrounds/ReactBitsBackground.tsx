"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the React Bits WebGL Particles component (client-only)
const Particles = dynamic(() => import("./Particles"), {
  ssr: false,
}) as React.ComponentType<any>;

export function ReactBitsBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="react-bits-bg-layer"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <Particles
        particleColors={["#ef4444", "#ffffff", "#991b1b", "#f87171"]}
        particleCount={160}
        particleSpread={11}
        speed={0.12}
        moveParticlesOnHover={true}
        particleHoverFactor={1.2}
        alphaParticles={true}
        particleBaseSize={100}
        sizeRandomness={0.9}
        cameraDistance={22}
        disableRotation={false}
        shape="circle"
        glow={0.5}
        twinkle={0.35}
        clickBurst={true}
        drift="forward"
      />
    </div>
  );
}
