import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "home", label: "OPEN" },
  { id: "about", label: "ABOUT" },
  { id: "services", label: "ROLE" },
  { id: "showreel", label: "REEL" },
  { id: "work", label: "WORK" },
  { id: "contact", label: "CONTACT" },
];

function formatTimecode(progress) {
  // Treat the whole page as a 6-minute "cut" for display purposes.
  const totalSeconds = progress * 360;
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  const frames = Math.floor((totalSeconds % 1) * 24)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}:${frames}`;
}

/**
 * Signature element. A vertical "edit timeline" rail, fixed to the left
 * edge on desktop, that reads the page as a running timecode instead of a
 * generic scroll-progress bar -- reinforcing the video-editor identity.
 */
export default function TimecodeRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        rafRef.current = null;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <span className="rotate-180 font-mono text-[10px] tracking-[0.3em] text-mist-dim [writing-mode:vertical-lr]">
          {formatTimecode(progress)}
        </span>

        <div className="relative h-56 w-px bg-mist-dim/25">
          <div
            className="absolute left-0 top-0 w-px bg-blue-bright transition-[height] duration-150 ease-out"
            style={{ height: `${progress * 100}%` }}
          />
          {SECTIONS.map((s, i) => (
            <div
              key={s.id}
              className={`absolute -left-[3px] h-[7px] w-[7px] rounded-full border transition-colors duration-300 ${
                active === s.id
                  ? "border-blue-bright bg-blue-bright"
                  : "border-mist-dim/50 bg-void"
              }`}
              style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        <span className="rotate-180 font-mono text-[9px] tracking-[0.3em] text-blue-bright/80 [writing-mode:vertical-lr]">
          {SECTIONS.find((s) => s.id === active)?.label ?? ""}
        </span>
      </div>
    </div>
  );
}
