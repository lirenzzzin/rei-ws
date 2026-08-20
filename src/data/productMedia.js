const iphoneImages = import.meta.glob("/assets/**/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const featureImages = import.meta.glob("/assets/feature/iphone-17-pro/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const modelFolders = {
  "11": "/assets/11/i11/",
  "11-pro": "/assets/11/I11pro/",
  "11-pro-max": "/assets/11/I11promax/",
  "12-mini": "/assets/12/I12mini/",
  "12": "/assets/12/i12/",
  "12-pro": "/assets/12/I12pro/",
  "12-pro-max": "/assets/12/I12promax/",
  "13-mini": "/assets/13/I13mini/",
  "13": "/assets/13/i13/",
  "13-pro": "/assets/13/I13pro/",
  "13-pro-max": "/assets/13/I13promax/",
  "14": "/assets/14/i14/",
  "14-plus": "/assets/14/I14plus/",
  "14-pro": "/assets/14/I14pro/",
  "14-pro-max": "/assets/14/I14promax/",
  "15": "/assets/15/i15/",
  "15-plus": "/assets/15/I15plus/",
  "15-pro": "/assets/15/I15pro/",
  "15-pro-max": "/assets/15/I15promax/",
  "16": "/assets/16/i16/",
  "16-plus": "/assets/16/I16plus/",
  "16-pro": "/assets/16/I16pro/",
  "16-pro-max": "/assets/16/I16promax/",
  "16e": "/assets/16/I16e/",
  "17": "/assets/17/i17/",
  air: "/assets/17/Iair/",
  "17-pro": "/assets/17/I17pro/",
  "17-pro-max": "/assets/17/I17promax/",
  "17e": "/assets/17/I17e/",
};

const swatches = {
  preto: "#1d1d1f",
  "preto espacial": "#2e2c2f",
  branco: "#f5f5f0",
  "branco nuvem": "#f7f8f5",
  prateado: "#e3e4e5",
  grafite: "#5b5a57",
  "cinza espacial": "#535150",
  dourado: "#ead1ad",
  "dourado claro": "#f0dfbd",
  amarelo: "#f9e267",
  "laranja cosmico": "#f47731",
  vermelho: "#bd1f2d",
  "productred": "#bd1f2d",
  rosa: "#f2c4c9",
  "rosa palido": "#f2d8dc",
  roxo: "#c7b2d6",
  "roxo profundo": "#4b3f53",
  lavanda: "#d6cbe8",
  verde: "#a7c1ad",
  salvia: "#b6c3ad",
  "verde meia noite": "#4e5c50",
  "verde alpino": "#576856",
  "verde acinzentado": "#b7c5b9",
  azul: "#9dbad1",
  "azul ceu": "#c5dce8",
  "azul nevoa": "#b7c9d4",
  "azul pacifico": "#2d4e5c",
  "azul sierra": "#9bb5ce",
  "azul intenso": "#31425d",
  ultramarino: "#5b65c8",
  "titanio preto": "#3d3d3a",
  "titanio branco": "#ecebe6",
  "titanio azul": "#4c5968",
  "titanio natural": "#b9b0a2",
  "titanio deserto": "#c7ad93",
  estelar: "#f1ede5",
  "meia noite": "#22282d",
};

export const productVideos = {
  pro: new URL("../../assets/novidades/17pro.mp4", import.meta.url).href,
  proPoster: new URL("../../assets/novidades/endframe_17pro.jpg", import.meta.url).href,
  air: new URL("../../assets/novidades/air.mp4", import.meta.url).href,
  airPoster: new URL("../../assets/novidades/endframe_air.jpg", import.meta.url).href,
};

export const heroImages = {
  pro: new URL("../../assets/hero/iphone-17-pro.png", import.meta.url).href,
  air: new URL("../../assets/hero/iphone-air.png", import.meta.url).href,
};

export function normalizeFinish(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getIPhoneImage(modelId, color) {
  const folder = modelFolders[modelId];
  if (!folder) return "";

  const target = normalizeFinish(color).replaceAll(" ", "");
  const entries = Object.entries(iphoneImages).filter(([path]) => path.startsWith(folder));
  const match = entries.find(([path]) => {
    const fileName = path.split("/").at(-1).replace(/\.png$/i, "");
    return normalizeFinish(fileName).replaceAll(" ", "") === target;
  });

  return match?.[1] ?? entries[0]?.[1] ?? "";
}

export function getFeatureIPhoneImage(modelId, color) {
  if (modelId !== "17-pro") return getIPhoneImage(modelId, color);

  const target = normalizeFinish(color).replaceAll(" ", "");
  const match = Object.entries(featureImages).find(([path]) => {
    const fileName = path.split("/").at(-1).replace(/\.png$/i, "");
    return normalizeFinish(fileName).replaceAll(" ", "") === target;
  });

  return match?.[1] ?? getIPhoneImage(modelId, color);
}

export function getFinishColor(color) {
  const normalized = normalizeFinish(color).replace(/^\(|\)$/g, "");
  return swatches[normalized] ?? "#d2d2d7";
}
