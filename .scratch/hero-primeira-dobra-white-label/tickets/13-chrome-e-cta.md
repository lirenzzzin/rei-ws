# 13 — Chrome, CTA e carrinho na primeira dobra

Status: resolved
Type: implementation
Priority: important
Blocked by: none

## Escopo

Integrar a navegação à composição cinematográfica, dar ao CTA uma ação específica e manter o carrinho condicionado ao estado sem quebrar o Catálogo.

## Aceite

- CTA `Começar comparação` com área de toque e foco;
- carrinho vazio não compete com a hero;
- rotas e filtros existentes continuam funcionais;
- Glin permanece limitado ao chrome funcional.

## Evidência

- `src/components/HomeOpening.jsx` usa `Começar comparação` como CTA primário
  e mantém `Ver os modelos` como continuação editorial.
- `src/components/FloatingCart.jsx` retorna `null` quando não há seleções,
  evitando competir com a primeira dobra; com itens, o diálogo continua
  acessível.
- `src/components/Navbar.jsx` mantém `useLiquidGlass` do Glin apenas no chrome,
  com indicador direcional e morph entre navegação e filtros.
