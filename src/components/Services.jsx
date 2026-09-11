import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const disciplines = [
  {
    code: "01",
    title: "Cinematography",
    description:
      "Capturing the frame with intention — from first location scout to final take.",
    items: [
      "Visual storytelling",
      "Camera operation",
      "Composition & lighting",
      "Shot planning",
      "Production awareness",
    ],
  },
  {
    code: "02",
    title: "Video Editing",
    description:
      "Shaping raw footage into a story with rhythm, sound, and structure.",
    items: [
      "Narrative editing",
      "Color",
      "Pacing",
      "Sound design",
      "Transitions & structure",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-deep py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          code="WHAT I DO — 02"
          title="Behind the camera. Inside the timeline."
          subtitle="Two disciplines, one continuous craft."
        />

        <div className="mt-16 grid grid-cols-1 divide-y divide-mist-dim/15 border-t border-mist-dim/15 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {disciplines.map((d, i) => (
            <motion.div
              key={d.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative px-1 py-12 lg:px-10 lg:py-14"
            >
              <span className="font-display text-6xl text-mist-dim/25 transition-colors duration-500 group-hover:text-blue-bright/25 sm:text-7xl">
                {d.code}
              </span>
              <h3 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
                {d.title}
              </h3>
              <p className="mt-4 max-w-sm text-mist font-light">
                {d.description}
              </p>

              <ul className="mt-8 space-y-3">
                {d.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.12em] text-mist"
                  >
                    <span className="h-px w-6 bg-blue-bright/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
