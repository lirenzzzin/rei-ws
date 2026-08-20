# Estratégia white-label proposta

Status: proposta de arquitetura para validação; não implementada.

## Objetivo do contrato

Permitir que lojas distintas produzam primeiras dobras realmente diferentes sem transformar a configuração em um editor de coordenadas. O contrato separa o que a loja **diz**, como a marca **parece**, como a campanha **se compõe**, como a interface **se comporta** e quais **assets** ela possui.

## Cinco camadas

| Camada | Responsabilidade | Exemplos | Não deve controlar |
| --- | --- | --- | --- |
| Conteúdo | Mensagem e ações | eyebrow, título, apoio, CTA, links | posição absoluta, blur, duração |
| Tema | Papéis visuais da marca | fontes, foreground, surface, accent, bordas | estrutura da hero |
| Composição | Relação entre texto, gesto e produto | preset, densidade, alinhamento permitido | valores livres de `x/y` |
| Comportamento | Chrome e resposta | nav sticky, política do carrinho, motion profile | texto e licença do asset |
| Assets | Mídia e metadados | desktop/mobile, poster, alt, proporção, crédito | regras de navegação |

## Presets controlados

1. `editorial-overlap`: base clara ou escura, tipografia dominante, gesto entrando por uma borda e cruzando somente uma área segura.
2. `editorial-commerce`: mesma linguagem, com CTA mais forte e continuidade explícita para a comparação.
3. `campaign-reveal`: opcional premium, com foto/vídeo próprio, poster e entrada coordenada curta.

O cliente escolhe um preset e opções semânticas como `assetEntry: start | end | bottom` e `contentDensity: compact | standard`. Ele não recebe dezenas de propriedades como `left: 37%` ou `translateY: -19px`, que criariam combinações impossíveis de testar.

## Conteúdo e quebras editoriais

O título deve ter uma string completa acessível e grupos semânticos opcionais para direção de arte. Exemplo conceitual:

```text
texto completo: "Não escolha pelo número. Escolha pelo que muda para você."
grupos: ["Não escolha pelo número.", "Escolha pelo que", "muda para você."]
ênfase opcional: ["muda para você"]
```

- A leitura por tecnologia assistiva permanece uma frase coerente.
- O layout pode manter grupos curtos juntos e permitir quebra entre eles.
- O preset define largura, escala e número desejável de linhas por faixa; não injeta `<br>` em posições globais.
- Um plano editorial por breakpoint é uma exceção opcional, usado apenas quando a marca fornecer título e fonte validados juntos.
- A ausência desse plano cai em wrapping automático seguro.
- Fontes externas exigem teste de métricas antes de serem liberadas no preset.

## Tema

- Usar papéis, não cores de componente: `canvas`, `foreground`, `muted`, `surface`, `stroke`, `accent`, `onAccent` e `materialTint`.
- Tipografia por função: `display`, `body` e `ui`, cada qual com fallback e pesos permitidos.
- Tracking e leading pertencem às escalas do preset; não são herdados de um único valor para todos os tamanhos.
- O estado sticky usa tokens Glin de material, blur, sombra e movimento quando forem adequados. A hero não precisa adotar a aparência pronta de um componente da biblioteca.
- Tema claro/escuro precisa ser uma combinação testada, não apenas a inversão automática das cores.

## Assets

Cada conjunto deve registrar:

- fonte desktop e mobile;
- largura, altura e proporção intrínsecas;
- poster e fallback estático quando houver vídeo;
- descrição/`alt` conforme o papel da imagem;
- ponto focal em vocabulário limitado;
- área segura conhecida pelo preset;
- fonte, autor, licença, comprovante e restrições;
- aprovação humana quando o asset for gerado.

Cada preset também define uma receita limitada de profundidade — `media-behind`, `masked-crossing` ou `media-front-safe` — em vez de aceitar `z-index` livre. Se o asset faltar ou falhar, a hero cai em uma composição tipográfica estável, sem reservar um vazio desproporcional e sem perder CTA ou navegação.

Arquivos de produção devem ser locais ou entregues por um serviço de mídia controlado. Hotlink é proibido.

## Navegação

- Estado inicial: masthead editorial com marca à esquerda, links e ação comercial; sem capsule central como única identidade.
- Estado sticky: material discreto somente quando a navegação deixa o plano da hero e precisa se separar do conteúdo.
- Mobile: marca + gatilho de menu + carrinho quando aplicável.
- Carrinho vazio: oculto na hero. Com itens: badge discreto integrado ao chrome.
- Desktop: `Popover` é candidato ao resumo rápido.
- Mobile: `Sheet`/`Drawer` é candidato ao fluxo, mas a versão local do Glin UI injeta internamente um `Close` hardcoded e não expõe prop para substituí-lo. Isso exige fork/cópia local corrigida, correção upstream ou permanência do drawer próprio; um wrapper simples só resolve largura e motion.
- `Modal` e `FloatingPanel` locais também possuem rótulos de fechamento em inglês; não devem ser usados como atalho sem revisão.

## CTA

- Rótulo recomendado para o primeiro teste: **Começar comparação**.
- Alternativas: **Encontrar meu iPhone** quando houver fluxo guiado; **Explorar os modelos** quando a ação abrir o catálogo sem assistência.
- Evitar “Explorar catálogo” como padrão universal: ele descreve o destino, não o valor.
- Forma visual: link editorial com área de toque robusta ou bloco retangular preciso. `Link` ou `Button` do Glin UI pode oferecer a base semântica/foco, com aparência específica do preset.

## Movimento e preferências

Perfis permitidos:

- `none`: composição estática.
- `restrained`: entrada coordenada curta do texto e máscara do aparelho; resposta local ao CTA.
- `campaign`: revelação curta de mídia e transição para a seção seguinte, sem loop.

Regras comuns:

- nenhuma flutuação infinita, rotação constante ou brilho seguindo o cursor;
- springs próximos de criticamente amortecidos para UI, com bounce apenas quando houver momentum real;
- transições interrompíveis;
- `prefers-reduced-motion`: estado final imediato ou crossfade curto;
- `prefers-reduced-transparency`: superfície opaca legível;
- contraste aumentado: bordas e separação de planos reforçadas.

## Estratégia responsiva

### Faixas de composição

- Compacta: 320–479 px; asset mobile dedicado, ação e título prioritários.
- Intermediária: 480–899 px; evita herdar cegamente desktop ou mobile.
- Ampla: 900 px ou mais; título e asset dividem o mesmo campo editorial com área segura.

Os valores são pontos iniciais para protótipos, não uma promessa de que três media queries resolvam todas as fontes e conteúdos.

### Matriz mínima de validação

- larguras 320, 360, 390, 430, 768, 1024 e 1440 px;
- altura curta em landscape mobile;
- zoom de 200%;
- texto ampliado e fonte fallback;
- títulos curto, nominal e longo;
- temas claro e escuro;
- asset ausente ou falho;
- redução de movimento, transparência e contraste aumentado.

## Guardrails

- Nenhuma caixa do asset pode cruzar glifos; a sobreposição ocorre apenas dentro de áreas seguras validadas.
- Produto deve ter maior saliência que a mão em todos os breakpoints.
- A hero continua compreensível sem mídia e sem movimento.
- Nenhum conteúdo primário pode depender de hover.
- Nenhuma barra fixa pode encobrir CTA, indicação de scroll ou início da seção seguinte.
- Componentes Glin são escolhidos por contrato e acessibilidade, não para demonstrar a biblioteca.
