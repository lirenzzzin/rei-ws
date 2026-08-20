---
title: Mapa de Componentes
type: reference
status: active
updated: 2026-08-04
tags:
  - projeto/arquitetura
  - frontend/componentes
---

# Mapa de Componentes

## Páginas

| Arquivo | Responsabilidade |
|---|---|
| `src/pages/HomePage.jsx` | Monta hero, novidades, famílias, destaques e CTA institucional. |
| `src/pages/CatalogPage.jsx` | Escolhe o configurador conforme a categoria ativa. |
| `src/pages/FeaturedProductPage.jsx` | Página parametrizada para Pro e Air. |
| `src/pages/AboutPage.jsx` | Conteúdo institucional genérico. |
| `src/pages/ContactPage.jsx` | Dados de contato vindos de `siteConfig`. |
| `src/pages/NotFoundPage.jsx` | Fallback de rota. |

## Chrome global

| Componente | Responsabilidade |
|---|---|
| `Navbar` | Navegação fixa, indicador, esconder/mostrar e morph para filtros. |
| `Footer` | Marca genérica, links e aviso de independência da Apple. |
| `FloatingCart` | Botão liquid glass, sheet, itens e resumo copiável. |
| `ScrollToTop` | Restaura o topo na troca de rota. |
| `ViewportPopIn` | Observa elementos `data-pop-in` e controla entrada no viewport. |

## Home

| Componente | Responsabilidade |
|---|---|
| `HomeOpening` | Hero principal e imagem lateral do iPhone Air na mão. |
| `FeaturedProductShowcase` | Introdução e carregamento lazy da vitrine. |
| `ui/fluid-expanding-grid` | Cards clicáveis Pro/Air com Framer Motion. |
| `ProductFamilyCard` | Liga imagem de família ao filtro correto do catálogo. |
| `SectionIntro` | Cabeçalho reutilizável de seção. |

## Catálogo

| Componente | Responsabilidade |
|---|---|
| `CatalogFilters` | Barra local e controles que podem ocupar o cabeçalho. |
| `IPhoneConfigurator` | Geração, modelo, cor, capacidade, condição e imagem. |
| `WatchConfigurator` | Modelo, caixa, conectividade, cor e condição. |
| `ChargerConfigurator` | Produto, comprimento ou potência e conexão. |
| `ChoiceGroup` | Grupo reutilizável de escolhas em pills. |
| `AddButton` | Adiciona a configuração ao carrinho. |
| `MorphingProductImage` | Crossfade/morph estável entre imagens de produto. |
| `ProductGlyph` | Ilustrações lineares para produtos sem imagem. |

## Produto em destaque

| Componente | Responsabilidade |
|---|---|
| `FeaturedProductPage` | Orquestra filme, números, acabamento e capítulos. |
| `ProductFilm` | Autoplay mudo, `playsInline` e replay ao retornar à aba. |
| `MorphingProductImage` | Troca de acabamento sem deslocar o layout. |

## Utilitários

| Arquivo | Responsabilidade |
|---|---|
| `AnimatedLink` | Navegação com View Transition API e fallback. |
| `lib/viewTransitions.js` | Direção e execução interruptível das transições. |
| `hooks/usePersistentCart.js` | Leitura/escrita do carrinho em `localStorage`. |
| `hooks/useFloatingScrollMotion.js` | Movimento sutil associado ao scroll quando utilizado. |
| `lib/utils.js` | Composição de classes via `cn`. |
| `Container` | Largura e padding consistentes. |
| `PageHeader` | Cabeçalho comum de páginas institucionais. |
| `ContactButton` | Link interno para `/contato`; não é integração externa. |

## Regra de composição

Antes de criar um componente novo, procure responsabilidade equivalente. Dados comerciais devem permanecer em `src/config/` ou `src/data/`; páginas devem orquestrar e componentes devem encapsular comportamento reutilizável.

## Relacionados

[[Arquitetura e Rotas]] · [[Sistema Visual e Movimento]] · [[Catálogo e Carrinho]]
