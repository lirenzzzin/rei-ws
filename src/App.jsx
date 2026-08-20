import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FloatingCart from "./components/FloatingCart";
import ScrollToTop from "./components/ScrollToTop";
import ViewportPopIn from "./components/ViewportPopIn";
import usePersistentCart from "./hooks/usePersistentCart";
import CatalogPage from "./pages/CatalogPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import FeaturedProductPage from "./pages/FeaturedProductPage";
import PoliciesPage from "./pages/PoliciesPage";
import { siteConfig } from "./config/site";

const catalogCategoryIds = new Set(["iphones", "carregadores", "apple-watch"]);

function getRequestedCatalogCategory() {
  const requestedCategory = new URLSearchParams(window.location.search).get("categoria");
  return catalogCategoryIds.has(requestedCategory) ? requestedCategory : null;
}

function App() {
  const [location] = useLocation();
  const [activeCategory, setActiveCategory] = useState(
    () => getRequestedCatalogCategory() ?? "iphones",
  );
  const { items, addItem, removeItem, clearCart } = usePersistentCart();

  useEffect(() => {
    const routeLabel = location.startsWith("/catalogo")
      ? "Catálogo"
      : location === "/sobre"
        ? "Sobre"
        : location === "/contato"
          ? "Contato"
          : location === "/politicas"
            ? "Políticas"
            : location === "/iphone-17-pro"
              ? "iPhone 17 Pro"
              : location === "/iphone-air"
                ? "iPhone Air"
                : null;
    document.title = routeLabel
      ? `${routeLabel} | ${siteConfig.name}`
      : siteConfig.seo.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", siteConfig.seo.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", document.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", siteConfig.seo.description);
  }, [location]);

  useEffect(() => {
    const requestedCategory = getRequestedCatalogCategory();
    if (requestedCategory) setActiveCategory(requestedCategory);
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <ScrollToTop />
      <ViewportPopIn />
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main key={location} className="site-main flex-1 pt-20">
        <Switch>
          <Route path="/">
            <HomePage onCategoryChange={setActiveCategory} />
          </Route>
          <Route path="/iphone-17-pro">
            <FeaturedProductPage productKey="pro" />
          </Route>
          <Route path="/iphone-air">
            <FeaturedProductPage productKey="air" />
          </Route>
          <Route path="/catalogo">
            <CatalogPage
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onAddToCart={addItem}
            />
          </Route>
          <Route path="/sobre" component={AboutPage} />
          <Route path="/contato" component={ContactPage} />
          <Route path="/politicas" component={PoliciesPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>

      <Footer />
      <FloatingCart items={items} onRemove={removeItem} onClear={clearCart} />
    </div>
  );
}

export default App;
