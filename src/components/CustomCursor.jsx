import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only custom cursor: a small dot that expands into an aperture
 * ring with a contextual label ("VIEW" / "PLAY") over interactive media.
 * Disabled entirely on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let hasTouch = window.matchMedia("(pointer: coarse)").matches;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      hasTouch = true;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hasTouch || reduced) return;
    setEnabled(true);

    let x = 0,
      y = 0,
      rx = 0,
      ry = 0;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    let raf;
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const over = (e) => {
      const target = e.target.closest("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : "");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.classList.add("no-cursor");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("no-cursor");
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-bright"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 ease-out ${
          label
            ? "h-16 w-16 border-blue-bright bg-blue-bright/10 backdrop-blur-[1px]"
            : "h-8 w-8 border-mist-dim/60"
        }`}
        aria-hidden="true"
      >
        {label && (
          <span className="font-mono text-[9px] tracking-[0.2em] text-ink">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
