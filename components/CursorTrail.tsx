"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./CursorTrail.module.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  initialSize: number;
  life: number;
  maxLife: number;
  colorRgb: [number, number, number];
  isSpark?: boolean;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  colorRgb: [number, number, number];
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine cursor
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    // Mouse coordinates tracking
    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;

    let smoothRingX = -100;
    let smoothRingY = -100;

    let particles: Particle[] = [];
    let shockwaves: Shockwave[] = [];
    let animId: number;

    // Helper to get active theme accent RGB
    const getAccentRgb = (): [number, number, number] => {
      try {
        const computed = getComputedStyle(document.documentElement);
        const rgbStr = computed.getPropertyValue("--accent-rgb").trim();
        if (rgbStr) {
          const parts = rgbStr.split(",").map((p) => parseInt(p.trim(), 10));
          if (parts.length === 3 && !parts.some(isNaN)) {
            return [parts[0], parts[1], parts[2]];
          }
        }
      } catch {
        // fallback to Crimson Red
      }
      return [239, 68, 68];
    };

    // Spawn trail particles with distance interpolation
    const addTrailParticles = (x1: number, y1: number, x2: number, y2: number) => {
      const dist = Math.hypot(x2 - x1, y2 - y1);
      const steps = Math.max(1, Math.min(Math.floor(dist / 4), 8));
      const accent = getAccentRgb();

      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const px = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 4;
        const py = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 4;

        // Slight drift velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.7;

        const maxLife = 24 + Math.random() * 12;
        const size = 3 + Math.random() * 3.5;

        // Alternate between bright accent and hot white core
        const useWhite = Math.random() > 0.65;
        const colorRgb: [number, number, number] = useWhite ? [255, 255, 255] : accent;

        particles.push({
          x: px,
          y: py,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.15, // soft upward drift
          size,
          initialSize: size,
          life: maxLife,
          maxLife,
          colorRgb,
        });
      }

      // Cap particles for peak 60fps performance
      if (particles.length > 180) {
        particles.splice(0, particles.length - 180);
      }
    };

    // Spawn click shockwave & burst sparks
    const triggerClickBurst = (x: number, y: number) => {
      const accent = getAccentRgb();

      // Shockwave ring
      shockwaves.push({
        x,
        y,
        radius: 6,
        maxRadius: 42,
        opacity: 0.85,
        colorRgb: accent,
      });

      // Radiating sparks
      const sparkCount = 14;
      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
        const speed = 2.5 + Math.random() * 3.5;
        const maxLife = 22 + Math.random() * 10;
        const size = 2 + Math.random() * 2;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          initialSize: size,
          life: maxLife,
          maxLife,
          colorRgb: Math.random() > 0.5 ? [255, 255, 255] : accent,
          isSpark: true,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (prevMouseX > 0 && prevMouseY > 0) {
        addTrailParticles(prevMouseX, prevMouseY, currentX, currentY);
      }

      prevMouseX = currentX;
      prevMouseY = currentY;
      mouseX = currentX;
      mouseY = currentY;

      // Update instant dot position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      // Check hover on interactive targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, select, textarea, label, [data-interactive="true"]'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      triggerClickBurst(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      prevMouseX = -100;
      prevMouseY = -100;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Physics Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // 1. Smooth lerp follower ring
      if (mouseX > 0 && mouseY > 0) {
        if (smoothRingX < 0) {
          smoothRingX = mouseX;
          smoothRingY = mouseY;
        } else {
          smoothRingX += (mouseX - smoothRingX) * 0.18;
          smoothRingY += (mouseY - smoothRingY) * 0.18;
        }

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${smoothRingX}px, ${smoothRingY}px, 0) translate(-50%, -50%)`;
        }
      }

      // 2. Render shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.16 + 1.2;
        sw.opacity *= 0.88;

        if (sw.opacity < 0.02 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        const [r, g, b] = sw.colorRgb;
        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${sw.opacity.toFixed(3)})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Render and update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.isSpark) {
          p.vx *= 0.92;
          p.vy *= 0.92;
          p.vy += 0.08; // subtle gravity
        } else {
          p.vx *= 0.96;
          p.vy *= 0.96;
        }

        const progress = p.life / p.maxLife; // 1 -> 0
        const currentRadius = p.initialSize * Math.pow(progress, 0.7);
        const alpha = Math.pow(progress, 1.4);

        const [r, g, b] = p.colorRgb;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.2, currentRadius), 0, Math.PI * 2);

        // Soft radial glow for lead particles
        if (progress > 0.5) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${(alpha * 0.8).toFixed(3)})`;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <div
      className={`${styles.cursorContainer} ${
        isHovered ? styles.cursorHover : ""
      } ${isClicked ? styles.cursorClick : ""}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
      <div
        ref={ringRef}
        className={`${styles.cursorRing} ${
          isVisible ? styles.cursorVisible : styles.cursorHidden
        }`}
      />
      <div
        ref={dotRef}
        className={`${styles.cursorDot} ${
          isVisible ? styles.cursorVisible : styles.cursorHidden
        }`}
      />
    </div>
  );
}
