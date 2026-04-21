# smooth-scroll

Rolagem suave ao clicar em links âncora (`<a href="#secao">`). Sem dependências,
com suporte a `prefers-reduced-motion` e gerenciamento de foco.

## Uso rápido

```html
<script src="smooth-scroll.js"></script>
```

Pronto. Qualquer `<a href="#alguma-coisa">` passa a rolar suavemente até o elemento
com `id="alguma-coisa"`. O script auto-inicializa no `DOMContentLoaded`.

## Configuração

### Global

```html
<script src="smooth-scroll.js"></script>
<script>
  SmoothScrollOnAnchor.init({
    offset: -80,      // compensação em pixels (negativo = parar acima do alvo)
    duration: 600,    // duração da animação em ms (0 = instantâneo)
    updateURL: true   // se deve atualizar a URL com o hash
  });
</script>
```

> Chamar `init()` depois da auto-inicialização registra outro listener com as
> novas opções. Se quiser substituir, guarde o `destroy` retornado antes.

### Por link (data attributes)

```html
<a href="#contato" data-scroll-offset="-100" data-scroll-duration="400">
  Contato
</a>
```

## Acessibilidade

- Respeita `prefers-reduced-motion: reduce` — rolagem instantânea nesse caso.
- Após rolar, move o foco para o alvo. Se ele não tinha `tabindex`, aplica
  `tabindex="-1"` temporário e remove no `blur`.
- Ignora cliques com `Ctrl` / `Cmd` / `Shift` / `Alt` e `button !== 0` — abrir
  em nova aba continua funcionando normalmente.

## API

### `SmoothScrollOnAnchor.init(options?)`

Registra o listener de cliques. Retorna uma função `destroy` para removê-lo:

```js
const destroy = SmoothScrollOnAnchor.init({ duration: 500 });
// mais tarde…
destroy();
```

### Opções

| Opção       | Tipo      | Padrão                                            | Descrição                              |
| ----------- | --------- | ------------------------------------------------- | -------------------------------------- |
| `offset`    | `number`  | `-200`                                            | Deslocamento vertical em pixels        |
| `duration`  | `number`  | `1000`                                            | Duração da animação em ms              |
| `selector`  | `string`  | `a[href*="#"]:not([href="#"]):not([href="#0"])`   | Seletor dos links a interceptar        |
| `updateURL` | `boolean` | `true`                                            | Atualiza a URL com `history.pushState` |

## Demo

Veja [`demo.html`](./demo.html). Com o repo clonado:

```bash
python3 -m http.server 8080
```

E abra `http://localhost:8080/smooth-scroll/demo.html`.
