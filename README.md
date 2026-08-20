# Template de loja de iPhones

Base mobile-first em React, Tailwind CSS, Wouter e Glin UI para criar sites de lojas de iPhone, Apple Watch e acessórios.

O projeto está propositalmente sem marca, cidade, logotipo ou canal externo de atendimento. Para iniciar uma nova identidade, edite primeiro `src/config/site.js` e depois aplique os ativos e o acabamento visual da marca.

## Rodar o projeto

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Pontos de personalização

- Nome, localização, descrição e contato: `src/config/site.js`
- Produtos e configurações: `src/data/catalog.js`
- Escala tipográfica e materiais: `src/styles.css`
- Navegação liquid glass: `src/components/Navbar.jsx`
- Home: `src/pages/HomePage.jsx`
- Catálogo e carrinho: `src/pages/CatalogPage.jsx` e `src/components/FloatingCart.jsx`

Não há backend, banco de dados nem redirecionamento para serviços externos. O carrinho gera um resumo copiável para ser conectado ao canal de venda definido pela futura marca.
