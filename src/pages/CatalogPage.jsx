import Container from "../components/Container";
import CatalogFilterBar from "../components/CatalogFilters";
import PageHeader from "../components/PageHeader";
import ChargerConfigurator from "../components/catalog/ChargerConfigurator";
import IPhoneConfigurator from "../components/catalog/IPhoneConfigurator";
import WatchConfigurator from "../components/catalog/WatchConfigurator";
import { siteConfig } from "../config/site";

const catalogViews = {
  iphones: IPhoneConfigurator,
  carregadores: ChargerConfigurator,
  "apple-watch": WatchConfigurator,
};

function CatalogPage({ activeCategory, onCategoryChange, onAddToCart }) {
  const ActiveCatalog = catalogViews[activeCategory] ?? IPhoneConfigurator;

  return (
    <>
      <PageHeader
        className="catalog-page-header"
        eyebrow="Monte seu pedido"
        title="Catálogo"
        description="Escolha cada detalhe com calma. A loja confirma disponibilidade, valor e entrega pelo canal de atendimento configurado."
      />

      <section className="bg-surface py-8 sm:py-16">
        <Container>
          <CatalogFilterBar activeCategory={activeCategory} onCategoryChange={onCategoryChange} />

          <div key={activeCategory} data-pop-in className="catalog-category-transition mt-10 sm:mt-14">
            <ActiveCatalog onAdd={onAddToCart} />
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-6 text-muted">
            As opções representam configurações lançadas pela Apple. {siteConfig.catalog.availabilityLabel}; {siteConfig.catalog.priceLabel.toLowerCase()}.
          </p>
        </Container>
      </section>
    </>
  );
}

export default CatalogPage;
