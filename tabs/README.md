# tabs

Implementa o [ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
com navegação por teclado e roving tabindex. Sem dependências.

## Uso rápido

```html
<div data-tabs>
  <div role="tablist" aria-label="Seções">
    <button role="tab" id="tab-intro"
            aria-selected="true"  aria-controls="panel-intro">Intro</button>
    <button role="tab" id="tab-uso"
            aria-selected="false" aria-controls="panel-uso" tabindex="-1">Uso</button>
    <button role="tab" id="tab-api"
            aria-selected="false" aria-controls="panel-api" tabindex="-1">API</button>
  </div>

  <div id="panel-intro" role="tabpanel" aria-labelledby="tab-intro">
    <p>Conteúdo da Intro…</p>
  </div>
  <div id="panel-uso" role="tabpanel" aria-labelledby="tab-uso" hidden>
    <p>Conteúdo de Uso…</p>
  </div>
  <div id="panel-api" role="tabpanel" aria-labelledby="tab-api" hidden>
    <p>Conteúdo de API…</p>
  </div>
</div>

<script src="tabs.js"></script>
```

O HTML já **deve ser acessível por si só** — o snippet só gerencia foco,
teclado e visibilidade dos painéis. Se o JS não carregar, o primeiro painel
fica visível e os outros escondidos.

## Teclado

| Tecla              | Ação                                                    |
| ------------------ | ------------------------------------------------------- |
| `←` / `→`          | Move para a tab anterior/próxima (loop)                 |
| `↑` / `↓`          | Idem, se `aria-orientation="vertical"` no `tablist`     |
| `Home`             | Vai para a primeira tab                                 |
| `End`              | Vai para a última tab                                   |
| `Enter` / `Espaço` | Ativa a tab focada (no modo `manual`)                   |
| `Tab`              | Sai do grupo de tabs para o próximo foco                |

**Roving tabindex**: só a tab ativa tem `tabindex="0"`; as demais têm
`tabindex="-1"`. Isso garante que `Tab` pule direto para o painel.

## Ativação automática vs. manual

- **`automatic`** (padrão do ARIA APG para conteúdos simples): mover o foco
  com as setas já troca o painel. Rápido, mas carrega conteúdo eagerly.
- **`manual`**: setas só movem o foco; o usuário confirma com `Enter` ou
  `Espaço`. Use quando trocar de tab é custoso (ex.: recarrega iframe,
  faz fetch, etc.).

Configuração global via `init()`:

```js
Tabs.init({ activation: 'manual' });
```

Ou por grupo, via `data-activation` no container:

```html
<div data-tabs data-activation="manual">…</div>
```

O atributo `data-activation` sobrescreve a opção global.

## Orientação vertical

Adicione `aria-orientation="vertical"` no `tablist` — as setas de navegação
viram `↑`/`↓` automaticamente:

```html
<div role="tablist" aria-orientation="vertical" aria-label="…">
  …
</div>
```

## CSS sugerido

```css
[role="tablist"] {
  display: flex;
  gap: 0.25rem;
  border-bottom: 1px solid #334155;
}

[role="tab"] {
  background: transparent;
  border: 0;
  padding: 0.6rem 1rem;
  cursor: pointer;
  color: inherit;
  border-bottom: 2px solid transparent;
  font: inherit;
}

[role="tab"][aria-selected="true"] {
  border-bottom-color: #38bdf8;
  color: #38bdf8;
}

[role="tabpanel"] { padding: 1rem 0; }

[role="tabpanel"]:focus-visible {
  outline: 3px solid #38bdf8;
  outline-offset: 4px;
}
```

## Acessibilidade

- O atributo `hidden` é usado para esconder painéis inativos — ele remove do
  fluxo de tabulação e esconde de leitores de tela (diferente de
  `display: none` via classe, que também funciona mas é menos semântico).
- `aria-selected`, `aria-controls`, `aria-labelledby` são atualizados
  automaticamente — você não precisa sincronizá-los no HTML.
- Cada tab deve ser um `<button type="button">` — nunca `<a href="#">` (a
  mudança de hash faria a página rolar).
- Para permitir que o usuário tabule **para dentro** do painel, o painel
  ativo precisa ser focável. Normalmente o próprio conteúdo já tem
  elementos focáveis. Se não tiver, adicione `tabindex="0"` no
  `<div role="tabpanel">`.

## API

### `Tabs.init(options?)`

Retorna um `destroy` que remove todos os listeners:

```js
const destroy = Tabs.init({ activation: 'manual' });
// mais tarde…
destroy();
```

### Opções

| Opção        | Tipo     | Padrão        | Descrição                                              |
| ------------ | -------- | ------------- | ------------------------------------------------------ |
| `selector`   | `string` | `[data-tabs]` | Seletor do(s) container(es) de grupo de tabs           |
| `activation` | `string` | `automatic`   | `'automatic'` ou `'manual'` (ver seção acima)          |

## Demo

Veja [`demo.html`](./demo.html).
