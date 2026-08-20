import { useState } from "react";
import ProductGlyph from "../ProductGlyph";
import { chargerProducts } from "../../data/catalog";
import AddButton from "./AddButton";
import ChoiceGroup from "./ChoiceGroup";

function ChargerConfigurator({ onAdd }) {
  const [product, setProduct] = useState(chargerProducts[0]);
  const [option, setOption] = useState(product.options[0]);

  const chooseProduct = (nextProduct) => {
    setProduct(nextProduct);
    setOption(nextProduct.options[0]);
  };

  const addConfiguredCharger = () => {
    onAdd({
      kind: "Carregador e cabo",
      title: product.name,
      details: [`Opção: ${option}`, `Conexão: ${product.connection}`],
    });
  };

  return (
    <div className="catalog-flow">
      <section aria-labelledby="charger-title">
        <p className="catalog-step-label">Recarga</p>
        <h2 id="charger-title" className="type-card-title mt-2 text-black">
          Cabos, fontes e carregadores.
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          Selecione pelo conector do seu aparelho. iPhone 11 a 14 usam Lightning; iPhone 15 ou posterior usa USB-C.
        </p>
        <div className="model-grid mt-6">
          {chargerProducts.map((item) => {
            const selected = product.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => chooseProduct(item)}
                className="model-card"
                data-selected={selected ? "true" : "false"}
              >
                <ProductGlyph type="accessories" className="model-card-glyph size-10 text-tertiary" />
                <span className="model-card-copy">
                  <strong className="block text-base tracking-[-0.02em]">{item.name}</strong>
                  <span className="mt-1 block text-sm leading-5 text-muted">{item.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section key={product.id} className="configuration-card catalog-reveal" aria-labelledby="charger-config-title">
        <div className="configuration-summary">
          <p className="catalog-step-label">Escolha</p>
          <h2 id="charger-config-title" className="type-card-title mt-2 text-black">
            {product.name}
          </h2>
          <p className="mt-3 leading-7 text-muted">{product.detail}. Disponibilidade confirmada pelo canal de atendimento.</p>
        </div>
        <div className="configuration-options">
          <ChoiceGroup label="Comprimento ou potência" options={product.options} value={option} onChange={setOption} />
          <AddButton onAdd={addConfiguredCharger} />
        </div>
      </section>
    </div>
  );
}

export default ChargerConfigurator;
