import { Button } from "@glinui/button";
import { useLiquidGlass } from "@glinui/liquid-glass";
import { useState } from "react";
import AnimatedLink from "../components/AnimatedLink";
import Container from "../components/Container";
import MorphingProductImage from "../components/MorphingProductImage";
import ProductFilm from "../components/ProductFilm";
import { featuredProducts } from "../data/featuredProducts";
import { getFeatureIPhoneImage, getFinishColor } from "../data/productMedia";

function FinishPicker({ product, color, onChange }) {
  return (
    <fieldset className="feature-finish-picker">
      <legend>Cor: <strong>{color}</strong></legend>
      <div className="feature-color-row">
        {product.colors.map((finish) => (
          <button
            key={finish}
            type="button"
            aria-label={finish}
            aria-pressed={color === finish}
            data-selected={color === finish ? "true" : "false"}
            onClick={() => onChange(finish)}
            className="feature-color-dot"
          >
            <span style={{ background: getFinishColor(finish) }} />
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function FeaturedProductPage({ productKey }) {
  const product = featuredProducts[productKey] ?? featuredProducts.pro;
  const [color, setColor] = useState(product.defaultColor);
  const { ref, style, svgFilter, isSupported } = useLiquidGlass({
    displacement: 8,
    blur: 20,
    saturate: 1.7,
    profile: "squircle",
  });
  const isDark = product.theme === "dark";
  const phoneImage = getFeatureIPhoneImage(product.modelId, color);

  return (
    <article className={`feature-page feature-page-${product.theme}`}>
      <section className="feature-page-hero">
        <Container className="feature-page-heading">
          <AnimatedLink href="/" transitionType="nav-back" className="feature-back-link">
            <span aria-hidden="true">‹</span> Novidades
          </AnimatedLink>
          <p data-pop-in className="type-eyebrow">{product.eyebrow}</p>
          <h1 data-pop-in>{product.name}</h1>
          <p data-pop-in className="feature-page-deck">{product.headline}</p>
        </Container>

        <ProductFilm
          src={product.video}
          poster={product.poster}
          label={`Filme de apresentação do ${product.name}`}
          className="feature-page-film"
          viewTransitionName={`featured-${product.id}`}
        />

        <Container className="feature-action-container">
          {svgFilter}
          <div
            ref={ref}
            style={style}
            data-pop-in
            data-glin-liquid-glass={isSupported ? "refracted" : "fallback"}
            className={`feature-action-glass ${isDark ? "feature-action-glass-dark" : ""}`}
          >
            <div>
              <span>Comece por aqui</span>
              <strong>Escolha cor, capacidade e condição no catálogo.</strong>
            </div>
            <Button asChild variant={isDark ? "glass" : "default"} size="lg" className="rounded-full">
              <AnimatedLink href={`/catalogo?modelo=${product.modelId}`} transitionType="nav-forward">
                Configurar
              </AnimatedLink>
            </Button>
          </div>
        </Container>
      </section>

      <section className="feature-stats" aria-label={`Destaques do ${product.name}`}>
        <Container className="feature-stats-grid">
          {product.stats.map((stat) => (
            <div key={stat.value} data-pop-in className="feature-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </Container>
      </section>

      <section className="feature-finish-section">
        <Container className="feature-finish-layout">
          <div data-pop-in className="feature-finish-copy">
            <p className="type-eyebrow">Acabamentos</p>
            <h2>Escolha o tom. Veja o aparelho.</h2>
            <FinishPicker product={product} color={color} onChange={setColor} />
          </div>
          <div data-pop-in className="feature-phone-stage">
            <MorphingProductImage
              src={phoneImage}
              alt={`${product.name} na cor ${color}`}
            />
          </div>
        </Container>
      </section>

      <section className="feature-chapters">
        <Container>
          {product.chapters.map((chapter, index) => (
            <article key={chapter.eyebrow} data-pop-in className="feature-chapter">
              <span className="feature-chapter-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="type-eyebrow">{chapter.eyebrow}</p>
                <h2>{chapter.title}</h2>
                <p>{chapter.text}</p>
              </div>
            </article>
          ))}
        </Container>
      </section>
    </article>
  );
}

export default FeaturedProductPage;
