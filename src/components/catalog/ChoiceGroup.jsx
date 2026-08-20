function ChoiceGroup({ label, options, value, onChange, columns = false }) {
  return (
    <fieldset className="catalog-option-group">
      <legend className="text-sm font-semibold text-black">{label}</legend>
      <div className={`mt-3 flex flex-wrap gap-2 ${columns ? "choice-grid" : ""}`}>
        {options.map((option) => {
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className="choice-pill min-h-11 rounded-full border px-4 text-sm font-medium"
              data-selected={selected ? "true" : "false"}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default ChoiceGroup;
