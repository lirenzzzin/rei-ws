---
title: Catálogo e Carrinho
type: reference
status: active
updated: 2026-08-04
tags:
  - frontend/catalogo
  - projeto/arquitetura
---

# Catálogo e Carrinho

## Fonte dos dados

`src/data/catalog.js` define todo o catálogo configurável. Não há consulta remota.

### iPhones

- Gerações 11 a 17.
- Variantes mini, normal, Plus, Pro, Pro Max, `e` e Air conforme a geração cadastrada.
- Cada variante possui `id`, nome, capacidades, acabamentos e conector.
- Gerações 11 a 14 usam Lightning por padrão.
- Geração 15 ou posterior usa USB-C nos dados atuais.

### Apple Watch

Modelos cadastrados de 2022 a 2025, com tamanho de caixa, conectividade e acabamento.

### Carregadores

- Cabo USB-C para Lightning.
- Cabo USB-C para USB-C.
- Adaptador USB-C de 20W.
- MagSafe.
- Cabo magnético para Apple Watch.

## Fluxo do iPhone

1. Ler `modelo` da URL, quando presente.
2. Escolher geração.
3. Escolher variante.
4. Escolher acabamento no palco do produto.
5. Escolher armazenamento e condição.
6. Adicionar uma fotografia da seleção ao carrinho.

Ao trocar geração ou modelo, capacidade e cor voltam à primeira opção válida daquele item.

## Mapeamento de imagem

`src/data/productMedia.js`:

- associa cada `modelId` a uma pasta em `assets/`;
- remove acentos, pontuação e espaços do nome da cor;
- compara o resultado com o nome do arquivo PNG;
- usa a primeira imagem da pasta como fallback.

Alterar um ID ou nome de arquivo sem atualizar esse mapa pode exibir o acabamento errado silenciosamente.

## Contrato do carrinho

Cada item adicionado contém:

```js
{
  id,
  kind,
  title,
  image?,
  details: []
}
```

O hook `usePersistentCart` adiciona um UUID e persiste a lista sob a chave:

```text
loja-iphone-template-cart-v1
```

## Saída atual

O botão final copia um resumo textual para a área de transferência. Ele não abre WhatsApp, não envia formulário e não confirma estoque ou preço.

Exemplo:

```text
Resumo do pedido:

1. iPhone 17 Pro
   • Armazenamento: 256 GB
   • Cor: Laranja-cósmico
   • Condição: Lacrado
   • Conector: USB-C
```

## Ao conectar uma marca real

- Definir o canal de finalização e consentimento do usuário.
- Serializar o mesmo contrato do carrinho; evitar remontar a seleção em vários lugares.
- Codificar corretamente a mensagem em URLs externas.
- Não incluir preço até existir fonte confiável e política de atualização.
- Confirmar disponibilidade e condições fora do front-end estático.

## Relacionados

[[Assets e Mídia]] · [[Personalização de Marca]] · [[Pendências e Riscos]]
