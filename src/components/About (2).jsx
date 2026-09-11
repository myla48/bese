import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import MediaImage from "./MediaImage";

const process = [
  { label: "Concept" },
  { label: "Camera" },
  { label: "Production" },
  { label: "Edit" },
  { label: "Final Story" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-void py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full max-w-sm"
            >
              <MediaImage
                src="/images/besufikad-profile.jpg"
                alt="Besufikad Zerihun on set"
                className="h-full w-full grayscale-[15%]"
                label="PORTRAIT COMING SOON"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              <div className="absolute -bottom-4 -right-4 h-full w-full border border-mist-dim/30 -z-10 hidden sm:block" />
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <SectionHeading
              code="ABOUT — 01"
              title="Two crafts. One eye for the story."
            />

            <div className="mt-8 space-y-5 max-w-2xl text-mist font-light leading-relaxed sm:text-lg">
              <p>
                I'm Besufikad Zerihun — I bring stories to life through a
                lens and a timeline. As a hybrid cinematographer and video
                editor, I bridge the gap between production and
                post-production.
              </p>
              <p>
                Understanding both sides of the camera means I shoot with
                the final edit already in mind, and edit with a director's
                sense of what the frame was reaching for. Two years of
                fieldwork, across narrative, brand, and documentary work,
                have shaped a process that treats every project as one
                continuous story rather than two separate jobs.
              </p>
            </div>

            <div className="mt-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist-dim">
                The process
              </span>
              <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-4">
                {process.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-center gap-2"
                  >
                    <span className="font-display text-lg text-ink sm:text-xl">
                      {step.label}
                    </span>
                    {i < process.length - 1 && (
                      <span className="text-mist-dim">&rarr;</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
