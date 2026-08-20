import { useLiquidGlass } from "@glinui/liquid-glass";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { CatalogFilterControls } from "./CatalogFilters";
import AnimatedLink from "./AnimatedLink";
import { transitionForNavigation } from "../lib/viewTransitions";

const navigation = [
  { label: "Início", to: "/" },
  { label: "Catálogo", to: "/catalogo" },
  { label: "Sobre", to: "/sobre" },
  { label: "Contato", to: "/contato" },
];

function NavigationLink({ item, isActive, interactive, transitionType }) {
  return (
    <AnimatedLink
      href={item.to}
      transitionType={transitionType}
      aria-current={isActive ? "page" : undefined}
      tabIndex={interactive ? undefined : -1}
      className={`relative z-10 flex min-h-11 items-center justify-center whitespace-nowrap rounded-[1.1rem] px-1.5 text-[0.8125rem] font-semibold sm:px-3 sm:text-sm ${
        isActive ? "text-black" : "text-black/70"
      }`}
    >
      {item.label}
    </AnimatedLink>
  );
}

function Navbar({ activeCategory, onCategoryChange }) {
  const [location] = useLocation();
  const pathname = location.split("?")[0];
  const itemRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const [filtersDocked, setFiltersDocked] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const { ref, style, svgFilter, isSupported } = useLiquidGlass({
    displacement: 10,
    blur: 20,
    saturate: 1.8,
    profile: "squircle",
  });
  const routeIndex = navigation.findIndex((item) => item.to === pathname);
  const activeIndex = routeIndex === -1 && pathname.startsWith("/iphone-") ? 0 : routeIndex;
  const isCatalog = pathname === "/catalogo";
  const showFilters = isCatalog && filtersDocked;

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

  useEffect(() => {
    setFiltersDocked(false);
    setHeaderHidden(false);

    if (!isCatalog) return undefined;

    let lastScrollY = window.scrollY;
    let frame = null;

    const updateChrome = () => {
      const scrollY = window.scrollY;
      const anchor = document.querySelector("[data-catalog-filter-anchor]");
      const nextFiltersDocked = anchor ? anchor.getBoundingClientRect().top <= 16 : false;

      if (anchor) anchor.dataset.docked = nextFiltersDocked ? "true" : "false";
      setFiltersDocked(nextFiltersDocked);

      if (nextFiltersDocked || scrollY <= 24) {
        setHeaderHidden(false);
      } else {
        const delta = scrollY - lastScrollY;

        if (delta > 5) setHeaderHidden(true);
        if (delta < -5) setHeaderHidden(false);
      }

      lastScrollY = scrollY;
      frame = null;
    };

    const handleScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateChrome);
    };

    updateChrome();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      const anchor = document.querySelector("[data-catalog-filter-anchor]");

      if (anchor) delete anchor.dataset.docked;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [isCatalog]);

  return (
    <header
      data-hidden={headerHidden ? "true" : "false"}
      className="site-header pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 sm:pt-4"
      style={{ viewTransitionName: "persistent-nav" }}
    >
      {svgFilter}
      <div
        ref={ref}
        style={style}
        data-glin-liquid-glass={isSupported ? "refracted" : "fallback"}
        data-mode={showFilters ? "filters" : "navigation"}
        className="liquid-nav liquid-nav-shell pointer-events-auto max-w-full rounded-[1.55rem] p-1"
      >
        <div className="relative z-10 h-11">
          <nav
            aria-label="Navegação principal"
            aria-hidden={showFilters}
            data-active={showFilters ? "false" : "true"}
            className="liquid-nav-panel"
          >
            <ul className="primary-nav-list site-nav-scroll relative flex max-w-full gap-0.5 overflow-x-auto">
              <li
                aria-hidden="true"
                className="liquid-nav-indicator"
                style={{
                  visibility: indicator.visible ? "visible" : "hidden",
                  width: `${indicator.width}px`,
                  transform: `translate3d(${indicator.left}px, 0, 0)`,
                }}
              />
              {navigation.map((item, index) => (
                <li
                  key={item.to}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className="relative z-10 min-w-0 flex-1"
                >
                  <NavigationLink
                    item={item}
                    isActive={index === activeIndex}
                    interactive={!showFilters}
                    transitionType={transitionForNavigation(activeIndex, index)}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div
            aria-hidden={!showFilters}
            data-active={showFilters ? "true" : "false"}
            className="liquid-nav-panel"
          >
            <CatalogFilterControls
              activeCategory={activeCategory}
              onCategoryChange={onCategoryChange}
              interactive={showFilters}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
