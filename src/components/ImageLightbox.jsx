import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import MediaImage from "./MediaImage";

export default function ImageLightbox({ items, activeId, onClose, onNavigate }) {
  const activeIndex = items.findIndex((i) => i.id === activeId);
  const active = activeIndex >= 0 ? items[activeIndex] : null;

  const goTo = useCallback(
    (dir) => {
      if (activeIndex < 0) return;
      const next = (activeIndex + dir + items.length) % items.length;
      onNavigate(items[next].id);
    },
    [activeIndex, items, onNavigate]
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, onClose, goTo]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-void/95 px-4 backdrop-blur-sm sm:px-16"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} — full view`}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-mist-dim/40 text-ink transition-colors hover:border-blue-bright hover:text-blue-bright"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(-1);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center border border-mist-dim/40 p-2 text-ink transition-colors hover:border-blue-bright hover:text-blue-bright sm:flex"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(1);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center border border-mist-dim/40 p-2 text-ink transition-colors hover:border-blue-bright hover:text-blue-bright sm:flex"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl"
          >
            <MediaImage
              src={active.image}
              alt={active.title}
              className="aspect-video w-full"
              imgClassName="object-contain"
              label="IMAGE COMING SOON"
            />
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              <span>
                {active.title}{" "}
                <span className="text-mist-dim">&middot; {active.code}</span>
              </span>
              <span className="text-blue-bright">{active.aperture}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
