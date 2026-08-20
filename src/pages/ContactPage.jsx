import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import { getWhatsAppUrl, siteConfig } from "../config/site";
import ContactButton from "../components/ContactButton";

const contactDetails = [
  {
    label: "Endereço",
    value: siteConfig.contact.address,
    helper: siteConfig.contact.addressHelper,
  },
  {
    label: "Horário",
    value: siteConfig.contact.hours,
    helper: siteConfig.contact.hoursHelper,
  },
];

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Atendimento"
        title="Estamos por perto."
        description="Fale com a equipe para consultar modelos, condições e disponibilidade."
      />

      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {contactDetails.map((detail) => (
              <article key={detail.label} className="min-h-52 rounded-[2rem] bg-canvas p-6 sm:min-h-64 sm:p-9">
                <p className="type-eyebrow text-muted">{detail.label}</p>
                <h2 className="type-card-title mt-5 max-w-md text-black">{detail.value}</h2>
                <p className="mt-5 text-sm leading-6 text-muted">{detail.helper}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-[2rem] bg-black px-7 py-12 text-white sm:p-12">
            <div>
              <p className="type-eyebrow text-white/65">Canal de atendimento</p>
              <h2 className="type-card-title mt-4 text-white">Configure o contato da futura marca.</h2>
              <p className="mt-4 max-w-xl leading-7 text-white/70">
                {siteConfig.contact.channel}. Substitua este conteúdo ao personalizar o template.
              </p>
              {getWhatsAppUrl() ? (
                <ContactButton
                  appearance="secondary"
                  className="mt-7 border-white/20 bg-white text-black"
                  message="Olá! Quero consultar produtos e disponibilidade."
                >
                  Abrir canal de atendimento
                </ContactButton>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default ContactPage;
