import { useEffect, useState } from "react";

/**
 * Mantém a imagem atual e a anterior sobrepostas no mesmo palco.
 * A troca acontece sem alterar a posição ou o tamanho ocupado pelo produto.
 */
function MorphingProductImage({ src, alt, className = "" }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [previousSrc, setPreviousSrc] = useState(null);

  useEffect(() => {
    if (!src || src === currentSrc) return undefined;

    setPreviousSrc(currentSrc);
    setCurrentSrc(src);
    return undefined;
    // currentSrc representa o visual que precisa sair durante a troca.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    if (!previousSrc) return undefined;
    const timer = window.setTimeout(() => setPreviousSrc(null), 520);
    return () => window.clearTimeout(timer);
  }, [previousSrc]);

  return (
    <div className={`product-morph-stage ${className}`}>
      {previousSrc ? (
        <img
          src={previousSrc}
          alt=""
          aria-hidden="true"
          className="product-morph-image product-morph-image-out"
        />
      ) : null}
      <img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        className={`product-morph-image ${previousSrc ? "product-morph-image-in" : ""}`}
      />
    </div>
  );
}

export default MorphingProductImage;
