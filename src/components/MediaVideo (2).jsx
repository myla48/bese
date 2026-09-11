import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { VideoOff } from "lucide-react";

/**
 * <video> wrapper that:
 *  - never autoloads/downloads until told to (preload="none" by default)
 *  - shows a cinematic "VIDEO COMING SOON" placeholder if the source 404s
 *  - exposes play/pause via ref for hover-preview interactions
 */
const MediaVideo = forwardRef(function MediaVideo(
  {
    src,
    poster,
    className = "",
    videoClassName = "",
    label = "VIDEO COMING SOON",
    muted = true,
    loop = true,
    playsInline = true,
    preload = "none",
    controls = false,
    ...rest
  },
  outerRef
) {
  const [errored, setErrored] = useState(false);
  const innerRef = useRef(null);

  useImperativeHandle(outerRef, () => innerRef.current);

  // With preload="none" the <video> element never actually requests the
  // file, so the native onError handler never fires for a missing asset.
  // Do a lightweight existence check up front so the "coming soon"
  // placeholder shows immediately instead of a blank box.
  useEffect(() => {
    let cancelled = false;
    setErrored(false);
    fetch(src, { method: "HEAD" })
      .then((res) => {
        // Some dev servers (Vite included) fall back to serving index.html
        // with a 200 for unmatched static paths, so also confirm the
        // content-type actually looks like a video before trusting it.
        const contentType = res.headers.get("content-type") || "";
        const looksLikeVideo = contentType.startsWith("video/");
        if (!cancelled && (!res.ok || !looksLikeVideo)) setErrored(true);
      })
      .catch(() => {
        if (!cancelled) setErrored(true);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (errored) {
    return (
      <div
        className={`relative flex items-center justify-center bg-navy overflow-hidden ${className}`}
        role="img"
        aria-label={label}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)]" />
        <div className="relative flex flex-col items-center gap-3 text-mist-dim">
          <VideoOff size={22} strokeWidth={1.25} />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      <video
        ref={innerRef}
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={preload}
        controls={controls}
        onError={() => setErrored(true)}
        className={`h-full w-full object-cover ${videoClassName}`}
        {...rest}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
});

export default MediaVideo;
