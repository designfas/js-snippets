# copy-to-clipboard

Botão que copia texto para o clipboard com feedback visual e anúncio para
leitores de tela. Sem dependências.

## Uso rápido

```html
<!-- Copia o texto literal do atributo -->
<button type="button" data-copy="npm install js-snippets">
  Copiar comando
</button>

<!-- Copia o conteúdo de outro elemento -->
<pre id="snippet">fetch('/api').then(r => r.json())</pre>
<button type="button" data-copy-target="#snippet">
  Copiar código
</button>

<script src="copy-to-clipboard.js"></script>
```

### CSS sugerido

```css
[data-copy], [data-copy-target] {
  transition: background-color 200ms ease;
}

[data-copy].is-copied,
[data-copy-target].is-copied {
  background-color: #16a34a;
  color: #fff;
}
```

Se quiser, mostre o texto "Copiado!" direto no botão só via CSS, sem mexer no
HTML (preserva o texto original para leitores de tela via `aria-label`):

```css
[data-copy].is-copied::after {
  content: ' ✓';
}
```

## Configuração

```html
<script src="copy-to-clipboard.js"></script>
<script>
  CopyToClipboard.init({
    selector: '[data-copy], [data-copy-target]',
    copiedClass: 'is-copied',
    copiedLabel: 'Copiado!',
    resetMs: 2000
  });
</script>
```

### Por botão

```html
<button type="button"
        data-copy="contato@exemplo.com"
        data-copied-label="E-mail copiado!">
  Copiar e-mail
</button>
```

## Acessibilidade

- O snippet cria uma **região `aria-live="polite"`** oculta e anuncia o texto
  `copiedLabel` cada vez que a cópia tem sucesso — leitores de tela informam o
  usuário mesmo que nada mude visualmente.
- Em caso de falha (ex.: API de clipboard bloqueada), anuncia "Falha ao copiar".
- Use `<button type="button">` — ele é focável e ativável por teclado por padrão.
- O feedback visual é aplicado via classe `.is-copied`, então você controla
  100% da transição no CSS (e pode desligá-la via `prefers-reduced-motion`).

## Requisitos

Usa `navigator.clipboard.writeText()`, que exige **HTTPS** (ou `localhost`) na
maioria dos navegadores. Em contexto inseguro, a cópia falha e a região live
anuncia "Falha ao copiar" — o snippet não se apoia no deprecated
`document.execCommand('copy')`.

## API

### `CopyToClipboard.init(options?)`

Retorna um `destroy` que remove o listener global de clique:

```js
const destroy = CopyToClipboard.init({ resetMs: 1500 });
// mais tarde…
destroy();
```

### Opções

| Opção          | Tipo     | Padrão                              | Descrição                                                      |
| -------------- | -------- | ----------------------------------- | -------------------------------------------------------------- |
| `selector`     | `string` | `[data-copy], [data-copy-target]`   | Seletor dos gatilhos                                           |
| `copiedClass`  | `string` | `is-copied`                         | Classe aplicada ao gatilho durante `resetMs`                   |
| `copiedLabel`  | `string` | `Copiado!`                          | Mensagem anunciada para leitores de tela no sucesso            |
| `resetMs`      | `number` | `2000`                              | Duração em ms da classe `copiedClass`                          |
| `liveRegionId` | `string` | `copy-to-clipboard-live`            | ID da região `aria-live` criada no `<body>` (reutilizada)      |

## Demo

Veja [`demo.html`](./demo.html).
