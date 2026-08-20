---
title: Operação e Validação
type: guide
status: active
updated: 2026-08-04
tags:
  - projeto/operacao
  - frontend/qa
---

# Operação e Validação

## Requisitos

- Node.js e npm disponíveis.
- Dependências instaladas com `npm install` ou `npm ci` quando houver ambiente limpo.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

Não existem scripts de `test`, `lint` ou `format` no `package.json` atual.

## Gate mínimo por tipo de mudança

### Conteúdo ou documentação

- Conferir acentuação e consistência.
- Verificar links e caminhos citados.
- Rodar build se o conteúdo alterado estiver em `src/`.

### Componente ou estilo

- `npm run build`.
- Abrir rota afetada em desktop e celular.
- Conferir console sem erros.
- Testar teclado, foco e área de toque.
- Testar `prefers-reduced-motion` quando houver movimento.

### Catálogo ou assets

- Percorrer modelo, cor e opções alteradas.
- Confirmar imagem e acabamento correspondentes.
- Adicionar ao carrinho e conferir o resumo.
- Testar deep link com `?modelo=` ou `?categoria=`.

### Navegação

- Testar todas as rotas e voltar/avançar do navegador.
- Conferir direção da transição.
- Testar entrada direta na URL e recarga.
- Confirmar que o cabeçalho não bloqueia o conteúdo.

## Viewports prioritários

- Celular estreito: 390 × 844.
- Celular Android próximo ao viewport real do usuário.
- Tablet: aproximadamente 768px.
- Desktop: 1280px ou mais.

Não concluir uma mudança mobile-first usando apenas desktop redimensionado sem observar overflow, recorte, toque e scroll.

## Fluxos críticos

1. Home → card Pro/Air → página exclusiva → Configurar → catálogo no modelo correto.
2. Home → família de produto → categoria correta do catálogo.
3. Trocar geração, modelo e cor sem deslocamento de layout.
4. Adicionar iPhone, Watch e carregador ao carrinho.
5. Recarregar e confirmar persistência.
6. Copiar resumo e validar todo o conteúdo selecionado.
7. Navegação e filtros fazendo morph no scroll do catálogo.

## Estado do versionamento

A raiz atual não contém `.git`. `git status` retorna “not a git repository”. Antes de colaboração ou deploy contínuo, inicializar versionamento somente com autorização explícita e revisar arquivos grandes de mídia.

## Não versionar como estado compartilhado

- `docs/.obsidian/workspace.json`
- `docs/.obsidian/workspaces.json`
- caches do Vite e do navegador
- screenshots temporários
- `dist/`, salvo requisito específico de deploy

## Relacionados

[[Estado Atual]] · [[Pendências e Riscos]] · [[Como Trabalhar Neste Projeto]]
