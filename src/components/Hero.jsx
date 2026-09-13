import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Button from "./Button";

// Three.js/R3F is a heavy dependency (~500kb+) -- load it only after the
// hero mounts, off the critical path for first paint / LCP.
const CinematicScene = lazy(() => import("./three/CinematicScene"));

const wordVariants = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: 0,
    transition: { duration: 0.9, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

function RevealLine({ text, delay = 0 }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-void"
    >
      {/* Portrait, integrated as a full-bleed cinematic backdrop rather than a framed photo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          src="/videos/bese.mp4"
          className="h-full w-full sm:object-cover object-contain sm:object-top opacity-70"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.14),transparent_60%)]" />
      </div>

      <Suspense fallback={null}>
        <CinematicScene />
      </Suspense>

      {/* Letterbox bars for a film-frame feel */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[6vh] bg-void sm:h-[4vh]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6vh] bg-void sm:h-[4vh]" />

      <div className="relative z-10 w-full px-4 sm:px-10 pb-[10vh] pt-32 sm:pb-[8vh]">
        <div className="mx-auto max-w-7xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-bright"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-bright animate-pulse-slow" />
            Reel 01 &middot; Addis Ababa
          </motion.span>

          <h1 className="font-display font-medium leading-[0.95] text-[clamp(2.75rem,9vw,7rem)] text-ink">
            <RevealLine text="Besufikad" delay={0.15} />
            <RevealLine text="Zerihun" delay={0.25} />
          </h1>

          <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="max-w-md font-sans text-lg font-light text-mist sm:text-xl"
            >
              Cinematographer &amp; Video Editor —{" "}
              <span className="text-ink">2+ years</span> bridging production
              and post-production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                href="#work"
                onClick={scrollTo("work")}
                variant="solid"
                data-cursor="VIEW"
              >
                View My Work
              </Button>
              <Button
                href="#contact"
                onClick={scrollTo("contact")}
                variant="outline"
              >
                Let&rsquo;s Work Together
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        onClick={scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-[7vh] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist sm:flex"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <ChevronDown size={16} strokeWidth={1.25} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
