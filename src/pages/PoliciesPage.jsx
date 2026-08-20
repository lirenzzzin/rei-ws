import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { siteConfig } from "../config/site";

const policySections = [
  { title: "Garantia", text: siteConfig.policies.warranty },
  { title: "Trocas e devoluções", text: siteConfig.policies.exchange },
  { title: "Privacidade", text: siteConfig.policies.privacy },
];

function PoliciesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informações importantes"
        title="Políticas claras antes da compra."
        description="Use esta página para documentar as regras comerciais da futura marca, sem promessas pré-preenchidas."
      />
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {policySections.map((section) => (
              <article key={section.title} className="min-h-64 rounded-[2rem] bg-canvas p-6 sm:p-9">
                <p className="type-eyebrow text-muted">{section.title}</p>
                <p className="mt-5 leading-7 text-muted">{section.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export default PoliciesPage;
