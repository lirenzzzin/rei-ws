---
title: Arquitetura e Rotas
type: reference
status: active
updated: 2026-08-04
tags:
  - projeto/arquitetura
  - frontend/react
---

# Arquitetura e Rotas

## Stack

- React 19 e React DOM.
- Vite 8 para desenvolvimento e build.
- Tailwind CSS 4 via plugin do Vite.
- Wouter para roteamento client-side.
- Glin UI para botão e refratação liquid glass.
- Framer Motion para layout compartilhado na vitrine.
- CSS próprio para tokens, layout, transições e responsividade.

## Entradas

- `index.html` fornece o contêiner da aplicação.
- `src/main.jsx` monta `<App />` em `StrictMode` e importa `src/styles.css`.
- `src/App.jsx` controla rotas, categoria ativa e carrinho persistente.

## Rotas

| Caminho | Componente | Função |
|---|---|---|
| `/` | `HomePage` | Hero, novidades, categorias e conteúdo institucional. |
| `/catalogo` | `CatalogPage` | Configuradores e filtros de categoria. |
| `/iphone-17-pro` | `FeaturedProductPage` | Experiência exclusiva do iPhone 17 Pro. |
| `/iphone-air` | `FeaturedProductPage` | Experiência exclusiva do iPhone Air. |
| `/sobre` | `AboutPage` | Pilares e história da futura marca. |
| `/contato` | `ContactPage` | Endereço, horário e canal placeholder. |
| fallback | `NotFoundPage` | Página não encontrada. |

## Parâmetros de URL

### Categoria

`/catalogo?categoria=<id>` aceita somente:

- `iphones`
- `carregadores`
- `apple-watch`

Valores inválidos são ignorados e a categoria padrão é `iphones`.

### Modelo

`/catalogo?modelo=<id>` inicializa o configurador na geração e no modelo correspondente. É usado pelos botões “Configurar” das páginas em destaque.

## Fluxo de estado

```text
App
├── activeCategory
│   ├── Navbar / filtros em morph
│   ├── HomePage / links de famílias
│   └── CatalogPage / configurador ativo
└── usePersistentCart
    ├── addItem → configuradores
    ├── removeItem / clearCart → FloatingCart
    └── localStorage
```

As escolhas internas de cada configurador são estados locais. O carrinho é o único estado persistido entre recargas.

## Aliases de Glin UI

`vite.config.js` cria aliases diretos para módulos internos da versão `0.1.1`:

- `@glinui/liquid-glass`
- `@glinui/button`

Esses aliases evitam carregar o barrel completo, mas dependem do layout interno atual do pacote. Ao atualizar Glin UI, confirmar se os subpaths continuam válidos.

## Build de assets

`src/data/productMedia.js` usa `import.meta.glob` eager para carregar PNGs em `/assets/`. O mapeamento entre modelo e pasta é manual; nomes de acabamento são normalizados para localizar arquivos.

## Relacionados

[[Mapa de Componentes]] · [[Catálogo e Carrinho]] · [[Assets e Mídia]]
