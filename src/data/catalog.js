const finishes = {
  iphone11: ["Roxo", "Verde", "Amarelo", "Preto", "Branco", "(PRODUCT)RED"],
  iphone11Pro: ["Prateado", "Cinza-espacial", "Dourado", "Verde meia-noite"],
  iphone12: ["Preto", "Branco", "(PRODUCT)RED", "Verde", "Azul", "Roxo"],
  iphone12Pro: ["Prateado", "Grafite", "Dourado", "Azul-Pacífico"],
  iphone13: ["(PRODUCT)RED", "Estelar", "Meia-noite", "Azul", "Rosa", "Verde"],
  iphone13Pro: ["Grafite", "Dourado", "Prateado", "Azul-Sierra", "Verde-alpino"],
  iphone14: ["Meia-noite", "Estelar", "(PRODUCT)RED", "Azul", "Roxo", "Amarelo"],
  iphone14Pro: ["Prateado", "Dourado", "Preto-espacial", "Roxo-profundo"],
  iphone15: ["Preto", "Azul", "Verde", "Amarelo", "Rosa"],
  iphone15Pro: ["Titânio preto", "Titânio branco", "Titânio azul", "Titânio natural"],
  iphone16e: ["Preto", "Branco"],
  iphone16: ["Preto", "Branco", "Rosa", "Verde-acinzentado", "Ultramarino"],
  iphone16Pro: ["Titânio preto", "Titânio branco", "Titânio natural", "Titânio-deserto"],
  iphone17e: ["Preto", "Branco", "Rosa-pálido"],
  iphone17: ["Preto", "Branco", "Azul-névoa", "Sálvia", "Lavanda"],
  iphoneAir: ["Preto-espacial", "Branco-nuvem", "Dourado-claro", "Azul-céu"],
  iphone17Pro: ["Prateado", "Laranja-cósmico", "Azul-intenso"],
};

const variant = (id, name, storage, colors, connector = "Lightning") => ({
  id,
  name,
  storage,
  colors,
  connector,
});

export const iphoneGenerations = [
  {
    id: "11",
    label: "iPhone 11",
    year: "2019",
    variants: [
      variant("11", "iPhone 11", ["64 GB", "128 GB", "256 GB"], finishes.iphone11),
      variant("11-pro", "iPhone 11 Pro", ["64 GB", "256 GB", "512 GB"], finishes.iphone11Pro),
      variant("11-pro-max", "iPhone 11 Pro Max", ["64 GB", "256 GB", "512 GB"], finishes.iphone11Pro),
    ],
  },
  {
    id: "12",
    label: "iPhone 12",
    year: "2020",
    variants: [
      variant("12-mini", "iPhone 12 mini", ["64 GB", "128 GB", "256 GB"], finishes.iphone12),
      variant("12", "iPhone 12", ["64 GB", "128 GB", "256 GB"], finishes.iphone12),
      variant("12-pro", "iPhone 12 Pro", ["128 GB", "256 GB", "512 GB"], finishes.iphone12Pro),
      variant("12-pro-max", "iPhone 12 Pro Max", ["128 GB", "256 GB", "512 GB"], finishes.iphone12Pro),
    ],
  },
  {
    id: "13",
    label: "iPhone 13",
    year: "2021",
    variants: [
      variant("13-mini", "iPhone 13 mini", ["128 GB", "256 GB", "512 GB"], finishes.iphone13),
      variant("13", "iPhone 13", ["128 GB", "256 GB", "512 GB"], finishes.iphone13),
      variant("13-pro", "iPhone 13 Pro", ["128 GB", "256 GB", "512 GB", "1 TB"], finishes.iphone13Pro),
      variant("13-pro-max", "iPhone 13 Pro Max", ["128 GB", "256 GB", "512 GB", "1 TB"], finishes.iphone13Pro),
    ],
  },
  {
    id: "14",
    label: "iPhone 14",
    year: "2022",
    variants: [
      variant("14", "iPhone 14", ["128 GB", "256 GB", "512 GB"], finishes.iphone14),
      variant("14-plus", "iPhone 14 Plus", ["128 GB", "256 GB", "512 GB"], finishes.iphone14),
      variant("14-pro", "iPhone 14 Pro", ["128 GB", "256 GB", "512 GB", "1 TB"], finishes.iphone14Pro),
      variant("14-pro-max", "iPhone 14 Pro Max", ["128 GB", "256 GB", "512 GB", "1 TB"], finishes.iphone14Pro),
    ],
  },
  {
    id: "15",
    label: "iPhone 15",
    year: "2023",
    variants: [
      variant("15", "iPhone 15", ["128 GB", "256 GB", "512 GB"], finishes.iphone15, "USB-C"),
      variant("15-plus", "iPhone 15 Plus", ["128 GB", "256 GB", "512 GB"], finishes.iphone15, "USB-C"),
      variant("15-pro", "iPhone 15 Pro", ["128 GB", "256 GB", "512 GB", "1 TB"], finishes.iphone15Pro, "USB-C"),
      variant("15-pro-max", "iPhone 15 Pro Max", ["256 GB", "512 GB", "1 TB"], finishes.iphone15Pro, "USB-C"),
    ],
  },
  {
    id: "16",
    label: "iPhone 16",
    year: "2024",
    variants: [
      variant("16", "iPhone 16", ["128 GB", "256 GB", "512 GB"], finishes.iphone16, "USB-C"),
      variant("16-plus", "iPhone 16 Plus", ["128 GB", "256 GB", "512 GB"], finishes.iphone16, "USB-C"),
      variant("16-pro", "iPhone 16 Pro", ["128 GB", "256 GB", "512 GB", "1 TB"], finishes.iphone16Pro, "USB-C"),
      variant("16-pro-max", "iPhone 16 Pro Max", ["256 GB", "512 GB", "1 TB"], finishes.iphone16Pro, "USB-C"),
      variant("16e", "iPhone 16e", ["128 GB", "256 GB", "512 GB"], finishes.iphone16e, "USB-C"),
    ],
  },
  {
    id: "17",
    label: "iPhone 17",
    year: "2025–26",
    variants: [
      variant("17", "iPhone 17", ["256 GB", "512 GB"], finishes.iphone17, "USB-C"),
      variant("air", "iPhone Air", ["256 GB", "512 GB", "1 TB"], finishes.iphoneAir, "USB-C"),
      variant("17-pro", "iPhone 17 Pro", ["256 GB", "512 GB", "1 TB"], finishes.iphone17Pro, "USB-C"),
      variant("17-pro-max", "iPhone 17 Pro Max", ["256 GB", "512 GB", "1 TB", "2 TB"], finishes.iphone17Pro, "USB-C"),
      variant("17e", "iPhone 17e", ["256 GB", "512 GB"], finishes.iphone17e, "USB-C"),
    ],
  },
];

export const watchModels = [
  { id: "series-8", name: "Apple Watch Series 8", year: "2022", sizes: ["41 mm", "45 mm"], connectivity: ["GPS", "GPS + Cellular"], colors: ["Meia-noite", "Estelar", "Prateado", "(PRODUCT)RED"] },
  { id: "se-2", name: "Apple Watch SE (2ª geração)", year: "2022", sizes: ["40 mm", "44 mm"], connectivity: ["GPS", "GPS + Cellular"], colors: ["Meia-noite", "Estelar", "Prateado"] },
  { id: "ultra", name: "Apple Watch Ultra", year: "2022", sizes: ["49 mm"], connectivity: ["GPS + Cellular"], colors: ["Titânio natural"] },
  { id: "series-9", name: "Apple Watch Series 9", year: "2023", sizes: ["41 mm", "45 mm"], connectivity: ["GPS", "GPS + Cellular"], colors: ["Meia-noite", "Estelar", "Prateado", "Rosa", "(PRODUCT)RED"] },
  { id: "ultra-2", name: "Apple Watch Ultra 2", year: "2023", sizes: ["49 mm"], connectivity: ["GPS + Cellular"], colors: ["Titânio natural", "Titânio preto"] },
  { id: "series-10", name: "Apple Watch Series 10", year: "2024", sizes: ["42 mm", "46 mm"], connectivity: ["GPS", "GPS + Cellular"], colors: ["Preto brilhante", "Ouro rosa", "Prateado"] },
  { id: "series-11", name: "Apple Watch Series 11", year: "2025", sizes: ["42 mm", "46 mm"], connectivity: ["GPS", "GPS + Cellular"], colors: ["Cinza-espacial", "Prateado", "Ouro rosa", "Preto brilhante"] },
  { id: "se-3", name: "Apple Watch SE 3", year: "2025", sizes: ["40 mm", "44 mm"], connectivity: ["GPS", "GPS + Cellular"], colors: ["Meia-noite", "Estelar"] },
  { id: "ultra-3", name: "Apple Watch Ultra 3", year: "2025", sizes: ["49 mm"], connectivity: ["GPS + Cellular"], colors: ["Titânio natural", "Titânio preto"] },
];

export const chargerProducts = [
  { id: "usb-c-lightning", name: "Cabo USB-C para Lightning", detail: "Para iPhone 11 a 14", options: ["1 m", "2 m"], connection: "USB-C / Lightning" },
  { id: "usb-c-usb-c", name: "Cabo USB-C para USB-C", detail: "Para iPhone 15 ou posterior", options: ["1 m", "2 m"], connection: "USB-C / USB-C" },
  { id: "adapter-20w", name: "Adaptador de energia USB-C de 20W", detail: "Fonte compacta para recarga rápida", options: ["20W"], connection: "USB-C" },
  { id: "magsafe", name: "Carregador MagSafe", detail: "Recarga magnética compatível", options: ["1 m", "2 m"], connection: "MagSafe / USB-C" },
  { id: "watch-cable", name: "Cabo magnético para Apple Watch", detail: "Recarga rápida com conector USB-C", options: ["1 m"], connection: "Magnético / USB-C" },
];

export const deviceConditions = ["Lacrado", "Seminovo"];
