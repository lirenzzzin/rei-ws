import { LayoutGroup, motion } from "framer-motion";
import AnimatedLink from "../AnimatedLink";
import { cn } from "../../lib/utils";

function FluidExpandingGrid({ items, className = "", id = "featured-iphones" }) {
  return (
    <LayoutGroup id={id}>
      <div className={cn("fluid-expanding-grid", className)}>
        {items.map((item) => (
          <motion.article
            layout
            layoutId={`${id}-${item.id}`}
            key={item.id}
            data-theme={item.theme}
            className="fluid-grid-item"
          >
            <AnimatedLink
              href={item.route}
              transitionType="nav-forward"
              className="fluid-grid-link"
              aria-label={`Conhecer ${item.name}`}
            >
              <div className="fluid-grid-copy">
                <p>{item.eyebrow}</p>
                <h3>{item.name}</h3>
                <span>{item.summary}</span>
              </div>

              <div className="fluid-grid-media" style={{ viewTransitionName: `featured-${item.id}` }}>
                <img src={item.poster} alt="" aria-hidden="true" />
              </div>

              <span className="fluid-grid-expand-label" aria-hidden="true">
                Abrir <b>+</b>
              </span>
            </AnimatedLink>
          </motion.article>
        ))}
      </div>
    </LayoutGroup>
  );
}

export default FluidExpandingGrid;
