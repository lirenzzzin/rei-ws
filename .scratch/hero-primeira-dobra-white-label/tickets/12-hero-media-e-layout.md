# 12 — Hero B: mídia e layout

Status: resolved
Type: implementation
Priority: blocking

## Escopo

Implementar a composição cinematográfica da hero com poster desktop/mobile, vídeo opcional sem loop, fallback estático, área segura e layout sem cliff entre 720–899px.

## Arquivos esperados

- `src/components/HomeOpening.jsx`
- `src/styles.css`

## Aceite

- produto é o ponto focal;
- mão não cobre o conteúdo;
- mobile usa fonte de mídia distinta;
- poster funciona sem vídeo/JavaScript;
- sem overflow horizontal.

## Evidência

- `src/components/HomeOpening.jsx` separa `desktopPoster`, `mobilePoster` e
  `campaignVideo`; o vídeo é opcional e sem loop.
- `src/styles.css` mantém a mídia em camada própria, com área segura para o
  texto e `min-height: 0` no layout para não empurrar o asset para fora da
  dobra no mobile.
- Brave 1440×900 e 390×844 validados em
  `output/playwright/hero-wayfinder/hero-b-desktop-final.png` e
  `hero-b-mobile-fixed.png`; `scrollWidth === clientWidth`.
