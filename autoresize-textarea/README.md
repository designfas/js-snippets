# autoresize-textarea

Faz `<textarea data-autoresize>` crescer conforme o usuário digita, até um
limite opcional de linhas. Sem dependências.

## Uso rápido

```html
<label for="msg">Mensagem</label>
<textarea id="msg" data-autoresize rows="2"></textarea>

<script src="autoresize-textarea.js"></script>
```

Com `data-max-rows`, o textarea para de crescer após N linhas e habilita o
scroll interno:

```html
<textarea data-autoresize data-max-rows="8" rows="2"></textarea>
```

### CSS sugerido

```css
textarea[data-autoresize] {
  resize: none;            /* deixa o JS controlar a altura */
  min-height: 3rem;        /* respeitado no carregamento */
  line-height: 1.5;        /* linhas previsíveis para o cálculo de max-rows */
}
```

> Se puder, use diretamente `field-sizing: content` no CSS
> ([suporte](https://caniuse.com/mdn-css_properties_field-sizing)). Para
> navegadores que ainda não suportam, esse snippet funciona como fallback.

## Como funciona

A cada `input`, o snippet:

1. Reseta `height` para `auto` (senão `scrollHeight` nunca diminui).
2. Mede `scrollHeight`.
3. Aplica como nova `height` — respeitando `data-max-rows` se presente.

`box-sizing: border-box` é forçado no elemento para o cálculo de altura
máxima funcionar com padding e border.

## Acessibilidade

- Não interfere com o comportamento nativo do `<textarea>` — o teclado, o
  foco, os leitores de tela, nada muda.
- Com `data-max-rows`, o scroll interno aparece automaticamente — o usuário
  nunca perde conteúdo.

## API

### `AutoresizeTextarea.init(options?)`

Retorna um `destroy` que remove os listeners de `input` e `resize`:

```js
const destroy = AutoresizeTextarea.init();
// mais tarde…
destroy();
```

### `AutoresizeTextarea.resize(el)`

Força o recálculo em um textarea específico. Útil depois de setar `el.value`
programaticamente (o evento `input` não dispara nesse caso):

```js
textarea.value = 'Muitas\nlinhas\nde\numa\nvez';
AutoresizeTextarea.resize(textarea);
```

### Opções

| Opção      | Tipo     | Padrão                          | Descrição                  |
| ---------- | -------- | ------------------------------- | -------------------------- |
| `selector` | `string` | `textarea[data-autoresize]`     | Seletor dos textareas      |

### Data attributes

| Atributo        | Tipo     | Descrição                                                  |
| --------------- | -------- | ---------------------------------------------------------- |
| `data-max-rows` | `number` | Limite em linhas. Acima disso, o scroll interno aparece.   |

## Demo

Veja [`demo.html`](./demo.html).
