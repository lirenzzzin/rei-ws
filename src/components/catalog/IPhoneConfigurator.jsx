import { useMemo, useState } from "react";
import MorphingProductImage from "../MorphingProductImage";
import { deviceConditions, iphoneGenerations } from "../../data/catalog";
import { getFinishColor, getIPhoneImage } from "../../data/productMedia";
import AddButton from "./AddButton";
import ChoiceGroup from "./ChoiceGroup";
import { siteConfig } from "../../config/site";

const generationsNewestFirst = [...iphoneGenerations].reverse();

function readInitialSelection() {
  const requestedModel = new URLSearchParams(window.location.search).get("modelo");
  const matchedGeneration = iphoneGenerations.find((item) =>
    item.variants.some((variant) => variant.id === requestedModel),
  );
  const generation = matchedGeneration ?? iphoneGenerations.at(-1);
  const model = generation.variants.find((variant) => variant.id === requestedModel) ?? generation.variants[0];
  return { generation, model };
}

function ColorDots({ options, value, onChange }) {
  return (
    <fieldset className="catalog-color-picker">
      <legend>Cor: <strong>{value}</strong></legend>
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
  const image = getIPhoneImage(model.id, color);

  return (
    <section data-pop-in className="catalog-product-stage" aria-live="polite">
      <div className="catalog-stage-copy">
        <p className="catalog-step-label">Sua escolha</p>
        <h2>{model.name}</h2>
        <p>{model.connector} · a partir de {model.storage[0]}</p>
        <p className="catalog-availability">{siteConfig.catalog.availabilityLabel}</p>
      </div>
      <div className="catalog-stage-image">
        {image ? (
          <MorphingProductImage
            src={image}
            alt={`${model.name} na cor ${color}`}
          />
        ) : null}
      </div>
      <ColorDots options={model.colors} value={color} onChange={onColorChange} />
    </section>
  );
}

function IPhoneConfigurator({ onAdd }) {
  const initial = useMemo(readInitialSelection, []);
  const [generation, setGeneration] = useState(initial.generation);
  const [model, setModel] = useState(initial.model);
  const [storage, setStorage] = useState(initial.model.storage[0]);
  const [color, setColor] = useState(initial.model.colors[0]);
  const [condition, setCondition] = useState(deviceConditions[0]);

  const chooseGeneration = (generationId) => {
    const nextGeneration = iphoneGenerations.find((item) => item.id === generationId);
    if (!nextGeneration) return;
    const nextModel = nextGeneration.variants[0];

    setGeneration(nextGeneration);
    setModel(nextModel);
    setStorage(nextModel.storage[0]);
    setColor(nextModel.colors[0]);
  };

  const chooseModel = (modelId) => {
    const nextModel = generation.variants.find((item) => item.id === modelId);
    if (!nextModel) return;

    setModel(nextModel);
    setStorage(nextModel.storage[0]);
    setColor(nextModel.colors[0]);
  };

  const addConfiguredIPhone = () => {
    onAdd({
      kind: "iPhone",
      title: model.name,
      image: getIPhoneImage(model.id, color),
      details: [
        `Armazenamento: ${storage}`,
        `Cor: ${color}`,
        `Condição: ${condition}`,
        `Conector: ${model.connector}`,
      ],
    });
  };

  return (
    <div className="iphone-catalog-layout">
      <div className="iphone-catalog-controls">
        <section data-pop-in className="catalog-model-selector" aria-labelledby="iphone-selector-title">
          <p className="catalog-step-label">iPhone</p>
          <h2 id="iphone-selector-title">Escolha o modelo.</h2>
          <p>Comece pela geração. Depois, escolha a versão sem precisar arrastar listas para o lado.</p>

          <div className="catalog-select-grid">
            <label>
              <span>Geração</span>
              <select value={generation.id} onChange={(event) => chooseGeneration(event.target.value)}>
                {generationsNewestFirst.map((item) => (
                  <option key={item.id} value={item.id}>{item.label} · {item.year}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Modelo</span>
              <select value={model.id} onChange={(event) => chooseModel(event.target.value)}>
                {generation.variants.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <ProductStage model={model} color={color} onColorChange={setColor} />
      </div>

      <section data-pop-in className="catalog-configuration-panel" aria-labelledby="iphone-config-title">
        <div>
          <p className="catalog-step-label">Complete a configuração</p>
          <h2 id="iphone-config-title">Do seu jeito.</h2>
          <p>Capacidade, acabamento e condição ficam registrados juntos no carrinho.</p>
        </div>
        <div className="configuration-options">
          <ChoiceGroup label="Armazenamento" options={model.storage} value={storage} onChange={setStorage} />
          <ChoiceGroup label="Condição" options={deviceConditions} value={condition} onChange={setCondition} />
          <AddButton onAdd={addConfiguredIPhone} />
        </div>
      </section>
    </div>
  );
}

export default IPhoneConfigurator;
