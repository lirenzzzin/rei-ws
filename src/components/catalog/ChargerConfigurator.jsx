import { useState } from "react";
import MorphingProductImage from "../MorphingProductImage";
import { chargerProducts } from "../../data/catalog";
import { getChargerImage } from "../../data/productMedia";
import AddButton from "./AddButton";
import ChoiceGroup from "./ChoiceGroup";
import { siteConfig } from "../../config/site";

function ProductStage({ product }) {
  const image = getChargerImage(product.id);

  return (
    <section data-pop-in className="catalog-product-stage" aria-live="polite">
      <div className="catalog-stage-copy">
        <p className="catalog-step-label">Sua escolha</p>
        <h2>{product.name}</h2>
        <p>{product.detail} · {product.connection}</p>
        <p className="catalog-availability">{siteConfig.catalog.availabilityLabel}</p>
      </div>

      <div className="catalog-stage-image">
        {image ? (
          <MorphingProductImage src={image} alt={product.name} />
        ) : null}
      </div>
    </section>
  );
}

function ChargerConfigurator({ onAdd }) {
  const [product, setProduct] = useState(chargerProducts[0]);
  const [option, setOption] = useState(product.options[0]);

  const chooseProduct = (productId) => {
    const nextProduct = chargerProducts.find((item) => item.id === productId);
    if (!nextProduct) return;

    setProduct(nextProduct);
    setOption(nextProduct.options[0]);
  };

  const optionLabel = product.id === "adapter-20w" ? "Potência" : "Comprimento";

  const addConfiguredCharger = () => {
    onAdd({
      kind: "Carregador e cabo",
      title: product.name,
      image: getChargerImage(product.id),
      details: [`${optionLabel}: ${option}`, `Conexão: ${product.connection}`],
    });
  };

  return (
    <div className="iphone-catalog-layout">
      <div className="iphone-catalog-controls">
        <section data-pop-in className="catalog-model-selector" aria-labelledby="charger-selector-title">
          <p className="catalog-step-label">Recarga</p>
          <h2 id="charger-selector-title">Escolha o acessório.</h2>
          <p>
            Cabos, fonte, MagSafe e carregador do Apple Watch em uma vitrine visual, com a conexão certa para cada aparelho.
          </p>

          <div className="catalog-select-grid">
            <label>
              <span>Produto</span>
              <select value={product.id} onChange={(event) => chooseProduct(event.target.value)}>
                {chargerProducts.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
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
          <h2 id="charger-config-title">Pronto para recarregar.</h2>
          <p>
            Escolha {optionLabel.toLowerCase()} e adicione o acessório ao mesmo carrinho usado pelos iPhones e Apple Watch.
          </p>
        </div>

        <div className="configuration-options">
          <ChoiceGroup label={optionLabel} options={product.options} value={option} onChange={setOption} />
          <AddButton onAdd={addConfiguredCharger} />
        </div>
      </section>
    </div>
  );
}

export default ChargerConfigurator;
