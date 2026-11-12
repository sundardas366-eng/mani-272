"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./CursorTrail.module.css";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  initialSize: number;
  rotation: number;
  rotSpeed: number;
  life: number;
  maxLife: number;
  color: string;
}

interface ClickPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Handle high-DPI canvas
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

    // Mouse coordinates & physics state
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let prevX = -100;
    let prevY = -100;

    const sparkles: Sparkle[] = [];
    const pulses: ClickPulse[] = [];

    // Helper to get active theme color
    const getAccentHex = (): string => {
      try {
        const computed = getComputedStyle(document.documentElement);
        const hex = computed.getPropertyValue("--accent").trim();
        if (hex) return hex;
      } catch {
        // fallback
      }
      return "#ef4444";
    };

    // Draw a 4-pointed star / sparkle
    const drawStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.beginPath();
      context.moveTo(cx, cy - outerRadius);

      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }

      context.lineTo(cx, cy - outerRadius);
      context.closePath();
    };

    // Spawn 4-pointed diamond / stardust sparkle
    const spawnSparkle = (x: number, y: number) => {
      const accent = getAccentHex();
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      const size = 5 + Math.random() * 8;
      const maxLife = 24 + Math.random() * 12;

      // Alternate between Crimson Red and Diamond White
      const useWhite = Math.random() > 0.45;
      const color = useWhite ? "#ffffff" : accent;

      sparkles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.2, // soft floating lift
        size,
        initialSize: size,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        life: maxLife,
        maxLife,
        color,
      });

      if (sparkles.length > 70) {
        sparkles.splice(0, sparkles.length - 70);
      }
    };

    let lastSparkleDist = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      targetX = e.clientX;
      targetY = e.clientY;

      if (prevX > 0 && prevY > 0) {
        const dist = Math.hypot(targetX - prevX, targetY - prevY);
        lastSparkleDist += dist;

        // Spawn a delicate sparkle every 14px of cursor movement
        if (lastSparkleDist > 14) {
          spawnSparkle(targetX, targetY);
          lastSparkleDist = 0;
        }
      }

      prevX = targetX;
      prevY = targetY;

      // Check hover on interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, select, textarea, label, [data-interactive="true"]'
        );
        setIsHover(!!interactive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClick(true);
      // Spawn click ripple
      pulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 42,
        alpha: 0.85,
      });

      // Spawn burst of 6 mini stars
      for (let i = 0; i < 6; i++) {
        spawnSparkle(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsClick(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      prevX = -100;
      prevY = -100;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Elastic Fluid Ring Follower Physics (Velocity Squash & Stretch)
      if (targetX > 0 && targetY > 0) {
        if (currentX < 0) {
          currentX = targetX;
          currentY = targetY;
        } else {
          // Smooth spring lerp
          currentX += (targetX - currentX) * 0.16;
          currentY += (targetY - currentY) * 0.16;
        }

        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const speed = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        // Organic fluid stretch along movement velocity
        const scaleX = 1 + Math.min(speed / 38, 0.7);
        const scaleY = 1 / (1 + Math.min(speed / 76, 0.38));

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
        }
      }

      // 2. Render Click Shockwaves
      const accent = getAccentHex();
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.radius += (pulse.maxRadius - pulse.radius) * 0.18 + 1.2;
        pulse.alpha *= 0.88;

        if (pulse.alpha < 0.02 || pulse.radius >= pulse.maxRadius) {
          pulses.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = pulse.alpha > 0.4 ? "#ffffff" : accent;
        ctx.lineWidth = 1.6;
        ctx.shadowBlur = 12;
        ctx.shadowColor = accent;
        ctx.globalAlpha = pulse.alpha;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Render Cyber Stardust Sparkles (✦)
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.life -= 1;

        if (sp.life <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.95;
        sp.vy *= 0.95;
        sp.rotation += sp.rotSpeed;

        const progress = sp.life / sp.maxLife; // 1 -> 0
        const currentSize = sp.initialSize * Math.pow(progress, 0.75);
        const alpha = Math.pow(progress, 1.3);

        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.rotate(sp.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = sp.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = sp.color === "#ffffff" ? "#ffffff" : accent;

        // Draw 4-pointed sparkle
        drawStar(ctx, 0, 0, 4, currentSize, currentSize * 0.28);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div
        ref={ringRef}
        className={`${styles.followerRing} ${
          isVisible ? styles.visible : styles.hidden
        } ${isHover ? styles.followerHover : ""} ${
          isClick ? styles.followerClick : ""
        }`}
        aria-hidden="true"
      />
    </>
  );
}
