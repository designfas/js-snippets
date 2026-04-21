# input-counter

Contador de caracteres para `<input>` e `<textarea>`, com anúncio em
`aria-live` para leitores de tela. Sem dependências.

## Uso rápido

```html
<label for="bio">Bio</label>
<textarea id="bio" maxlength="160"></textarea>
<span data-counter-for="bio"></span>

<script src="input-counter.js"></script>
```

O snippet cuida do resto: adiciona `aria-live="polite"` no contador e
atualiza o texto conforme o usuário digita. Se o campo tiver `maxlength`,
exibe `10 / 160`; sem `maxlength`, exibe só `10`.

### CSS sugerido

```css
[data-counter-for] {
  color: #64748b;
  font-size: 0.85rem;
  display: inline-block;
  margin-top: 0.25rem;
}

[data-counter-for].is-near-limit { color: #ca8a04; }
[data-counter-for].is-over-limit { color: #dc2626; font-weight: 600; }
```

## Templates customizáveis

Por padrão: `{current} / {max}`. Você pode trocar globalmente ou por
contador individual via `data-template`:

```html
<!-- "120 restantes" -->
<span data-counter-for="bio" data-template="{remaining} restantes"></span>
```

Placeholders: `{current}`, `{max}`, `{remaining}`.

## Acessibilidade

- O contador recebe `aria-live="polite"` e `aria-atomic="true"`
  automaticamente — leitores de tela anunciam a contagem sem interromper
  o usuário.
- **Associe visualmente o contador ao campo.** Se quiser que leitores
  vinculem os dois, adicione `aria-describedby`:

  ```html
  <label for="bio">Bio</label>
  <textarea id="bio" maxlength="160" aria-describedby="bio-counter"></textarea>
  <span id="bio-counter" data-counter-for="bio"></span>
  ```

- O snippet **não bloqueia** digitação além do `maxlength` — quem faz isso é
  o atributo nativo. Se você quer permitir passar do limite (ex.: validar no
  submit), remova o `maxlength` e use a classe `.is-over-limit` para
  estilizar.

## API

### `InputCounter.init(options?)`

Retorna um `destroy` que remove os listeners de `input`:

```js
const destroy = InputCounter.init({ nearLimitRatio: 0.8 });
// mais tarde…
destroy();
```

### Opções

| Opção             | Tipo     | Padrão                | Descrição                                           |
| ----------------- | -------- | --------------------- | --------------------------------------------------- |
| `selector`        | `string` | `[data-counter-for]`  | Seletor dos contadores                              |
| `template`        | `string` | `{current} / {max}`   | Template quando há `maxlength`                      |
| `templateNoMax`   | `string` | `{current}`           | Template quando não há `maxlength`                  |
| `nearLimitRatio`  | `number` | `0.9`                 | Proporção a partir da qual aplica `nearLimitClass`  |
| `nearLimitClass`  | `string` | `is-near-limit`       | Classe aplicada perto do limite                     |
| `overLimitClass`  | `string` | `is-over-limit`       | Classe aplicada quando passa do `maxlength`         |

## Demo

Veja [`demo.html`](./demo.html).
