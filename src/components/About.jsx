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

const skillsData = [
  { name: "Premiere Pro", category: "Video Editing", percentage: 99, short: "Pr" },
  { name: "After Effects", category: "Video Editing", percentage: 96, short: "Ae" },
  { name: "Photoshop", category: "Video Editing", percentage: 90, short: "Ps" },
  { name: "Lightroom", category: "Video Editing", percentage: 90, short: "Lr" },
  { name: "Sony", category: "Cinematography", percentage: 99, short: "SONY" },
  { name: "Canon", category: "Cinematography", percentage: 99, short: "Canon" },
];

const DotMeter = ({ percentage, delayOffset = 0 }) => {
  const totalDots = 10;
  const filledCount = Math.round(percentage / 10);

  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: totalDots }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.4, delay: delayOffset + i * 0.04 }}
          className={`w-1.5 h-1.5 rounded-full ${
            i < filledCount ? "bg-ink" : "bg-mist-dim/20"
          }`}
        />
      ))}
    </div>
  );
};

const renderIcon = (short) => {
  if (short.length <= 2) {
    return (
      <div className="w-10 h-10 flex-shrink-0 rounded-lg border border-mist-dim/20 flex items-center justify-center font-sans font-bold text-sm tracking-tighter text-ink bg-mist-dim/5 group-hover:border-mist-dim/50 transition-colors duration-300">
        {short}
      </div>
    );
  }
  
  if (short === "SONY") {
    return (
      <div className="w-10 h-10 flex-shrink-0 rounded-lg border border-mist-dim/10 flex items-center justify-center bg-mist-dim/5 group-hover:border-mist-dim/40 transition-colors duration-300">
        <span className="font-serif font-bold text-[9px] tracking-widest text-ink">{short}</span>
      </div>
    );
  }
  
  return (
    <div className="w-10 h-10 flex-shrink-0 rounded-lg border border-mist-dim/10 flex items-center justify-center bg-mist-dim/5 group-hover:border-mist-dim/40 transition-colors duration-300">
      <span className="font-sans font-black text-[10px] tracking-tight text-ink">{short}</span>
    </div>
  );
};

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
                src="/images/cinematography/bese.png"
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
                I'm Besufikad Zerihun — I bring stories to life through a lens
                and a timeline. As a hybrid cinematographer and video editor, I
                bridge the gap between production and post-production.
              </p>
              <p>
                Understanding both sides of the camera means I shoot with the
                final edit already in mind, and edit with a director's sense of
                what the frame was reaching for. Two years of fieldwork, across
                narrative, brand, and documentary work, have shaped a process
                that treats every project as one continuous story rather than
                two separate jobs.
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

            {/* Skills / Proficiency Section */}
            <div className="mt-24 pt-16 border-t border-mist-dim/10">
              <SectionHeading
                code="PROFICIENCY — 02"
                title="Tools & Mastery."
              />
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
                {Object.entries(
                  skillsData.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                  }, {})
                ).map(([category, categorySkills], categoryIndex) => (
                  <div key={category}>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist-dim mb-8">
                      {category}
                    </h3>
                    <div className="space-y-5">
                      {categorySkills.map((skill, index) => (
                        <div key={skill.name} className="flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            {renderIcon(skill.short)}
                            <span className="text-sm text-mist group-hover:text-ink transition-colors duration-300 font-medium">
                              {skill.name}
                            </span>
                          </div>
                          <DotMeter percentage={skill.percentage} delayOffset={index * 0.1} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
