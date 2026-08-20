---
title: Como Trabalhar Neste Projeto
type: guide
status: active
updated: 2026-08-04
tags:
  - projeto/agentes
  - projeto/operacao
---

# Como Trabalhar Neste Projeto

Este documento é o ponto de entrada para agentes e colaboradores.

## Antes de editar

1. Ler [[Contexto do Projeto]] e [[Estado Atual]].
2. Ler a nota da área afetada.
3. Inspecionar os arquivos reais citados; a nota não substitui o código.
4. Identificar assets e estado existente antes de criar algo novo.
5. Confirmar se a mudança é genérica ou específica de uma marca.

## Durante a implementação

- Preservar alterações existentes do usuário.
- Fazer a menor mudança coerente com o pedido.
- Manter conteúdo em português brasileiro.
- Reutilizar componentes e dados centralizados.
- Não inserir credenciais ou dados pessoais.
- Não executar skills instaladas sem elas serem pertinentes à tarefa atual.
- Usar Apple Design e Glin UI com contenção, não como decoração automática.
- Garantir fallback e redução de movimento para qualquer interação nova.

## Depois da implementação

1. Seguir o gate correspondente em [[Operação e Validação]].
2. Atualizar apenas as notas afetadas.
3. Registrar uma mudança relevante em [[Registro de Mudanças]].
4. Declarar claramente o que foi validado e o que permanece pendente.

## Ordem de fontes

Em caso de conflito:

1. Pedido atual do usuário.
2. Código e comportamento verificados.
3. [[Decisões e Restrições]].
4. Demais notas do cofre.
5. Histórico de conversas.

## O que não guardar no cofre

- Senhas, tokens e contatos privados.
- Porta temporária do servidor.
- PIDs, sessões de terminal e caches.
- Logs extensos ou transcrições completas.
- Afirmações não verificadas apresentadas como estado atual.

## Busca rápida

```bash
rg -n "termo" docs src
rg --files src assets docs | sort
```

## Relacionados

[[00 - Início]] · [[Guia do Cofre]] · [[Operação e Validação]]
