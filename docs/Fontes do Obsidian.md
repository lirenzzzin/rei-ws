---
title: Fontes do Obsidian
type: reference
status: active
updated: 2026-08-04
tags:
  - obsidian
  - projeto/documentacao
---

# Fontes do Obsidian

Pesquisa realizada antes da criação das anotações, usando documentação oficial.

## Decisões derivadas

- **Markdown local:** um cofre é uma pasta de arquivos Markdown; por isso `docs/` permanece legível fora do Obsidian.
- **Configuração isolada:** preferências do cofre ficam em `.obsidian/`; arquivos voláteis de workspace são ignorados.
- **Propriedades YAML:** usadas apenas para metadados pequenos, estruturados e pesquisáveis.
- **Wikilinks:** usados por serem compactos; atualização automática de links está habilitada.
- **Backlinks e índice:** notas se conectam por links e por [[00 - Início]].
- **Templates nativos:** evitam dependência de plugins comunitários.
- **Busca nativa:** propriedades, tags, caminhos e tarefas podem ser consultados sem banco de dados externo.

## Referências oficiais

- [Como o Obsidian armazena dados](https://obsidian.md/help/data-storage)
- [Criar um cofre](https://obsidian.md/help/Getting%2Bstarted/Create%2Ba%2Bvault)
- [Propriedades](https://obsidian.md/help/properties)
- [Links internos](https://obsidian.md/help/links)
- [Backlinks](https://obsidian.md/help/backlinks)
- [Tags](https://obsidian.md/help/tags)
- [Busca](https://obsidian.md/help/plugins/search)
- [Templates](https://obsidian.md/help/plugins/templates)
- [Configurações de arquivos e links](https://obsidian.md/help/settings)

## Limites adotados

- Sem plugins comunitários neste momento.
- Sem Obsidian Sync configurado.
- Sem links simbólicos para diretórios externos.
- Sem guardar estado transitório como porta local, PID ou screenshot temporário.

## Relacionados

[[Guia do Cofre]] · [[Decisões e Restrições]]
