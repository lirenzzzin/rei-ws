# Spec — Direção B: Cinematográfica controlada

Status: draft-awaiting-approval
Escopo: especificação isolada para `/to-spec`; nenhuma alteração de produção.
Decisão de direção: aprovada pelo usuário em 2026-08-04.

## 1. Resultado desejado

Uma abertura de campanha curta e precisa: o produto aparece em um asset com profundidade, o texto é reduzido e legível, uma máscara/reveal conduz o olhar para o aparelho e a composição termina em um estado estável que convida à comparação.

O efeito cinematográfico deve vir do enquadramento, da luz, da profundidade e de uma entrada coordenada. Não deve depender de glow, partículas, parallax agressivo, rotação infinita ou um vídeo para ser compreendido.

## 2. Escopo

Incluído:

- hero da Home e sua relação imediata com o início da próxima seção;
- masthead editorial inicial e estado sticky;
- CTA principal e indicação de continuidade;
- política de carrinho na primeira dobra;
- asset desktop, asset mobile, poster e fallback estático;
- entrada curta do texto e da mídia;
- contrato white-label da campanha;
- acessibilidade, redução de movimento/transparência/contraste e gates de performance.

Fora deste spec:

- catálogo, configurador, checkout ou backend;
- páginas exclusivas de produto além da compatibilidade de navegação;
- compra/licenciamento de fotografia ou vídeo;
- substituição do asset atual;
- implementação de produção ou migração de `src/styles.css`.

## 3. Composição aprovada

### Desktop

```text
┌ marca ───────── links ───── ação / carrinho ┐
│                                              │
│                    plano visual de campanha │
│ eyebrow             ┌───────────────┐       │
│ título curto        │ aparelho      │       │
│ apoio               │ + gesto/mão   │       │
│ CTA →               └───────────────┘       │
│                                              │
│                  próximo capítulo ↓         │
└──────────────────────────────────────────────┘
```

- O asset ocupa um campo amplo, mas a área de leitura é reservada antes do recorte.
- O aparelho é o ponto focal; mão, cenário e profundidade dão contexto secundário.
- A mídia pode começar atrás do conteúdo e revelar uma camada frontal somente dentro da área segura aprovada.
- O texto não fica preso a uma coluna fixa de 50%; o preset define composição por receitas testadas.

### Mobile

```text
┌ marca ───── menu ─ carrinho ┐
│                             │
│ eyebrow                     │
│ título curto                │
│ apoio                       │
│ CTA                         │
│                             │
│ poster / vídeo vertical     │
│ aparelho aparece de baixo   │
│ mão termina sob o enquadre  │
└ início da comparação ──────┘
```

- Mobile recebe master dedicado 4:5 ou 9:16; não é crop extremo do arquivo horizontal.
- O gesto parte de baixo ou da lateral inferior, sem cobrir o título e o CTA.
- O primeiro frame/poster já precisa ser bonito e compreensível sem movimento.
- O aparelho estabiliza antes do começo da comparação; o card ou CTA seguinte não pode ficar separado artificialmente do produto.

## 4. Conteúdo

O contrato mantém uma frase acessível completa e grupos semânticos opcionais para direção de arte. O primeiro fixture aprovado para protótipo é:

- eyebrow: `Encontre o que muda para você`;
- título: `Não escolha pelo número. Escolha pelo que muda para você.`;
- apoio: `Compare gerações, tamanhos e acabamentos com contexto, sem transformar a escolha em uma ficha técnica.`;
- CTA: `Começar comparação`;
- continuidade: `Veja os modelos`.

Esses textos são fixtures, não conteúdo definitivo de uma futura loja.

Regras:

- desktop: alvo de 2–3 linhas no título;
- mobile: alvo de 3–4 linhas;
- nenhum grupo semântico pode gerar órfão visual evidente;
- a frase completa permanece disponível para tecnologia assistiva;
- texto longo cai para wrapping seguro, sem `<br>` global obrigatório;
- fonte fallback precisa ser testada antes de liberar uma quebra editorial específica.

## 5. Contrato white-label proposto

Formato conceitual para validação; não é API implementada:

```text
heroCampaign: {
  preset: "campaign-reveal",
  content: {
    eyebrow,
    headline,
    headlineGroups?,
    description,
    primaryAction,
    continuationLabel?
  },
  theme: {
    displayFont,
    bodyFont,
    roles: { canvas, foreground, muted, surface, stroke, accent }
  },
  composition: {
    density: "compact" | "standard",
    assetEntry: "start" | "end" | "bottom",
    depthRecipe: "media-behind" | "masked-crossing" | "media-front-safe"
  },
  behavior: {
    motionProfile: "campaign" | "none",
    stickyNavigation: true,
    cartPolicy: "hidden-when-empty" | "nav-when-populated"
  },
  assets: {
    desktop: { src, poster, width, height, alt, licenseRef },
    mobile: { src, poster, width, height, alt, licenseRef },
    fallback: { src, width, height, alt, licenseRef }
  }
}
```

Guardrails:

- não expor `x`, `y`, `z-index` ou dezenas de escalas arbitrárias;
- profundidade vem de três receitas testadas;
- asset ausente ou falho produz uma hero tipográfica estável com CTA e navegação;
- licença, fonte, autor, cliente autorizado e hashes são obrigatórios no manifesto;
- cada cliente deve ter seus próprios direitos; o template não distribui licença entre lojas.

## 6. Componentes e integração Glin UI

Usar somente APIs confirmadas na instalação local `@glinui/ui@0.1.1`:

- `GlassNavbar` como primitive semântica adaptada; não aceitar sua geometria full-width como composição final;
- `Button` com `asChild` ou `Link` para CTA, preservando alvo de toque e foco;
- `Popover` + `Badge` para carrinho desktop, ancorado ao trigger;
- `Tabs` apenas para painéis de conteúdo, nunca para rotas;
- tokens de glass/motion para chrome pequeno, com fallback CSS.

Não usar no preset:

- `GlassCard`, `GlassDock`, `FloatingPanel`, `MagneticCTA`, `LiquidButton`, glow ou efeitos de partículas;
- `MorphingTabs` como navegação principal, pois sua implementação local não fornece roving tabindex nem painéis associados;
- `Sheet` cru. O componente local injeta `Close` em inglês e não oferece prop de localização; usar cópia/fork corrigido, correção upstream ou drawer próprio. Um wrapper não resolve o texto interno.

## 7. Estados da hero

1. **Static:** poster/fallback e conteúdo prontos; funciona sem JavaScript de movimento.
2. **Entering:** texto e mídia entram coordenados a partir de suas posições finais; não bloquear cliques.
3. **Settled:** composição estável, CTA ativo e continuidade visível.
4. **Reduced motion:** sem deslocamento de grande massa; crossfade curto ou estado final imediato.
5. **Reduced transparency:** chrome opaco/frosted, sem depender de refração.
6. **Asset failure:** poster/fallback ou composição tipográfica sem espaço vazio.
7. **Navigation sticky:** masthead ganha material e separação sutil quando deixa o plano inicial.

## 8. Movimento

Perfil `campaign`:

- entrada única, curta e coordenada;
- transform e opacity como propriedades principais;
- spring criticamente amortecida por padrão (`damping: 1`, sem bounce); resposta aproximada de 0,3–0,4s;
- reveal da máscara acompanha o caminho do asset;
- vídeo, se usado, não faz loop;
- usuário pode clicar durante a entrada;
- nenhum movimento depende de hover em touch.

O projeto já possui Framer Motion, mas a implementação futura deve preservar o princípio de iniciar do valor apresentado e permitir interrupção. Não adicionar `@glinui/motion` sem uma decisão separada.

## 9. Mídia

- master desktop e mobile independentes;
- poster obrigatório para vídeo;
- `muted`, `playsInline` e `autoplay` somente quando o navegador permitir; poster continua sendo o estado crítico;
- fallback estático para redução de movimento, falha de codec e conexão limitada;
- imagens locais/serviço de mídia controlado, sem hotlink;
- `width`, `height` ou aspect ratio reservam layout;
- nenhum asset deve sugerir autorização ou endosso Apple não comprovado.

O PNG atual `assets/home/hero/iphone-air-in-hand-transparent.png` é somente referência de protótipo até sua procedência ser comprovada.

## 10. Acessibilidade

- `h1` semântico e texto completo disponível;
- CTA e navegação com foco visível e área mínima de 44×44px;
- carrinho desktop como popover com Escape e retorno ao trigger;
- menu/carrinho mobile como diálogo com título, descrição, focus trap, Escape, close em português e retorno ao trigger;
- sem informação primária dependente de hover, vídeo ou movimento;
- texto normal ≥4,5:1, texto grande ≥3:1 e indicadores de controle/estado/foco ≥3:1 contra cores adjacentes;
- testar teclado, leitor de tela, zoom 200%, fonte fallback, `prefers-reduced-motion`, `prefers-reduced-transparency` e `prefers-contrast`.

## 11. Performance e budgets provisórios

Os números abaixo são alvos para validação da spec, não resultados medidos ainda:

- LCP mobile p75 ≤ 2,5s em perfil 4G representativo;
- CLS ≤ 0,1;
- poster crítico ≤ 200 KB comprimido;
- imagem mobile principal ≤ 250 KB AVIF/WebP quando tecnicamente possível;
- imagem desktop principal ≤ 400 KB AVIF/WebP quando tecnicamente possível;
- vídeo inicial não deve bloquear o poster nem exceder 2 MB para a primeira experiência;
- nenhum carregamento duplicado de desktop e mobile após seleção de fonte responsiva.

Antes da implementação, esses targets devem ser medidos com o asset real e ajustados se a qualidade visual exigir uma exceção documentada.

## 12. Matriz de validação

Viewports: 320, 360, 390, 430, 768, 1024 e 1440px; landscape mobile curto e zoom 200%.

Browsers: Brave/Chromium, Firefox desktop, Safari/iOS e Android real antes da produção.

Conteúdo: fixture curta, aprovada e longa; fonte padrão e fallback; asset completo, ausente e falho.

Rotas: Home, Catálogo, Sobre, Contato, `/iphone-17-pro` e `/iphone-air`.

Gates:

- sem overflow horizontal ou cliff entre 720–899px;
- nenhum glifo coberto fora da máscara aprovada;
- produto visualmente prioritário sobre a mão;
- CTA identificável sem explicação;
- nav ativa e sticky funcionando;
- morph/hide/show de filtros do Catálogo intactos;
- carrinho vazio oculto, badge correto, persistência e retorno de foco preservados;
- reduced motion/transparency/contrast equivalentes e legíveis;
- contraste e área de toque aprovados;
- budgets de LCP/CLS/mídia registrados.

## 13. Ordem posterior à aprovação

Esta spec precisa ser aprovada antes de executar `/to-tickets`.

1. Fundação de configuração, tokens canônicos e fixtures.
2. Chrome integrado: masthead, sticky, menu e carrinho.
3. Hero estática: conteúdo, layout, `<picture>`, poster e fallback.
4. Reveal coordenado e estado settled.
5. Preferências, acessibilidade e browsers.
6. Performance, manifesto de licença e QA cross-route.
7. Migração controlada para produção e remoção posterior da solução antiga.

