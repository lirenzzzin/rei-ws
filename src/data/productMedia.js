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

const watchFamilyImages = {
  series: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/watch-compare-s11-202509?.v=dWNxM2FBcWh6K3lqd1ZDZ0J0SmQzekFLdnpTWVk5T2JjWkxmaUh4TE96K0Fhc0dPaExJNGphZ3FWVWlwSk9MUjd1Z1M3bThWSUVZMVcrMUZmTjBCLzQ3emJ1eTV0WHMvNWc0cG1uZVhXdEU&fmt=jpeg&hei=520&qlt=90&wid=520",
  se: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/watch-compare-se-202509?.v=eEpjZGlsbzI4YmtuR2pKQXNDTzZ5eThnZFRkdzMwY2NsY2I5Y3NQL214QzM2dk9rVWpEampSQXBqK3dUclB1WEdjSkVFV1FxeHRkZDFvRXAwaDZkVGRCVnRkbnoxcUU4aG9vT2t1SVBnd28&fmt=jpeg&hei=520&qlt=90&wid=520",
  ultra: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/watch-compare-ultra3-202509_GEO_BR?.v=L2VSQkd4TDVJZ2FsTFA2bmpPOGRLTEh2d2I2QWRTY0NRMFJRd2UzeExSdGpqWTd3QmZsaTR0RWczRFFQbWt1SmxyZTFMN3VtaTIzQW5MWDFYQUFpang4S0tkQVQyYmQ2NCt3czRObDFkd2NvZUFxYnFWZTA4SlNwWDZ5dVA4RGc&fmt=jpeg&hei=520&qlt=90&wid=520",
};

const watchModelImages = {
  "series-8": watchFamilyImages.series,
  "series-9": watchFamilyImages.series,
  "series-10": watchFamilyImages.series,
  "series-11": watchFamilyImages.series,
  "se-2": watchFamilyImages.se,
  "se-3": watchFamilyImages.se,
  ultra: watchFamilyImages.ultra,
  "ultra-2": watchFamilyImages.ultra,
  "ultra-3": watchFamilyImages.ultra,
};

const chargerImages = {
  "usb-c-lightning": "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MM0A3?.v=bDF5RFJXQVJDdHQzMUZvOFpZbElsMmorYzFkTG5HaE9wejd5WUxYZjRML0dhd3hTd0Z4eVU5dlRoTFZsS1dHQnF1RHVsWWtITU8zLy9oRVFmWitIakE&fmt=jpeg&hei=2000&qlt=90&wid=2000",
  "usb-c-usb-c": "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQKJ3?.v=SHpUSUtNbnRMTndDWEpjeFgxZ0c5V2orYzFkTG5HaE9wejd5WUxYZjRMK2k0MUtKM1cwZkI0WFZOa2NIRHpiRHJSd3NRNlBrUkNpQkIyQjhrbHZqb2c&fmt=jpeg&hei=2000&qlt=90&wid=2000",
  "adapter-20w": "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MUVU3?.v=bUljUWFoWU5tWWx6Yzc0M1I0aGtpZ2tuVHYzMERCZURia3c5SzJFOTlPZ0JzRncwa3hCV01oWVZJYmVjbndDL1BGU0ZvTStVOXQvUnY0bGRiVzVrSFE&fmt=jpeg&hei=1144&qlt=90&wid=1144",
  magsafe: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGD74?.v=aExnbXd2NkZ4NmZWdEdRL1Zzbi9oR2orYzFkTG5HaE9wejd5WUxYZjRMOHhwd2F1dWM5TE1maUVxSVV1anZjQXdYczhRdkV0elVtZUJkWHRSQU9iaHc&fmt=jpeg&hei=2000&qlt=90&wid=2000",
  "watch-cable": "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT0H3?.v=K0tKb29xaWdxVEFoa0c0dFFRY3Jld2tuVHYzMERCZURia3c5SzJFOTlPaFdPNXNCZjFUY2U4dzhjY0xjYWZIRjFydkI0djlScXlvb25UU0c3MFZZWUE&fmt=jpeg&hei=1144&qlt=90&wid=1144",
};

const swatches = {
  preto: "#1d1d1f",
  "preto brilhante": "#1d1d1f",
  "preto espacial": "#2e2c2f",
  branco: "#f5f5f0",
  "branco nuvem": "#f7f8f5",
  prateado: "#e3e4e5",
  grafite: "#5b5a57",
  "cinza espacial": "#535150",
  dourado: "#ead1ad",
  "dourado claro": "#f0dfbd",
  "ouro rosa": "#e7c1b8",
  amarelo: "#f9e267",
  "laranja cosmico": "#f47731",
  vermelho: "#bd1f2d",
  "product red": "#bd1f2d",
  productred: "#bd1f2d",
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

export function getWatchImage(modelId) {
  return watchModelImages[modelId] ?? watchFamilyImages.series;
}

export function getChargerImage(productId) {
  return chargerImages[productId] ?? "";
}

export function getFinishColor(color) {
  const normalized = normalizeFinish(color).replace(/^\(|\)$/g, "");
  return swatches[normalized] ?? "#d2d2d7";
}
