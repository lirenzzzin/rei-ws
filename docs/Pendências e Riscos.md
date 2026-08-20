---
title: Pendências e Riscos
type: reference
status: active
updated: 2026-08-04
tags:
  - status/pendente
  - projeto/riscos
---

# Pendências e Riscos

## Antes de personalizar uma marca

- [ ] Definir identidade, localização e tom de voz.
- [ ] Definir canal de contato e conversão.
- [ ] Substituir textos e métricas placeholder.
- [ ] Revisar direitos de uso dos assets.

## Antes de produção

- [ ] Validar comercialmente modelos, capacidades, cores e especificações.
- [ ] Definir política de garantia e seminovos.
- [ ] Criar testes automatizados para rotas, query strings e carrinho.
- [ ] Adicionar lint e formatação.
- [ ] Definir fallback de SPA no provedor de hospedagem.
- [ ] Avaliar privacidade, cookies, analytics e requisitos legais.
- [ ] Medir peso de vídeos e imagens em rede móvel.
- [ ] Testar Safari/iOS e Android reais.
- [ ] Verificar navegação por teclado completa e trap de foco do carrinho.
- [ ] Inicializar Git e estratégia de backup, se autorizado.

## Riscos técnicos conhecidos

### Catálogo e mídia

- `import.meta.glob("/assets/**/*.png")` carrega o mapa inteiro eager; o volume pode impactar build e bundle de URLs.
- Fallback silencioso para a primeira imagem pode esconder erros de nome de acabamento.
- Vídeos locais são pesados para conexões móveis se não houver otimização e estratégia de preload.

### UI

- `src/styles.css` com 1.655 linhas aumenta risco de regressões globais.
- View Transition API e refratação variam por navegador; fallbacks devem permanecer funcionais.
- Cabeçalho com morph depende de medições de DOM e scroll.

### Dados

- O conteúdo inclui produtos recentes/futuros no momento da criação do template; especificações devem ser verificadas em fonte oficial antes de uso comercial.
- Não existe fonte de estoque ou preço.

### Operação

- Sem Git, mudanças locais não têm histórico de recuperação do projeto.
- Sem testes, validação depende de build e inspeção manual.

## Regra de priorização

Corrigir primeiro problemas que impedem compra ou navegação em celular. Depois tratar acessibilidade e dados incorretos; acabamento visual vem após os contratos funcionais.

## Relacionados

[[Operação e Validação]] · [[Catálogo e Carrinho]] · [[Assets e Mídia]]
