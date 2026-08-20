# Auditoria factual da hero e da primeira dobra atual

Data: 2026-08-04  
Escopo: somente o estado atual da Home; nenhuma proposta foi implementada.

## Resumo executivo

A direção editorial existe e é reconhecível: tipografia dominante, fundo branco, gesto mão-aparelho, sobreposição e espaço negativo. Os problemas relatados não decorrem dessa direção em si, mas de quatro acoplamentos verificáveis:

1. **Bloqueador — breakpoint de 720 px:** a hero muda abruptamente de uma coluna larga para duas colunas, reduzindo o H1 de 655 px para 248 px de largura. O título passa de duas para seis linhas entre 719 e 720 px.
2. **Bloqueador — camadas sem área segura:** o asset inteiro é um pseudo-elemento em `z-index: 2`, enquanto o contêiner de conteúdo está em `z-index: 1`; portanto o aparelho e a mão podem pintar sobre qualquer parte do texto. Não há máscara, área segura nem regra por linha.
3. **Importante — um único asset para todas as proporções:** o PNG 924×305 é ampliado para 1180,8×389,8 no desktop e para 585×193,1 no mobile. Escala, recorte e ponto focal são efeitos colaterais de `width/right/top/bottom`, não uma composição editorial por breakpoint.
4. **Importante — primeira dobra sem arquitetura white-label:** texto, CTA, asset e navegação são constantes internas. `HomeOpening` não recebe configuração e não há preset de composição.

As capturas fornecidas confirmam a sobreposição no desktop e a separação texto/imagem no mobile. O suporte a redução de movimento, transparência e aumento de contraste já existe e deve ser preservado.

## Fontes primárias inspecionadas

- Hero e conteúdo: [`src/components/HomeOpening.jsx`](../../../src/components/HomeOpening.jsx#L4-L27).
- Estrutura da Home: [`src/pages/HomePage.jsx`](../../../src/pages/HomePage.jsx#L58-L86) e primeira seção posterior em [`src/components/FeaturedProductShowcase.jsx`](../../../src/components/FeaturedProductShowcase.jsx#L12-L27).
- Layout, camadas, tipografia e breakpoints: [`src/styles.css`](../../../src/styles.css#L715-L796) e [`src/styles.css`](../../../src/styles.css#L1521-L1559).
- Navegação: [`src/components/Navbar.jsx`](../../../src/components/Navbar.jsx#L8-L47), [`src/components/Navbar.jsx`](../../../src/components/Navbar.jsx#L123-L186) e [`src/styles.css`](../../../src/styles.css#L173-L230).
- Carrinho: [`src/components/FloatingCart.jsx`](../../../src/components/FloatingCart.jsx#L52-L125), [`src/App.jsx`](../../../src/App.jsx#L35-L70) e [`src/styles.css`](../../../src/styles.css#L312-L385).
- Movimento e acessibilidade: [`src/components/ViewportPopIn.jsx`](../../../src/components/ViewportPopIn.jsx#L3-L46), [`src/lib/viewTransitions.js`](../../../src/lib/viewTransitions.js#L3-L29) e [`src/styles.css`](../../../src/styles.css#L1570-L1654).
- Asset atual: [`assets/home/hero/iphone-air-in-hand-transparent.png`](../../../assets/home/hero/iphone-air-in-hand-transparent.png), descrito apenas como recorte do original em [`docs/Assets e Mídia.md`](../../../docs/Assets%20e%20M%C3%ADdia.md#L35-L40).
- Captura desktop 1440×900: [`page-2026-08-04T18-31-39-110Z.png`](../../../output/playwright/hero-wayfinder/.playwright-cli/page-2026-08-04T18-31-39-110Z.png), SHA-256 `6a71ca2514ea3f6a059693eadbac63eba6437b0d73b6ca5c1acc4a0608720fb9`.
- Captura mobile 390×844: [`page-2026-08-04T18-31-57-900Z.png`](../../../output/playwright/hero-wayfinder/.playwright-cli/page-2026-08-04T18-31-57-900Z.png), SHA-256 `aaba1fdafe7bd7968f7fbf50cabc69568eba84566b1ed8334dbc326ffe29d2b5`.
- Árvore de acessibilidade das mesmas execuções: [`desktop`](../../../output/playwright/hero-wayfinder/.playwright-cli/page-2026-08-04T18-31-26-694Z.yml) e [`mobile`](../../../output/playwright/hero-wayfinder/.playwright-cli/page-2026-08-04T18-31-55-996Z.yml).

As medidas abaixo foram repetidas em `http://127.0.0.1:5173/` com Brave 150 headless (`navigator.userAgentData.brands` incluiu `Brave`) nos mesmos viewports. Não foram geradas novas capturas para o relatório.

## Medidas da primeira dobra

| Caixa | Desktop 1440×900 | Mobile 390×844 |
|---|---:|---:|
| Header fixo | `0,0,1440×70` | `0,0,390×66` |
| Hero | `0,80,1440×820` | `0,80,390×764` |
| Navegação | `566,5,16,307×54` | `41,5,12,307×54` |
| Bloco de copy | `144,202,611,6×591,6` | `20,187,350×341,3` |
| H1 | `144,231,611,6×404,3` | `20,216,350×140,4` |
| Descrição | `144,659,576×64,5` | `20,380,350×78,1` |
| CTA | `144,746,144,9×48` | `20,481,144,9×48` |
| Caixa do pseudo-elemento/asset | `374,4,374,7,1180,8×389,8` | `-101,4,583,7,585×193,1` |
| Indicador de rolagem | `654,7,862,8,130,6×18` | `129,7,806,8,130,6×18` |
| Carrinho | `1356,816,56×56` | `322,776,56×56` |

Formato das caixas: `x,y,largura×altura`, em CSS pixels. A hero começa em `y=80` porque o `<main>` tem `pt-20`; sua altura mínima é `100svh - 5rem`, logo termina exatamente no limite inferior dos dois viewports ([`src/App.jsx`](../../../src/App.jsx#L44-L45), [`src/styles.css`](../../../src/styles.css#L716-L724)). Nenhuma parte de “Novidades” aparece antes da primeira rolagem.

## Evidências por problema relatado

### 1. Título — confirmado, com um cliff responsivo adicional

O texto é uma string única hardcoded, sem `<br>`, props ou marcação de grupos editoriais ([`HomeOpening.jsx:18-20`](../../../src/components/HomeOpening.jsx#L18-L20)). A quebra é delegada a `text-wrap: balance`, ao tamanho fluido e à largura que sobrar na grade ([`styles.css:753-763`](../../../src/styles.css#L753-L763)).

Quebras medidas no Brave:

| Viewport | Largura do H1 | Fonte | Linhas efetivas |
|---:|---:|---:|---|
| 320 | 280 | 52 px | `Um iPhone` / `para o` / `seu jeito` / `de avançar.` |
| 390 | 350 | 52 px | `Um iPhone` / `para o seu jeito` / `de avançar.` |
| 719 | 655 | 71,9 px | `Um iPhone para o` / `seu jeito de avançar.` |
| **720** | **248** | **72 px** | **`Um` / `iPhone` / `para o` / `seu` / `jeito de` / `avançar.`** |
| 768 | 296 | 76,8 px | `Um` / `iPhone` / `para` / `o seu` / `jeito de` / `avançar.` |
| 1023 | 505 | 102,3 px | `Um iPhone` / `para o seu` / `jeito de` / `avançar.` |
| 1024 | 506 | 88 px | `Um iPhone` / `para o seu` / `jeito de` / `avançar.` |
| 1440 | 611,6 | 112,32 px | `Um iPhone` / `para o seu` / `jeito de` / `avançar.` |

O salto ocorre porque em `min-width: 720px` a grade passa imediatamente a duas colunas (`1.1fr/0.9fr`) ([`styles.css:1521-1532`](../../../src/styles.css#L1521-L1532)). Em 1024 px uma segunda regra troca `10vw` por `7.8vw`, reduzindo a fonte de 102,3 para 88 px ([`styles.css:1557-1559`](../../../src/styles.css#L1557-L1559)). Portanto:

- a captura de 1440 confirma a linha isolada `jeito de` seguida de `avançar.`;
- a captura de 390 não reproduz cinco linhas, mas larguras 320–375 produzem quatro;
- 720–768 px é mais grave que as duas capturas fornecidas, com seis linhas e H1 de 389–415 px de altura;
- não existe controle editorial estável para textos alternativos ou fontes de métrica diferente.

A família é apenas uma pilha de sistema; não há `@font-face` ou fonte empacotada ([`styles.css:4-15`](../../../src/styles.css#L4-L15)). Nesta máquina Linux, `fc-match` resolveu `SF Pro Display` e `SF Pro Text` para Noto Sans. Assim, o mesmo texto pode quebrar de maneira diferente em outra plataforma.

### 2. Interseção produto/texto — confirmada no desktop

O asset é desenhado por `.home-opening::after` com `z-index: 2`; `.home-opening-layout` cria uma camada em `z-index: 1` ([`styles.css:726-746`](../../../src/styles.css#L726-L746)). Embora `.home-opening-copy` também declare `z-index: 2`, ele está preso ao contexto do pai em `z-index: 1` ([`styles.css:748-751`](../../../src/styles.css#L748-L751)). Resultado: o pseudo-elemento inteiro pinta acima de todo o copy, não somente em uma área segura.

No desktop 1440, a caixa do asset ocupa `x=374,4…1555,2` e `y=374,7…764,4`. A caixa do H1 ocupa `x=144…755,6` e `y=230,6…634,9`. Por geometria de caixas, ela intercepta os bounds das palavras `o`, `seu`, `de` e `avançar.`; os pixels opacos visíveis na captura atingem principalmente `de` e a região direita da composição. A documentação anterior diz que a ponta “pode sobrepor parte das letras” ([`docs/Sistema Visual e Movimento.md:65-71`](../../../docs/Sistema%20Visual%20e%20Movimento.md#L65-L71)), mas o código não delimita quais letras, profundidade ou contraste; a intenção não está codificada.

Em 390 px, a caixa do asset começa em `y=583,7`, 55 px depois do fim do CTA (`y=528,6`), portanto a captura mobile preserva a leitura. Essa diferença não vem de um asset mobile: é apenas outra posição do mesmo pseudo-elemento.

Nos breakpoints intermediários, os bounds do asset também invadem o texto: `de/avançar.` a 720 px, `seu/de/avançar.` a 768 px e `o/seu/de/avançar.` a 1024 px. Não há `clip-path`, máscara ou zona reservada para proteger os glifos.

### 3. Mão e aparelho — escala confirmada; protagonismo não é controlável

O arquivo tem 924×305 px, RGBA, 214.976 bytes e SHA-256 `1c9f1480bde02928c29927da799df30b0c32079633a6757d47bc641a6d9a3fc6`. Seu conteúdo opaco ocupa praticamente toda a moldura (`923×301+0+0` após trim do alpha), então `background-size: contain` não elimina margens internas relevantes.

- Em 1440, o asset é renderizado com 1180,8 px, **82% do viewport** e 1,278× a largura intrínseca. Fica 115,2 px para fora à direita. A mão ocupa toda a altura visual do recorte e grande parte da metade direita; o telefone é muito mais fino verticalmente.
- Em 390, o asset é renderizado com 585 px, **150% do viewport**, indo de `x=-101,4` a `x=483,6`; há clipping nas duas laterais. A captura conserva o aparelho legível, mas o enquadramento depende dos offsets negativos, não de um ponto focal declarado.

Só há um URL de asset e uma custom property ([`HomeOpening.jsx:4-15`](../../../src/components/HomeOpening.jsx#L4-L15)). O breakpoint troca `top/right/width/transform`, mas não oferece `picture`, `srcset`, focal point, escala independente da mão ou recorte mobile ([`styles.css:726-738`](../../../src/styles.css#L726-L738), [`styles.css:1521-1530`](../../../src/styles.css#L1521-L1530)). Como é background de pseudo-elemento, a imagem também não existe na árvore de acessibilidade.

### 4. Navegação — visualmente autônoma da campanha

A navegação é uma lista interna fixa de quatro links; não recebe marca, CTA comercial ou configuração da loja ([`Navbar.jsx:8-13`](../../../src/components/Navbar.jsx#L8-L13)). O shell mede exatamente 307×54 px tanto em 1440 quanto em 390 e permanece centralizado/fixo ([`Navbar.jsx:123-136`](../../../src/components/Navbar.jsx#L123-L136), [`styles.css:222-230`](../../../src/styles.css#L222-L230)).

O Glint UI já é usado de forma real por `useLiquidGlass`, com `displacement: 10`, `blur: 20`, `saturate: 1.8` e perfil `squircle` ([`Navbar.jsx:31-43`](../../../src/components/Navbar.jsx#L31-L43)). Por cima, o CSS adiciona cápsula, dois níveis de sombra e gradientes de vidro ([`styles.css:173-207`](../../../src/styles.css#L173-L207)). Isso explica a leitura de “componente pronto”: a navegação é um objeto fechado e sombreado, sem relação estrutural com marca/copy/asset.

Medidas de separação:

- desktop: base do nav em `y=70`, eyebrow em `y=202,2` → **132,2 px** de intervalo;
- mobile: base do nav em `y=66`, eyebrow em `y=187,4` → **121,4 px** de intervalo.

Pontos positivos existentes: `nav` tem nome acessível, o link ativo usa `aria-current="page"`, os alvos têm `min-height: 44px` e há foco visível global ([`Navbar.jsx:15-28`](../../../src/components/Navbar.jsx#L15-L28), [`styles.css:156-170`](../../../src/styles.css#L156-L170)). Na Home, o comportamento de esconder/reaparecer por scroll não é ativado: o efeito retorna cedo fora de `/catalogo` ([`Navbar.jsx:75-80`](../../../src/components/Navbar.jsx#L75-L80)).

### 5. CTA — funcional, porém com baixa saliência

O CTA é um link textual `Explorar catálogo ›`, com 144,9×48 px nos dois viewports. Seu CSS define somente layout, espaçamento, cor, tamanho e peso; não há borda, fundo ou bloco editorial ([`styles.css:773-782`](../../../src/styles.css#L773-L782)). Ele navega corretamente para `/catalogo` pela View Transition API ([`HomeOpening.jsx:21-23`](../../../src/components/HomeOpening.jsx#L21-L23), [`AnimatedLink.jsx`](../../../src/components/AnimatedLink.jsx#L4-L29)).

A baixa hierarquia relativa é mensurável: CTA usa texto de 15,2 px em uma hero cujo H1 chega a 112,32 px, enquanto o carrinho é um círculo escuro 56×56 com duas sombras fortes. O CTA é clicável e tem alvo adequado; o problema é hierarquia visual, não funcionalidade.

### 6. Carrinho — confirmado como competidor persistente

`FloatingCart` é montado incondicionalmente depois do footer, mesmo com zero itens ([`App.jsx:68-70`](../../../src/App.jsx#L68-L70)). O botão permanece visível porque `.floating-action-position` inicia com `opacity: 1`; a regra condicional existente também define `opacity: 1`, e o hook de scroll `useFloatingScrollMotion` não é importado por nenhum componente ([`styles.css:312-329`](../../../src/styles.css#L312-L329), [`src/hooks/useFloatingScrollMotion.js`](../../../src/hooks/useFloatingScrollMotion.js#L1-L40)).

Na primeira dobra:

- desktop: `x=1356…1412`, `y=816…872`; compartilha a faixa vertical inferior com o indicador de rolagem, que começa em `y=862,8`;
- mobile: `x=322…378`, `y=776…832`; fica 12 px da direita e 12 px da base e encosta visualmente no fim do asset (`y=776,8`) e no indicador (`y=806,8…824,8`).

O `z-index: 50` fica acima do header (`z-index: 40`) e de toda a hero ([`styles.css:312-315`](../../../src/styles.css#L312-L315), [`Navbar.jsx:123-127`](../../../src/components/Navbar.jsx#L123-L127)). A superfície dark glass e a sombra de até 32 px reforçam essa prioridade ([`styles.css:331-346`](../../../src/styles.css#L331-L346)). O badge aparece apenas com itens, mas o botão aparece vazio e seu rótulo acessível explicita `0 itens` ([`FloatingCart.jsx:90-109`](../../../src/components/FloatingCart.jsx#L90-L109)).

O sheet tem `role="dialog"`, `aria-modal`, foco inicial no fechar e suporte a Escape ([`FloatingCart.jsx:63-79`](../../../src/components/FloatingCart.jsx#L63-L79), [`FloatingCart.jsx:112-145`](../../../src/components/FloatingCart.jsx#L112-L145)). Não foi encontrado focus trap nem restauração explícita do foco ao botão de origem; isso é uma lacuna de acessibilidade da interação, embora não explique a competição visual.

### 7. Texto de apoio — confirmado como fixo e técnico

A frase completa está hardcoded em `HomeOpening` e termina com “feita primeiro para o celular” ([`HomeOpening.jsx:18-23`](../../../src/components/HomeOpening.jsx#L18-L23)). Ela descreve a implementação responsiva, não uma diferença de produto, atendimento ou compra. Não há mecanismo para outro posicionamento de loja.

### 8. Primeira dobra e espaço — direção preservada, mas rigidamente acoplada

A hero ocupa exatamente o restante da viewport abaixo dos 80 px de padding do `<main>`. Isso preserva uma abertura de campanha limpa, mas faz com que o scroll cue seja a única pista da próxima seção. No desktop, o copy ocupa 591,6 px de altura (72% da hero) e o H1 sozinho ocupa 404,3 px (49%). No mobile 390, o copy ocupa 341,3 px e o asset aparece em uma zona separada abaixo; o arranjo é mais legível que o desktop atual.

O espaço negativo superior é amplo, mas não é uma variável editorial: decorre de `align-items: center`, `min-height` e padding fluido ([`styles.css:716-745`](../../../src/styles.css#L716-L745)). Alterações de texto, fonte ou viewport redistribuem esse espaço automaticamente e podem produzir os cliffs medidos.

## Estado de acessibilidade e movimento

### O que já funciona

- A seção referencia semanticamente o H1 por `aria-labelledby`; CTA e scroll cue são links reais ([`HomeOpening.jsx:9-27`](../../../src/components/HomeOpening.jsx#L9-L27)).
- A árvore fornecida expõe `region`, heading de nível 1, os dois links, nav nomeado e carrinho com contagem; não foram encontrados erros no log fornecido, apenas o aviso informativo do React DevTools.
- `ViewportPopIn` consulta `prefers-reduced-motion` antes de observar os elementos e revela imediatamente quando a preferência está ativa ([`ViewportPopIn.jsx:3-29`](../../../src/components/ViewportPopIn.jsx#L3-L29)).
- `runViewTransition` também recusa animação sob reduced motion ([`viewTransitions.js:3-12`](../../../src/lib/viewTransitions.js#L3-L12)).
- CSS desliga View Transitions, pop-in, nav, carrinho e demais movimentos em `prefers-reduced-motion`; também há fallbacks para transparência reduzida e contraste maior ([`styles.css:1570-1654`](../../../src/styles.css#L1570-L1654)).

Probe real com Brave em 390×844 e reduced motion emulado: `matchMedia=true`, copy em `data-pop-in-state="visible"`, `transition-duration: 0s`, `transform: none`; nav e carrinho também computaram `transition-duration: 0s`.

### Lacunas

- O asset principal é semanticamente invisível por ser um background de pseudo-elemento. Isso pode ser correto se for declarado decorativo, mas o código não registra essa decisão.
- A entrada aplica pop-in ao copy inteiro, mas o asset fica estático; não há coreografia entre mensagem e gesto ([`HomeOpening.jsx:16-24`](../../../src/components/HomeOpening.jsx#L16-L24)).
- Focus trap e retorno de foco do carrinho não estão implementados.

## Estado white-label observado

Hoje a primeira dobra separa arquivos, mas não responsabilidades configuráveis:

| Dimensão | Estado atual |
|---|---|
| Conteúdo | Strings internas em `HomeOpening`; links internos em `Navbar`. |
| Tema | Tokens globais em `styles.css`, sem tema por loja. |
| Composição | Uma única classe `.home-opening`; sem preset/variant. |
| Comportamento | Pop-in global e View Transitions; sem configuração da hero. |
| Assets | Um PNG importado diretamente e aplicado por custom property. |
| Breakpoints | Dois cortes globais, 720 e 1024 px; sem asset ou copy específico. |

O componente `HomeOpening()` não recebe props ([`HomeOpening.jsx:9`](../../../src/components/HomeOpening.jsx#L9)), e `HomePage` o instancia sem dados ([`HomePage.jsx:58-62`](../../../src/pages/HomePage.jsx#L58-L62)). Portanto a personalização atual exige editar código-fonte e CSS.

## Matriz de validação dos achados do usuário

| Achado | Resultado | Prioridade | Evidência decisiva |
|---|---|---|---|
| Título alto e quebra `jeito de` | Confirmado; piora para seis linhas em 720–768 | Bloqueadora | Sweep de breakpoints + grade ativada em 720 |
| Interseção prejudica leitura | Confirmada no desktop/intermediário; evitada em 390 | Bloqueadora | Pseudo `z=2` acima do layout `z=1` + captura 1440 |
| Mão grande compete com aparelho | Confirmado como falta de controle; asset ocupa 82%/150% da viewport | Importante | Dimensões computadas e asset único |
| Navegação parece desconectada | Estrutura confirmada | Importante | Cápsula fixa 307×54 sem marca/CTA/carrinho |
| CTA visualmente fraco | Confirmado por estilo e hierarquia relativa | Importante | Link textual 15,2 px sem superfície vs carrinho 56 px escuro |
| Carrinho compete com CTA/hero | Confirmado, inclusive vazio | Importante | Montagem incondicional, z=50, posição e sombra |
| Texto de apoio fala de implementação | Confirmado | Refinamento editorial | String hardcoded |
| Mobile preserva leitura | Confirmado em 390, mas não generalizável a tablet | Importante | Asset abaixo do CTA em 390; cliff em 720 |

## Incógnitas que esta auditoria não resolve

1. **Bloqueadora:** quais famílias de fonte serão realmente licenciadas/permitidas por cliente e quais limites de comprimento precisam ser suportados.
2. **Bloqueadora:** qual regra de sobreposição é intencional — aparelho atrás, ponta à frente, palavra protegida por máscara ou variantes por preset.
3. **Importante:** procedência, autor e licença do PNG atual. A documentação só registra que existe um original opaco e um recorte; não registra permissão comercial.
4. **Importante:** quais larguras de conteúdo e idiomas o template deverá suportar além do texto de exemplo.
5. **Importante:** se o carrinho deve existir vazio, entrar na navegação ou aparecer apenas após seleção.
6. **Refinamento:** se o scroll cue precisa permanecer quando a próxima seção passar a aparecer parcialmente na dobra.

## Conclusão para os próximos tickets

A refatoração não precisa abandonar o gesto editorial; precisa transformar intenções hoje implícitas em contratos: grupos de quebra, área segura, ordem de camadas, focal point/asset por breakpoint, preset de composição e política de navegação/carrinho. O primeiro problema a impedir nos protótipos é o cliff de 720 px; o segundo é qualquer sobreposição que não tenha uma zona explicitamente protegida.
