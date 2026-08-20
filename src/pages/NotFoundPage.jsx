import { Link } from "wouter";
import Container from "../components/Container";

function NotFoundPage() {
  return (
    <section className="py-24 text-center sm:py-36">
      <Container className="max-w-4xl">
        <p className="type-eyebrow text-muted">Erro 404</p>
        <h1 className="type-page-title mt-4 text-black">Página não encontrada.</h1>
        <p className="type-body-large mx-auto mt-6 max-w-xl text-muted">
          O endereço pode ter mudado. Volte ao início para continuar navegando.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex min-h-12 items-center rounded-full border border-black bg-black px-7 py-3 text-sm font-semibold text-white"
        >
          Voltar ao início
        </Link>
      </Container>
    </section>
  );
}

export default NotFoundPage;
