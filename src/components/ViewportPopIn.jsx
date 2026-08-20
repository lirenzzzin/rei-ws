import { useEffect } from "react";

function ViewportPopIn() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observed = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.popInState = "visible";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    const register = (root = document) => {
      const nodes = root.matches?.("[data-pop-in]")
        ? [root]
        : root.querySelectorAll?.("[data-pop-in]") ?? [];

      nodes.forEach((node) => {
        if (observed.has(node)) return;
        observed.add(node);
        node.dataset.popInState = reducedMotion ? "visible" : "pending";
        if (!reducedMotion) observer.observe(node);
      });
    };

    register();
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) register(node);
        });
      });
    });

    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}

export default ViewportPopIn;
