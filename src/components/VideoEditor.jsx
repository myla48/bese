import { useState } from "react";
import { motion } from "framer-motion";
import { videoProjects } from "../data/mediaData";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

export default function VideoEditor() {
  const [active, setActive] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-12">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist-dim">
            Stories shaped in the timeline.
          </p>
          <span className="hidden font-mono text-[11px] text-mist-dim sm:block">
            {videoProjects.length} PROJECTS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-6 sm:gap-8">
        {videoProjects.map((project, i) => (
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
