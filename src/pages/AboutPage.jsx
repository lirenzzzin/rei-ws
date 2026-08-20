import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import SectionIntro from "../components/SectionIntro";
import { siteConfig } from "../config/site";

const principles = [
  {
    title: "Clareza",
    description: "Informações objetivas sobre produto, condições e disponibilidade.",
  },
  {
    title: "Procedência",
    description: "Espaço reservado para explicar a curadoria e a garantia da loja.",
  },
  {
    title: "Proximidade",
    description: "Atendimento próximo para clientes da cidade e região.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="A loja"
        title="Tecnologia com conversa simples."
        description={`${siteConfig.name} aproxima pessoas dos produtos que procuram, com atendimento próximo e informação clara.`}
      />

      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Como queremos atender"
            title="Confiança se constrói nos detalhes."
            description="Esta estrutura deixa prontos os pilares institucionais que poderão receber o conteúdo definitivo da marca."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="min-h-56 rounded-[2rem] bg-canvas p-6 sm:min-h-72 sm:p-9">
                <h2 className="type-card-title text-black">{principle.title}</h2>
                <p className="mt-5 leading-7 text-muted">{principle.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="type-eyebrow text-muted">História da loja</p>
            <p className="type-headline mt-5 text-ink">
              Texto placeholder para contar a origem da futura marca, sua trajetória
              e os diferenciais construídos ao longo do tempo.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

export default AboutPage;
