---
title: Contexto do Projeto
type: reference
status: active
updated: 2026-08-04
tags:
  - projeto/ativo
  - projeto/escopo
---

# Contexto do Projeto

## Objetivo

Construir um template institucional e comercial, mobile-first, para lojas independentes que vendem iPhones, Apple Watch e acessórios. A base deve ser fácil de personalizar para uma nova marca sem carregar nome, logotipo, cidade ou canal de atendimento de clientes anteriores.

## Caminho local

```text
/home/lorenzzo/Área de trabalho/loja iphone esboço
```

O cofre do projeto fica em `docs/` dentro dessa pasta.

## Proposta atual

- Interface branca e preta, minimalista e inspirada em princípios de design da Apple.
- Navegação e ações com material liquid glass usando Glin UI quando suportado.
- Catálogo visual para escolher modelo, acabamento, capacidade e condição.
- Carrinho local que preserva seleções e produz um resumo copiável.
- Páginas exclusivas para iPhone 17 Pro e iPhone Air com vídeo, destaques e escolha de acabamento.
- Conteúdo integralmente em português brasileiro.

## Escopo técnico

- Front-end estático em React.
- Sem backend, banco de dados, autenticação, checkout ou integração externa.
- Dados de catálogo mantidos em arquivos JavaScript.
- Assets locais compilados pelo Vite.
- Persistência do carrinho em `localStorage`.

## Princípios permanentes

1. **Mobile-first:** toda mudança deve funcionar primeiro em telas pequenas.
2. **Genérico por padrão:** identidade real só entra quando uma marca for explicitamente definida.
3. **Configuração antes de duplicação:** conteúdo de marca em `src/config/site.js`; catálogo em `src/data/`.
4. **Movimento com propósito:** transições devem explicar navegação ou mudança de estado e respeitar redução de movimento.
5. **Acessibilidade básica:** navegação por teclado, rótulos acessíveis, foco visível e semântica correta.
6. **Assets preservados:** originais e backups não devem ser sobrescritos durante recortes ou otimizações.
7. **Evidência antes de conclusão:** build e validação visual proporcional à mudança.

## O que não presumir

- Não existe loja real configurada.
- Não existe WhatsApp, telefone ou endereço definitivo.
- Não há preços nem estoque.
- Textos institucionais e métricas ainda são placeholders.
- Dados de produtos futuros ou recentes devem ser conferidos antes de publicação comercial.

## Relacionados

[[Estado Atual]] · [[Personalização de Marca]] · [[Decisões e Restrições]]
