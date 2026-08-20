---
title: Personalização de Marca
type: guide
status: active
updated: 2026-08-04
tags:
  - projeto/personalizacao
  - projeto/escopo
---

# Personalização de Marca

## Ordem segura

### 1. Definir identidade

Editar primeiro `src/config/site.js`:

- `name`
- `displayName`
- `location`
- `tagline`
- `description`
- endereço, referência, horários e canal

### 2. Definir conversão

Escolher um único canal principal: WhatsApp, telefone, formulário, e-mail ou checkout. Registrar a decisão em [[Decisões e Restrições]] antes de alterar `FloatingCart` e `ContactButton`.

### 3. Substituir placeholders

- História em `AboutPage`.
- Garantia, experiência, clientes e entrega em `HomePage`.
- Dados e instruções em `ContactPage`.
- Estoque, condição e política comercial no catálogo.

### 4. Aplicar marca visual

- Logotipo e favicon.
- Paleta e tokens, sem quebrar contraste.
- Imagens próprias e direitos de uso.
- Tom de voz em todo o conteúdo.

### 5. Revisar catálogo

- Remover produtos que a loja não vende.
- Confirmar modelos, capacidades, cores e conectores.
- Definir política de seminovos.
- Só adicionar preço quando houver fonte e rotina de atualização.

### 6. Validar

Seguir [[Operação e Validação]] e revisar rotas, query strings, carrinho e contato.

## Contrato de neutralidade

Antes de uma personalização explícita, não inserir:

- nome ou logotipo de uma loja real;
- cidade, endereço ou telefone;
- WhatsApp ou mensagem pré-preenchida;
- links sociais;
- métricas inventadas;
- preço ou disponibilidade simulados como fatos.

## Checklist de entrega de marca

- [ ] Identidade centralizada em configuração.
- [ ] Todos os placeholders removidos.
- [ ] Canal externo testado com encoding correto.
- [ ] Política de privacidade e termos avaliados.
- [ ] Direitos de imagens e textos confirmados.
- [ ] Conteúdo revisado em português brasileiro.
- [ ] Desktop e celular validados.
- [ ] Build de produção aprovado.

## Relacionados

[[Contexto do Projeto]] · [[Catálogo e Carrinho]] · [[Pendências e Riscos]]
