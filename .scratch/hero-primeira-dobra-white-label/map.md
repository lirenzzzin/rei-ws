# Refatoração white-label da hero e da primeira dobra

Type: wayfinder:map
Status: open

## Destination

Chegar a um plano visual e técnico aprovado para refatorar a hero e toda a primeira dobra do template white-label, com direção editorial própria, comportamento responsivo, contrato de personalização, estratégia de assets e critérios de aceite claros, sem modificar a hero de produção.

## Notes

- O esforço é de planejamento; implementação de produção está proibida até aprovação.
- Protótipos e imagens exploratórias só podem existir isolados e claramente marcados como exploração.
- Skill obrigatória: `apple-design`, em `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md`.
- Biblioteca instalada: Glin UI, pacotes `/home/lorenzzo/Área de trabalho/loja iphone esboço/node_modules/@glinui/ui` e `/home/lorenzzo/Área de trabalho/loja iphone esboço/node_modules/@glinui/tokens`.
- O nome real encontrado é **Glin UI**, não “Glint UI”. Não reinstalar, substituir nem inventar APIs.
- Preservar a direção editorial, tipografia dominante, espaço negativo, gesto da mão, sobreposição deliberada e aparência de campanha.
- Evitar hero genérica de duas colunas, glow, partículas, selos, avaliações, cards de benefícios e movimento ornamental.
- Separar conteúdo, tema, composição, comportamento e assets por presets controlados.
- Tracker: Markdown local, pois o diretório não possui repositório Git nem remoto configurado.
- Classificação usada: `blocking`, `important`, `refinement`.

## Decisions so far

- **Bloqueadora —** [Pesquisa 01](research/01-auditoria-hero-atual.md): o problema estrutural prioritário é o cliff em `720px`, quando o H1 passa de duas para seis linhas; o asset também está acima de todo o copy, sem área segura codificada.
- **Bloqueadora —** [Pesquisa 02](research/02-glin-ui-apple-design.md): Glin UI será infraestrutura de primitives e tokens, não a direção visual. Não existem `Hero`, `Cart` ou `NavigationMenu`; `Sheet` exige adaptação e `MorphingTabs` não substitui navegação/abas acessíveis.
- **Bloqueadora —** [Pesquisa 03](research/03-assets-e-licencas.md): o asset atual não tem cadeia de licença comprovada e fica restrito a protótipos. A rota de produção recomendada é fotografia real + máscara própria por cliente, com masters desktop/mobile e manifesto de procedência.
- **Bloqueadora —** a direção **B — Cinematográfica controlada** foi aprovada pelo usuário; copy final, asset licenciado, contrato white-label e budgets ainda estão abertos.

## Frontier

- [05 — Definir arquitetura white-label](issues/05-definir-arquitetura-white-label.md): validar presets, limites de conteúdo/tema/composição/comportamento/assets e política de fontes na spec B.
- [Spec B](spec/direcao-b-cinematografica.md): aprovação pendente antes de abrir `/to-tickets`.

## Not yet specified

- Quantidade final de presets que o produto comercial sustentará depois que A, B e C forem comparadas em protótipos.
- Asset final e licença final, pois dependem da direção visual aprovada e da marca compradora.
- Política de fontes por cliente e limites aceitáveis de variação métrica.
- Métricas de teste com usuários e lojas-piloto, ainda inexistentes neste template sem cliente.
- Matriz final de conteúdo por posicionamento comercial, dependente da arquitetura white-label escolhida.

## Out of scope

- Alterar a hero, navegação, carrinho ou estilos de produção durante o Wayfinder.
- Adicionar backend, banco de dados, autenticação, checkout ou painel administrativo.
- Substituir ou sobrescrever o asset atual antes da comparação e aprovação.
- Copiar o site, a identidade, o texto ou as campanhas da Apple.
- Comprar, licenciar ou publicar um asset externo em nome de uma futura loja.
