import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // A versão 0.1.1 não exporta o hook como subpath; este alias evita carregar o barrel inteiro.
      "@glinui/liquid-glass": fileURLToPath(
        new URL(
          "./node_modules/@glinui/ui/dist/lib/use-liquid-glass.js",
          import.meta.url,
        ),
      ),
      "@glinui/button": fileURLToPath(
        new URL(
          "./node_modules/@glinui/ui/dist/components/button.js",
          import.meta.url,
        ),
      ),
    },
  },
});
