import Container from "./Container";

function PageHeader({ eyebrow, title, description, className = "" }) {
  return (
    <header className={`bg-canvas py-14 sm:py-28 ${className}`}>
      <Container className="text-center">
        <p className="type-eyebrow text-muted">{eyebrow}</p>
        <h1 className="type-page-title mx-auto mt-4 max-w-4xl text-black">
          {title}
        </h1>
        {description ? (
          <p className="type-body-large mx-auto mt-6 max-w-2xl text-muted">
            {description}
          </p>
        ) : null}
      </Container>
    </header>
  );
}

export default PageHeader;
