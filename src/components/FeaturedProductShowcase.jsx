import { lazy, Suspense } from "react";
import Container from "./Container";
import { featuredProducts } from "../data/featuredProducts";

const FluidExpandingGrid = lazy(() => import("./ui/fluid-expanding-grid"));

const showcaseItems = [featuredProducts.pro, featuredProducts.air].map((product) => ({
  ...product,
  expandedSummary: product.headline,
}));

function FeaturedProductShowcase() {
  return (
    <section id="novidades" className="featured-showcase" aria-labelledby="featured-title">
      <Container>
        <div data-pop-in className="featured-showcase-intro">
          <p className="type-eyebrow text-muted">Novidades</p>
          <h2 id="featured-title">Escolha um. Entre na experiência.</h2>
          <p>Toque em um modelo para abrir sua página exclusiva, assistir ao filme e conhecer cada detalhe.</p>
        </div>
        <div data-pop-in>
          <Suspense fallback={<div className="fluid-grid-loading" aria-label="Carregando novidades" />}>
            <FluidExpandingGrid items={showcaseItems} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedProductShowcase;
