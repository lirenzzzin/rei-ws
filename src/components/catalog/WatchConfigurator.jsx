import { useState } from "react";
import MorphingProductImage from "../MorphingProductImage";
import { deviceConditions, watchModels } from "../../data/catalog";
import { getFinishColor, getWatchImage } from "../../data/productMedia";
import AddButton from "./AddButton";
import ChoiceGroup from "./ChoiceGroup";
import { siteConfig } from "../../config/site";

const watchModelsNewestFirst = [...watchModels].reverse();

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
              <span style={{ background: getFinishColor(option) }} />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ProductStage({ model, color, onColorChange }) {
  const image = getWatchImage(model.id);
  const accent = getFinishColor(color);

  return (
    <section data-pop-in className="catalog-product-stage" aria-live="polite">
      <div className="catalog-stage-copy">
        <p className="catalog-step-label">Sua escolha</p>
        <h2>{model.name}</h2>
        <p>
          {model.year} · {model.sizes.join(" / ")} · {model.connectivity.join(" / ")}
        </p>
        <p className="catalog-availability">{siteConfig.catalog.availabilityLabel}</p>
      </div>

      <div
        className="catalog-stage-image rounded-[2rem] transition-colors duration-300"
        style={{ background: `radial-gradient(circle at 50% 58%, ${accent}24 0%, transparent 52%)` }}
      >
        {image ? (
          <MorphingProductImage src={image} alt={`${model.name} na cor ${color}`} />
        ) : null}
      </div>

      <ColorDots options={model.colors} value={color} onChange={onColorChange} />
    </section>
  );
}

function WatchConfigurator({ onAdd }) {
  const [model, setModel] = useState(watchModels.at(-1));
  const [size, setSize] = useState(model.sizes[0]);
  const [connectivity, setConnectivity] = useState(model.connectivity[0]);
  const [color, setColor] = useState(model.colors[0]);
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
      image: getWatchImage(model.id),
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
            Do Series 8 ao Ultra 3. Selecione o relógio e personalize tamanho, conexão, acabamento e condição.
          </p>

          <div className="catalog-select-grid">
            <label>
              <span>Modelo</span>
              <select value={model.id} onChange={(event) => chooseModel(event.target.value)}>
                {watchModelsNewestFirst.map((item) => (
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
          <ChoiceGroup label="Tamanho da caixa" options={model.sizes} value={size} onChange={setSize} />
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
