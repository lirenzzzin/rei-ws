---
title: Sistema Visual e Movimento
type: reference
status: active
updated: 2026-08-04
tags:
  - frontend/design
  - frontend/motion
---

# Sistema Visual e Movimento

## Direção

- Branco e preto minimalista.
- Tipografia de sistema Apple quando disponível: `-apple-system`, `BlinkMacSystemFont`, SF Pro e fallbacks.
- Hierarquia forte, bastante espaço negativo e cantos amplos.
- Superfícies cinza-claro para separar seções sem poluição visual.
- Liquid glass restrito a navegação e ações flutuantes.

## Tokens principais

Definidos no início de `src/styles.css`:

- `--color-canvas`: fundo branco.
- `--color-surface`: cinza de superfície.
- `--color-ink`: texto principal.
- `--color-muted` e `--color-tertiary`: hierarquia secundária.
- Durações de saída, entrada e movimento.
- Variáveis de blur, saturação e sombra para vidro.

## Liquid glass

Glin UI fornece `useLiquidGlass`. Os componentes usam também um fallback CSS:

- `Navbar`: perfil squircle, blur 20 e displacement 10.
- `CatalogFilters`: barra liquid glass local.
- `FeaturedProductPage`: CTA sobre o filme.
- `FloatingCart`: perfil circular escuro.

O atributo `data-glin-liquid-glass` distingue refratação suportada de fallback.

## Movimento

### Navegação

`AnimatedLink` e `runViewTransition` usam a View Transition API quando disponível. A direção depende da posição da aba:

- avanço: conteúdo antigo vai para a esquerda e novo entra pela direita;
- retorno: comportamento inverso;
- nav e carrinho persistentes têm nomes de transição próprios.

### Entrada no viewport

Elementos com `data-pop-in` começam com opacidade menor, escala reduzida, deslocamento vertical e blur. `ViewportPopIn` revela o elemento quando ele entra na área visível.

### Troca de produto

`MorphingProductImage` mantém duas imagens no mesmo palco e faz morph de escala, blur, saturação e clip-path. O contêiner tem dimensões estáveis para impedir que as imagens “fujam” durante a troca.

### Vitrine Pro/Air

Framer Motion controla layout compartilhado nos cards. Os vídeos só são reproduzidos depois que o usuário entra na página exclusiva.

## Hero

- Texto principal fica na camada de conteúdo.
- `iphone-air-in-hand-transparent.png` é desenhado por pseudo-elemento.
- No desktop, a ponta do celular pode sobrepor parte das letras.
- No celular, a imagem permanece abaixo do texto para preservar leitura.
- A camada visual não captura eventos de ponteiro.

## Responsividade

- Base para celular, com expansão em `720px` e `1024px`.
- Seletores de modelo usam `<select>` em vez de carrosséis horizontais obrigatórios.
- Sheet do carrinho ocupa a base no celular e a lateral no desktop.
- Vídeos de produto têm enquadramento específico por tema e breakpoint.

## Acessibilidade

- `prefers-reduced-motion` desativa transições e animações.
- `prefers-reduced-transparency` troca vidro por superfícies opacas.
- `prefers-contrast: more` reforça bordas e contraste.
- Botões de acabamento usam `aria-label` e `aria-pressed`.
- Carrinho usa `role="dialog"`, `aria-modal`, foco inicial e Escape.
- Foco visível global e áreas de toque mínimas.

## Regra para novas animações

Toda animação deve:

1. comunicar causalidade ou continuidade espacial;
2. ser breve e interruptível;
3. não impedir interação;
4. manter layout estável;
5. possuir fallback para redução de movimento;
6. ser validada em celular real ou viewport equivalente.

## Relacionados

[[Mapa de Componentes]] · [[Decisões e Restrições]] · [[Operação e Validação]]
