import { useLiquidGlass } from "@glinui/liquid-glass";
import { useEffect, useRef, useState } from "react";

function CartIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function buildOrderSummary(items) {
  const order = items
    .map((item, index) => {
      const details = item.details.map((detail) => `   • ${detail}`).join("\n");
      return `${index + 1}. ${item.title}\n${details}`;
    })
    .join("\n\n");

  return [
    "Resumo do pedido:",
    "",
    order,
  ].join("\n");
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function FloatingCart({ items, onRemove, onClear }) {
  const [open, setOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("idle");
  const closeButtonRef = useRef(null);
  const { ref, style, svgFilter, isSupported } = useLiquidGlass({
    displacement: 10,
    blur: 18,
    saturate: 1.7,
    profile: "circle",
  });

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleCopyOrder = async () => {
    try {
      await copyText(buildOrderSummary(items));
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  // O carrinho só entra no chrome quando existe uma seleção. Isso libera a
  // primeira dobra para a mensagem e mantém a origem da ação compreensível.
  if (items.length === 0) return null;

  return (
    <>
      {svgFilter}
      <div className="floating-action-position floating-cart-position">
        <button
          ref={ref}
          style={{ ...style, viewTransitionName: "persistent-cart" }}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Abrir carrinho com ${items.length} ${items.length === 1 ? "item" : "itens"}`}
          data-glin-liquid-glass={isSupported ? "refracted" : "fallback"}
          className="fixed-cart-glass grid size-14 place-items-center rounded-full text-white"
        >
          <CartIcon className="size-6" />
          {items.length > 0 ? (
            <span className="cart-count" aria-hidden="true">
              {items.length > 9 ? "9+" : items.length}
            </span>
          ) : null}
        </button>
      </div>

      {open ? (
        <div className="cart-dialog-layer fixed inset-0 z-[70]" role="presentation">
          <button
            type="button"
            className="cart-backdrop absolute inset-0"
            aria-label="Fechar carrinho"
            onClick={() => setOpen(false)}
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="cart-sheet absolute inset-x-3 bottom-3 max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[2rem] bg-white sm:inset-y-4 sm:left-auto sm:right-4 sm:flex sm:w-[min(420px,calc(100vw-2rem))] sm:flex-col"
          >
            <header className="flex items-start justify-between border-b border-black/8 px-6 py-6">
              <div>
                <p className="catalog-step-label">Seu pedido</p>
                <h2 id="cart-title" className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-black">
                  Carrinho
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {items.length} {items.length === 1 ? "seleção" : "seleções"}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar carrinho"
                className="grid size-11 place-items-center rounded-full bg-surface text-xl text-black"
              >
                ×
              </button>
            </header>

            <div className="cart-items overflow-y-auto px-6 py-5 sm:flex-1">
              {items.length === 0 ? (
                <div className="py-14 text-center">
                  <CartIcon className="mx-auto size-10 text-tertiary" />
                  <p className="mt-5 font-semibold text-black">Seu carrinho está vazio.</p>
                  <p className="mt-2 text-sm leading-6 text-muted">Configure um produto no catálogo e adicione aqui.</p>
                </div>
              ) : (
                <ol className="space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="rounded-2xl bg-surface p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-start gap-3">
                          {item.image ? (
                            <img src={item.image} alt="" className="size-14 shrink-0 object-contain" />
                          ) : null}
                          <div className="min-w-0">
                          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">{item.kind}</span>
                          <h3 className="mt-1 font-semibold tracking-[-0.02em] text-black">{item.title}</h3>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="min-h-11 shrink-0 px-1 text-sm font-semibold text-muted"
                          aria-label={`Remover ${item.title}`}
                        >
                          Remover
                        </button>
                      </div>
                      <ul className="mt-3 space-y-1 text-sm text-muted">
                        {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                      </ul>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <footer className="border-t border-black/8 bg-white px-6 py-5">
              {items.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    className="flex min-h-12 items-center justify-center rounded-full bg-black px-6 text-center text-sm font-semibold text-white"
                  >
                    {copyStatus === "copied"
                      ? "Resumo copiado"
                      : copyStatus === "error"
                        ? "Não foi possível copiar"
                        : "Copiar resumo do pedido"}
                  </button>
                  <button type="button" onClick={onClear} className="min-h-11 text-sm font-semibold text-muted">
                    Limpar carrinho
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="min-h-12 w-full rounded-full bg-black px-6 text-sm font-semibold text-white"
                >
                  Continuar escolhendo
                </button>
              )}
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}

export default FloatingCart;
