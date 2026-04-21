# sticky-header

Header fixo com dois comportamentos combinados: vira "compacto" ao sair do
topo (via classe `.is-scrolled`) e **some ao rolar para baixo**, reaparecendo
quando o usuário rola para cima. Sem dependências.

## Uso rápido

```html
<header data-sticky-header>…</header>

<script src="sticky-header.js"></script>
```

### CSS sugerido

```css
[data-sticky-header] {
  position: sticky; /* ou fixed, se preferir */
  top: 0;
  transition: transform 300ms ease, box-shadow 200ms ease;
  will-change: transform;
}

[data-sticky-header].is-hidden {
  transform: translateY(-100%);
}

[data-sticky-header].is-scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
}

@media (prefers-reduced-motion: reduce) {
  [data-sticky-header] { transition: none; }
}
```

## Como funciona

A cada scroll (com throttle via `requestAnimationFrame`):

- Se o usuário está **descendo** e já passou da altura do próprio header:
  adiciona `.is-hidden` → header some com `translateY(-100%)` no CSS.
- Se está **subindo** (ou ainda no topo): remove `.is-hidden`.
- Se o scroll passou de `scrolledOffset` (default 10px): adiciona
  `.is-scrolled` (útil para sombra / mudança de fundo).

O parâmetro `tolerance` (default 5px) evita o header piscar quando o usuário
faz um micro-scroll (ou quando o trackpad reverte levemente o sentido).

## Acessibilidade

- O scroll listener é `{ passive: true }` — não bloqueia a rolagem.
- **Sempre deixe o header aparecer quando o usuário rola para cima** (padrão
  do snippet). Um usuário de leitor de tela ou teclado que acabou de
  navegar para o topo de uma seção precisa do menu ali.
- Use `transition` só no CSS, e desligue via `prefers-reduced-motion`.
- O header **nunca some** enquanto o topo da página está visível — senão o
  usuário abriria a página e já veria o menu desaparecendo.

## API

### `StickyHeader.init(options?)`

Retorna um `destroy` que remove o scroll listener:

```js
const destroy = StickyHeader.init({ tolerance: 10 });
// mais tarde…
destroy();
```

### Opções

| Opção            | Tipo     | Padrão                  | Descrição                                            |
| ---------------- | -------- | ----------------------- | ---------------------------------------------------- |
| `selector`       | `string` | `[data-sticky-header]`  | Seletor do(s) header(s)                              |
| `hiddenClass`    | `string` | `is-hidden`             | Classe aplicada quando o header deve sumir           |
| `scrolledClass`  | `string` | `is-scrolled`           | Classe aplicada após `scrolledOffset` de scroll      |
| `scrolledOffset` | `number` | `10`                    | Pixels de scroll antes de `.is-scrolled` ser aplicada |
| `tolerance`      | `number` | `5`                     | Movimento mínimo em px para alternar a visibilidade   |

## Demo

Veja [`demo.html`](./demo.html).
