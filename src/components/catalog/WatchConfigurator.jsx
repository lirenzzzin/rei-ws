import { useState } from "react";
import { deviceConditions, watchModels } from "../../data/catalog";
import { siteConfig } from "../../config/site";
import AddButton from "./AddButton";
import ChoiceGroup from "./ChoiceGroup";
import { getWatchFinishColor, WatchArtwork } from "./CatalogArtwork";

const watchesNewestFirst = [...watchModels].sort((a, b) => {
  const yearDifference = Number(b.year) - Number(a.year);
  if (yearDifference !== 0) return yearDifference;
  return a.name.localeCompare(b.name);
});

function ColorDots({ options, value, onChange }) {
  return (
    <fieldset className="catalog-color-picker">
      <legend>
        Cor: <strong>{value}</strong>
      </legend>
      <div className="catalog-color-row">
        {options.map((option) => {
          const selected = option === value;

          return (
            <button
              key={option}
              type="button"
              aria-label={option}
              aria-pressed={selected}
              data-selected={selected ? "true" : "false"}
              onClick={() => onChange(option)}
              className="catalog-color-dot"
            >
              <span style={{ background: getWatchFinishColor(option) }} />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ProductStage({ model, color, onColorChange }) {
  return (
    <section data-pop-in className="catalog-product-stage" aria-live="polite">
      <div className="catalog-stage-copy">
        <p className="catalog-step-label">Sua escolha</p>
        <h2>{model.name}</h2>
        <p>
          {model.year} · {model.sizes.join(" ou ")}
        </p>
        <p className="catalog-availability">{siteConfig.catalog.availabilityLabel}</p>
      </div>

      <div className="catalog-stage-image">
        <WatchArtwork modelId={model.id} color={color} />
      </div>

      <ColorDots options={model.colors} value={color} onChange={onColorChange} />
    </section>
  );
}

function WatchConfigurator({ onAdd }) {
  const initialModel = watchesNewestFirst[0];
  const [model, setModel] = useState(initialModel);
  const [size, setSize] = useState(initialModel.sizes[0]);
  const [connectivity, setConnectivity] = useState(initialModel.connectivity[0]);
  const [color, setColor] = useState(initialModel.colors[0]);
  const [condition, setCondition] = useState(deviceConditions[0]);

  const chooseModel = (modelId) => {
    const nextModel = watchModels.find((item) => item.id === modelId);
    if (!nextModel) return;

    setModel(nextModel);
    setSize(nextModel.sizes[0]);
    setConnectivity(nextModel.connectivity[0]);
    setColor(nextModel.colors[0]);
  };

  const addConfiguredWatch = () => {
    onAdd({
      kind: "Apple Watch",
      title: model.name,
      details: [
        `Tamanho: ${size}`,
        `Conectividade: ${connectivity}`,
        `Cor: ${color}`,
        `Condição: ${condition}`,
      ],
    });
  };

  return (
    <div className="iphone-catalog-layout">
      <div className="iphone-catalog-controls">
        <section data-pop-in className="catalog-model-selector" aria-labelledby="watch-selector-title">
          <p className="catalog-step-label">Apple Watch</p>
          <h2 id="watch-selector-title">Escolha o modelo.</h2>
          <p>
            Todos os modelos ficam no mesmo fluxo visual do catálogo de iPhone. Escolha a geração e veja a configuração ganhar forma ao lado.
          </p>

          <div className="catalog-select-grid">
            <label>
              <span>Modelo</span>
              <select value={model.id} onChange={(event) => chooseModel(event.target.value)}>
                {watchesNewestFirst.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} · {item.year}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <ProductStage model={model} color={color} onColorChange={setColor} />
      </div>

      <section data-pop-in className="catalog-configuration-panel" aria-labelledby="watch-config-title">
        <div>
          <p className="catalog-step-label">Complete a configuração</p>
          <h2 id="watch-config-title">Do seu jeito.</h2>
          <p>Tamanho, conectividade, acabamento e condição ficam registrados juntos no carrinho.</p>
        </div>

        <div className="configuration-options">
          <ChoiceGroup label="Tamanho" options={model.sizes} value={size} onChange={setSize} />
          <ChoiceGroup
            label="Conectividade"
            options={model.connectivity}
            value={connectivity}
            onChange={setConnectivity}
          />
          <ChoiceGroup label="Condição" options={deviceConditions} value={condition} onChange={setCondition} />
          <AddButton onAdd={addConfiguredWatch} />
        </div>
      </section>
    </div>
  );
}

export default WatchConfigurator;
