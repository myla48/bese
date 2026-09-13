import { useState } from "react";
import { ImageOff } from "lucide-react";

/**
 * <img> wrapper that shows a cinematic "IMAGE COMING SOON" placeholder
 * instead of a broken-image icon when the source is missing.
 */
export default function MediaImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  loading = "lazy",
  label = "IMAGE COMING SOON",
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`relative flex items-center justify-center bg-navy overflow-hidden ${className}`}
        role="img"
        aria-label={alt || label}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_70%)]" />
        <div className="relative flex flex-col items-center gap-3 text-mist-dim">
          <ImageOff size={22} strokeWidth={1.25} />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={() => setErrored(true)}
        className={`h-full w-full sm:object-cover object-contain ${imgClassName}`}
      />
    </div>
  );
}
