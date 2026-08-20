import AnimatedLink from "./AnimatedLink";

function ProductFamilyCard({
  title,
  description,
  categoryId,
  image,
  imageAlt,
  imageClassName = "",
  onCategoryChange,
  ...props
}) {
  const catalogHref = `/catalogo?categoria=${categoryId}`;
  const selectCategory = () => onCategoryChange?.(categoryId);

  return (
    <article {...props} className="flex min-h-[24rem] flex-col overflow-hidden rounded-[2rem] bg-surface p-6 sm:min-h-[28rem] sm:p-9">
      <div>
        <p className="type-eyebrow text-muted">Linha de produtos</p>
        <h3 className="type-card-title mt-3 text-black">{title}</h3>
        <p className="mt-4 max-w-sm leading-7 text-muted">{description}</p>
        <AnimatedLink
          href={catalogHref}
          onClick={selectCategory}
          transitionType="nav-forward"
          className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-ink"
        >
          Ver no catálogo <span aria-hidden="true" className="ml-1.5">›</span>
        </AnimatedLink>
      </div>

      <AnimatedLink
        href={catalogHref}
        onClick={selectCategory}
        transitionType="nav-forward"
        aria-label={`Ver ${title} no catálogo`}
        className="group relative mt-auto flex min-h-44 cursor-pointer items-center justify-center overflow-hidden rounded-[1.6rem] bg-white px-4 py-7 shadow-[inset_0_0_0_1px_rgb(0_0_0/4%)] sm:min-h-52 sm:px-6"
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className={`max-h-52 object-contain mix-blend-multiply will-change-transform transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055] group-focus-visible:scale-[1.035] group-active:scale-[0.985] motion-reduce:transform-none motion-reduce:transition-none ${imageClassName}`}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-black text-lg font-medium text-white shadow-sm"
        >
          ›
        </span>
      </AnimatedLink>
    </article>
  );
}

export default ProductFamilyCard;
