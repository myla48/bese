import { motion } from "framer-motion";
import { Send, SquarePlay, Mail } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { socialLinks } from "../data/navigation";

const icons = {
  telegram: Send,
  youtube: SquarePlay,
  email: Mail,
};

export default function Contact() {
  return (
    <section id="contact" className="relative bg-void py-28 sm:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-10">
        <SectionHeading
          code="GET IN TOUCH — 05"
          title="Let's create something worth watching."
          subtitle="Open to directors, brands, creators, and collaborators with a story that needs a frame — and a cut."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10"
        >
          <Button href={socialLinks.email.href} variant="solid" className="mx-auto">
            Start a Project
          </Button>
        </motion.div>

        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {Object.entries(socialLinks).map(([key, link], i) => {
            const Icon = icons[key];
            return (
              <motion.a
                key={key}
                href={link.href}
                target={key !== "email" ? "_blank" : undefined}
                rel={key !== "email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="group flex flex-col items-center gap-3 border border-mist-dim/20 px-6 py-8 transition-colors duration-400 hover:border-blue-bright/60"
              >
                <Icon
                  size={20}
                  strokeWidth={1.25}
                  className="text-mist transition-colors duration-300 group-hover:text-blue-bright"
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
                  {link.label}
                </span>
                <span className="break-all text-xs text-mist-dim">
                  {link.handle}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
