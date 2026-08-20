# Auditar Glin UI e os princípios de Apple Design aplicáveis

Type: research
Status: resolved
Priority: blocking
Blocked by: none

## Question

Quais exports, componentes, exemplos, tokens e limitações reais da versão instalada do Glin UI são relevantes para hero, navegação, CTA, menu, popover, drawer, carrinho, tipografia e movimento, e como os princípios da skill `apple-design` devem restringir seu uso?

## Expected evidence

- Nome, versão e caminhos exatos.
- APIs confirmadas em declarações e implementação locais.
- Documentação oficial primária.
- Lista do que usar, adaptar ou evitar, sem APIs inventadas.

## Comments

### Resolução — 2026-08-04

Auditoria completa: [Glin UI 0.1.1 e princípios de Apple Design](../research/02-glin-ui-apple-design.md).

- Instalações confirmadas: `@glinui/ui@0.1.1` em `node_modules/@glinui/ui`, `@glinui/tokens@0.1.1` em `node_modules/@glinui/tokens` e skill `apple-design` em `/home/lorenzzo/.codex-conta2/skills/apple-design/SKILL.md`.
- O índice local contém 77 módulos, mas não há `Cart`, `NavigationMenu` ou `Hero`.
- Recomendação: usar `GlassNavbar`, `Button`, `Popover`, `Badge` e `Tabs` como primitives adaptados; composição editorial, tipografia e carrinho permanecem próprios.
- `Sheet/Drawer` é beta e exige correções antes de uso: largura mobile, `Close` hardcoded em inglês e ausência de fallback reduced-motion na implementação instalada.
- `MorphingTabs` não implementa o padrão completo de teclado/painéis e não serve como navegação de rotas.
- `@glinui/motion` não está instalado; não assumir seus presets ou APIs.
- Os tokens CSS não estão importados integralmente no projeto e há divergência de accent entre o contrato JS e `theme.css`; o tema white-label deve escolher uma fonte canônica.
- Apple Design restringe vidro a chrome funcional, exige tipografia óptica/responsiva, origem espacial coerente, feedback imediato e fallbacks de movimento/transparência/contraste.
