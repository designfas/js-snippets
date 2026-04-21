# back-to-top

Botão flutuante que aparece após X pixels de scroll e rola a página até o topo
usando `window.scrollTo({ behavior: 'smooth' })` nativo. Sem dependências.

## Uso rápido

```html
<button type="button" data-back-to-top aria-label="Voltar ao topo" aria-hidden="true">
  ↑
</button>

<script src="back-to-top.js"></script>
```

> **Use um `<button>` real.** Não use `<a href="#">` — isso muda a URL, polui o
> histórico e quebra o comportamento esperado por leitores de tela.

### CSS sugerido

```css
[data-back-to-top] {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  border: 0;
  border-radius: 50%;
  background: #0f172a;
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;

  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
  transition: opacity 200ms ease, transform 200ms ease;
}

[data-back-to-top].is-visible {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
```

## Configuração

```html
<script src="back-to-top.js"></script>
<script>
  BackToTop.init({
    selector: '[data-back-to-top]',
    offset: 600,
    visibleClass: 'is-visible'
  });
</script>
```

## Acessibilidade

- Use um `<button type="button">` — ele já é focável e ativável por teclado.
- O script alterna `aria-hidden` conforme a visibilidade, então o botão some
  da árvore de acessibilidade quando invisível.
- Respeita `prefers-reduced-motion: reduce` trocando o `behavior` do scroll
  para `'auto'` (pulo instantâneo).
- O listener de `scroll` é `{ passive: true }` — não bloqueia o scroll.

## API

### `BackToTop.init(options?)`

Retorna um `destroy` que remove os listeners:

```js
const destroy = BackToTop.init({ offset: 800 });
// mais tarde…
destroy();
```

### Opções

| Opção          | Tipo     | Padrão               | Descrição                                          |
| -------------- | -------- | -------------------- | -------------------------------------------------- |
| `selector`     | `string` | `[data-back-to-top]` | Seletor dos botões a gerenciar                     |
| `offset`       | `number` | `400`                | Pixels de scroll antes do botão aparecer           |
| `visibleClass` | `string` | `is-visible`         | Classe aplicada ao botão quando visível            |

## Demo

Veja [`demo.html`](./demo.html).
