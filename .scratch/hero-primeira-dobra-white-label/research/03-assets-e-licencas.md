# Pesquisa: alternativas de asset e licenças para a hero

Data da verificação: 2026-08-04  
Ticket: `03-pesquisar-assets-e-licencas.md`  
Escopo: pesquisa e recomendação; nenhum asset foi baixado, substituído ou inserido na aplicação.

> Isto é uma avaliação de risco de produção, não parecer jurídico. Antes de publicar uma campanha comercial com produto ou marca Apple, a loja deve confirmar seu enquadramento e suas permissões com assessoria jurídica ou com seu representante Apple.

## Resumo executivo

1. **Bloqueadora — o asset atual não está liberado para produção.** A cadeia local de procedência termina em um arquivo recebido pelo clipboard; não há autor, URL de origem, licença ou permissão. O tema coincide com fotografia promocional oficial do iPhone Air, mas não foi feita uma correspondência forense com um original da Apple. Portanto, ele pode permanecer apenas como referência/protótipo até que a origem seja provada.
2. **Importante — a melhor direção visual e operacional é fotografia real com tratamento e máscara próprios, produzida/licenciada por cliente.** Ela preserva gesto, perspectiva e fidelidade física, permite masters distintos para desktop/mobile e cria identidade para cada loja. A licença do fotógrafo, o model release da mão e a base de uso da marca/produto Apple ainda precisam ser documentados.
3. **Importante — stock licenciado é uma boa rota de protótipo e contingência, não um atalho automático para um iPhone real.** Encontramos candidatos concretos com licença verificável, mas os mais seguros são smartphones genéricos; os que mostram iPhone mantêm risco de marca/trade dress e podem retratar modelos antigos.
4. **Refinamento — geração por IA é mais adequada para explorar gesto, enquadramento, fundo e espaço negativo do que para fabricar um iPhone final.** Hardware, câmeras, botões e mãos exigem inspeção humana; usar a saída no comércio não elimina direitos de terceiros.
5. **Bloqueadora — assets não devem ser empacotados indistintamente no template white-label.** A licença precisa ser vinculada a cada cliente. Por exemplo, a Adobe permite transferir uma licença Standard a um cliente, mas não a vários sem licenças separadas.

## 1. Estado e procedência do asset atual

### Arquivos e uso

- Original local: `assets/home/hero/iphone-air-in-hand.png`
- Derivado transparente: `assets/home/hero/iphone-air-in-hand-transparent.png`
- Importado por: `src/components/HomeOpening.jsx`
- Aplicado por: `src/styles.css`, em `.home-opening::after`

### Evidência técnica

| Item | Original | Derivado transparente |
| --- | --- | --- |
| Dimensões | 924 × 305 px | 924 × 305 px |
| Proporção | 3,03:1 | 3,03:1 |
| Formato | PNG RGBA, visualmente opaco em branco | PNG RGBA |
| SHA-256 | `c802bb035a617f3cb9d4116a180ef014dad7db4d539299aec8a7f61a4349a20a` | `1c9f1480bde02928c29927da799df30b0c32079633a6757d47bc641a6d9a3fc6` |
| Autoria/licença embutida | ausente | ausente |
| Alfa | opaco | 1 bit, isto é, recorte binário sem gradação de borda |

O arquivo ainda existente em `/tmp/codex-clipboard-aDdPFu.png` tem o mesmo SHA-256, dimensões e tamanho do original local. Isso prova que a origem imediata no projeto foi o clipboard fornecido durante a sessão, não a origem autoral/comercial anterior. A busca no repositório não encontrou manifesto, crédito, recibo, URL, autor ou licença para esses arquivos.

O assunto visual é um iPhone Air azul-céu apoiado em uma mão. A [página oficial brasileira do iPhone Air](https://www.apple.com/br/iphone-air/) usa fotografias promocionais do mesmo produto e gesto. Isso aumenta a probabilidade de o arquivo local ser material promocional ou uma derivação dele, mas **não prova que seja o mesmo arquivo**. Sem a fonte original, a classificação correta é **procedência desconhecida**.

### Consequências visuais

- A largura de 924 px chega apenas a aproximadamente 1× no `max-width: 58rem` atual; em telas de alta densidade não há reserva de resolução para detalhe fino.
- A proporção extremamente horizontal funciona como faixa no desktop, mas não contém informação vertical suficiente para um crop mobile convincente.
- O alfa de 1 bit no derivado tende a produzir borda dura, serrilhado ou halo quando a imagem encontra fundos diferentes do branco original.
- O enquadramento dá à mão grande massa visual; reduzir apenas com CSS também reduz o iPhone e não muda a proporção entre ambos.
- A inversão horizontal atual (`scaleX(-1)`) também espelha detalhes físicos do aparelho. Para fotografia de produto, o master deve ser capturado na orientação desejada em vez de espelhado por conveniência.

## 2. Restrições de marca e conteúdo Apple

A [Apple declara que o conteúdo de seu site](https://www.apple.com/legal/internet-services/terms/site.html), incluindo fotografias, interfaces, marcas e trade dress, não pode ser copiado ou redistribuído para uso comercial sem consentimento expresso. Portanto, `apple.com` pode ser referência visual, mas **não é uma biblioteca de assets para este template**.

As [diretrizes da Apple para terceiros](https://www.apple.com/in/legal/intellectual-property/guidelinesfor3rdparties.html) acrescentam que:

- o logo Apple exige licença expressa, como um contrato de revenda;
- marcas e imagens não podem sugerir afiliação, patrocínio ou endosso;
- a Apple desaconselha o uso de nomes, imagens de produtos e logos por terceiros em publicidade quando isso possa criar percepção de endosso;
- autorizados e participantes de programas podem ter restrições adicionais;
- uma foto pertencente/licenciada pela Apple exige permissão expressa.

O [guia de fotografia do antigo programa de afiliados Apple](https://store.apple.com/Catalog/regional/amr/affiliates/affiliate-photo-guide.pdf) é específico para afiliados aprovados e não concede permissão geral. Ele reforça que fotografias fornecidas pela Apple só podem ser usadas por participantes aprovados, e que não se deve copiar imagens do site. Se uma loja cliente tiver contrato de revenda/afiliação, prevalecem os assets e termos disponibilizados naquele contrato.

Quando houver dúvida sobre fotografia, vídeo ou material Apple, a própria empresa oferece o canal de [Rights and Permissions](https://www.apple.com/legal/contact/rights-permissions.html).

**Regra proposta para o white-label:** o template nunca presume que uma loja é revendedora autorizada. Cada cliente deve declarar seu status e entregar assets permitidos pelo respectivo acordo, ou aprovar juridicamente fotografia própria/stock usada de modo referencial para vender produto genuíno. Não usar logo Apple como marca da loja nem copiar fotografia de `apple.com`.

## 3. Candidatos licenciados concretos

Estes candidatos são **material para comp/protótipo e due diligence**, não seleção final. Nenhum foi baixado. A descrição e os dados abaixo vêm das páginas oficiais dos próprios provedores.

### Candidato L1 — Adobe Stock #1678929390

- Página: [Isolated Hand Holding Smartphone with Blank Screen](https://stock.adobe.com/br/images/isolated-hand-holding-smartphone-with-blank-screen/1678929390)
- Autor/contribuidor: **Johanna**
- Dimensões: **5632 × 3072 px**
- Entrega: JPEG e PNG; PNG transparente disponível
- Licença indicada na página: **Standard ou Extended**
- Proveniência verificável: provedor, autor, ID do arquivo e tipo de licença estão expostos na página.

**Compatibilidade visual:** proporção horizontal, resolução alta e recorte transparente permitem reduzir a dominância da mão, controlar a interseção e produzir variantes desktop/mobile sem o gargalo de 924 px. O aparelho é descrito como smartphone genérico com tela vazia: isso reduz confusão de marca, mas também falha na fidelidade de um iPhone específico. A natureza exata do arquivo (fotografia ou conteúdo gerado) não aparece no texto consultado e deve ser confirmada antes da compra.

**Licença/restrições:** a [licença Adobe Stock](https://stock.adobe.com/license-terms) permite uso web e modificação para assets não editoriais. A Standard permite transferência a **um** cliente/empregador; reutilização para várias lojas requer licença separada por cliente. O arquivo independente não pode ser redistribuído. Mesmo uma licença stock não autoriza infringir marca ou outros direitos.

**Veredito:** melhor candidato externo para testar composição, masking e crops sem alterar produção. Não é substituto direto de fotografia fiel do modelo vendido.

### Candidato L2 — Pexels #8217475

- Página: [A minimalist mockup of a hand holding a smartphone with a blank screen](https://www.pexels.com/photo/hand-holding-iphone-mockup-8217475/)
- Autor: **MART PRODUCTION**
- Licença indicada na página: **Pexels License**, download gratuito
- Conteúdo declarado: mão, smartphone/mockup, tela branca, estúdio/minimalismo

**Compatibilidade visual:** bom para validar gesto isolado, redução de ruído e composição clara. O mockup/tela vazia tende a parecer demonstração de app, não campanha de escolha de iPhone; exige direção de arte e não garante modelo Apple atual.

**Licença/restrições:** a [licença Pexels](https://www.pexels.com/legal-pages/license/) permite uso gratuito comercial, modificação, sites, e-commerce e templates. Proíbe sugerir endosso da pessoa ou marca, redistribuir o arquivo como stock e usar a imagem como marca. Os [termos completos da Pexels](https://www.pexels.com/terms-of-service/) alertam que marcas, pessoas, bens e outros direitos podem exigir autorização adicional e que a Pexels não garante que esses consentimentos existam. A página do asset não expõe status de model/property release.

**Veredito:** candidato gratuito para moodboard e protótipo; uso final condicionado a due diligence e a aceitar aparência genérica.

### Candidato L3 — Unsplash `_Q5HFTpOvDI`

- Página: [A hand holds up a smartphone](https://unsplash.com/photos/a-hand-holds-up-a-smartphone-_Q5HFTpOvDI)
- Autor: **Lorin Both**
- Publicação indicada: 2025-06-01
- Licença indicada na página: **Unsplash License**, download gratuito
- Conteúdo declarado: mão, smartphone branco/mockup, composição experimental e gradiente neutro

**Compatibilidade visual:** o fundo neutro e o foco em mockup permitem explorar uma versão mobile com espaço negativo; a linguagem experimental pode entrar em conflito com a aparência fotográfica/editorial pedida. Não há garantia de fidelidade a um iPhone atual.

**Licença/restrições:** a [Unsplash License](https://unsplash.com/license) permite uso comercial, modificação e dispensa atribuição, mas proíbe vender o arquivo sem modificação relevante e compilar um serviço concorrente. Os [termos da Unsplash](https://unsplash.com/terms) esclarecem que a licença de copyright **não inclui** marcas/logos retratados, imagem de pessoa reconhecível ou obras presentes na foto; essas permissões podem ser necessárias separadamente.

**Veredito:** alternativa acessível para exploração de enquadramento, não para afirmar um modelo real.

### Candidato L4 — Pexels #16169346

- Página: [Hand Holding White iPhone](https://www.pexels.com/photo/hand-holding-white-iphone-16169346/)
- Autor: **Basil Muhammed**
- Licença indicada na página: **Pexels License**, download gratuito
- Conteúdo declarado: close de mão e smartphone branco em ambiente interno com fundo desfocado

**Compatibilidade visual:** traz aparelho reconhecível e gesto real, mas o fundo desfocado, o close e o modelo aparentemente anterior não oferecem o espaço negativo e a precisão de produto necessários. O enquadramento é fraco para a atual direção editorial.

**Licença/restrições:** valem as mesmas permissões e ressalvas da Pexels acima. A licença de copyright da fotografia não resolve automaticamente o direito de usar marca/trade dress Apple em publicidade.

**Veredito:** rejeitar para a hero; serve como evidência de que buscar apenas por “mão + iPhone” produz um asset reconhecível, mas inadequado à composição e ainda juridicamente condicionado.

## 4. Comparação das quatro rotas

| Rota | Composição e fidelidade | Desktop/mobile | Procedência | Risco principal | Esforço | Decisão |
| --- | --- | --- | --- | --- | --- | --- |
| 1. Manter e reenquadrar o atual | Preserva exatamente a direção existente e um iPhone Air fisicamente convincente; a mão continua grande | Faixa boa no desktop; master 3,03:1 insuficiente no mobile | Imediata: clipboard; anterior: desconhecida | copyright/licença Apple e baixa resolução; alfa binário | Baixo | **Somente protótipo. Bloqueado para produção.** |
| 2. Fotografia licenciada melhor | Pode melhorar resolução, recorte e ponto focal; stock genérico perde fidelidade ao iPhone | Adobe L1 oferece margem para crops; Pexels/Unsplash variam e pedem comp visual | Boa quando ID, autor, recibo e termos são arquivados | licença não cobre marca/pessoa automaticamente; stock pode parecer genérico | Baixo a médio, por cliente | **Plano B/prototipação.** Licença separada por cliente quando exigida. |
| 3. Gerar asset novo | Controle total de espaço negativo, gesto, luz e par de breakpoints; fidelidade física é instável | Pode gerar masters 16:9 e 4:5/9:16 deliberadamente | Prompt, serviço, data e output podem ser registrados | mãos, botões, câmeras e proporções erradas; similaridade; marca de terceiro | Médio, com muitas revisões | **Exploração de direção; não gerar o produto final como fonte de verdade.** |
| 4. Fotografia real + máscara própria | Melhor equilíbrio entre produto verdadeiro, gesto natural e identidade da loja | Sessão pode capturar enquadramentos distintos e sobra de crop | Forte se contrato, releases e masters forem arquivados | custo; consistência de luz/recorte; direitos Apple ainda precisam de base | Médio a alto | **Recomendada para produção.** |

## 5. Geração por IA: uso seguro no processo

Se a exploração futura usar geração OpenAI, os [Termos de Uso](https://openai.com/policies/terms-of-use/) dizem que, entre usuário e OpenAI e na medida permitida pela lei, o usuário possui o output; também dizem que outputs podem não ser exclusivos e devem passar por revisão humana de precisão e adequação. Os [Service Terms](https://openai.com/policies/service-terms/) deixam claro que certas proteções não cobrem reclamações de marca decorrentes do uso comercial do output. Portanto, “foi gerado” não equivale a “está liberado”.

Uso recomendado:

- gerar somente **explorações** de gesto, luz, fundo, área segura e profundidade;
- preferir smartphone genérico/placa neutra no conceito e depois substituir por fotografia autorizada do produto real;
- gerar desktop e mobile como composições irmãs, não como crop automático;
- rejeitar qualquer variação com dedos/articulações anormais, câmeras, botões, espessura, reflexos ou interface impossíveis;
- não gerar logo Apple nem representar relação de revenda autorizada;
- arquivar prompt, seed/identificador quando disponível, serviço/modelo, data, termos vigentes e revisão humana.

## 6. Especificação de captura/máscara recomendada

### Desktop

- Master horizontal de pelo menos 3840 px de largura, preferencialmente com captura RAW.
- Mão entrando pela direita; massa principal da mão fora do centro, com o aparelho atravessando apenas uma área segura deliberada.
- Reservar cerca de 50–60% do quadro para texto, mas fotografar com folga maior do que o crop final.
- Foco e microcontraste no aparelho; pele como gesto secundário, sem disputar por nitidez/contraste.
- Capturar a orientação final; não espelhar o aparelho em CSS.

### Mobile

- Master independente em 4:5 ou 9:16, com a mão entrando de baixo ou da lateral inferior.
- Preservar o aparelho inteiro e uma zona superior/central limpa para título e CTA.
- A interseção pode tocar uma palavra escolhida, mas nunca cobrir contraformas ou mais de uma linha de leitura.
- Preferir crop e escala declarados no preset da hero; não depender de `background-size: contain` para todos os telefones.

### Tratamento

- Gerar máscara de 8 bits com antialias e, quando necessário, decontaminação de borda; evitar alfa 1 bit.
- Exportar AVIF/WebP e fallback PNG/JPEG conforme transparência, com `srcset` por densidade.
- Manter master, recorte desktop e recorte mobile separados; nenhum derivado substitui o master.
- Testar em branco, cinza-claro e tema escuro se o preset permitir, observando halo, contraste e reflexos.

## 7. Manifesto de procedência por asset

O contrato white-label deve exigir um registro ao lado do asset ou em um manifesto de mídia:

```yaml
id: hero-gesture-primary
client: <identificador-da-loja>
source_page: <URL da página do asset ou contrato de produção>
source_asset_id: <ID do provedor>
author: <fotógrafo/contribuidor>
license: <nome e versão>
license_url: <URL>
licensed_at: <data>
licensed_by: <titular da conta/cliente>
receipt_or_contract: <caminho privado>
model_release: <id/caminho ou n/a justificado>
property_or_brand_permission: <id/caminho/status>
allowed_client: <cliente único ou escopo>
allowed_media: <web/social/etc.>
attribution: <texto ou n/a>
original_sha256: <hash>
derivatives:
  - path: <arquivo>
    crop: <descrição>
    sha256: <hash>
```

Regras:

- nunca fazer hotlink em produção;
- guardar recibo/contrato e snapshot dos termos na data do licenciamento;
- não transferir um asset Adobe comprado para uma loja a outra sem nova licença;
- o cliente deve garantir por contrato que tem direitos sobre assets fornecidos;
- um recorte, remoção de fundo ou máscara **não corrige** falta de copyright, permissão de marca ou release.

## 8. Recomendação e gates de decisão

### Recomendação

Adotar **fotografia real + tratamento/máscara próprios por cliente** como rota de produção. Para o planejamento visual imediato, manter o asset atual somente como referência e usar o Adobe L1 ou os candidatos gratuitos apenas em protótipos isolados. Geração por IA pode acelerar a escolha de gesto e enquadramento, mas o aparelho final deve vir de fonte fotograficamente e juridicamente verificável.

### Decisões bloqueadoras

1. Confirmar ou substituir a procedência do asset atual antes de publicar.
2. Definir se cada loja será revendedora autorizada, independente ou mista; isso muda os assets Apple que ela pode usar.
3. Definir titular da licença e regra de compra por cliente; não empacotar a mesma licença restrita em todos os sites.
4. Aprovar contrato/release do fotógrafo e da pessoa cuja mão aparece.

### Decisões importantes

1. Aprovar fotografia real + máscara como rota principal e stock como fallback.
2. Capturar masters separados para desktop e mobile.
3. Definir zona segura de sobreposição antes da sessão fotográfica, com wireframe e texto reais.
4. Inserir manifesto de procedência no processo de personalização white-label.

### Refinamentos

1. Testar direção de luz, tom de pele e cor do acabamento por preset de marca.
2. Comparar recorte com fundo intacto versus alpha/máscara de 8 bits.
3. Decidir se a entrada visual usa reveal de máscara; isso não altera a licença.

## 9. Critérios de aceite para o asset futuro

- Fonte, autor, licença, data, recibo/contrato e restrições arquivados.
- Permissão de uso por aquele cliente e naquela finalidade comercial confirmada.
- Sem watermark e sem hotlink.
- iPhone, quando alegado, corresponde ao modelo real em câmeras, botões, tela, espessura e acabamento.
- Mãos sem deformação e com release quando aplicável.
- Masters desktop e mobile aprovados, sem crop acidental ou interseção destrutiva com texto.
- Produto é o protagonista; mão funciona como gesto.
- Resolução suficiente para 2× na maior área renderizada.
- Recorte com alfa de 8 bits/antialias, sem halo nos temas suportados.
- Nenhuma composição sugere endosso ou status de revenda Apple não comprovado.
- A licença não é reutilizada entre clientes além do permitido.

## Fontes primárias consultadas

- [Apple — iPhone Air (Brasil)](https://www.apple.com/br/iphone-air/)
- [Apple — Website Terms of Use](https://www.apple.com/legal/internet-services/terms/site.html)
- [Apple — Guidelines for Using Apple Trademarks and Copyrights](https://www.apple.com/in/legal/intellectual-property/guidelinesfor3rdparties.html)
- [Apple — Rights and Permissions](https://www.apple.com/legal/contact/rights-permissions.html)
- [Apple — Using Apple Product Photography, Affiliate Guide](https://store.apple.com/Catalog/regional/amr/affiliates/affiliate-photo-guide.pdf)
- [Adobe Stock — asset #1678929390](https://stock.adobe.com/br/images/isolated-hand-holding-smartphone-with-blank-screen/1678929390)
- [Adobe Stock — License Terms](https://stock.adobe.com/license-terms)
- [Pexels — asset #8217475](https://www.pexels.com/photo/hand-holding-iphone-mockup-8217475/)
- [Pexels — asset #16169346](https://www.pexels.com/photo/hand-holding-white-iphone-16169346/)
- [Pexels — License](https://www.pexels.com/legal-pages/license/)
- [Pexels — Terms of Service](https://www.pexels.com/terms-of-service/)
- [Unsplash — asset `_Q5HFTpOvDI`](https://unsplash.com/photos/a-hand-holds-up-a-smartphone-_Q5HFTpOvDI)
- [Unsplash — License](https://unsplash.com/license)
- [Unsplash — Terms](https://unsplash.com/terms)
- [OpenAI — Terms of Use](https://openai.com/policies/terms-of-use/)
- [OpenAI — Service Terms](https://openai.com/policies/service-terms/)
