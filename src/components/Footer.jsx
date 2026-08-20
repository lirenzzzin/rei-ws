import { Link } from "wouter";
import { siteConfig } from "../config/site";
import Container from "./Container";

const footerNavigation = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Sobre a loja", href: "/sobre" },
  { label: "Atendimento", href: "/contato" },
  { label: "Políticas", href: "/politicas" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer bg-surface pt-12 sm:py-16">
      <Container>
        <div className="grid gap-10 border-b border-line pb-10 sm:grid-cols-[1.5fr_1fr_auto]">
          <div>
            <p className="font-display text-xl font-semibold tracking-[-0.025em] text-black">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="type-eyebrow text-muted">Explore</p>
            <ul className="mt-3 space-y-1">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-9 items-center text-sm font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="type-eyebrow text-muted">Canais</p>
            <Link href="/contato" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-ink">
              Dados de contato
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {siteConfig.name}. Todos os direitos reservados.</p>
          <p>Loja independente. Apple e seus produtos são marcas de seus respectivos titulares.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
