import { useState } from "react";
import { motion } from "framer-motion";
import { editingProjects } from "../data/videos";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

export default function VideoEditing() {
  const [active, setActive] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 flex items-baseline justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist-dim">
          Stories shaped in the timeline.
        </p>
        <span className="hidden font-mono text-[11px] text-mist-dim sm:block">
          {editingProjects.length} PROJECTS
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {editingProjects.map((project, i) => (
          <VideoCard
            key={project.id}
            project={project}
            index={i}
            onOpen={setActive}
          />
        ))}
      </div>

      <VideoModal project={active} onClose={() => setActive(null)} />
    </motion.div>
  );
}
