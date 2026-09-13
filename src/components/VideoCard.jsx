import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import MediaVideo from "./MediaVideo";

/**
 * Editing project card. Desktop: hover previews the clip. Touch devices:
 * tap opens the fullscreen modal instead of relying on hover.
 */
export default function VideoCard({ project, onOpen, index = 0 }) {
  const videoRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const startPreview = () => {
    setHovering(true);
    videoRef.current?.play().catch(() => {});
  };

  const stopPreview = () => {
    setHovering(false);
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      data-cursor="PLAY"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block w-full overflow-hidden bg-navy text-left"
    >
      <div className="relative aspect-video w-full">
        <MediaVideo
          ref={videoRef}
          src={project.video}
          poster={project.poster}
          className="h-full w-full"
          videoClassName={`transition-transform duration-700 ease-out ${
            hovering ? "scale-105" : "scale-100"
          }`}
          preload="metadata"
          label="VIDEO COMING SOON"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent transition-opacity duration-500 group-hover:opacity-60" />

        <span className="pointer-events-none absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-ink/30 bg-void/40 opacity-100 md:opacity-0 backdrop-blur-sm transition-opacity duration-300 md:group-hover:opacity-100">
          <Play size={13} strokeWidth={1.5} className="ml-0.5 text-ink" />
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-bright">
              {project.category}
            </span>
            <h3 className="mt-1 font-display text-xl text-ink sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <span className="hidden font-mono text-[10px] text-mist-dim sm:block">
            {project.timecode}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
