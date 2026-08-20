import { useEffect, useState } from "react";

function AddButton({ onAdd }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const timeout = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [added]);

  const handleClick = () => {
    onAdd();
    setAdded(true);
    window.dispatchEvent(new Event("catalog:cart-updated"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="catalog-add-button min-h-12 w-full rounded-full bg-black px-6 text-sm font-semibold text-white sm:w-auto"
    >
      {added ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
    </button>
  );
}

export default AddButton;
