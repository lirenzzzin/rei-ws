---
title: Decisões e Restrições
type: reference
status: active
updated: 2026-08-04
tags:
  - projeto/decisoes
  - projeto/arquitetura
---

# Decisões e Restrições

## Decisões ativas

### Template sem marca

O produto permanece genérico até receber uma identidade explicitamente solicitada. Isso inclui contato e destino comercial.

### Mobile-first

A experiência em tela pequena tem prioridade sobre composições ornamentais de desktop. O desktop pode sobrepor elementos quando a legibilidade continuar segura.

### Catálogo configurador

O catálogo não é um grid tradicional de produtos com preço. Ele conduz escolhas por geração, modelo e configuração, depois adiciona um resumo ao carrinho.

### Carrinho local

Sem backend, o carrinho usa `localStorage` e copia um resumo. Integração externa será uma decisão da futura marca.

### Imagens estáveis

Trocas de acabamento usam palco fixo e morph. Não usar transições que empurrem imagens para fora da tela.

### Liquid glass com fallback

Glin UI é usado onde a refratação traz hierarquia. CSS garante aparência aceitável quando o recurso não é suportado ou a transparência é reduzida.

### Movimento acessível

Movimento pode existir, mas deve respeitar `prefers-reduced-motion` e nunca ser necessário para compreender ou operar o site.

### Documentação local

Este cofre usa Markdown, propriedades, links e plugins nativos. Plugins comunitários exigem necessidade concreta e revisão prévia.

## Restrições técnicas

- Sem backend e banco de dados.
- Sem preços ou estoque em tempo real.
- Sem segredos no front-end ou no cofre.
- Aliases de Glin UI dependem da estrutura interna da versão 0.1.1.
- `src/styles.css` é global e grande; alterações têm raio de impacto amplo.
- Nomes de assets estão acoplados à normalização de acabamentos.
- Wouter não fornece automaticamente configuração de fallback do servidor para deep links.

## Como registrar uma nova decisão

1. Criar nota a partir de [[Templates/Decisão]].
2. Explicar contexto, opções e consequência.
3. Ligar a nota aqui.
4. Atualizar a documentação afetada depois da implementação.

## Relacionados

[[Contexto do Projeto]] · [[Sistema Visual e Movimento]] · [[Pendências e Riscos]]
