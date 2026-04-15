import { useEffect, useRef } from "react";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function MouseGlow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!pointerQuery.matches || motionQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let frame = 0;

    const particles = [];

    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      px: window.innerWidth * 0.5,
      py: window.innerHeight * 0.5,
      active: false,
    };

    const themeVars = {
      smoke: "241, 236, 227",
      smokeSoft: "196, 189, 176",
      smokeEdge: "132, 126, 120",
      opacity: 0.58,
    };

    const syncThemeVars = () => {
      const styles = getComputedStyle(document.documentElement);

      themeVars.smoke =
        styles.getPropertyValue("--smoke-particle").trim() || "241, 236, 227";
      themeVars.smokeSoft =
        styles.getPropertyValue("--smoke-particle-soft").trim() || "196, 189, 176";
      themeVars.smokeEdge =
        styles.getPropertyValue("--smoke-particle-edge").trim() || "132, 126, 120";
      themeVars.opacity =
        parseFloat(styles.getPropertyValue("--smoke-canvas-opacity")) || 0.58;
    };

    const themeObserver = new MutationObserver(syncThemeVars);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnParticle = (x, y, dx, dy, speed, layer = "body") => {
      const directionX = dx * 0.016;
      const directionY = dy * 0.016;

      const isMist = layer === "mist";

      particles.push({
        x,
        y,
        vx: directionX + (Math.random() - 0.5) * (isMist ? 0.34 : 0.52),
        vy: directionY + (Math.random() - 0.5) * (isMist ? 0.26 : 0.4) - (isMist ? 0.02 : 0.05),
        radius:
          (isMist ? 14 : 18) +
          Math.random() * (isMist ? 10 : 14) +
          Math.min(speed * (isMist ? 0.05 : 0.08), isMist ? 8 : 12),
        alpha:
          (isMist ? 0.032 : 0.05) +
          Math.random() * (isMist ? 0.02 : 0.03),
        life: 0,
        maxLife: (isMist ? 34 : 42) + Math.random() * (isMist ? 18 : 24),
        drag: isMist ? 0.987 : 0.982,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * (isMist ? 0.01 : 0.016),
        stretchX: 1 + Math.random() * (isMist ? 0.32 : 0.48),
        stretchY: 0.72 + Math.random() * 0.24,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.025,
        drift: 0.12 + Math.random() * 0.18,
        layer,
      });
    };

    const emitAlongPath = (x1, y1, x2, y2, speed) => {
      const dist = Math.hypot(x2 - x1, y2 - y1);
      const steps = clamp(Math.ceil(dist / 10), 1, 18);

      for (let i = 0; i < steps; i += 1) {
        const t = steps === 1 ? 1 : i / (steps - 1);
        const x = lerp(x1, x2, t);
        const y = lerp(y1, y2, t);

        const bodyCount = clamp(Math.floor(speed / 18) + 2, 2, 5);
        const mistCount = clamp(Math.floor(speed / 26) + 1, 1, 3);

        for (let j = 0; j < bodyCount; j += 1) {
          const offset = 10 + Math.random() * 14;
          spawnParticle(
            x + (Math.random() - 0.5) * offset,
            y + (Math.random() - 0.5) * offset,
            x2 - x1,
            y2 - y1,
            speed,
            "body",
          );
        }

        for (let j = 0; j < mistCount; j += 1) {
          const offset = 16 + Math.random() * 18;
          spawnParticle(
            x + (Math.random() - 0.5) * offset,
            y + (Math.random() - 0.5) * offset,
            x2 - x1,
            y2 - y1,
            speed,
            "mist",
          );
        }
      }
    };

    const drawParticle = (p) => {
      const t = p.life / p.maxLife;
      const fade = Math.pow(1 - t, p.layer === "mist" ? 1.7 : 1.45);
      const alpha = p.alpha * fade;
      const radius = p.radius * (1 + t * (p.layer === "mist" ? 1.6 : 1.35));

      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        radius * 0.06,
        p.x,
        p.y,
        radius,
      );

      gradient.addColorStop(0, `rgba(${themeVars.smoke}, ${alpha * 0.78})`);
      gradient.addColorStop(0.24, `rgba(${themeVars.smoke}, ${alpha * 0.48})`);
      gradient.addColorStop(0.58, `rgba(${themeVars.smokeSoft}, ${alpha * 0.18})`);
      gradient.addColorStop(0.82, `rgba(${themeVars.smokeEdge}, ${alpha * 0.08})`);
      gradient.addColorStop(1, `rgba(${themeVars.smokeEdge}, 0)`);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(p.stretchX, p.stretchY);
      ctx.translate(-p.x, -p.y);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      frame += 1;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = themeVars.opacity;

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];

        p.life += 1;
        p.rotation += p.rotSpeed;
        p.wobble += p.wobbleSpeed;

        p.x += p.vx + Math.cos(p.wobble) * p.drift;
        p.y += p.vy + Math.sin(p.wobble * 0.8) * (p.drift * 0.7);

        p.vx *= p.drag;
        p.vy = p.vy * p.drag - 0.0025;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        drawParticle(p);
      }

      rafId = requestAnimationFrame(render);
    };

    const showCanvas = () => {
      canvas.classList.add("is-visible");
    };

    const hideCanvas = () => {
      pointer.active = false;
      canvas.classList.remove("is-visible");
    };

    const handleMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const speed = Math.hypot(dx, dy);

      if (speed > 0.2) {
        emitAlongPath(pointer.x, pointer.y, x, y, speed);
      }

      pointer.px = pointer.x;
      pointer.py = pointer.y;
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;

      showCanvas();
    };

    const handleLeave = () => hideCanvas();
    const handleBlur = () => hideCanvas();

    syncThemeVars();
    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("blur", handleBlur);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("mouseleave", handleLeave);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="mouse-smoke-canvas" aria-hidden="true" />;
}