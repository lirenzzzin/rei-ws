---
title: Guia do Cofre
type: guide
status: active
updated: 2026-08-04
tags:
  - projeto/documentacao
  - obsidian
---

# Guia do Cofre

## Por que esta estrutura funciona

O Obsidian armazena notas como Markdown simples. Assim, o mesmo conteúdo pode ser lido pelo aplicativo, pelo terminal, por editores de código e por agentes. O cofre fica em `docs/`, dentro do projeto, para que contexto e implementação permaneçam próximos.

A organização usa poucas notas de escopo claro, conectadas por `[[wikilinks]]` e reunidas em [[00 - Início]]. Pastas são reservadas apenas para entrada, anexos e templates.

## Propriedades padrão

Cada nota deve começar com propriedades YAML pequenas e previsíveis:

```yaml
---
title: Nome legível
type: guide | reference | decision | task | investigation | log | index
status: draft | active | blocked | done | superseded
updated: YYYY-MM-DD
tags:
  - projeto/area
---
```

Use propriedades para dados atômicos e pesquisáveis. Não coloque parágrafos, listas complexas ou explicações longas no YAML.

## Links

- Use `[[Nome da Nota]]` para relações duráveis.
- Use `[[Nome da Nota#Seção]]` quando a seção for um contrato estável.
- Adicione um link apenas quando ele ajuda a navegar ou explica uma dependência.
- O cofre atualiza links internos automaticamente quando uma nota é renomeada.
- Evite referências de bloco (`#^id`) porque são específicas do Obsidian e menos portáveis.

## Tags

Tags representam estado ou área transversal; links representam conceitos e documentos. Use poucas tags hierárquicas:

- `projeto/ativo`, `projeto/documentacao`, `projeto/arquitetura`
- `frontend/catalogo`, `frontend/design`, `frontend/assets`
- `status/pendente`, `status/bloqueado`

## Caixa de entrada

Ideias rápidas entram em `00 - Caixa de Entrada/`. Antes de implementar:

1. Confirmar a intenção com o código real.
2. Mover o conteúdo para a nota temática ou criar uma nota usando um template.
3. Ligar a nota a pelo menos um índice ou documento relacionado.
4. Atualizar a propriedade `updated`.

## Pesquisas úteis

No Obsidian, `Ctrl+Shift+F` abre a busca global.

```text
tag:#status/pendente
[status:blocked]
path:"Templates"
task-todo:
content:"placeholder"
file:"Decisão"
```

No terminal:

```bash
rg -n "termo" docs
rg --files docs | sort
rg -n "status: (blocked|draft)" docs
```

## Templates

O plugin nativo Templates está habilitado e aponta para `Templates/`. Use:

- [[Templates/Decisão]] para escolhas de arquitetura ou produto.
- [[Templates/Tarefa]] para mudanças implementáveis.
- [[Templates/Investigação]] para bugs e comportamento visual.
- [[Templates/Registro de Mudança]] para entregas relevantes.

## Manutenção mínima

- Atualize apenas as notas afetadas por uma mudança.
- Registre deltas, não transcrições de conversa.
- Não copie arquivos de código inteiros para o cofre; use caminhos e descreva contratos.
- Não registre credenciais, tokens, telefones privados ou dados de clientes.
- Não instale plugins comunitários sem necessidade e revisão explícita.

## Relacionados

[[Como Trabalhar Neste Projeto]] · [[Operação e Validação]] · [[Fontes do Obsidian]]
