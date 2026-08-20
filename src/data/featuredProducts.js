import { productVideos } from "./productMedia";

export const featuredProducts = {
  pro: {
    id: "17-pro",
    route: "/iphone-17-pro",
    modelId: "17-pro",
    name: "iPhone 17 Pro",
    eyebrow: "Potência em estado Pro",
    headline: "Pro por inteiro.",
    summary: "Estrutura unibody, chip A19 Pro e um sistema de câmeras feito para ir mais longe.",
    theme: "dark",
    video: productVideos.pro,
    poster: productVideos.proPoster,
    colors: ["Laranja-cósmico", "Azul-intenso", "Prateado"],
    defaultColor: "Laranja-cósmico",
    stats: [
      { value: "A19 Pro", label: "desempenho com resfriamento por câmara de vapor" },
      { value: "48 MP × 3", label: "sistema de câmeras Fusion Pro" },
      { value: "8x", label: "zoom com qualidade óptica" },
      { value: "31 h", label: "de reprodução de vídeo no iPhone 17 Pro" },
    ],
    chapters: [
      {
        eyebrow: "Design térmico",
        title: "Potência que continua potente.",
        text: "O alumínio unibody trabalha junto à câmara de vapor para dissipar calor e sustentar o desempenho do A19 Pro por mais tempo.",
      },
      {
        eyebrow: "Sistema de câmera Pro",
        title: "Do macro ao equivalente a 200 mm.",
        text: "Três câmeras Fusion de 48 MP entregam mais liberdade de enquadramento, com zoom de até 8x com qualidade óptica.",
      },
      {
        eyebrow: "Tela e bateria",
        title: "Grande em tudo o que importa.",
        text: "Super Retina XDR de 6,3 polegadas, ProMotion de até 120 Hz e até 31 horas de reprodução de vídeo.",
      },
    ],
  },
  air: {
    id: "air",
    route: "/iphone-air",
    modelId: "air",
    name: "iPhone Air",
    eyebrow: "Impossivelmente fino",
    headline: "Leve muda tudo.",
    summary: "A experiência de uma tela grande e desempenho Pro em apenas 5,6 mm de espessura.",
    theme: "light",
    video: productVideos.air,
    poster: productVideos.airPoster,
    colors: ["Azul-céu", "Branco-nuvem", "Dourado-claro", "Preto-espacial"],
    defaultColor: "Azul-céu",
    stats: [
      { value: "5,6 mm", label: "o iPhone mais fino já feito" },
      { value: "165 g", label: "leve para acompanhar o dia todo" },
      { value: "6,5 pol.", label: "tela Super Retina XDR com ProMotion" },
      { value: "27 h", label: "de reprodução de vídeo" },
    ],
    chapters: [
      {
        eyebrow: "Titânio",
        title: "Uma presença quase sem peso.",
        text: "Com 5,6 mm e 165 gramas, o iPhone Air combina uma estrutura fina de titânio com uma tela ampla de 6,5 polegadas.",
      },
      {
        eyebrow: "A19 Pro",
        title: "Fino por fora. Pro por dentro.",
        text: "O chip A19 Pro, o modem C1X e o chip N1 equilibram desempenho avançado e eficiência para uma experiência rápida.",
      },
      {
        eyebrow: "Câmera Fusion",
        title: "Duas distâncias focais. Uma câmera de 48 MP.",
        text: "A câmera Fusion principal oferece enquadramentos em 1x e 2x, enquanto a câmera frontal Center Stage amplia as possibilidades de selfie e vídeo.",
      },
    ],
  },
};
