import { useEffect, useRef } from "react";

function ProductFilm({ src, poster, label, className = "", viewTransitionName }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.currentTime = 0;
    const playback = video.play();
    playback?.catch(() => undefined);

    const replayWhenVisible = () => {
      if (document.visibilityState !== "visible") return;
      video.currentTime = 0;
      video.play()?.catch(() => undefined);
    };

    document.addEventListener("visibilitychange", replayWhenVisible);
    return () => document.removeEventListener("visibilitychange", replayWhenVisible);
  }, [src]);

  return (
    <div
      className={`product-film ${className}`}
      style={viewTransitionName ? { viewTransitionName } : undefined}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        autoPlay
        playsInline
        preload="metadata"
        aria-label={label}
      />
    </div>
  );
}

export default ProductFilm;
