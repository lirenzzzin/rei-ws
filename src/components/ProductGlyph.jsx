const glyphs = {
  iphone: (
    <>
      <rect x="30" y="10" width="60" height="100" rx="14" />
      <path d="M50 18h20" />
      <circle cx="60" cy="100" r="2" />
    </>
  ),
  watch: (
    <>
      <path d="M48 9h24l4 24H44l4-24ZM48 87h24l4 24H44l4-24Z" />
      <rect x="34" y="29" width="52" height="62" rx="18" />
      <circle cx="60" cy="60" r="13" />
      <path d="M60 60V49M60 60l8 5" />
    </>
  ),
  accessories: (
    <>
      <path d="M42 21v28a18 18 0 0 0 36 0V21" />
      <path d="M34 21h16M70 21h16M60 67v32" />
      <rect x="48" y="96" width="24" height="10" rx="5" />
    </>
  ),
};

function ProductGlyph({ type, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyphs[type]}
    </svg>
  );
}

export default ProductGlyph;
