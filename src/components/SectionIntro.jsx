function SectionIntro({ eyebrow, title, titleId, description, className = "" }) {
  return (
    <div className={`max-w-4xl ${className}`}>
      {eyebrow ? <p className="type-eyebrow text-muted">{eyebrow}</p> : null}
      <h2 id={titleId} className="type-section-title mt-3 text-black">
        {title}
      </h2>
      {description ? (
        <p className="type-body-large mt-5 max-w-2xl text-muted">{description}</p>
      ) : null}
    </div>
  );
}

export default SectionIntro;
