# theme-toggle

Alterna entre tema claro e escuro com persistência em `localStorage` e
respeito a `prefers-color-scheme`. Aplica o tema **antes do primeiro paint**
(sem FOUC) quando incluído no `<head>`. Sem dependências.

## Uso rápido

1. Coloque o `<script>` no `<head>` (sem `defer`/`async`):

```html
<head>
  …
  <script src="theme-toggle.js"></script>
</head>
```

2. Estilize via `[data-theme="dark"]` / `[data-theme="light"]`:

```css
:root[data-theme="light"] {
  --bg: #fff;
  --fg: #0f172a;
}

:root[data-theme="dark"] {
  --bg: #0f172a;
  --fg: #e2e8f0;
}

body {
  background: var(--bg);
  color: var(--fg);
}
```

3. Adicione o botão em qualquer lugar:

```html
<button type="button" data-theme-toggle aria-label="Alternar tema">
  🌓
</button>
```

Pronto. No primeiro carregamento, o tema segue `prefers-color-scheme` do
sistema. Ao clicar, o snippet persiste a preferência em `localStorage` e
passa a respeitar essa escolha em próximas visitas.

## Como funciona

- O script **aplica o tema imediatamente ao ser carregado** — não espera
  `DOMContentLoaded`. Por isso precisa estar no `<head>` e sem `defer`.
- A ordem de prioridade na hora de decidir o tema inicial é:
  1. Valor salvo em `localStorage[storageKey]`
  2. `prefers-color-scheme` do sistema
  3. `light` (fallback)
- Enquanto o usuário não clicou no botão, mudanças no sistema
  (`prefers-color-scheme`) são refletidas em tempo real. Depois de um clique,
  a escolha explícita passa a valer e o sistema é ignorado.

## Configuração

```html
<script src="theme-toggle.js"></script>
<script>
  ThemeToggle.init({
    selector: '[data-theme-toggle]',
    storageKey: 'theme',
    attribute: 'data-theme', // ou 'class' para adicionar classe em <html>
    dark: 'dark',
    light: 'light'
  });
</script>
```

Use `attribute: 'class'` se você prefere `html.dark` / `html.light` (útil
para integrar com Tailwind `darkMode: 'class'`, por exemplo).

## Acessibilidade

- Use um `<button type="button">` com `aria-label` descritivo — nunca um
  link, nunca uma `<div>`. O snippet alterna `aria-pressed="true|false"`
  automaticamente (`true` quando dark está ativo).
- As transições de cor devem ser suaves mas não animadas em excesso —
  envolva-as numa media query de movimento reduzido:

```css
body { transition: background-color 200ms ease, color 200ms ease; }

@media (prefers-reduced-motion: reduce) {
  body { transition: none; }
}
```

- O atributo `data-theme` exposto em cada botão (ex.: `data-theme="dark"`)
  permite estilizar ícones diferentes via CSS:

```css
[data-theme-toggle] .sun { display: none; }
[data-theme-toggle] .moon { display: inline; }
[data-theme-toggle][data-theme="dark"] .sun { display: inline; }
[data-theme-toggle][data-theme="dark"] .moon { display: none; }
```

## API

### `ThemeToggle.init(options?)`

Retorna um `destroy` que remove os listeners:

```js
const destroy = ThemeToggle.init({ attribute: 'class' });
// mais tarde…
destroy();
```

### Opções

| Opção        | Tipo     | Padrão                  | Descrição                                                         |
| ------------ | -------- | ----------------------- | ----------------------------------------------------------------- |
| `selector`   | `string` | `[data-theme-toggle]`   | Seletor dos botões de alternância                                 |
| `storageKey` | `string` | `theme`                 | Chave do `localStorage`                                           |
| `attribute`  | `string` | `data-theme`            | Atributo setado em `<html>`. Use `class` para adicionar classes.  |
| `dark`       | `string` | `dark`                  | Valor/classe aplicado em modo escuro                              |
| `light`      | `string` | `light`                 | Valor/classe aplicado em modo claro                               |

## Demo

Veja [`demo.html`](./demo.html).
