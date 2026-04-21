# scroll-progress

Atualiza uma barra de progresso de leitura conforme a página (ou um elemento)
rola. O snippet só seta a variável CSS `--scroll-progress` de `0` a `1` —
o visual é 100% CSS. Sem dependências.

## Uso rápido

```html
<div data-scroll-progress aria-hidden="true"></div>

<script src="scroll-progress.js"></script>
```

```css
[data-scroll-progress] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  transform-origin: left center;
  transform: scaleX(var(--scroll-progress, 0));
  background: #38bdf8;
  z-index: 100;
}

@media (prefers-reduced-motion: reduce) {
  [data-scroll-progress] { transition: none; }
}
```

O snippet auto-inicializa no `DOMContentLoaded`.

## Progresso de um elemento específico

Útil para artigos longos: progresso vai de 0% quando o topo do artigo aparece
até 100% quando a base sai da tela.

```html
<article id="post">…</article>

<div data-scroll-progress aria-hidden="true"></div>

<script src="scroll-progress.js"></script>
<script>
  ScrollProgress.init({ target: '#post' });
</script>
```

## Acessibilidade

- Trate a barra como **decorativa** por padrão: use `aria-hidden="true"` — a
  informação já está visível e atualizá-la a cada pixel de scroll spamma
  leitores de tela.
- Se quiser que seja um progressbar real, adicione `role="progressbar"` com
  `aria-valuemin="0"` e `aria-valuemax="100"` — o snippet atualiza
  `aria-valuenow` automaticamente.
- O scroll listener é `{ passive: true }` — não bloqueia o scroll da página.
- `requestAnimationFrame` faz throttle: no máximo uma atualização por frame.

## API

### `ScrollProgress.init(options?)`

Retorna um `destroy` que remove os listeners de scroll/resize:

```js
const destroy = ScrollProgress.init({ target: '#post' });
// mais tarde…
destroy();
```

### Opções

| Opção         | Tipo              | Padrão                    | Descrição                                                   |
| ------------- | ----------------- | ------------------------- | ----------------------------------------------------------- |
| `selector`    | `string`          | `[data-scroll-progress]`  | Seletor das barras a atualizar                              |
| `target`      | `string \| null`  | `null`                    | Seletor do elemento a medir. `null` = página inteira        |
| `cssVariable` | `string`          | `--scroll-progress`       | Nome da variável CSS setada em cada barra (valor de 0 a 1)  |

## Valores expostos em cada barra

- Variável CSS `--scroll-progress`: `0` a `1` (ex.: `0.4237`).
- Atributo `data-progress`: percentual como string (ex.: `42.37`). Útil para
  exibir com `::after { content: attr(data-progress) '%'; }`.
- Atributo `aria-valuenow`: só atualizado se `role="progressbar"` estiver
  presente na barra.

## Demo

Veja [`demo.html`](./demo.html).
