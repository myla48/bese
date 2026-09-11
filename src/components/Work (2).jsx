import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import VideoEditing from "./VideoEditing";
import Cinematography from "./Cinematography";

const TABS = [
  { id: "editing", label: "Video Editing" },
  { id: "cinematography", label: "Cinematography" },
];

export default function Work() {
  const [tab, setTab] = useState("editing");

  return (
    <section id="work" className="relative bg-deep py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            code="SELECTED PROJECTS — 04"
            title={tab === "editing" ? "Video Editing" : "Cinematography"}
          />

          <div
            role="tablist"
            aria-label="Portfolio category"
            className="relative flex w-fit border border-mist-dim/25"
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
              <VideoEditing key="editing" />
            ) : (
              <Cinematography key="cinematography" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
