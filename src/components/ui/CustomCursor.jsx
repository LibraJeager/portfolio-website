import { useEffect, useRef, useState } from "react";

function resolveVariant(target) {
  const explicit = target
    ?.closest?.("[data-cursor]")
    ?.getAttribute("data-cursor");

  if (explicit === "link") return "link";
  if (explicit) return "soft";

  if (target?.closest?.("a, button, [role='button']")) return "link";

  return "default";
}

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState("default");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncEnabled = () => {
      const nextEnabled = pointerQuery.matches && !motionQuery.matches;
      setEnabled(nextEnabled);
      document.documentElement.classList.toggle("has-custom-cursor", nextEnabled);
    };

    syncEnabled();

    const addMediaListener = (query, handler) => {
      if (query.addEventListener) {
        query.addEventListener("change", handler);
        return () => query.removeEventListener("change", handler);
      }

      query.addListener(handler);
      return () => query.removeListener(handler);
    };

    const removePointerListener = addMediaListener(pointerQuery, syncEnabled);
    const removeMotionListener = addMediaListener(motionQuery, syncEnabled);

    return () => {
      removePointerListener();
      removeMotionListener();
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const ringCurrent = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotCurrent = { x: ringCurrent.x, y: ringCurrent.y };
    const target = { x: ringCurrent.x, y: ringCurrent.y };
    let rafId = 0;

    const update = () => {
      ringCurrent.x += (target.x - ringCurrent.x) * 0.14;
      ringCurrent.y += (target.y - ringCurrent.y) * 0.14;

      dotCurrent.x += (target.x - dotCurrent.x) * 0.24;
      dotCurrent.y += (target.y - dotCurrent.y) * 0.24;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCurrent.x}px, ${ringCurrent.y}px, 0) translate(-50%, -50%)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCurrent.x}px, ${dotCurrent.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setVisible(true);
    };

    const handleMouseOver = (event) => {
      setVariant(resolveVariant(event.target));
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setVariant("default");
    };

    const handlePointerEnter = () => {
      setVisible(true);
    };

    const handleWindowBlur = () => {
      setVisible(false);
      setVariant("default");
    };

    rafId = window.requestAnimationFrame(update);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={`custom-cursor-layer ${visible ? "is-visible" : ""}`}
      data-variant={variant}
      aria-hidden="true"
    >
      <span ref={ringRef} className="custom-cursor-ring" />
      <span ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}