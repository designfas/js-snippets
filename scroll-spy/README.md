# scroll-spy

Marca automaticamente o link de navegação correspondente à seção visível na
viewport. Usa `IntersectionObserver`. Sem dependências.

## Uso rápido

```html
<nav data-scroll-spy aria-label="Sumário">
  <a href="#intro">Intro</a>
  <a href="#instalacao">Instalação</a>
  <a href="#uso">Uso</a>
</nav>

<section id="intro">…</section>
<section id="instalacao">…</section>
<section id="uso">…</section>

<script src="scroll-spy.js"></script>
```

O snippet observa cada seção referenciada e adiciona `.is-active` +
`aria-current="true"` ao link correspondente conforme você rola.

### CSS sugerido

```css
[data-scroll-spy] a {
  color: inherit;
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 200ms ease, color 200ms ease;
}

[data-scroll-spy] a.is-active,
[data-scroll-spy] a[aria-current="true"] {
  opacity: 1;
  color: #38bdf8;
  font-weight: 600;
}
```

## Configuração

```html
<script src="scroll-spy.js"></script>
<script>
  ScrollSpy.init({
    navSelector: '[data-scroll-spy]',
    linkSelector: 'a[href^="#"]',
    activeClass: 'is-active',
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });
</script>
```

### Ajustando o `rootMargin`

O `rootMargin` padrão cria uma "linha de ativação" em ~30% do topo da
viewport: uma seção vira ativa quando seu topo cruza essa linha e deixa de
ser ativa quando passa dos 40% restantes. Ajuste conforme o layout:

- `0px 0px -80% 0px` — ativa assim que a seção aparece no topo
- `-50% 0px -50% 0px` — ativa quando passa pelo meio da tela

## Acessibilidade

- Ao ativar, adiciona `aria-current="true"` no link — leitores de tela
  anunciam "página atual" (ou equivalente).
- Fallback silencioso sem `IntersectionObserver`: nenhum link fica ativo,
  mas a navegação continua funcionando normalmente.
- Combina bem com [`smooth-scroll`](../smooth-scroll) — clique no link leva
  suavemente até a seção, e o spy marca como ativa ao chegar.

## API

### `ScrollSpy.init(options?)`

Retorna um `destroy` que desconecta todos os observers:

```js
const destroy = ScrollSpy.init();
// mais tarde…
destroy();
```

### Opções

| Opção          | Tipo     | Padrão                   | Descrição                                                |
| -------------- | -------- | ------------------------ | -------------------------------------------------------- |
| `navSelector`  | `string` | `[data-scroll-spy]`      | Seletor do(s) container(es) de navegação                 |
| `linkSelector` | `string` | `a[href^="#"]`           | Links dentro do nav a observar                           |
| `activeClass`  | `string` | `is-active`              | Classe aplicada ao link da seção visível                 |
| `rootMargin`   | `string` | `-30% 0px -60% 0px`      | `rootMargin` do `IntersectionObserver`                   |
| `threshold`    | `number` | `0`                      | Proporção visível para disparar                          |

## Demo

Veja [`demo.html`](./demo.html).
