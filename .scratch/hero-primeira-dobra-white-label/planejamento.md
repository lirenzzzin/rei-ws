# Planejamento Wayfinder — hero e primeira dobra white-label

Status: direção B aprovada; spec executada incrementalmente e QA inicial concluído.

## 1. Diagnóstico do estado atual

A direção existente merece ser preservada: fundo claro, tipografia dominante, espaço negativo, mão + aparelho como gesto, sobreposição e aparência de campanha. O problema não é “ser editorial”; é a intenção visual estar codificada por offsets e camadas sem contrato.

| Achado validado | Classe | Evidência |
| --- | --- | --- |
| Em `720px`, o H1 cai de 655px para 248px e salta de 2 para 6 linhas | Bloqueadora | grid de duas colunas ativado abruptamente em `styles.css`; sweep real no Brave |
| O pseudo-elemento do asset fica acima do layout inteiro, sem área segura | Bloqueadora | asset `z-index: 2`, contêiner `z-index: 1`; interseção com glifos no desktop/intermediário |
| Um PNG 924×305 atende todas as proporções | Importante | renderiza a 82% do viewport desktop e 150% no mobile; não há fonte mobile nem focal point |
| A mão e o aparelho não podem ser escalados/enquadrados separadamente | Importante | ambos fazem parte do mesmo recorte horizontal |
| Nav é uma capsule fixa 307×54 sem marca, CTA ou carrinho | Importante | `Navbar.jsx` possui quatro links hardcoded e composição autônoma da campanha |
| CTA tem alvo funcional, mas baixa saliência | Importante | link de 15,2px sem superfície compete com carrinho escuro de 56px |
| Carrinho aparece mesmo vazio e disputa a faixa inferior | Importante | montagem global incondicional, `z-index: 50` e sombras fortes |
| Texto “feita primeiro para o celular” fala de implementação | Refinamento | string fixa em `HomeOpening.jsx` |
| Reduced motion/transparency/contrast já têm fallbacks | Bloqueadora | esses fallbacks são gate e os probes no Brave confirmaram transição zero e estado final legível |

Relatório completo: [01 — auditoria da hero](research/01-auditoria-hero-atual.md). Capturas: [desktop 1440×900](../../output/playwright/hero-wayfinder/.playwright-cli/page-2026-08-04T18-31-39-110Z.png) e [mobile 390×844](../../output/playwright/hero-wayfinder/.playwright-cli/page-2026-08-04T18-31-57-900Z.png).

## 2. Arquivos e componentes envolvidos

| Responsabilidade | Arquivos atuais | Observação |
| --- | --- | --- |
| Shell e estado global | `src/App.jsx` | Navbar e carrinho são globais; main adiciona 80px no topo |
| Hero | `src/components/HomeOpening.jsx` | copy, CTA e asset hardcoded; componente sem props |
| Home/primeira seção | `src/pages/HomePage.jsx`, `src/components/FeaturedProductShowcase.jsx` | continuidade da dobra também precisa entrar no protótipo |
| Navegação | `src/components/Navbar.jsx` | usa `useLiquidGlass`, indicador e lógica do catálogo |
| Carrinho | `src/components/FloatingCart.jsx`, `src/hooks/usePersistentCart.js` | interação própria; falta focus trap/retorno explícito |
| Roteamento/transições | `src/components/AnimatedLink.jsx`, `src/lib/viewTransitions.js` | Wouter + View Transition API |
| Entrada em viewport | `src/components/ViewportPopIn.jsx` | efeito genérico existente |
| Tema/layout/motion | `src/styles.css` | arquivo global com mais de 1.600 linhas e amplo raio de impacto |
| Configuração atual | `src/config/site.js` | apenas identidade institucional; não alcança hero/nav/assets/composição |
| Asset | `assets/home/hero/iphone-air-in-hand*.png` | procedência anterior ao clipboard não comprovada |
| Aliases Glin | `vite.config.js` | apontam para arquivos internos não exportados publicamente pelo pacote |

O projeto atual é JavaScript/JSX e não possui `tsconfig`. A tipagem do futuro contrato white-label pode começar por validação de dados/JSDoc ou entrar em uma migração de TypeScript separada; isso não bloqueia a decisão visual.

## 3. Glin UI localizado e auditado

O nome real instalado é **Glin UI**.

- UI: `/home/lorenzzo/Área de trabalho/loja iphone esboço/node_modules/@glinui/ui`, versão `0.1.1`.
- Tokens: `/home/lorenzzo/Área de trabalho/loja iphone esboço/node_modules/@glinui/tokens`, versão `0.1.1`.
- Skill obrigatória: `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md`, nome `apple-design`.

Foram lidos integralmente README, exports, declarações, implementações, exemplos oficiais e tokens. O barrel local expõe 77 módulos; não existem `Hero`, `Cart` ou `NavigationMenu`. `@glinui/motion` não está instalado e não será presumido.

| Necessidade | Primitive real | Decisão de planejamento |
| --- | --- | --- |
| Casca sticky | `GlassNavbar` | adaptar; sua geometria padrão é sticky/full-width e não é a composição final |
| CTA | `Button asChild` ou `Link` | usar semântica/foco; aparência editorial própria |
| Carrinho desktop | `Popover` + `Badge` | recomendado quando houver itens |
| Menu/carrinho mobile | `Sheet`/`Drawer` | só após fork/cópia corrigida, correção upstream ou drawer próprio; wrapper simples não substitui o `Close` interno |
| Links globais | link real + roteador | rotas não são tabs |
| Filtros | `Tabs` | opção acessível quando forem painéis reais |
| Indicador morph | `MorphingTabs` | não usar cru: faltam teclado roving, `aria-controls` e painéis associados |
| Headline | sistema próprio | `Heading` termina em 3xl e não resolve escala editorial |
| Vidro | tokens + `useLiquidGlass` | apenas chrome pequeno, com fallback sólido; não aplicar à hero inteira |
| Efeitos/dock | vários exports decorativos | evitar por padrão: não servem à direção nem à hierarquia comercial |

Limitações adicionais:

- o pacote só exporta o barrel `.`; os aliases atuais para arquivos internos são frágeis;
- `@glinui/tokens/theme.css` não é importado integralmente pelo projeto;
- o accent exportado em JavaScript diverge do accent do `theme.css`;
- utilities de movimento referenciadas por componentes não aparecem automaticamente no CSS compilado atual;
- `useLiquidGlass` detecta Chromium por user agent e precisa de fallback CSS explícito em Safari/Firefox.

Relatório completo: [02 — Glin UI e Apple Design](research/02-glin-ui-apple-design.md). Fontes oficiais: [repositório](https://github.com/GLINCKER/glinui), [tokens](https://glinui.com/docs/tokens), [Glass Navbar](https://glinui.com/docs/components/glass-navbar), [Popover](https://glinui.com/docs/components/radix/popover) e [Sheet](https://glinui.com/docs/components/radix/sheet).

## 4. Princípios da skill `apple-design`

Estes princípios funcionam como restrições, não como instrução para copiar a Apple:

- **Propósito e simplicidade:** cada objeto disputa atenção; chrome e vidro só entram quando comunicam função/camada.
- **Hierarquia e agrupamento:** escala, espaço, contraste e proximidade devem explicar mensagem, ação e destino.
- **Tipografia:** tracking e leading variam com tamanho; o layout deve tolerar fonte fallback, zoom e textos diferentes.
- **Profundidade:** translucidez representa uma camada funcional; não empilhar vidro claro sobre vidro claro.
- **Resposta direta:** feedback começa na interação e permanece ligado à origem.
- **Movimento físico:** caminho de entrada/saída coerente, transições interrompíveis e springs sem bounce gratuito.
- **Responsividade:** mobile e desktop são composições distintas, não o mesmo quadro reduzido.
- **Acessibilidade:** reduced motion troca deslocamento por estado estático/crossfade; reduced transparency e contraste elevado têm superfícies próprias.
- **Craft e precisão:** validar no navegador real e em estados extremos antes de promover um protótipo.

## 5. Mapa de decisões

### Bloqueadoras

1. Escolher direção-base: A, B, C ou híbrida A+C.
2. Escolher rota de asset e confirmar que o atual não irá para produção sem licença.
3. Aprovar presets e limites do contrato white-label.
4. Definir política de sobreposição/área segura por composição.
5. Definir política de fontes e limites de copy que o template promete suportar.
6. Decidir se `Sheet` será adaptado ou se o drawer próprio continuará no mobile.
7. Definir na spec budgets numéricos de LCP, CLS, bytes transferidos, tamanho decodificado e vídeo para o perfil mobile aprovado.

### Importantes

1. Trocar capsule isolada por masthead integrada à campanha.
2. Escolher CTA por objetivo e sua forma editorial.
3. Ocultar carrinho vazio; integrá-lo ao chrome quando houver itens.
4. Criar masters desktop/mobile e metadados de procedência.
5. Criar escala tipográfica e plano de quebras independente de Glin.
6. Definir perfis de movimento e fallbacks.

### Refinamentos

1. Presença ou ausência do scroll cue.
2. Resposta mínima ao cursor na direção B.
3. Detalhes de máscara/reveal e passagem para a seção seguinte.
4. Intensidade final de material/sombra no estado sticky.

Mapa e tickets: [map.md](map.md).

## 6. Incógnitas

- Quais fontes uma futura loja terá licença para usar e quanta variação métrica será aceita.
- Quais comprimentos mínimo/máximo de título e descrição precisam ser comercialmente suportados.
- Se a loja será revendedora autorizada e quais assets Apple seu contrato permite.
- Se o template terá um preset premium com vídeo ou apenas presets estáticos.
- Se a comparação futura será guiada ou apenas abrirá o catálogo.
- Quem compra e arquiva licenças/release por cliente.
- Quais métricas de desempenho serão possíveis após a escolha do asset real.

## 7. Comparação das direções

| Direção | Descrição | Desktop | Mobile | Esforço | White-label | Risco |
| --- | --- | --- | --- | --- | --- | --- |
| A — Editorial refinada | título dominante, gesto preservado, área segura, masthead discreta | sobreposição deliberada e controlada | master próprio entrando de baixo/lateral | Médio | Alta | austeridade sem conteúdo forte |
| B — Cinematográfica controlada | asset profundo, copy curto, reveal coordenado e finito | quadro de campanha amplo | composição vertical/poster dedicado | Alto | Média | custo, peso e manutenção por loja |
| C — Comercial sofisticada | linguagem editorial com início de comparação inequívoco | dobra fecha no começo do fluxo | CTA forte sem barra fixa cobrindo conteúdo | Médio | Muito alta | controles demais destruírem a campanha |

Cada direção, incluindo wireframe, hierarquia, asset, Glin, princípios Apple, comportamento, riscos e personalização, está detalhada em [direcoes-visuais.md](direcoes-visuais.md).

## 8. Alternativas de imagem

| Rota | Vantagem | Limite/risco | Uso recomendado |
| --- | --- | --- | --- |
| Manter e reenquadrar atual | preserva exatamente o gesto já conhecido | 924×305, alpha 1-bit, sem licença comprovada, ruim para mobile | apenas protótipos |
| Stock licenciado | procedência/autor/ID e resolução verificáveis | pode ser genérico; licença não resolve marca, pessoa ou trade dress | protótipos e fallback por cliente |
| Gerar novo asset | espaço negativo e breakpoints sob medida | mãos/hardware incorretos, não exclusividade e risco de marca | exploração de gesto/luz, sujeito a revisão humana |
| Fotografia real + máscara | produto fiel, identidade e masters próprios | maior custo; exige contrato, release e permissão aplicável | recomendada para produção |

Candidatos pesquisados, sem download:

- Adobe Stock #1678929390, Johanna: melhor candidato externo para testar crop/máscara; smartphone genérico.
- Pexels #8217475, MART PRODUCTION: gratuito e útil para protótipo, mas com aparência de mockup.
- Unsplash `_Q5HFTpOvDI`, Lorin Both: exploração experimental/mobile; não garante modelo real.
- Pexels #16169346, Basil Muhammed: rejeitado para a hero por enquadramento/modelo, apesar de conter mão + iPhone.

Relatório de procedência, licenças e riscos: [03 — assets e licenças](research/03-assets-e-licencas.md). A Apple não deve ser tratada como biblioteca de assets; consultar seus [termos do site](https://www.apple.com/legal/internet-services/terms/site.html), [diretrizes para terceiros](https://www.apple.com/in/legal/intellectual-property/guidelinesfor3rdparties.html) e, quando necessário, [Rights and Permissions](https://www.apple.com/legal/contact/rights-permissions.html).

## 9. Recomendação argumentada

Aplicar **B — Cinematográfica controlada** como direção aprovada para esta refatoração, preservando:

- CTA específico e inequívoco;
- carrinho integrado ao chrome e oculto quando vazio;
- continuidade visual entre hero e começo da comparação;
- fallback estático completo;
- movimento curto, coordenado e sem loop.

A e C permanecem alternativas documentadas, mas não serão implementadas neste ciclo.

Para mídia de produção, usar **fotografia real + máscara própria por cliente**. O asset atual pode acelerar protótipos, mas não deve ser publicado sem comprovação de direitos.

## 10. Estratégia white-label

Separar cinco contratos:

1. **Conteúdo:** eyebrow, título/grupos semânticos, apoio, CTA e links.
2. **Tema:** papéis de cor, famílias display/body/ui, pesos e contraste.
3. **Composição:** preset, densidade, alinhamento semântico, entrada do asset e receita limitada de profundidade.
4. **Comportamento:** nav, carrinho, motion profile e fallbacks.
5. **Assets:** desktop/mobile, poster, alt, dimensão, ponto focal limitado, licença e hash.

Presets propostos:

- `editorial-overlap`;
- `editorial-commerce`;
- `campaign-reveal` opcional.

Evitar propriedades públicas arbitrárias de `x/y/scale`. Cada preset contém receitas testadas; a loja escolhe opções como entrada `start | end | bottom` e densidade `compact | standard`.

A profundidade também é limitada a receitas testadas como `media-behind`, `masked-crossing` e `media-front-safe`; não se expõe `z-index` livre. Asset ausente ou falho aciona uma composição tipográfica completa, sem vazio desproporcional e sem perder CTA ou navegação.

O título preserva uma frase completa acessível e pode expor grupos semânticos opcionais. CSS mantém grupos curtos juntos e quebra entre eles; um plano por breakpoint só é aceito quando copy e fonte forem validados em conjunto. Detalhes: [estrategia-white-label.md](estrategia-white-label.md).

## 11. Estratégia responsiva

- **Compacta, 320–479px:** asset mobile dedicado; título, ação e legibilidade primeiro; gesto entra de baixo ou lateral inferior.
- **Intermediária, 480–899px:** composição própria para eliminar o cliff atual; não herdar cegamente mobile/desktop.
- **Ampla, ≥900px:** título e asset compartilham o campo editorial com área segura explícita.
- Usar `<picture>`/fontes responsivas para a mídia, mesmo quando seu `alt` for vazio por decisão decorativa; não depender de pseudo-elemento único.
- Dividir profundidade: asset abaixo do texto por padrão; somente uma máscara frontal deliberada pode cruzar a área segura.
- Validar 320, 360, 390, 430, 768, 1024 e 1440px, landscape curto, zoom 200%, fonte fallback e copy curto/longo.
- Validar Brave/Chromium e Firefox desktop; Safari/iOS e Android reais continuam gates antes da produção. Firefox deve receber o fallback sem refração e manter contraste/material equivalentes.

## 12. Conteúdo para comparação

Nenhuma frase é definitiva. Três territórios iniciais:

### Escolha clara

**Título:** “Não escolha pelo número. Escolha pelo que muda para você.”  
**Apoio:** “Compare gerações, tamanhos e acabamentos de um jeito claro, sem transformar a escolha em uma ficha técnica.”  
**CTA:** “Começar comparação”.

### Curadoria

**Título:** “O iPhone certo aparece quando você compara o que importa.”  
**Apoio:** “Veja diferenças que afetam sua rotina e encontre uma configuração que faça sentido para você.”  
**CTA:** “Encontrar meu iPhone”.

### Exploração de modelos

**Título:** “Cada geração muda alguma coisa. Descubra o que muda para você.”  
**Apoio:** “Compare tamanho, acabamento e recursos com contexto, não apenas por especificações.”  
**CTA:** “Explorar os modelos”.

O posicionamento da loja escolhe o território; o template não impõe a mesma promessa a todos os clientes.

## 13. Navegação, CTA e carrinho

- Nav inicial: marca à esquerda, links e ação/carrinho à direita, integrada ao grid da campanha.
- Ao ficar sticky, ganha material discreto e fallback opaco; evitar sombra pesada e capsule desconectada.
- Mobile: marca, menu e carrinho condicionado ao estado.
- Carrinho vazio: oculto. Com itens: badge discreto; `Popover` desktop e drawer/sheet localizado no mobile.
- CTA principal: bloco retangular preciso ou link editorial robusto; área de toque ≥44×44px e foco visível.
- CTA e popover nascem de uma origem espacial clara; não manter dock flutuante competindo com a mensagem.

## 14. Movimento

Movimentos permitidos:

- entrada coordenada curta de copy + máscara do aparelho;
- resposta local pequena no CTA;
- materialização do popover a partir do trigger;
- passagem curta e moderada para a próxima seção;
- direção B: reveal finito do asset, sem loop.

Proibidos no preset padrão:

- flutuação infinita;
- rotação constante;
- glow seguindo cursor;
- parallax agressivo;
- animação independente em todos os elementos.

`prefers-reduced-motion` recebe estado final imediato ou crossfade curto. Vidro também precisa de fallbacks para transparência reduzida e contraste elevado.

## 15. Plano incremental

1. **Aprovar esta spec B:** confirmar contrato, asset/fallback, budgets e gates.
2. **Abrir `/to-tickets`:** decompor a spec em mudanças pequenas, ordenadas e verificáveis.
3. **Fundação:** fonte canônica de tema, preset engine, fixtures e isolamento do CSS da hero.
4. **Chrome:** masthead, sticky, menu e carrinho condicionado, com primitives Glin auditados.
5. **Hero estática:** tipografia, grupos de quebra, `<picture>`, poster, fallback e área segura.
6. **Movimento:** reveal coordenado e estado settled, somente após a composição estática passar nos gates.
7. **QA:** visual, cross-route, teclado, leitor de tela, preferências, browsers e budgets de mídia/performance.
8. **Migração/documentação:** promover preset aprovado, registrar licença e atualizar cofre; remover solução anterior somente depois da validação.

## 16. Critérios de aceite

### Visual e conteúdo

- O título segue o plano aprovado sem órfãos acidentais; alvo inicial de 2–3 linhas no desktop e 3–4 no compacto.
- Não existe cliff em 720–899px.
- Nenhum pixel opaco do asset cruza glifos fora da máscara/área segura aprovada.
- Em revisão visual humana do conjunto fixo de snapshots, o observador identifica primeiro o iPhone e descreve a mão como gesto secundário.
- Em revisão humana sem explicação prévia, a ação principal é identificada corretamente; sua forma não transforma a hero em e-commerce genérico.
- Snapshots com fonte fallback, copy curta/nominal/longa e temas permitidos passam a mesma checklist, sem colisão ou truncamento.
- Texto atende [WCAG 2.2 AA](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): 4,5:1 no texto normal e 3:1 no texto grande. Informação visual necessária para identificar controles, estados e foco atinge [3:1 contra cores adjacentes](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

### Responsivo e acessível

- Sem overflow horizontal na matriz de viewports.
- Funciona em landscape curto e zoom 200%.
- Todos os controles interativos têm área mínima de 44×44px e funcionam por teclado, com foco visível.
- `Popover` possui nome, navegação por teclado, Escape e devolução de foco ao trigger; não é tratado como diálogo modal.
- `Sheet`/drawer possui título acessível, focus trap, Escape, fechamento em português e devolução de foco ao trigger.
- Nenhuma informação ou ação depende de hover ou movimento.
- Reduced motion, transparency e contrast têm resultados equivalentes e legíveis.
- Home, Catálogo, Sobre, Contato e páginas de produto mantêm rota ativa, links, menu e carrinho corretos.
- No Catálogo, morph para filtros, hide/show por scroll e retorno à navegação continuam funcionais; badge, estado aberto e itens persistidos sobrevivem às rotas conforme o contrato atual.

### Mídia, performance e legal

- `width`/`height` ou aspect ratio reservam espaço e evitam salto de layout.
- Desktop/mobile têm masters reais; vídeo, se existir, possui poster e fallback estático.
- Nenhum hotlink ou watermark.
- Manifesto guarda fonte, autor, licença, data, recibo/contrato, releases, cliente permitido e hashes.
- Produto retratado corresponde fisicamente ao modelo anunciado.
- A spec aprovada contém budgets numéricos para LCP, CLS, bytes transferidos, tamanho decodificado e vídeo; a implementação futura precisa passar todos.
- Build e snapshots no Brave e fallback no Firefox passam; Safari/iOS e Android reais permanecem gate antes da produção.

### White-label

- Trocar cliente não exige editar `HomeOpening.jsx` ou offsets em CSS.
- Conteúdo, tema, composição, comportamento e assets são independentes.
- Configurações inválidas caem em preset seguro, não em layout quebrado.
- Cada cliente pode obter resultado distinto por preset, tipografia, conteúdo, crop e direção de asset — não apenas logo/cor/título.

## 17. Riscos

| Tipo | Risco | Mitigação planejada |
| --- | --- | --- |
| Técnico | CSS global grande e sem testes | isolar novo módulo, snapshots por breakpoint e migração incremental |
| Técnico | aliases Glin usam internals | adotar barrel público ou wrapper local na implementação futura |
| Técnico | tokens/utilities Glin divergentes | uma fonte canônica de tema e verificação do CSS compilado |
| Técnico | refração varia por navegador | fallback sólido/translúcido e limite a superfícies pequenas |
| Visual | fonte/copy destroem quebras | grupos semânticos, fixtures extremas e preview por preset |
| Visual | mão domina ou sobreposição parece acidental | masters separados, área segura e máscara frontal explícita |
| Visual | biblioteca dita estética genérica | Glin como primitive; composição e tipografia próprias |
| Acessibilidade | Sheet/Modal locais têm `Close` em inglês | fork/cópia corrigida, upstream fix ou drawer próprio; teste por teclado/leitor |
| Legal | asset atual sem licença | somente protótipo; fotografia/release/licença por cliente |
| Legal | stock não cobre marca/endosso | due diligence, status do cliente e manifesto de procedência |
| Legal | fonte pode não permitir uso web ou redistribuição no template | licença e arquivos vinculados ao cliente; fallback aprovado |
| Legal | licença de mídia pode valer para apenas um cliente | manifesto e compra/cessão individual; não empacotar indiscriminadamente |
| Operacional | projeto sem Git | não apagar a versão anterior; inicialização/histórico só com autorização |
| Performance | foto/vídeo de campanha pesado | masters otimizados, poster, preload controlado e budgets bloqueadores definidos na spec |
| Regressão | Navbar/carrinho globais também controlam Catálogo e persistência | gates cross-route antes de promover o novo chrome |

## 18. Próxima sequência

O Wayfinder agora está na fronteira de validação incremental da implementação B:

1. manter [`spec/direcao-b-cinematografica.md`](spec/direcao-b-cinematografica.md) como contrato;
2. usar os tickets resolvidos como registro da execução incremental;
3. promover a direção somente após revisão visual humana final e validação dos
   budgets de mídia em ambiente de deploy.
