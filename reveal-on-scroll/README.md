# reveal-on-scroll

Adiciona uma classe (`is-revealed` por padrão) a elementos marcados com
`data-reveal` quando entram na viewport. Baseado em `IntersectionObserver`,
sem dependências.

## Uso rápido

```html
<section data-reveal>
  <h2>Olá</h2>
</section>

<script src="reveal-on-scroll.js"></script>
```

O script auto-inicializa no `DOMContentLoaded` procurando por `[data-reveal]`.

### CSS sugerido

O snippet só adiciona/remove a classe — o efeito visual é sua transição CSS:

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}

[data-reveal].is-revealed {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    transition: none;
  }
}
```

## Configuração

```html
<script src="reveal-on-scroll.js"></script>
<script>
  RevealOnScroll.init({
    selector: '[data-reveal]',
    className: 'is-revealed',
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
    once: true
  });
</script>
```

## Acessibilidade

- Se o usuário tem `prefers-reduced-motion: reduce`, todos os elementos são
  revelados imediatamente (sem animação controlada por JS).
- Se o navegador não suporta `IntersectionObserver`, mesma coisa: revela tudo
  de cara — o conteúdo nunca fica escondido por falha de JS.

## API

### `RevealOnScroll.init(options?)`

Retorna um `destroy` que desconecta o observer:

```js
const destroy = RevealOnScroll.init({ once: false });
// mais tarde…
destroy();
```

### Opções

| Opção        | Tipo      | Padrão                | Descrição                                         |
| ------------ | --------- | --------------------- | ------------------------------------------------- |
| `selector`   | `string`  | `[data-reveal]`       | Seletor dos elementos a observar                  |
| `className`  | `string`  | `is-revealed`         | Classe adicionada quando entra na viewport        |
| `rootMargin` | `string`  | `0px 0px -10% 0px`    | `rootMargin` do `IntersectionObserver`            |
| `threshold`  | `number`  | `0.1`                 | Proporção visível para disparar                   |
| `once`       | `boolean` | `true`                | Se `false`, remove a classe ao sair da viewport   |

## Demo

Veja [`demo.html`](./demo.html).
