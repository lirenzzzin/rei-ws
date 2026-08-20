import Container from "../components/Container";
import ProductFamilyCard from "../components/ProductFamilyCard";
import SectionIntro from "../components/SectionIntro";
import ContactButton from "../components/ContactButton";
import FeaturedProductShowcase from "../components/FeaturedProductShowcase";
import HomeOpening from "../components/HomeOpening";
import { siteConfig } from "../config/site";

const productFamilies = [
  {
    title: "iPhone",
    description: "Modelos lacrados e seminovos, organizados para uma escolha simples.",
    categoryId: "iphones",
    image: new URL("../../assets/home/product-families/iphone-air-side.png", import.meta.url).href,
    imageAlt: "iPhone Air visto de perfil",
    imageClassName: "w-[108%] max-w-[38rem] sm:w-full",
  },
  {
    title: "Apple Watch",
    description: "Opções para acompanhar sua rotina, seus treinos e suas notificações.",
    categoryId: "apple-watch",
    image: new URL("../../assets/home/product-families/apple-watch-safety.png", import.meta.url).href,
    imageAlt: "Dois modelos de Apple Watch exibindo recursos de segurança",
    imageClassName: "w-[88%] max-w-[24rem]",
  },
  {
    title: "Acessórios",
    description: "Carregadores e itens essenciais para completar seu ecossistema.",
    categoryId: "carregadores",
    image: new URL("../../assets/home/product-families/usb-c-cable.png", import.meta.url).href,
    imageAlt: "Cabo USB-C branco",
    imageClassName: "w-[82%] max-w-[21rem]",
  },
];

const highlights = [
  {
    label: "Garantia",
    value: siteConfig.trust.guarantee,
    description: "Condições explicadas antes da compra.",
  },
  {
    label: "Experiência",
    value: "Conte a experiência",
    description: "Atendimento local e direto.",
  },
  {
    label: "Procedência",
    value: siteConfig.trust.origin,
    description: "Histórias que ajudam a construir confiança.",
  },
  {
    label: "Entrega",
    value: siteConfig.trust.delivery,
    description: "Disponibilidade combinada pelo canal de atendimento.",
  },
];

function HomePage({ onCategoryChange }) {
  return (
    <>
      <HomeOpening />
      <FeaturedProductShowcase />

      <section className="py-16 sm:py-24" aria-labelledby="familias-title">
        <Container>
          <div data-pop-in>
            <SectionIntro
              eyebrow="Escolha por categoria"
              titleId="familias-title"
              title="Todo o ecossistema. Uma escolha de cada vez."
              description="Explore iPhone, Apple Watch e acessórios com um configurador visual, direto e feito primeiro para o celular."
            />
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {productFamilies.map((family) => (
              <ProductFamilyCard
                key={family.title}
                {...family}
                onCategoryChange={onCategoryChange}
                data-pop-in
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-24" aria-labelledby="destaques-title">
        <Container>
          <SectionIntro
            eyebrow="Atendimento"
            titleId="destaques-title"
            title="O importante vem antes."
            description="Informações objetivas, compra acompanhada e suporte próximo em cada etapa."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((highlight) => (
              <article key={highlight.label} data-pop-in className="min-h-48 rounded-[1.75rem] bg-canvas p-6 sm:min-h-56 sm:p-7">
                <p className="type-eyebrow text-muted">{highlight.label}</p>
                <p className="mt-5 text-xl font-semibold tracking-[-0.025em] text-ink">
                  {highlight.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{highlight.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div data-pop-in className="rounded-[2.5rem] bg-black px-6 py-16 text-center text-white sm:px-12 sm:py-24">
            <p className="type-eyebrow text-white/65">Atendimento direto</p>
            <h2 className="type-section-title mx-auto mt-4 max-w-3xl text-white">
              Encontre seu próximo iPhone.
            </h2>
            <p className="type-body-large mx-auto mt-6 max-w-xl text-white/70">
              Consulte modelos e disponibilidade com a equipe da loja.
            </p>
            <ContactButton appearance="secondary" className="mt-8">
              Ver contato
            </ContactButton>
          </div>
        </Container>
      </section>
    </>
  );
}

export default HomePage;
