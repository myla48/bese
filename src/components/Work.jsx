import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import VideoEditor from "./VideoEditor";
import Cinematograph from "./Cinematograph";

const TABS = [
  { id: "editing", label: "Video Editor" },
  { id: "cinematography", label: "Cinematograph" },
];

export default function Work() {
  const [tab, setTab] = useState("editing");

  const backgrounds = {
    editing: "/bg/Videography Service in Mannarkkad-photography Service.jpg",
    cinematography: "/bg/camera.jpg"
  };

  return (
    <section id="work" className="relative bg-deep py-28 sm:py-36 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img src={backgrounds[tab]} alt="background" className="h-full w-full sm:object-cover object-contain" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-deep/60 z-0" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 z-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            code="SELECTED PROJECTS — 04"
            title={tab === "editing" ? "Video Editor" : "Cinematograph"}
          />

          <div
            role="tablist"
            aria-label="Portfolio category"
            className="relative flex w-full sm:w-fit overflow-x-auto whitespace-nowrap border border-mist-dim/25 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className="relative px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300"
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="work-tab-bg"
                    className="absolute inset-0 bg-blue-bright"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    tab === t.id ? "text-void" : "text-mist hover:text-ink"
                  }`}
                >
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <AnimatePresence mode="wait">
            {tab === "editing" ? (
              <VideoEditor key="editing" />
            ) : (
              <Cinematograph key="cinematography" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
