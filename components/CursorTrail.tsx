"use client";

import React, { useEffect, useRef } from "react";
import styles from "./CursorTrail.module.css";

interface LightPoint {
  x: number;
  y: number;
  time: number;
}

interface ClickWave {
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

    // Track historical mouse coordinates
    const points: LightPoint[] = [];
    const waves: ClickWave[] = [];
    const TRAIL_LIFETIME = 230; // snappy, elegant duration in ms

    let mouseX = -100;
    let mouseY = -100;
    let isInside = false;

    // Helper to get active theme rgb
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
      return [239, 68, 68];
    };

    const handleMouseMove = (e: MouseEvent) => {
      isInside = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      const now = performance.now();

      const last = points[points.length - 1];
      if (!last || Math.hypot(last.x - mouseX, last.y - mouseY) > 2) {
        points.push({ x: mouseX, y: mouseY, time: now });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      waves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 3,
        maxRadius: 28,
        alpha: 0.75,
      });
    };

    const handleMouseLeave = () => {
      isInside = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let animId: number;

    const render = () => {
      const now = performance.now();

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clean up points older than TRAIL_LIFETIME
      while (points.length > 0 && now - points[0].time > TRAIL_LIFETIME) {
        points.shift();
      }

      const [r, g, b] = getAccentRgb();

      // Draw Smooth Light Streak Line
      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];

          // Progress: 0 at the tail, 1 at cursor head
          const age = now - p1.time;
          const progress = Math.max(0, Math.min(1, 1 - age / TRAIL_LIFETIME));

          // Simple, clean light streak: starts at ~3.2px at cursor, tapers to ~0.5px
          const lineWidth = 0.5 + progress * 2.8;
          const alpha = Math.pow(progress, 1.25);

          // 1. Soft Subtle Ambient Halo (Gentle, elegant accent)
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = lineWidth * 2.2;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(alpha * 0.35).toFixed(3)})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
          ctx.stroke();

          // 2. Crisp Luminous White Light Core (The actual light line)
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.9).toFixed(3)})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "#ffffff";
          ctx.stroke();
        }

        // Tiny soft light head point right at cursor
        if (isInside && points.length > 0) {
          const head = points[points.length - 1];
          ctx.beginPath();
          ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#ffffff";
          ctx.fill();
        }
      }

      // Draw subtle click pulse
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += (wave.maxRadius - wave.radius) * 0.2 + 0.8;
        wave.alpha *= 0.86;

        if (wave.alpha < 0.02 || wave.radius >= wave.maxRadius) {
          waves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(wave.alpha * 0.75).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
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
