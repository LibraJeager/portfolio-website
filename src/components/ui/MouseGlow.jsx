import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const layerRef = useRef(null);
  const hazeRef = useRef(null);
  const smokeTrackRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!pointerQuery.matches || motionQuery.matches) return;

    const layer = layerRef.current;
    const haze = hazeRef.current;
    const smokeTrack = smokeTrackRef.current;
    const core = coreRef.current;
    if (!layer || !haze || !smokeTrack || !core) return;

    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const hazePos = { x: center.x, y: center.y };
    const smokePos = { x: center.x, y: center.y };
    const corePos = { x: center.x, y: center.y };
    const target = { x: center.x, y: center.y };
    const velocity = { x: 0, y: 0 };
    let visible = false;
    let rafId = 0;

    const update = () => {
      // layer 1 — haze drifts very slowly for atmosphere
      hazePos.x += (target.x - hazePos.x) * 0.028;
      hazePos.y += (target.y - hazePos.y) * 0.028;

      // layer 2 — smoke follows at medium pace
      smokePos.x += (target.x - smokePos.x) * 0.052;
      smokePos.y += (target.y - smokePos.y) * 0.052;

      // layer 3 — core follows more closely
      const prevX = corePos.x;
      const prevY = corePos.y;
      corePos.x += (target.x - corePos.x) * 0.13;
      corePos.y += (target.y - corePos.y) * 0.13;

      // velocity tracking for directional stretching
      const rawVx = corePos.x - prevX;
      const rawVy = corePos.y - prevY;
      velocity.x += (rawVx - velocity.x) * 0.18;
      velocity.y += (rawVy - velocity.y) * 0.18;

      const speed = Math.sqrt(
        velocity.x * velocity.x + velocity.y * velocity.y,
      );
      const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
      const stretch = 1 + Math.min(speed * 0.045, 0.6);
      const squash = 1 / Math.sqrt(stretch);

      haze.style.transform = `translate3d(${hazePos.x}px, ${hazePos.y}px, 0) translate(-50%, -50%)`;
      smokeTrack.style.transform = `translate3d(${smokePos.x}px, ${smokePos.y}px, 0) translate(-50%, -50%)`;
      core.style.transform = `translate3d(${corePos.x}px, ${corePos.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scaleX(${stretch}) scaleY(${squash})`;

      rafId = requestAnimationFrame(update);
    };

    const handleMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!visible) {
        visible = true;
        layer.classList.add("is-visible");
      }
    };

    const handleLeave = () => {
      visible = false;
      layer.classList.remove("is-visible");
    };

    const handleBlur = () => {
      visible = false;
      layer.classList.remove("is-visible");
    };

    rafId = requestAnimationFrame(update);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("blur", handleBlur);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={layerRef} className="mouse-glow-layer" aria-hidden="true">
      {/* SVG noise filter — creates organic smoke-like distortion */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="smoke" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="40"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: ambient haze — faint, slowest drift */}
      <div ref={hazeRef} className="mouse-glow-haze" />

      {/* Layer 2: smoke — noise-filtered, breathing animation */}
      <div ref={smokeTrackRef} className="mouse-glow-smoke-track">
        <div className="mouse-glow-smoke mouse-glow-smoke-a" />
        <div className="mouse-glow-smoke mouse-glow-smoke-b" />
      </div>

      {/* Layer 3: core — bright center, velocity-stretched */}
      <div ref={coreRef} className="mouse-glow-core" />
    </div>
  );
}
