import { useLiquidGlass } from "@glinui/liquid-glass";
import { useLayoutEffect, useRef, useState } from "react";
import { runViewTransition } from "../lib/viewTransitions";

export const catalogCategories = [
  { id: "iphones", label: "iPhones" },
  { id: "carregadores", label: "Carregadores" },
  { id: "apple-watch", label: "Apple Watch" },
];

export function CatalogFilterControls({
  activeCategory,
  onCategoryChange,
  interactive = true,
}) {
  const itemRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const activeIndex = catalogCategories.findIndex(
    (category) => category.id === activeCategory,
  );

  useLayoutEffect(() => {
    const activeItem = itemRefs.current[activeIndex];

    if (!activeItem) {
      setIndicator((current) => ({ ...current, visible: false }));
      return undefined;
    }

    const updateIndicator = () => {
      setIndicator({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
        visible: true,
      });
    };

    updateIndicator();

    const resizeObserver = new ResizeObserver(updateIndicator);
    itemRefs.current.forEach((item) => {
      if (item) resizeObserver.observe(item);
    });

    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div
      role="group"
      aria-label="Filtros de categoria"
      className="catalog-filter-controls site-nav-scroll relative flex w-full max-w-full gap-0.5 overflow-x-auto"
    >
      <span
        aria-hidden="true"
        className="liquid-nav-indicator"
        style={{
          visibility: indicator.visible ? "visible" : "hidden",
          width: `${indicator.width}px`,
          transform: `translate3d(${indicator.left}px, 0, 0)`,
        }}
      />
      {catalogCategories.map((category, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={category.id}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            type="button"
            aria-pressed={isActive}
            tabIndex={interactive ? undefined : -1}
            onClick={() => runViewTransition(() => onCategoryChange(category.id), "catalog-tab")}
            className={`relative z-10 min-h-11 min-w-0 flex-1 whitespace-nowrap rounded-[1.1rem] px-1.5 text-xs font-semibold sm:px-4 sm:text-sm ${
              isActive ? "text-black" : "text-black/70"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

function CatalogFilterBar({ activeCategory, onCategoryChange }) {
  const { ref, style, svgFilter, isSupported } = useLiquidGlass({
    displacement: 10,
    blur: 20,
    saturate: 1.8,
    profile: "squircle",
  });

  return (
    <div data-catalog-filter-anchor className="flex justify-center">
      {svgFilter}
      <div
        ref={ref}
        style={style}
        data-glin-liquid-glass={isSupported ? "refracted" : "fallback"}
        className="catalog-filter-shell liquid-nav max-w-full rounded-[1.55rem] p-1"
      >
        <CatalogFilterControls
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  );
}

export default CatalogFilterBar;
