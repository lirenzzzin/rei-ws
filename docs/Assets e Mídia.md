---
title: Assets e Mídia
type: reference
status: active
updated: 2026-08-04
tags:
  - frontend/assets
  - projeto/arquitetura
---

# Assets e Mídia

## Inventário

| Tipo | Quantidade |
|---|---:|
| PNG | 151 |
| JPG | 2 |
| MP4 | 2 |
| Total | 155 |

## Organização

```text
assets/
├── 11/ ... 17/           imagens por geração, modelo e acabamento
├── backup/               originais e estados anteriores preservados
├── feature/iphone-17-pro imagens tratadas da página Pro
├── hero/                 imagens dos cards em destaque
├── home/hero/            imagem da hero e recorte transparente
├── home/product-families imagens de iPhone, Watch e cabo
└── novidades/            filmes e endframes Pro/Air
```

## Assets especiais

- `assets/home/hero/iphone-air-in-hand.png`: original opaco.
- `assets/home/hero/iphone-air-in-hand-transparent.png`: cópia com fundo removido para a hero.
- `assets/novidades/17pro.mp4` e `air.mp4`: filmes das páginas exclusivas.
- `assets/novidades/endframe_17pro.jpg` e `endframe_air.jpg`: posters e cards.
- `assets/feature/iphone-17-pro/`: recortes tratados usados na troca de acabamento Pro.

## Convenção de nomes

O nome do arquivo deve representar o acabamento em português e permanecer compatível com `normalizeFinish`. A normalização remove acentos, caixa e separadores, mas não corrige nomes semanticamente diferentes.

Exemplo:

```text
Laranja-cósmico → laranjacosmico → laranja-cosmico.png
```

## Regras de edição

- Nunca sobrescrever o original sem criar ou confirmar backup.
- Preferir PNG com alpha verdadeiro quando o elemento deve sobrepor o layout.
- Inspecionar halos em fundo claro e escuro depois de remover background.
- Manter proporções consistentes entre cores do mesmo modelo.
- Comprimir apenas após comparação visual.
- Não renomear pastas ou arquivos sem atualizar `src/data/productMedia.js`.

## Validação de mídia

- Imagem correta para cada cor e modelo.
- Ausência de retângulo branco ou pixels de borda.
- Palco não muda de tamanho durante morph.
- Poster e primeiro frame do vídeo combinam.
- `muted`, `playsInline` e poster presentes em vídeos automáticos.
- Enquadramento adequado em 390px e desktop.

## Relacionados

[[Catálogo e Carrinho]] · [[Sistema Visual e Movimento]] · [[Pendências e Riscos]]
