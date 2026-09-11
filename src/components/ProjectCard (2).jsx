import { motion } from "framer-motion";
import MediaImage from "./MediaImage";

const sizeClasses = {
  large: "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto",
  medium: "aspect-[4/5] sm:aspect-auto sm:row-span-2",
  small: "aspect-[4/5]",
};

export default function ProjectCard({ project, onOpen, index = 0 }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative block w-full cursor-pointer overflow-hidden bg-navy text-left ${sizeClasses[project.size] ?? "aspect-[4/5]"}`}
    >
      <MediaImage
        src={project.image}
        alt={project.title}
        className="h-full w-full"
        imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
        label="IMAGE COMING SOON"
      />
    </motion.button>
  );
}
