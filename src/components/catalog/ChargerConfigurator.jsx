import { useState } from "react";
import { chargerProducts } from "../../data/catalog";
import { siteConfig } from "../../config/site";
import AddButton from "./AddButton";
import ChoiceGroup from "./ChoiceGroup";
import { ChargerArtwork } from "./CatalogArtwork";

function ProductStage({ product }) {
  return (
    <section data-pop-in className="catalog-product-stage" aria-live="polite">
      <div className="catalog-stage-copy">
        <p className="catalog-step-label">Sua escolha</p>
        <h2>{product.name}</h2>
        <p>{product.detail}</p>
        <p className="catalog-availability">{siteConfig.catalog.availabilityLabel}</p>
      </div>

      <div className="catalog-stage-image">
        <ChargerArtwork productId={product.id} />
      </div>

      <div className="catalog-color-picker">
        <p>
          Conexão: <strong>{product.connection}</strong>
        </p>
      </div>
    </section>
  );
}

function ChargerConfigurator({ onAdd }) {
  const initialProduct = chargerProducts[0];
  const [product, setProduct] = useState(initialProduct);
  const [option, setOption] = useState(initialProduct.options[0]);

  const chooseProduct = (productId) => {
    const nextProduct = chargerProducts.find((item) => item.id === productId);
    if (!nextProduct) return;

    setProduct(nextProduct);
    setOption(nextProduct.options[0]);
  };

  const addConfiguredCharger = () => {
    onAdd({
      kind: "Acessório",
      title: product.name,
      details: [
        `Opção: ${option}`,
        `Conexão: ${product.connection}`,
        product.detail,
      ],
    });
  };

  return (
    <div className="iphone-catalog-layout">
      <div className="iphone-catalog-controls">
        <section data-pop-in className="catalog-model-selector" aria-labelledby="charger-selector-title">
          <p className="catalog-step-label">Carregadores e cabos</p>
          <h2 id="charger-selector-title">Escolha o acessório.</h2>
          <p>
            Selecione pelo conector do seu aparelho. Cada produto agora aparece com uma visualização grande, no mesmo padrão do catálogo de iPhone.
          </p>

          <div className="catalog-select-grid">
            <label>
              <span>Produto</span>
              <select value={product.id} onChange={(event) => chooseProduct(event.target.value)}>
                {chargerProducts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <ProductStage product={product} />
      </div>

      <section data-pop-in className="catalog-configuration-panel" aria-labelledby="charger-config-title">
        <div>
          <p className="catalog-step-label">Complete a configuração</p>
          <h2 id="charger-config-title">Pronto para o seu aparelho.</h2>
          <p>Escolha comprimento ou potência quando houver mais de uma opção e adicione ao pedido.</p>
        </div>

        <div className="configuration-options">
          <ChoiceGroup label="Opção" options={product.options} value={option} onChange={setOption} />
          <AddButton onAdd={addConfiguredCharger} />
        </div>
      </section>
    </div>
  );
}

export default ChargerConfigurator;
