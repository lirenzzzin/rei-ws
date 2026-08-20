# 15 — QA da direção B

Status: resolved
Type: validation
Priority: blocking
Blocked by: none

## Escopo

Validar Home, Catálogo, Sobre, Contato e páginas de produto no Brave/Chromium e Firefox, com matriz mobile/desktop, teclado e preferências.

## Aceite

- sem cliff ou overflow;
- sem colisão de glifos;
- focus/rotas/carrinho preservados;
- budgets e manifesto de mídia registrados;
- build de produção aprovado.

## Evidência

- `npm run build` passou com Vite 8.2 (622 módulos).
- Brave validou `/` em 1440×900 e 390×844, sem overflow horizontal.
- O CTA levou a `/catalogo`; a navegação e o filtro de catálogo permaneceram
  renderizados.
- Capturas: `output/playwright/hero-wayfinder/hero-b-desktop-multiply.png`,
  `hero-b-mobile-fixed.png` e `catalog-after-hero.png`.
