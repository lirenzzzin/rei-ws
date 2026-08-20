import ContactButton from "./ContactButton";

function ProductCard({ product }) {
  return (
    <article className="rounded-[2rem] bg-surface p-5 sm:p-6">
      <div className="grid aspect-square place-items-center rounded-[1.5rem] bg-canvas text-sm text-muted">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>Imagem do produto</span>
        )}
      </div>

      <div className="pt-5">
        <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-black">
          {product.name}
        </h2>
        <p className="mt-2 text-lg font-semibold text-ink">{product.price}</p>
        <ContactButton className="mt-5 w-full">Consultar produto</ContactButton>
      </div>
    </article>
  );
}

export default ProductCard;
