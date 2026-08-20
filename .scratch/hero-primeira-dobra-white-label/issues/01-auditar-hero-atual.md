# Auditar a hero atual no código e no navegador

Type: research
Status: resolved
Priority: blocking
Blocked by: none

## Question

Quais fatos verificáveis no código e em breakpoints reais explicam os problemas de título, interseção, escala da mão, CTA, navegação, carrinho e primeira dobra relatados pelo usuário?

## Expected evidence

- Arquivos e linhas responsáveis.
- Capturas desktop e mobile.
- Medidas de viewport e caixas relevantes.
- Comportamento de acessibilidade e redução de movimento já existente.

## Comments

- Resolvido em [`../research/01-auditoria-hero-atual.md`](../research/01-auditoria-hero-atual.md). Gist: o breakpoint de 720 px derruba o H1 de 655 para 248 px e produz seis linhas; o pseudo-elemento do asset (`z-index: 2`) fica acima de todo o layout (`z-index: 1`), sem área segura; o mesmo PNG ocupa 82% do viewport desktop e 150% no mobile; nav, CTA, carrinho e copy são fixos e ainda não compõem uma arquitetura white-label. Reduced motion/transparency/contrast já têm fallbacks e devem ser preservados.
