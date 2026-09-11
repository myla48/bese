import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import MediaVideo from "./MediaVideo";

export default function VideoModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-void/95 px-4 backdrop-blur-sm sm:px-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} playback`}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-mist-dim/40 text-ink transition-colors hover:border-blue-bright hover:text-blue-bright"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <motion.div
            initial={{ scale: 0.96, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl"
          >
            <MediaVideo
              src={project.video}
              poster={project.poster}
              className="aspect-video w-full"
              muted={false}
              autoPlay
              preload="auto"
              controls
              label="VIDEO COMING SOON"
            />
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              <span>
                {project.title} &middot;{" "}
                <span className="text-blue-bright">{project.category}</span>
              </span>
              <span className="text-mist-dim">{project.timecode}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
