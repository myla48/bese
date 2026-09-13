import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";
import { cinematographData } from "../data/mediaData";
import ProjectCard from "./ProjectCard";
import ImageLightbox from "./ImageLightbox";

function FolderCard({ folder, onClick, index }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex aspect-[4/5] sm:aspect-square flex-col items-center justify-center overflow-hidden bg-navy border border-mist-dim/10 text-mist hover:text-ink transition-colors w-full"
    >
      {folder.image ? (
        <>
          <img src={folder.image} alt={folder.name} className="absolute inset-0 h-full w-full sm:object-cover object-contain opacity-60 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors" />
          <span className="relative z-10 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-white drop-shadow-md">{folder.name}</span>
        </>
      ) : (
        <>
          <Folder strokeWidth={1} className="mb-4 h-12 w-12 opacity-50 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-blue-bright" />
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em]">{folder.name}</span>
        </>
      )}
    </motion.button>
  );
}

export default function Cinematography() {
  const [path, setPath] = useState([]);
  const [activeId, setActiveId] = useState(null);

  // Derive current node from path
  const currentNode = useMemo(() => {
    let node = cinematographData;
    for (const step of path) {
      const nextNode = node.children?.find((c) => c.name === step);
      if (nextNode) {
        node = nextNode;
      }
    }
    return node;
  }, [path]);

  // Extract all images in current node for the lightbox
  const currentImages = useMemo(() => {
    if (!currentNode.children) return [];
    return currentNode.children
      .filter((c) => c.type === "media")
      .flatMap((c) => c.items);
  }, [currentNode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mist-dim">
          <button
            onClick={() => setPath([])}
            className={`transition-colors ${path.length === 0 ? "text-ink" : "hover:text-blue-bright"}`}
          >
            Cinematograph
          </button>
          {path.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-mist-dim/50">/</span>
              <button
                onClick={() => setPath(path.slice(0, idx + 1))}
                className={`transition-colors ${
                  idx === path.length - 1 ? "text-ink" : "hover:text-blue-bright"
                }`}
              >
                {step}
              </button>
            </div>
          ))}
        </div>
        
        <span className="hidden font-mono text-[11px] text-mist-dim sm:block">
          {currentImages.length > 0 ? `${currentImages.length} FRAMES` : `${currentNode.children?.length || 0} CATEGORIES`}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {currentNode.children?.map((child, i) => {
          if (child.type === "folder") {
            return (
              <FolderCard
                key={child.name}
                folder={child}
                index={i}
                onClick={() => setPath([...path, child.name])}
              />
            );
          } else if (child.type === "media") {
            return child.items.map((item, j) => (
              <ProjectCard
                key={item.id}
                project={item}
                index={i + j}
                onOpen={(p) => setActiveId(p.id)}
              />
            ));
          }
          return null;
        })}
      </div>

      <ImageLightbox
        items={currentImages}
        activeId={activeId}
        onClose={() => setActiveId(null)}
        onNavigate={setActiveId}
      />
    </motion.div>
  );
}
