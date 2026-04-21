# SmoothScroll-on-anchor

Rolagem suave ao clicar em links âncora (`<a href="#secao">`).
Vanilla JS, sem dependências, com suporte a acessibilidade e `prefers-reduced-motion`.

> Esta é a versão modernizada do script original (que dependia de jQuery).
> Funciona em todos os navegadores modernos (Chrome, Firefox, Safari, Edge).

## Recursos

- Zero dependências (antes exigia jQuery)
- Respeita `prefers-reduced-motion` para usuários com sensibilidade a movimento
- Gerenciamento de foco para leitores de tela e navegação por teclado
- Configurável globalmente ou por link via `data-*`
- Atualiza a URL com `history.pushState` sem recarregar a página
- Ignora cliques com `Ctrl`/`Cmd`/`Shift` (para abrir em nova aba funcionar normalmente)

## Uso rápido

Inclua o script no final do `<body>`:

```html
<script src="main.js"></script>
```

Pronto. Qualquer `<a href="#alguma-coisa">` na página passa a rolar suavemente
até o elemento com `id="alguma-coisa"`.

## Configuração

### Global

```html
<script src="main.js"></script>
<script>
  SmoothScrollOnAnchor.init({
    offset: -80,      // compensação em pixels (negativo = parar acima do alvo)
    duration: 600,    // duração da animação em ms (0 desativa a animação)
    updateURL: true   // se deve atualizar a URL com o hash
  });
</script>
```

> Observação: o script auto-inicializa com os valores padrão. Chamar `init()`
> novamente registra outro listener com as opções fornecidas.

### Por link (data attributes)

```html
<a href="#contato" data-scroll-offset="-100" data-scroll-duration="400">
  Contato
</a>
```

## Acessibilidade

- Respeita `prefers-reduced-motion: reduce` — nesse caso, a rolagem é instantânea.
- Após a rolagem, o foco é movido para o elemento de destino. Se ele não tinha
  `tabindex`, um `tabindex="-1"` temporário é adicionado e removido no `blur`.

## API

### `SmoothScrollOnAnchor.init(options?)`

Registra o listener de cliques. Retorna uma função `destroy` para remover o listener:

```js
const destroy = SmoothScrollOnAnchor.init({ duration: 500 });
// mais tarde…
destroy();
```

### Opções

| Opção       | Tipo      | Padrão                                            | Descrição                                  |
| ----------- | --------- | ------------------------------------------------- | ------------------------------------------ |
| `offset`    | `number`  | `-200`                                            | Deslocamento vertical em pixels            |
| `duration`  | `number`  | `1000`                                            | Duração da animação em ms                  |
| `selector`  | `string`  | `a[href*="#"]:not([href="#"]):not([href="#0"])`   | Seletor dos links a interceptar            |
| `updateURL` | `boolean` | `true`                                            | Atualiza a URL com `history.pushState`     |

## Compatibilidade

Requer suporte a `Promise`, `CSS.escape`, `closest`, `matchMedia` e
`requestAnimationFrame` — disponíveis em todos os navegadores modernos.
Para navegadores legados (IE11), use a versão original via `git log`.

## Licença

[MIT](./LICENSE)
