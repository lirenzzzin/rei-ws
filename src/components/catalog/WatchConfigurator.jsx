import { useState } from "react";
import ProductGlyph from "../ProductGlyph";
import { deviceConditions, watchModels } from "../../data/catalog";
import AddButton from "./AddButton";
import ChoiceGroup from "./ChoiceGroup";

const watchModelsNewestFirst = [...watchModels].reverse();

function WatchConfigurator({ onAdd }) {
  const [model, setModel] = useState(watchModels.at(-1));
  const [size, setSize] = useState(model.sizes[0]);
  const [connectivity, setConnectivity] = useState(model.connectivity[0]);
  const [color, setColor] = useState(model.colors[0]);
  const [condition, setCondition] = useState(deviceConditions[0]);

  const chooseModel = (nextModel) => {
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
    <div className="catalog-flow">
      <section aria-labelledby="watch-model-title">
        <p className="catalog-step-label">Modelos desde 2022</p>
        <h2 id="watch-model-title" className="type-card-title mt-2 text-black">
          Escolha seu Apple Watch.
        </h2>
        <div className="model-grid mt-6">
          {watchModelsNewestFirst.map((item) => {
            const selected = model.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => chooseModel(item)}
                className="model-card"
                data-selected={selected ? "true" : "false"}
              >
                <ProductGlyph type="watch" className="model-card-glyph size-10 text-tertiary" />
                <span className="model-card-copy">
                  <span className="block text-xs font-semibold text-muted">{item.year}</span>
                  <strong className="mt-1 block text-base tracking-[-0.02em]">{item.name}</strong>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section key={model.id} className="configuration-card catalog-reveal" aria-labelledby="watch-config-title">
        <div className="configuration-summary">
          <p className="catalog-step-label">Personalização</p>
          <h2 id="watch-config-title" className="type-card-title mt-2 text-black">
            Complete a escolha.
          </h2>
          <p className="mt-3 leading-7 text-muted">
            {model.name}. Caixa e conexão seguem as opções oficiais de cada linha.
          </p>
        </div>
        <div className="configuration-options">
          <ChoiceGroup label="Tamanho da caixa" options={model.sizes} value={size} onChange={setSize} />
          <ChoiceGroup label="Conectividade" options={model.connectivity} value={connectivity} onChange={setConnectivity} />
          <ChoiceGroup label="Cor da caixa" options={model.colors} value={color} onChange={setColor} />
          <ChoiceGroup label="Condição" options={deviceConditions} value={condition} onChange={setCondition} />
          <AddButton onAdd={addConfiguredWatch} />
        </div>
      </section>
    </div>
  );
}

export default WatchConfigurator;
