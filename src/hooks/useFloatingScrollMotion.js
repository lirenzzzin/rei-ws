import { useEffect } from "react";

export default function useFloatingScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    let previousY = window.scrollY;
    let frame = null;
    const setVisibility = (visible) => {
      root.dataset.floatingActionsVisible = visible ? "true" : "false";
    };

    const updatePosition = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;

      if (Math.abs(delta) >= 3) {
        setVisibility(delta < 0 && currentY > 96);
      }

      previousY = currentY;
      frame = null;
    };

    const handleScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(updatePosition);
    };

    const revealAfterCartUpdate = () => setVisibility(window.scrollY > 96);

    setVisibility(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("catalog:cart-updated", revealAfterCartUpdate);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("catalog:cart-updated", revealAfterCartUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
      delete root.dataset.floatingActionsVisible;
    };
  }, []);
}
