import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Maximize } from "lucide-react";
import SectionHeading from "./SectionHeading";
import MediaVideo from "./MediaVideo";

export default function Showreel() {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play().catch(() => { });
    }
  };

  const goFullscreen = () => {
    const el = wrapperRef.current;
    if (el?.requestFullscreen) el.requestFullscreen();
  };

  return (
    <section id="showreel" className="relative bg-void py-28 sm:py-36 overflow-hidden" >
      <div className="absolute inset-0 z-0 opacity-40">
        <img src="/bg/show-reel.jpg" alt="showreel background" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-void/60 z-0" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 z-10">
        <SectionHeading
          code="SELECTED WORK — 03"
          title="Showreel"
          align="center"
        />

        <motion.div
          ref={wrapperRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="group relative mx-auto mt-16 aspect-video w-full max-w-5xl overflow-hidden bg-navy"
        >
          <MediaVideo
            ref={videoRef}
            src="/video_2026-09-10_08-48-11.mp4"
            poster="/bg/show reel.jpg"
            className="h-full w-full"
            muted={false}
            loop
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            label="SHOWREEL COMING SOON"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />

          <button
            type="button"
            onClick={toggle}
            data-cursor={playing ? "PAUSE" : "PLAY"}
            aria-label={playing ? "Pause showreel" : "Play showreel"}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span
              className={`flex h-20 w-20 items-center justify-center rounded-full border border-ink/60 bg-void/40 backdrop-blur-sm transition-all duration-400 ease-out group-hover:scale-105 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
            >
              {playing ? (
                <Pause size={24} strokeWidth={1.25} className="text-ink" />
              ) : (
                <Play size={24} strokeWidth={1.25} className="ml-1 text-ink" />
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={goFullscreen}
            aria-label="View fullscreen"
            className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center border border-ink/30 bg-void/50 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
          >
            <Maximize size={15} strokeWidth={1.5} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
