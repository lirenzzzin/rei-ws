// Edite somente este objeto ao iniciar uma nova marca.
export const siteConfig = {
  name: "Sua Loja",
  displayName: "SUA LOJA",
  location: "Sua cidade · UF",
  tagline: "IPHONES | APPLE WATCH | ACESSÓRIOS",
  description:
    "iPhone, Apple Watch e acessórios com informação clara e atendimento personalizado.",
  seo: {
    title: "Sua Loja | iPhones e acessórios",
    description:
      "Compare iPhones, Apple Watch e acessórios com informações claras e atendimento personalizado.",
    image: "/favicon.svg",
  },
  catalog: {
    availabilityLabel: "Disponibilidade sob consulta",
    priceLabel: "Valor confirmado no atendimento",
    showPrices: false,
  },
  contact: {
    address: "Endereço completo · Sua cidade, UF",
    addressHelper: "Adicione o ponto de referência e o link do mapa.",
    hours: "Segunda a sábado · 00h às 00h",
    hoursHelper: "Adicione horários especiais e feriados.",
    channel: "Defina telefone, e-mail ou rede social",
    whatsappNumber: "",
    email: "",
    mapUrl: "",
  },
  trust: {
    guarantee: "Configure a garantia",
    origin: "Explique a procedência",
    delivery: "Defina regiões e prazos",
    payment: "Informe formas de pagamento",
  },
  policies: {
    exchange: "Adicione a política de troca e devolução.",
    warranty: "Explique a cobertura, prazos e condições da garantia.",
    privacy: "Adicione a política de privacidade e tratamento de dados.",
  },
};

export function getWhatsAppUrl(message = "Olá! Quero consultar a disponibilidade.") {
  const number = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
