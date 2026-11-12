"use client";

import React, { useEffect, useRef } from "react";
import styles from "./CursorTrail.module.css";

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Handle canvas dimensions safely
    let dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Trail storage
    const points: TrailPoint[] = [];
    const ripples: ClickRipple[] = [];
    const TRAIL_DURATION = 320; // milliseconds the line trail persists

    let mouseX = -100;
    let mouseY = -100;
    let isMouseOnScreen = false;

    // Helper to get active accent color (defaults to Crimson Red)
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
        // Fallback
      }
      return [239, 68, 68]; // Crimson Red
    };

    const handleMouseMove = (e: MouseEvent) => {
      isMouseOnScreen = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      const now = performance.now();

      // Avoid duplicate points if mouse barely moved
      const lastPoint = points[points.length - 1];
      if (!lastPoint || Math.hypot(lastPoint.x - mouseX, lastPoint.y - mouseY) > 2) {
        points.push({ x: mouseX, y: mouseY, time: now });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 36,
        alpha: 0.9,
      });
    };

    const handleMouseLeave = () => {
      isMouseOnScreen = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let animId: number;

    const render = () => {
      const now = performance.now();

      // Clear full canvas in physical pixels
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      // Scale by DPR so coordinates match clientX/clientY exactly
      ctx.scale(dpr, dpr);

      // 1. Filter out expired trail points
      while (points.length > 0 && now - points[0].time > TRAIL_DURATION) {
        points.shift();
      }

      const accent = getAccentRgb();
      const [r, g, b] = accent;

      // 2. Draw Smooth Laser Line Trail
      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];

          // Progress along the trail: 0 (oldest/tail) to 1 (newest/head)
          const age = now - p2.time;
          const progress = Math.max(0, Math.min(1, 1 - age / TRAIL_DURATION));

          // Taper line width: starts at 7.5px at cursor head, tapers to 1px at the tail
          const width = 1 + Math.pow(progress, 1.4) * 6.5;
          const alpha = Math.pow(progress, 1.2);

          // A) Outer Glow Ribbon (Crimson Red)
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = width * 1.8;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(alpha * 0.55).toFixed(3)})`;
          ctx.shadowBlur = 14;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
          ctx.stroke();

          // B) Inner Bright White Core (Laser Effect)
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = Math.max(0.8, width * 0.45);
          ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.95).toFixed(3)})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "#ffffff";
          ctx.stroke();
        }
      }

      // 3. Leading Head Glow Orb (Just behind cursor tip)
      if (isMouseOnScreen && points.length > 0) {
        const head = points[points.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 16;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(head.x, head.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.35)`;
        ctx.fill();
      }

      // 4. Draw Click Shockwave Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += (rip.maxRadius - rip.radius) * 0.18 + 1.2;
        rip.alpha *= 0.88;

        if (rip.alpha < 0.02 || rip.radius >= rip.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${rip.alpha.toFixed(3)})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, Math.max(1, rip.radius * 0.7), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(rip.alpha * 0.8).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
