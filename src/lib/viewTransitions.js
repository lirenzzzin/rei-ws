import { flushSync } from "react-dom";

const canAnimate = () =>
  typeof document !== "undefined" &&
  typeof document.startViewTransition === "function" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function runViewTransition(update, type = "ui-pop") {
  if (!canAnimate()) {
    update();
    return null;
  }

  document.documentElement.dataset.viewTransition = type;

  const commit = () => flushSync(update);
  let transition;

  try {
    transition = document.startViewTransition({ update: commit, types: [type] });
  } catch {
    transition = document.startViewTransition(commit);
  }

  transition.finished.finally(() => {
    delete document.documentElement.dataset.viewTransition;
  });

  return transition;
}

export function transitionForNavigation(fromIndex, toIndex) {
  if (fromIndex < 0 || toIndex < 0) return "nav-forward";
  return toIndex >= fromIndex ? "tab-forward" : "tab-back";
}
