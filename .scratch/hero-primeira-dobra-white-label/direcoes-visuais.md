# Material de decisão — hero e primeira dobra

Status: exploração; nenhuma proposta está aprovada para produção.

## Premissas comuns

- Preservar linguagem editorial, tipografia dominante, espaço negativo, o gesto da mão e uma sobreposição deliberada.
- Fazer do iPhone o protagonista; a mão comunica uso e escala, sem dominar o enquadramento.
- Evitar a solução genérica “texto à esquerda + render inclinado à direita”, bem como glow, partículas, avaliações, selos e cards de benefícios.
- Separar conteúdo, tema, composição, comportamento e assets em presets controlados.
- Usar Glin UI somente onde seus primitives melhoram semântica, foco, estados e material. A composição visual da hero continua própria.
- Todo movimento precisa comunicar entrada, causa e efeito ou continuidade espacial; oferecer alternativas estáticas ou crossfade com `prefers-reduced-motion`.

## Matriz resumida

| Direção | Força principal | Asset ideal | Esforço | White-label | Risco principal |
| --- | --- | --- | --- | --- | --- |
| A — Editorial refinada | Identidade e legibilidade | Foto recortada com espaço negativo planejado | Médio | Alta | Parecer excessivamente austera se o conteúdo for fraco |
| B — Cinematográfica controlada | Impacto de campanha | Asset próprio por breakpoint, possivelmente vídeo curto | Alto | Média | Custo, peso e manutenção por cliente |
| C — Comercial sofisticada | Clareza de escolha e conversão | Foto editorial acompanhada de pontos de entrada discretos | Médio | Muito alta | Perder o gesto de campanha se os controles crescerem demais |

## A — Editorial refinada

### Descrição

Aprofunda a ideia existente em vez de substituí-la. O título ocupa o plano principal, a mão entra por uma borda e o aparelho cruza somente uma área segura predefinida. A navegação funciona como uma masthead discreta, e o CTA tem presença tipográfica e geométrica precisa.

### Wireframe textual

```text
┌ marca ───────── links ───── ação / carrinho ┐
│                                              │
│ EYEBROW                                      │
│ Não escolha pelo número.      [mão → iPhone]│
│ Escolha pelo que muda          atravessa uma │
│ para você.                     área sem texto│
│                                              │
│ apoio curto                                   │
│ [ Começar comparação → ]                     │
│                         próxima seção ↓      │
└──────────────────────────────────────────────┘
```

### Hierarquia

1. Título em duas ideias legíveis.
2. Produto; a mão permanece secundária.
3. CTA específico.
4. Apoio editorial.
5. Navegação e indicação da próxima seção.

### Asset necessário

- Opção mínima: reenquadrar o asset atual, com máscaras específicas para desktop e mobile.
- Opção recomendada: fotografia recortada em alta resolução com o aparelho em uma extremidade e espaço negativo real para o título.
- Entregáveis por asset: desktop, mobile, fallback estático, texto alternativo, ponto focal e registro de origem/licença.

### Glin UI aplicável

- `Button` com `asChild` ou `Link` para semântica, foco e estados do CTA, com composição visual própria.
- `Popover` para carrinho compacto no desktop somente quando houver itens.
- `Sheet`/`Drawer` como candidato ao menu e carrinho mobile, condicionado à solução do rótulo interno “Close” que hoje está hardcoded em inglês.
- Tokens de blur, sombra, duração e easing para o estado sticky. Não usar `GlassNavbar` sem adaptação: sua forma full-width/sticky pronta não corresponde automaticamente à masthead editorial.

### Princípios Apple Design aplicados

- Hierarquia por escala, espaço e contraste antes de decoração.
- Tipografia com tracking e leading ajustados para o tamanho real.
- Material translúcido apenas para indicar mudança de camada no estado sticky.
- Resposta direta, movimento interrompível e redução de movimento.
- Familiaridade nos controles; identidade própria na composição.

### Desktop e mobile

- Desktop: título limitado a duas ou três linhas planejadas; aparelho pode cruzar o campo do título apenas em uma área vazia validada por caixa delimitadora.
- Mobile: o asset deixa de ser uma simples redução. A mão parte da base, o aparelho adota enquadramento vertical ou diagonal leve e nunca cobre glifos. CTA permanece antes da dobra ou fica imediatamente associado ao começo da comparação.

### Riscos

- Fontes personalizadas alteram métricas e podem invalidar as quebras.
- O asset atual tem proporção muito horizontal para um mobile verdadeiramente editorial.
- Uma masthead simples exige muito rigor de alinhamento para não parecer inacabada.

### Capacidade white-label

Alta. Muda de forma perceptível com família tipográfica, densidade, tom de campanha, posição de entrada do asset e tema, sem expor coordenadas arbitrárias ao cliente.

## B — Cinematográfica controlada

### Descrição

Transforma a primeira dobra em uma abertura de campanha curta. O texto é mais reduzido; o aparelho é revelado por máscara ou por um plano fotográfico em profundidade. O movimento termina rapidamente e conduz à comparação, sem loop, parallax agressivo ou efeitos decorativos.

### Wireframe textual

```text
┌ masthead discreta / transparente ────────────┐
│                                              │
│ [plano fotográfico ocupando a dobra]         │
│      eyebrow                                 │
│      título curto                            │
│      apoio                                   │
│      ação →                                  │
│                                              │
│ máscara revela aparelho e termina            │
│ próximo capítulo aparece na base             │
└──────────────────────────────────────────────┘
```

### Hierarquia

1. Produto em contexto.
2. Título curto.
3. Ação.
4. Apoio e navegação.

### Asset necessário

- Fotografia ou vídeo próprio, com quadro final estável e composição distinta para desktop/mobile.
- Alternativa sem vídeo: sequência de duas imagens ou uma máscara que revele uma fotografia única.
- Poster otimizado obrigatório; nenhum vídeo deve ser pré-requisito para compreender ou usar a página.

### Glin UI aplicável

- `Button`/`Link` para a ação e estados acessíveis.
- `Popover`/`Sheet` para navegação e carrinho, se aprovados no sistema maior.
- Tokens de movimento e material no chrome. A revelação fotográfica deve ser implementada pela camada de composição, não atribuída a um componente Glin inexistente.

### Princípios Apple Design aplicados

- Movimento com função narrativa e destino espacial claro.
- Entrada coordenada, não uma coleção de animações independentes.
- Estado final estável; interação continua disponível durante ou após uma transição interrompível.
- Crossfade ou frame estático em redução de movimento.

### Desktop e mobile

- Desktop: plano amplo com espaço negativo deliberado e duração curta antes de estabilizar.
- Mobile: asset vertical dedicado; enquadramento e poster diferentes, sem `object-position` extremo aplicado ao arquivo horizontal.

### Riscos

- Maior custo legal, criativo, de performance e de QA.
- Vídeo ou fotografia genérica reduz a capacidade de personalização real.
- Muitas lojas não terão material próprio no nível necessário.

### Capacidade white-label

Média. Excelente como preset premium de campanha, mas não deve ser a única base do produto. Requer uma versão estática robusta para lojas sem produção audiovisual.

## C — Comercial sofisticada

### Descrição

Mantém a peça editorial, mas torna explícito o próximo passo. A primeira dobra apresenta uma promessa de escolha e um ponto de entrada para comparação; a transição para a seção seguinte já antecipa “geração, tamanho ou uso” sem criar cards de benefícios.

### Wireframe textual

```text
┌ marca ───── links ───── comparar / carrinho ┐
│                                              │
│ EYEBROW                                      │
│ Título editorial             [gesto/produto] │
│ apoio orientado à escolha                    │
│                                              │
│ ┌ Começar comparação ──────────────── → ┐   │
│ └───────────────────────────────────────┘   │
│ geração  ·  tamanho  ·  acabamento          │
└──────── início da comparação ───────────────┘
```

### Hierarquia

1. Promessa de escolha.
2. Produto e gesto.
3. CTA principal inequívoco.
4. Três dimensões de comparação, apresentadas como texto de navegação e não como selos.
5. Chrome da loja.

### Asset necessário

- Fotografia editorial com área segura semelhante à direção A.
- O asset pode variar por posicionamento: premium, seminovos, preço transparente ou curadoria, mantendo o contrato de layout.

### Glin UI aplicável

- `Button` ou `Link` para a ação principal, com aparência retangular própria.
- `Popover` para resumo do carrinho com itens no desktop.
- `Sheet`/`Drawer` para fluxo mobile após resolver localização.
- `Heading` e `Text` não são suficientes sozinhos para a escala hero; podem ser usados nas regiões secundárias, sem forçar a hero a parecer demonstração da biblioteca.

### Princípios Apple Design aplicados

- Ação ligada diretamente ao objetivo do visitante.
- Agrupamento e mapeamento claros entre promessa, dimensões de escolha e começo do catálogo.
- Redução de ruído e rótulos diretos.
- Feedback local e acessível, sem deslocar a composição inteira.

### Desktop e mobile

- Desktop: primeira dobra fecha visualmente no início da comparação, criando continuidade vertical.
- Mobile: CTA em largura confortável, sem barra fixa cobrindo conteúdo; começo da comparação aparece como próximo bloco natural. Carrinho só entra no chrome quando existe seleção.

### Riscos

- Adicionar controles demais destrói a aparência de campanha.
- A mensagem precisa continuar editorial, não virar uma sequência de instruções.

### Capacidade white-label

Muito alta. Conteúdo, ação e dimensões comerciais podem mudar por cliente, enquanto o preset limita densidade e mantém a precisão visual.

## Recomendação provisória

Usar **A como linguagem-base** e incorporar de **C** a clareza do CTA, a política de carrinho e a continuidade com a comparação. Manter **B como preset premium opcional**, não como dependência do template. Essa recomendação é importante, mas não será considerada aprovada até a comparação por protótipos isolados e a decisão do usuário.

## Decisões a validar

| Decisão | Classe | Opções |
| --- | --- | --- |
| Direção-base do template | Bloqueadora | A; B; C; híbrida A+C |
| Política do asset atual | Bloqueadora | reenquadrar; substituir licenciado; gerar; produzir foto + máscara |
| Presets oferecidos | Bloqueadora | somente base estática; base + comercial; base + comercial + campanha premium |
| Título e quebras por breakpoint | Importante | plano semântico; plano editorial opcional; somente quebra automática |
| Navegação inicial/sticky | Importante | masthead editorial que ganha material; barra sólida; capsule revisada |
| Carrinho vazio | Importante | oculto; apenas na navegação; flutuante reduzido |
| Movimento de entrada | Refinamento | estático; máscara curta; fade/translate coordenado |
