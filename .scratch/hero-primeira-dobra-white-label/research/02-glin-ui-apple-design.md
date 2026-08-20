# Auditoria do Glin UI 0.1.1 e dos princípios de Apple Design

Status da pesquisa: concluída em 2026-08-04. Esta nota é somente planejamento; nenhum arquivo da aplicação foi alterado.

## Resposta curta

O pacote instalado oferece bons **primitives acessíveis** para sustentar a refatoração — especialmente `Button`, `Popover`, `DropdownMenu`, `Tabs`, `GlassNavbar`, `Badge` e, com ressalvas, `Sheet`. Ele não oferece uma hero, uma navegação completa, um carrinho ou um sistema tipográfico de campanha. A direção recomendada é usar Glin UI como infraestrutura de interação e superfície, mantendo composição, tipografia, imagem, quebra editorial e comportamento white-label como módulos próprios.

O `GlassNavbar` pode servir como casca semântica/translúcida, mas não deve ditar o layout. `Popover` é o primitive mais adequado para um resumo de carrinho ancorado no desktop. `Sheet` pode sustentar menu/carrinho mobile somente depois de corrigir limitações reais da versão instalada. `MorphingTabs`, `GlassDock`, `FloatingPanel` e os efeitos decorativos não devem ser usados como substitutos automáticos para navegação ou carrinho.

## 1. Instalações localizadas

### Glin UI

- Nome real do produto/pacotes: **Glin UI**, não “Glint UI”.
- `@glinui/ui` versão `0.1.1`: `/home/lorenzzo/Área de trabalho/loja iphone esboço/node_modules/@glinui/ui`.
- `@glinui/tokens` versão `0.1.1`: `/home/lorenzzo/Área de trabalho/loja iphone esboço/node_modules/@glinui/tokens`.
- Declarações principais: `node_modules/@glinui/ui/dist/index.d.ts` e `node_modules/@glinui/tokens/dist/index.d.ts`.
- Implementações auditadas: `node_modules/@glinui/ui/dist/components/*.js` e `node_modules/@glinui/ui/dist/lib/*.js`.
- CSS de tokens: `node_modules/@glinui/tokens/theme.css`.
- Ambos os pacotes declaram licença MIT e apontam para o repositório oficial `GLINCKER/glinui`; `@glinui/ui` declara React 18/19 como peer dependency. Fontes: `node_modules/@glinui/ui/package.json:2-23,43-69` e `node_modules/@glinui/tokens/package.json:2-25`.
- `npm ls @glinui/ui @glinui/tokens @glinui/motion --depth=0` confirmou os dois primeiros em `0.1.1` e confirmou que **`@glinui/motion` não está instalado**.

O pacote npm só exporta o barrel raiz (`"."`), não subpaths de componentes. O projeto contorna isso com aliases locais para `Button` e `useLiquidGlass` em `vite.config.js:8-23`; isso é configuração do projeto, não API pública do pacote. Fonte: `node_modules/@glinui/ui/package.json:5-12`.

### Skill obrigatória

- Nome real: `apple-design`.
- Caminho: `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md`.
- O arquivo foi lido integralmente (282 linhas).
- A descrição explícita cobre springs, gestos, translucidez/profundidade, tipografia e redução de movimento: `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md:1-10`.

## 2. Autoridade das fontes

Nesta auditoria, a ordem de autoridade foi:

1. implementação e `.d.ts` **instalados localmente**;
2. código oficial no commit npm `62134ef0dafc2fc1c85d221a23c562ba0519669d`;
3. documentação oficial em [glinui.com](https://glinui.com/).

Quando documentação e implementação divergem, esta nota considera a implementação local `0.1.1` como verdade operacional. O [repositório oficial](https://github.com/GLINCKER/glinui) documenta os dois modos de distribuição — CLI/cópia e pacote/importação — e o pacote deste projeto usa o segundo.

## 3. Inventário local de exports

`dist/index.d.ts` exporta 77 módulos de componentes, `cn` e `useLiquidGlass`. A contagem foi confirmada pelos 77 arquivos `dist/components/*.d.ts`. O README embalado ainda diz “76 components”, portanto essa contagem está desatualizada; o índice local e o [README oficial atual](https://github.com/GLINCKER/glinui#components-77) dizem 77. Fontes locais: `node_modules/@glinui/ui/README.md:1-33` e `node_modules/@glinui/ui/dist/index.d.ts:1-79`.

Inventário dos módulos exportados:

```text
accordion, alert-dialog, animated-gradient, alert, aurora-background,
avatar, badge, blur-fade, blur-spotlight, border-beam, button, card,
checkbox, chip, chromatic-text, code, command, counter, data-table,
depth-card, dot-pattern, dropdown-menu, floating-panel, glass-breadcrumb,
glass-card, glass-dock, glow-border, gradient-mesh, glass-navbar,
glass-toggle, heading, hover-card, icon-frame, input, kbd, label,
light-leak, liquid-button, link, magnetic-cta, marquee, meteor-shower,
modal, morphing-tabs, number-ticker, orbiting-circles, particle-field,
popover, progress, prism-border, pulsating-button, radio-group,
retro-grid, reveal-text, ripple, ripple-button, select, separator,
sheet, shimmer-button, skeleton, slider, spotlight-card, spotlight,
status-dot, switch, table, tabs, text, text-reveal, textarea, sonner,
toast, tree, tooltip, typewriter, word-rotate
```

Não há export chamado `Cart`, `NavigationMenu`, `Menubar`, `Hero` ou equivalente. Carrinho, estrutura editorial e roteamento precisam continuar pertencendo à aplicação; Glin fornece peças, não esses produtos compostos.

## 4. Componentes relevantes e limites reais

### 4.1 Navegação: `GlassNavbar`

API confirmada:

- `size`: `sm | md | lg`;
- `elevation`: `base | scrolled`;
- `scrollThreshold?: number`, padrão `8`;
- `disableScrollTracking?: boolean`, padrão `false`;
- demais atributos HTML de `<nav>`.

Fontes: `node_modules/@glinui/ui/dist/components/glass-navbar.d.ts:3-19`, implementação oficial fixa no [commit npm](https://github.com/GLINCKER/glinui/blob/62134ef0dafc2fc1c85d221a23c562ba0519669d/packages/ui/src/components/glass-navbar.tsx) e [exemplo oficial](https://glinui.com/docs/components/glass-navbar).

Comportamento real:

- renderiza um `<nav>` semântico;
- é `sticky top-0`, `z-50`, `w-full` e tem borda por padrão;
- troca somente a elevação/blur após cruzar um limiar de `scrollY`;
- desativa a transição visual quando o hook interno detecta `prefers-reduced-motion`.

Fonte: `node_modules/@glinui/ui/dist/components/glass-navbar.js:7-41`.

**Uso recomendado:** casca técnica para a navegação editorial, recebendo internamente marca, links, CTA comercial e carrinho definidos pela aplicação. Remover visualmente a cápsula pronta e ajustar bordas/sombra é legítimo via `className`.

**Limites:** não contém marca, lista de links, indicação de rota, menu mobile, ação comercial, carrinho, hide-on-scroll nem controle de direção do scroll. Também não é “flutuante” por si; sua geometria padrão é uma barra full-width colada ao topo. Não aninhar outro `<nav>` dentro dela; usar lista de links para evitar landmarks redundantes.

### 4.2 CTA: `Button`, `Link`, `LiquidButton` e `MagneticCTA`

`Button` confirma:

- variantes `default | glass | frosted | outline | ghost | matte | liquid | glow`;
- tamanhos `sm | md | lg` = alturas `32 / 40 / 48px`;
- `asChild?: boolean`, via Radix `Slot`;
- foco visível, estado disabled e `motion-reduce:transition-none`.

Fontes: `node_modules/@glinui/ui/dist/components/button.d.ts:1-18` e `node_modules/@glinui/ui/dist/components/button.js:6-31`; [documentação oficial](https://glinui.com/docs/components/radix/button).

**Uso recomendado:** `Button asChild` para CTA de rota ou `Link` para uma ação editorial textual. O `size="lg"` é o único tamanho padrão acima de 44px; os demais precisam de área de toque ampliada se usados como ação principal mobile. A forma `rounded-xl`, o hover lift e a sombra são defaults, não obrigação visual: a hero pode sobrescrevê-los com `className` para obter um bloco retangular preciso.

`Link` renderiza sempre um `<a>`, tem variantes `default | glass | outline | ghost`, tamanhos `sm | md | lg` e underline ligado por padrão. É adequado a uma CTA editorial simples; em navegação Wouter, evitar aninhar anchors. Fontes: `node_modules/@glinui/ui/dist/components/link.d.ts:1-14` e `node_modules/@glinui/ui/dist/components/link.js:5-30`; [exemplo oficial](https://glinui.com/docs/components/radix/link).

`LiquidButton` apenas envolve `Button` e acrescenta scale/brightness/shadow no hover, com intensidade `soft | strong`; não cria comportamento de líquido fisicamente interruptível. Fonte: `node_modules/@glinui/ui/dist/components/liquid-button.js:5-20`.

`MagneticCTA` usa `mousemove`, calcula um offset de até `maxOffset` (padrão 8px) dentro de `magnetRadius` (140px) e aplica uma transição CSS; não usa spring nem velocity handoff. Ele zera o efeito em reduced motion. Fontes: `node_modules/@glinui/ui/dist/components/magnetic-cta.d.ts:1-10`, `node_modules/@glinui/ui/dist/components/magnetic-cta.js:7-44` e [documentação oficial](https://glinui.com/docs/components/magnetic-cta).

**Decisão de planejamento:** CTA principal usa `Button`/`Link` adaptado. `LiquidButton`, `glow` e `MagneticCTA` não entram no preset padrão. `MagneticCTA` pode existir apenas em um protótipo desktop da direção cinematográfica, com offset pequeno e sem depender dele para comunicar estado.

### 4.3 Menu: `DropdownMenu`

O conjunto exporta `DropdownMenu`, trigger, content, items, checkbox/radio items, label, separator, shortcut e submenu. Trigger/content/items aceitam variantes `default | glass | frosted | outline | ghost` e tamanhos `sm | md | lg`. É construído sobre Radix Dropdown Menu. Fontes: `node_modules/@glinui/ui/dist/components/dropdown-menu.d.ts` e `node_modules/@glinui/ui/dist/components/dropdown-menu.js:1-98`; [documentação oficial](https://glinui.com/docs/components/radix/dropdown-menu).

**Uso recomendado:** ações secundárias ou um seletor da loja. Não usar `role="menu"` como substituto dos links principais do site. Na implementação local, o content não possui animação de abrir/fechar; somente itens têm transição de cor. Isso é mais contido que o texto da documentação, que diz haver transições de opacity/transform.

### 4.4 Popover: `Popover`

Exports: `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverClose`, `PopoverAnchor`. Trigger e content aceitam variantes `default | glass | frosted | outline | ghost`; content tem tamanhos `sm | md | lg`, alinhamento padrão `center` e `sideOffset` padrão `8`. Fontes: `node_modules/@glinui/ui/dist/components/popover.d.ts` e `node_modules/@glinui/ui/dist/components/popover.js:6-52`.

Por herdar Radix, oferece ancoragem, foco e retorno de foco ao trigger; a [documentação oficial de Popover](https://glinui.com/docs/components/radix/popover) registra `Escape`, `Tab`, `aria-expanded` e `aria-controls`.

**Uso recomendado:** resumo de carrinho ancorado ao ícone da navegação em desktop. O primitive é melhor que um botão flutuante porque preserva causalidade e origem espacial.

**Limites:** largura visual padrão fixa (`w-56`, `w-72`, `w-80`); deve ser calibrada para conteúdo real. A implementação instalada não possui transição de entrada/saída, apesar da página oficial afirmar que existe. Caso se adicione materialização, ela deve partir do trigger e respeitar reduced motion.

### 4.5 Drawer/mobile: `Sheet` e `Drawer`

`Drawer` é literalmente alias de `Sheet`, e ambos são `DialogPrimitive.Root`; não há gesture drawer, arraste 1:1, velocity handoff ou rubber-banding. `SheetContent` aceita `side: top | right | bottom | left`, `size: sm | md | lg` e `variant: default | glass | frosted | outline | ghost`. Fontes: `node_modules/@glinui/ui/dist/components/sheet.d.ts:1-52` e `node_modules/@glinui/ui/dist/components/sheet.js:27-85`.

Pontos positivos:

- Radix Dialog fornece foco modal, escape e retorno previsível;
- `SheetTitle` e `SheetDescription` dão estrutura semântica;
- entrada e saída seguem o mesmo lado.

A [documentação oficial](https://glinui.com/docs/components/radix/sheet) classifica `Sheet / Drawer` como **beta**, exige `SheetTitle` para leitores de tela e descreve focus trap.

Limites bloqueadores para uso direto em produção:

1. a largura lateral `md` é `w-96` (384px), maior que alguns viewports mobile; deve ser sobrescrita;
2. o botão de fechar embutido contém o texto invisível hardcoded `Close`, sem prop de localização — inadequado para interface integralmente em português;
3. `SheetContent` e `SheetOverlay` usam `duration-200`/transforms sem classes `motion-reduce`; a promessa da documentação de que o slide respeita reduced motion **não corresponde à implementação 0.1.1**;
4. não é um drawer arrastável nem interruptível.

Evidência: `node_modules/@glinui/ui/dist/components/sheet.js:27-76`.

**Uso recomendado:** primitive candidato para menu/carrinho mobile somente após fork/cópia local corrigida, correção upstream ou decisão de manter o drawer próprio. Um wrapper resolve largura e fallback reduced-motion, mas não consegue substituir o botão interno com `Close` hardcoded. Não prometer gesto de arraste sem uma implementação própria.

### 4.6 Modal

`Modal` também é Radix Dialog, com focus trap e bloqueio do fundo. É apropriado para tarefa modal, não para um resumo casual do carrinho na primeira dobra. A implementação impõe um botão de fechar com `Close` hardcoded e referencia utilities `animate-in`, `fade-in-0`, `zoom-in-95` e `slide-in-from-bottom-3`. Essas utilities não existem no CSS compilado atual, e nenhum `tw-animate-css`/`tailwindcss-animate` está instalado; logo não se deve assumir que a animação demonstrada funciona neste projeto. Fontes: `node_modules/@glinui/ui/dist/components/modal.js:7-38`, [documentação oficial](https://glinui.com/docs/components/radix/modal) e verificação local `npm ls tw-animate-css tailwindcss-animate --depth=0`.

### 4.7 Carrinho: peças existentes, componente inexistente

Não há `Cart`. A composição segura é:

- `Button`/botão nativo com ícone e nome acessível;
- `Badge` para contagem visual, sem transformar o badge na única descrição;
- `Popover` no desktop;
- `Sheet` adaptado ou o drawer próprio atual no mobile;
- região `aria-live` da aplicação para confirmação de item adicionado.

`Badge` é somente um `<span>` estilizado; não oferece anúncio acessível por conta própria. Fonte: `node_modules/@glinui/ui/dist/components/badge.d.ts` e `node_modules/@glinui/ui/dist/components/badge.js`.

Não usar:

- `GlassDock`: é um toolbar macOS com magnificação por proximidade baseada em `mousemove`; é adequado a vários atalhos, não a uma única ação comercial. Fontes: `node_modules/@glinui/ui/dist/components/glass-dock.js:6-52` e [documentação oficial](https://glinui.com/docs/components/glass-dock).
- `FloatingPanel`: é um painel absoluto arrastável, sem boundary/rubber-band, sem foco modal e sem semântica de carrinho. Fonte: `node_modules/@glinui/ui/dist/components/floating-panel.js:5-55`.
- `GlassCard` para envolver o carrinho na hero: ele sobe e aumenta blur/sombra automaticamente no hover, mesmo quando o conteúdo não é um card acionável. Fonte: `node_modules/@glinui/ui/dist/components/glass-card.js:5-35`.

### 4.8 Tabs

`Tabs` é baseado em Radix Tabs e é a opção acessível para alternar painéis de conteúdo agrupados. Não deve representar rotas globais. Fontes: `node_modules/@glinui/ui/dist/components/tabs.js:1-75` e [documentação oficial](https://glinui.com/docs/components/radix/tabs).

`MorphingTabs` aceita `items`, `activeId`, `defaultActiveId`, `onTabChange`, variante `glass | solid | underline` e tamanho `sm | md | lg`. O indicador é reposicionado por `getBoundingClientRect`, `ResizeObserver` e `transition-all duration-300`; reduced motion vira duração zero. Fonte: `node_modules/@glinui/ui/dist/components/morphing-tabs.js:6-70`.

Limitação: a implementação manual tem `role="tablist"`, `role="tab"` e `aria-selected`, mas não implementa roving `tabIndex`, setas de teclado, `aria-controls` nem painéis associados. A própria [documentação oficial](https://glinui.com/docs/components/morphing-tabs) lista apenas esses três recursos de acessibilidade. Portanto, não usar `MorphingTabs` como navegação principal; se o morph visual for desejado em filtros, o plano deve combinar a semântica de `Tabs` com uma camada visual própria ou corrigir o component em isolamento.

### 4.9 Tipografia: `Heading`, `Text` e limites do token set

`Heading` separa semântica (`level` 1–6) de escala visual, mas oferece apenas `text-lg`, `text-2xl` e `text-3xl`; `Text` vai de `text-xs` a `text-base`. Eles não cobrem uma headline editorial de primeira dobra. Fontes: `node_modules/@glinui/ui/dist/components/heading.js:5-27`, `node_modules/@glinui/ui/dist/components/text.js:5-28` e [documentação oficial de Heading](https://glinui.com/docs/components/radix/heading).

O pacote de tokens não oferece família tipográfica, escala de display, tracking responsivo, leading editorial, largura de leitura nem breakpoints. A hero deve ter um sistema tipográfico próprio, podendo usar `Heading level={1}` com classes sob controle da aplicação ou um `<h1>` semântico nativo.

## 5. Tokens disponíveis

### Exports JavaScript

`@glinui/tokens` exporta:

- `colorTokens` (light/dark);
- `glassTokens` (blur, saturate, surface, border, borderStrong, refractionTop);
- `glassLevelTokens` (`glass-1` a `glass-5`);
- `glassOpacityScaleTokens` (1–10, light/dark);
- `glassPerformanceTokens`;
- `glassLuminanceTokens` (`neutral | bright | dim`);
- `radiusTokens`, `spacingTokens`, `shadowTokens`, `motionTokens`;
- `tokenContract` e o tipo `ThemeMode`.

Fonte: `node_modules/@glinui/tokens/dist/index.d.ts` e implementação em `node_modules/@glinui/tokens/dist/index.js:1-193`.

### Contrato CSS

O subpath público `@glinui/tokens/theme.css` define:

- cores semânticas light/dark;
- 5 elevações de vidro, de 8 a 40px de blur;
- 10 opacidades;
- saturação, bordas e refração superior;
- sombras, radius e spacing;
- durations/easings;
- classes `.glass-1` a `.glass-5`, `.glass-heavy`, `.glass-gpu-hint`;
- adaptação por luminância;
- fallbacks para `prefers-reduced-transparency` e `prefers-reduced-motion`.

Fontes: `node_modules/@glinui/tokens/theme.css:12-225,228-290`, [tokens oficiais](https://glinui.com/docs/tokens) e [glass physics oficial](https://glinui.com/docs/glass-physics).

### Inconsistências que exigem decisão

1. `colorTokens.light.accent` no JS é `oklch(0.20 0.005 250)`, mas `theme.css` define `--color-accent: oklch(0.63 0.19 254)`; dark também diverge. Fontes: `node_modules/@glinui/tokens/dist/index.js:1-17` contra `node_modules/@glinui/tokens/theme.css:12-19,124-130`. Para white-label, não usar esses dois contratos como se fossem equivalentes; o tema da loja deve ser a fonte canônica.
2. O projeto atual **não importa** `@glinui/tokens/theme.css`; ele usa `@source` para escanear as classes do pacote e redefine somente um subconjunto de variáveis em `src/styles.css:1-42`.
3. Componentes usam classes como `duration-normal` e `ease-standard`, mas o CSS compilado atual não contém essas utilities. Também não contém `animate-in`, `fade-in-0` ou `zoom-in-95`. Portanto, tokens de movimento não estão automaticamente ligados às utilities Tailwind desta aplicação.
4. O README local recomenda importar `@glinui/tokens/theme.css` (`node_modules/@glinui/tokens/README.md:11-27`), mas essa importação deve ser planejada junto com o contrato white-label para não sobrescrever o tema existente.

## 6. `useLiquidGlass`

API confirmada:

```ts
useLiquidGlass({
  displacement?: number, // 40
  blur?: number,         // 12
  saturate?: number,     // 1.8
  profile?: "squircle" | "convex",
  disabled?: boolean,
}) => { ref, svgFilter, style, filterId, isSupported }
```

Fonte: `node_modules/@glinui/ui/dist/lib/use-liquid-glass.d.ts:1-44`.

Limitações reais:

- detecção é por regex `Chrome|Chromium` no user agent, não por feature detection;
- a refração ativa gera um PNG de displacement map em canvas a meia resolução sempre que a dimensão observada muda;
- Safari/Firefox recebem `style: {}`; o fallback de blur/saturate **não é aplicado pelo hook**, apesar do comentário da declaração — precisa existir na classe CSS do consumidor;
- o tipo de `ref` é `HTMLDivElement`, portanto anexá-lo diretamente a um `<nav>` tipado exige wrapper ou adaptação;
- o hook não deve ser usado em toda a hero ou em uma superfície grande que redimensiona continuamente.

Fonte: `node_modules/@glinui/ui/dist/lib/use-liquid-glass.js:7-17,26-78,83-143`; código oficial fixo no [commit npm](https://github.com/GLINCKER/glinui/blob/62134ef0dafc2fc1c85d221a23c562ba0519669d/packages/ui/src/lib/use-liquid-glass.tsx).

**Uso recomendado:** apenas em chrome funcional pequeno — navegação/painel ancorado —, sempre com fallback CSS sólido/translúcido. Brave cai no caminho Chromium por seu user agent, mas isso deve ser verificado no protótipo e não presumido como contrato futuro.

## 7. Apple Design: princípios que restringem a solução

A skill não manda copiar o site da Apple. Ela fornece critérios de comportamento e craft.

### Hierarquia, conteúdo e espaço

- **Purpose e simplicity:** cada elemento deve justificar o custo de atenção; clareza vem de ordem, espaço e contraste, não de esconder contexto. `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md:239-250`.
- **Wayfinding e labels específicos:** a primeira dobra precisa responder onde estou, o que posso fazer e para onde vou; “Encontrar meu iPhone” ou “Começar comparação” comunica melhor que uma ação vaga. `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md:252-257`.
- Proximidade deve mapear controle ao efeito. Carrinho pertence à navegação/ação comercial, não a um canto flutuante desconectado.

### Tipografia

- tracking deve variar com tamanho; display grande pede tracking negativo e body perto de zero;
- leading fica mais apertado em display e mais confortável no texto;
- peso, tamanho e leading formam a hierarquia juntos;
- layout deve tolerar zoom/tamanho de texto com `rem`/`em`;
- system font é o ponto de partida, não uma obrigação de simular SF Pro onde ela não existe.

Fonte: `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md:218-237`.

### Materiais e profundidade

- vidro comunica uma camada funcional flutuante, como nav, toolbar, popover ou sheet;
- material maior deve parecer mais espesso;
- não empilhar vidro claro sobre vidro claro;
- texto sobre translucidez precisa de contraste/peso adequados;
- chrome sticky deve separar-se por material/scroll edge, não por sombra excessiva ou divisor arbitrário.

Fonte: `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md:171-189`.

Consequência: Glin UI deve aparecer sobretudo no chrome funcional. Hero, título e asset não devem virar `GlassCard` nem receber vidro decorativo.

### Movimento

- feedback começa no pointer-down e acompanha a interação; `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md:20-34`;
- interação tocável deve poder ser interrompida e redirecionada; CSS transition/keyframes não bastam para gesto; `SKILL.md:53-69`;
- padrão é spring criticamente amortecida, sem bounce; bounce só segue momentum real; `SKILL.md:71-98`;
- entrada/saída compartilham caminho e popover/sheet nasce do trigger; `SKILL.md:133-139`;
- animar preferencialmente transform/opacity; `SKILL.md:163-170`.

Consequência: os durations/easings do Glin são úteis para microestados discretos, mas não devem ser chamados de comportamento “Apple” quando a interação exige spring, interrupção ou velocity handoff. O [pacote oficial `@glinui/motion`](https://glinui.com/docs/motion) documenta gestures/springs, porém ele **não está instalado** e não faz parte da API disponível nesta refatoração.

### Responsividade e acessibilidade

- mobile e desktop são contextos diferentes, não apenas escalas diferentes; `SKILL.md:243-249`;
- `prefers-reduced-motion` troca deslocamentos por cross-fade curto/estado estático;
- `prefers-reduced-transparency` torna superfícies mais sólidas;
- `prefers-contrast: more` pede fundo quase sólido e borda definida.

Fonte: `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md:199-216`.

## 8. Matriz “usar, adaptar, evitar”

| Necessidade | Decisão | Primitive real | Motivo/guardrail |
| --- | --- | --- | --- |
| Casca da nav | Adaptar | `GlassNavbar` | Semântico e scroll-aware; geometria/conteúdo continuam próprios. |
| Links principais | Usar | anchors/roteador + `Link` quando compatível | Rotas não são tabs nem menu de ações. |
| CTA principal | Adaptar | `Button asChild` ou `Link` | Área de toque e foco prontos; remover pill/hover genérico conforme direção. |
| Menu mobile | Adaptar com correções | `Sheet` | Radix é bom; beta, largura, idioma e reduced motion bloqueiam uso direto. |
| Carrinho desktop | Usar | `Popover` + `Badge` | Origem espacial e foco coerentes. |
| Carrinho mobile | Adaptar | `Sheet` ou drawer próprio | Não prometer drag; manter foco, fechamento e idioma corretos. |
| Filtros/painéis | Usar | `Tabs` | Radix oferece o padrão completo; não representa rotas. |
| Indicador morph | Somente protótipo/correção | `MorphingTabs` | Visual útil, sem teclado/tab panels completos. |
| Tipografia da hero | Própria | `Heading level={1}` opcional | Escala Glin termina em 3xl e não contém sistema editorial. |
| Vidro/refração | Adaptar e limitar | tokens + `useLiquidGlass` | Só chrome pequeno, fallback explícito, validar performance. |
| Carrinho flutuante/dock | Evitar | `GlassDock`, `FloatingPanel` | Sem relação semântica/comercial e movimento decorativo competitivo. |
| Efeitos de campanha | Evitar por padrão | aurora, particles, glow, shimmer, meteor, pulsating | Contrariam direção editorial e redução de ruído. |
| CTA magnético | Exploração B apenas | `MagneticCTA` | Resposta ao cursor decorativa; não é spring física nem funciona em touch. |

## 9. Decisões derivadas para o mapa

### Bloqueadoras

1. Definir um contrato de tema white-label que escolha uma fonte canônica para cor/accent e faça a ponte explícita com os tokens Glin.
2. Decidir se menu/carrinho mobile adapta o `Sheet` local ou mantém um drawer próprio acessível; o `Sheet` 0.1.1 não pode ser adotado cru.
3. Garantir fallbacks de `prefers-reduced-motion`, `prefers-reduced-transparency` e `prefers-contrast` independentes das promessas do pacote.
4. Não tratar `@glinui/motion` como disponível.

### Importantes

1. Usar `GlassNavbar` como primitive, não como composição final.
2. Mover o carrinho para a navegação e mostrá-lo com contagem/estado claro; `Popover` desktop, solução modal controlada no mobile.
3. Criar escala tipográfica e regras de quebra fora do Glin.
4. Reservar vidro para chrome funcional e impedir empilhamento de superfícies claras.
5. Preferir CTA editorial baseada em `Button`/`Link`; variantes liquid/glow não são padrão.

### Refinamentos

1. Testar `useLiquidGlass` no Brave somente sobre a nav/painel pequeno e medir custo.
2. Prototipar uma resposta de cursor mínima na direção B, sem torná-la requisito.
3. Avaliar se um indicador visual inspirado em `MorphingTabs`, sustentado por `Tabs`/links corretos, agrega clareza.

## 10. Critérios de aceite para uso de Glin UI na futura implementação

- Nenhum componente/API citado fora dos exports locais.
- Navegação continua semântica, com marca, links e ações próprios; sem tabs para rotas.
- CTA principal tem alvo de toque de pelo menos 44×44px, foco visível e resposta imediata.
- Menu/carrinho mobile tem título acessível, fechamento em português, largura segura e foco contido.
- Carrinho não aparece como floating dock decorativo; badge não é a única descrição acessível.
- Popover nasce do trigger; entrada e saída compartilham a mesma origem.
- Glass tem fallback sólido e contraste verificado sobre todos os assets/presets.
- Headline tem tracking/leading responsivos e tolera zoom/text-size sem colisão.
- Reduced motion remove slide/parallax/bounce e mantém feedback por cross-fade/estado.
- Nenhuma superfície grande usa displacement map sem prova de performance no Brave mobile/desktop.
- Build verifica que utilities necessárias realmente foram geradas; documentação não substitui inspeção do CSS final.

## 11. Fontes oficiais primárias

- [Repositório oficial Glin UI](https://github.com/GLINCKER/glinui)
- [Código de `GlassNavbar` no commit publicado em npm](https://github.com/GLINCKER/glinui/blob/62134ef0dafc2fc1c85d221a23c562ba0519669d/packages/ui/src/components/glass-navbar.tsx)
- [Código de `Sheet` no commit publicado em npm](https://github.com/GLINCKER/glinui/blob/62134ef0dafc2fc1c85d221a23c562ba0519669d/packages/ui/src/components/sheet.tsx)
- [Código de `useLiquidGlass` no commit publicado em npm](https://github.com/GLINCKER/glinui/blob/62134ef0dafc2fc1c85d221a23c562ba0519669d/packages/ui/src/lib/use-liquid-glass.tsx)
- [Documentação de Glass Navbar](https://glinui.com/docs/components/glass-navbar)
- [Documentação de Button](https://glinui.com/docs/components/radix/button)
- [Documentação de Popover](https://glinui.com/docs/components/radix/popover)
- [Documentação de Sheet / Drawer](https://glinui.com/docs/components/radix/sheet)
- [Documentação de Tabs](https://glinui.com/docs/components/radix/tabs)
- [Documentação de Morphing Tabs](https://glinui.com/docs/components/morphing-tabs)
- [Design tokens](https://glinui.com/docs/tokens)
- [Glass physics](https://glinui.com/docs/glass-physics)
- [Motion](https://glinui.com/docs/motion)

## 12. Verificações reproduzíveis executadas

```bash
npm ls @glinui/ui @glinui/tokens @glinui/motion --depth=0
find node_modules/@glinui/ui/dist/components -name '*.d.ts'
rg -n 'cart|navigation-menu|menubar' node_modules/@glinui/ui/dist
rg -n '@glinui|GlassNavbar|MorphingTabs|Popover|Sheet|Drawer|Button' src vite.config.js package.json
rg -o '\.duration-normal\{[^}]*\}|\.ease-standard\{[^}]*\}|\.animate-in\{[^}]*\}' dist/assets/index-*.css
npm ls tw-animate-css tailwindcss-animate --depth=0
```

Resultados relevantes: 77 módulos declarados; nenhum componente de cart/navigation-menu; `@glinui/motion` e plugins de animation utilities ausentes; utilities consultadas ausentes do CSS compilado atual.
