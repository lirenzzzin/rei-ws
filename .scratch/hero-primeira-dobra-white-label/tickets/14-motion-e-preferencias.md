# 14 — Reveal e preferências de acessibilidade

Status: resolved
Type: implementation
Priority: blocking
Blocked by: none

## Escopo

Adicionar entrada coordenada curta, estado settled e equivalentes para reduced motion, reduced transparency e contraste elevado.

## Aceite

- uma única entrada, sem loop;
- transform/opacity, sem bloquear clique;
- reduced motion usa estado estático/crossfade;
- vídeo não é requisito para entender ou operar a hero.

## Evidência

- `src/components/HomeOpening.jsx` revela copy, mídia e máscara uma única vez;
  o vídeo tem `autoPlay`, `muted`, `playsInline` e nenhum `loop`.
- `src/styles.css` usa apenas transform/opacity/clip-path no reveal e neutraliza
  o movimento em `prefers-reduced-motion: reduce`; `prefers-contrast: more`
  reforça as superfícies funcionais.
