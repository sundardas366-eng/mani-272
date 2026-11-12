"use client";

import React, { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  width: number;
}

export function ScreenTapEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    const sparks: Spark[] = [];
    const shockwaves: Shockwave[] = [];
    const SPARK_COLORS = ["#ef4444", "#ffffff", "#f87171", "#fca5a5", "#dc2626"];

    // 1. GLOBAL TAP / CLICK ANIMATION SPAWNER
    const triggerTapAnimation = (x: number, y: number) => {
      // Primary crimson shockwave
      shockwaves.push({
        x,
        y,
        radius: 4,
        maxRadius: 54,
        alpha: 0.85,
        color: "#ef4444",
        width: 2.2,
      });

      // Secondary bright white inner wave
      shockwaves.push({
        x,
        y,
        radius: 2,
        maxRadius: 30,
        alpha: 0.95,
        color: "#ffffff",
        width: 1.5,
      });

      // Neon spark particle burst (10 to 14 sparks in 360 degrees)
      const count = 12;
      for (let i = 0; i < count; i++) {
        const baseAngle = (i / count) * Math.PI * 2;
        const angle = baseAngle + (Math.random() - 0.5) * 0.45;
        const speed = 3.2 + Math.random() * 4.2;
        const life = 18 + Math.floor(Math.random() * 10);

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.8 + Math.random() * 2.2,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
          alpha: 1,
          life,
          maxLife: life,
        });
      }
    };

    // 2. 3D CORNER-PRESS DOWN PHYSICS ("कोने में टैप करने पर दब जाने वाला एनिमेशन")
    let activePressedTarget: HTMLElement | null = null;

    const handlePointerDown = (e: PointerEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Trigger spark & shockwave at exact tap coordinate
      triggerTapAnimation(clientX, clientY);

      // Search for interactive surface (cards, buttons, containers)
      const interactiveSelector = `
        .productCard,
        .codeWindow,
        .resellerBanner,
        .stripCard,
        .productTotalCta,
        .productTotalBtn,
        .categoryTab,
        .tabBtn,
        .orderBtn,
        .inquireBtn,
        .toggleBtn,
        [data-corner-press],
        [role="dialog"] > div,
        button:not([disabled])
      `;

      const target = (e.target as HTMLElement).closest<HTMLElement>(interactiveSelector);
      if (!target) return;

      activePressedTarget = target;
      const rect = target.getBoundingClientRect();

      // Normalize tap coordinates from -1 (top/left) to +1 (bottom/right)
      const normX = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width - 0.5) * 2));
      const normY = Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height - 0.5) * 2));

      // Calculate 3D tilt angles based on tapped corner:
      // If user taps top corner (normY < 0), rotateX tilts top away into screen (+rotX)
      // If user taps left corner (normX < 0), rotateY tilts left away into screen (-rotY)
      const isLargeCard = rect.width > 220;
      const maxTilt = isLargeCard ? 7.5 : 4.5;
      const rotX = -normY * maxTilt;
      const rotY = normX * maxTilt;

      // Apply snappy 3D corner press down
      target.style.transition = "transform 0.12s cubic-bezier(0.2, 0.85, 0.35, 1)";
      target.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(0.975, 0.975, 0.975)`;

      const releasePress = () => {
        if (target) {
          // Elastic spring bounce rebound on release
          target.style.transition = "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)";
          target.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        }
        window.removeEventListener("pointerup", releasePress);
        window.removeEventListener("pointercancel", releasePress);
        activePressedTarget = null;
      };

      window.addEventListener("pointerup", releasePress);
      window.addEventListener("pointercancel", releasePress);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // 3. 60FPS RAF ANIMATION RENDER LOOP
    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      // Render expanding shockwave ripples
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.18 + 0.9;
        sw.alpha *= 0.88;

        if (sw.alpha < 0.02 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = sw.width;
        ctx.globalAlpha = sw.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = sw.color;
        ctx.stroke();
      }

      // Render flying neon spark particles
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.92;
        sp.vy *= 0.92;
        sp.life--;
        sp.alpha = sp.life / sp.maxLife;

        if (sp.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * sp.alpha, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = sp.color;
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", handlePointerDown);
      cancelAnimationFrame(animId);
      if (activePressedTarget) {
        activePressedTarget.style.transform = "";
        activePressedTarget.style.transition = "";
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
      }}
      aria-hidden="true"
    />
  );
}

