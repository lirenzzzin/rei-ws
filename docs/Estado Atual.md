---
title: Estado Atual
type: reference
status: active
updated: 2026-08-04
tags:
  - projeto/ativo
  - projeto/estado
---

# Estado Atual

Fotografia verificada diretamente no código em 2026-08-04.

## Implementado

- Home com hero, vitrine de iPhone 17 Pro e iPhone Air, famílias de produtos, destaques e chamada de contato.
- Imagem transparente do iPhone Air na mão sobrepondo parte do título da hero no desktop.
- Navegação fixa em liquid glass com indicador deslizante.
- Morph da navegação para filtros quando o filtro do catálogo alcança o cabeçalho.
- Catálogo com abas para iPhones, carregadores e Apple Watch.
- Configurador de iPhone por geração, modelo, cor, armazenamento e condição.
- Configuradores de Apple Watch e acessórios.
- Imagem do aparelho atualizada por acabamento com morph visual.
- Carrinho flutuante persistido em `localStorage`, remoção, limpeza e resumo copiável.
- Páginas `/iphone-17-pro` e `/iphone-air` com vídeo automático, estatísticas, acabamentos e capítulos.
- Transições de rota e estados de entrada.
- Fallbacks para `prefers-reduced-motion`, `prefers-reduced-transparency` e contraste elevado.
- Layouts adaptados para celular e desktop.

## Conteúdo ainda genérico

- `src/config/site.js` usa `Sua Loja`, cidade, endereço, horário e canal placeholders.
- Página Sobre contém história placeholder.
- Métricas de garantia, experiência, clientes e entrega usam “Informar…”.
- Página Contato não abre canal externo.
- O carrinho copia texto, mas não envia pedido.

## Números atuais

- 6 rotas explícitas e uma rota de fallback.
- 155 assets: 151 PNG, 2 JPG e 2 MP4.
- 4.115 linhas em arquivos JS, JSX e CSS dentro de `src/`.
- `src/styles.css` concentra 1.655 linhas.
- 41 skills de `mattpocock/skills` instaladas localmente em `.agents/skills/`.

## Dependências instaladas

| Pacote | Versão |
|---|---:|
| React | 19.2.8 |
| React DOM | 19.2.8 |
| Wouter | 3.10.0 |
| Framer Motion | 12.43.0 |
| Glin UI | 0.1.1 |
| Glin Tokens | 0.1.1 |
| Tailwind CSS | 4.3.3 |
| Vite | 8.2.0 |

## Ausências relevantes

- Nenhum repositório Git foi inicializado na raiz atual.
- Não existem scripts de teste, lint ou formatação.
- Não há suíte E2E versionada.
- Não há backend ou variáveis de ambiente.
- Não há monitoramento, analytics ou tratamento comercial de consentimento.

## Fonte de verdade

- Identidade: `src/config/site.js`
- Catálogo: `src/data/catalog.js`
- Mídia: `src/data/productMedia.js`
- Produtos em destaque: `src/data/featuredProducts.js`
- Rotas e estado global: `src/App.jsx`
- Visual e movimento: `src/styles.css`

## Relacionados

[[Arquitetura e Rotas]] · [[Pendências e Riscos]] · [[Operação e Validação]]
