import { useLocation } from "wouter";
import { runViewTransition } from "../lib/viewTransitions";

function AnimatedLink({ href, transitionType = "nav-forward", onClick, target, children, ...props }) {
  const [, navigate] = useLocation();

  const handleClick = (event) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === "_blank"
    ) {
      return;
    }

    event.preventDefault();
    runViewTransition(() => navigate(href), transitionType);
  };

  return (
    <a href={href} target={target} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export default AnimatedLink;
