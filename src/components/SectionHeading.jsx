import { motion } from "framer-motion";

/**
 * Editorial section heading.
 * `code` renders as a timecode/slate-style eyebrow (e.g. "02 — WORK")
 * rather than a generic numbered badge, echoing an editing timeline slate.
 */
export default function SectionHeading({
  code,
  title,
  subtitle,
  align = "left",
  light = false,
}) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} max-w-3xl`}>
      {code && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-blue-bright mb-5"
        >
          {code}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
        className={`font-display font-medium text-balance leading-[1.05] text-4xl sm:text-5xl md:text-6xl ${
          light ? "text-ink" : "text-ink"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="mt-5 text-mist text-base sm:text-lg font-light max-w-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
