import { useState } from "react";
import { motion } from "framer-motion";
import { cinematographyProjects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ImageLightbox from "./ImageLightbox";

export default function Cinematography() {
  const [activeId, setActiveId] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 flex items-baseline justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist-dim">
          Frames captured with intention.
        </p>
        <span className="hidden font-mono text-[11px] text-mist-dim sm:block">
          {cinematographyProjects.length} FRAMES
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        {cinematographyProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onOpen={(p) => setActiveId(p.id)}
          />
        ))}
      </div>

      <ImageLightbox
        items={cinematographyProjects}
        activeId={activeId}
        onClose={() => setActiveId(null)}
        onNavigate={setActiveId}
      />
    </motion.div>
  );
}
