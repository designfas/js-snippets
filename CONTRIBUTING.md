# Contribuindo para js-snippets

Obrigado pelo interesse em contribuir! Este repo tem uma curadoria intencional
e algumas regras firmes — elas existem pra manter cada snippet pequeno,
acessível e estudável. Leia antes de abrir um PR.

## Antes de abrir um PR

**Abra uma issue primeiro** usando o template
[Sugerir snippet](https://github.com/designfas/js-snippets/issues/new?template=sugerir-snippet.md).
Isso evita você gastar tempo construindo algo que não entraria na coleção.

Para ajustes pequenos (bug, tipo, melhoria de docs), um PR direto está ok.

## Como decido o que aceitar

### ✅ Aceito quando o snippet

- Resolve **um** problema bem definido (uma feature).
- **Não** tem dependências — nem runtime, nem de build, nem polyfill.
- É **acessível por padrão** (ver checklist abaixo).
- Roda nas **últimas 2 versões** de Chrome, Firefox, Safari e Edge.
- Tem **menos de ~5 KB** de código não minificado.
- Existe uma razão genuína pra ele estar aqui (não é "mais um").

### ❌ Não aceito

- Dependências, mesmo que pequenas (`@lit-labs/observers`, `nanoid`, etc.)
- Integrações com frameworks (React, Vue, Svelte) — a coleção é vanilla.
- Build step. Nada de TypeScript transpilado, nada de bundler.
- Snippets que fazem **duas coisas**. "Um modal com focus trap" = dois
  snippets (modal + focus-trap).
- Código minificado. O código é pra ser lido.
- Features que já existem nativas no navegador moderno (ex.: `<details>`
  já é um accordion — não precisa de snippet pra isso).
- Cópias quase-idênticas de libs populares sem valor agregado.

## Padrão de código

Todo snippet segue o mesmo formato. Use um snippet existente
(ex.: `back-to-top/back-to-top.js`) como template.

### Estrutura de arquivos

```
meu-snippet/
├── meu-snippet.js
├── README.md
└── demo.html
```

O arquivo `.js` tem o mesmo nome da pasta.

### Template do `.js`

```js
/*!
 * meu-snippet
 * Descrição curta (1 linha). Sem dependências.
 * Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.MeuSnippet = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    selector: '[data-meu-snippet]'
    // ...
  };

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    // ...
    return function destroy() {
      // remove listeners, observers, timers, etc.
    };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { init(); });
    } else {
      init();
    }
  }

  return { init: init };
});
```

Regras:

- **UMD wrapper** para funcionar via `<script>`, ESM externo e CommonJS.
- **Auto-inicialização** no `DOMContentLoaded` (ou imediatamente se o DOM
  já estiver pronto).
- **`init(options)` retorna `destroy()`** que desfaz tudo que o `init` fez.
- **ES5-compatível**: `var`, `function`, sem arrow, sem `async`/`await`,
  sem template strings. Isso mantém o código simples de ler e roda em
  tudo que importa hoje.
- **Sem dependências externas** do DOM global — só listeners e `document` /
  `window`.

### Acessibilidade — checklist

Antes de abrir o PR, confirme:

- [ ] Respeita `prefers-reduced-motion: reduce` (instantâneo ou sem animação).
- [ ] Funciona com teclado (Tab, Enter, Setas onde aplicável).
- [ ] Usa `<button type="button">` para gatilhos, nunca `<a href="#">`.
- [ ] Elementos dinâmicos têm `aria-*` corretos (label, controls, live, etc.).
- [ ] Listeners de scroll / input têm `{ passive: true }` quando possível.
- [ ] Não gerencia foco em excesso — não "rouba" o foco do usuário
  sem uma razão clara.
- [ ] Anuncia mudanças importantes via `aria-live` (ex.: "Copiado!").

### Documentação — checklist

O `README.md` do snippet deve ter, **nessa ordem**:

1. Título + 1-2 linhas descrevendo o que faz.
2. **Uso rápido** com o mínimo pra funcionar.
3. **CSS sugerido**, se o snippet só adiciona/remove classes.
4. **Configuração** com `init(options)`.
5. **Acessibilidade** — explique as decisões de a11y.
6. **API** — assinatura de `init`, o que retorna, e tabela de opções.
7. Link para a **demo**.

Linguagem: **PT-BR**. Tom: explicativo mas direto, como se estivesse
contando pra um colega.

### Demo — checklist

- [ ] Self-contained (só HTML + CSS inline + o script do snippet).
- [ ] Funciona em tema escuro (cores consistentes com as outras demos).
- [ ] `:focus-visible` estilizado.
- [ ] Respeita `prefers-reduced-motion`.
- [ ] Mostra pelo menos uma variação/config além do default.

## Como trabalhar localmente

```bash
git clone https://github.com/designfas/js-snippets.git
cd js-snippets
python3 -m http.server 8080
```

Abra `http://localhost:8080/` e navegue até a demo do seu snippet.

Para validar sintaxe sem instalar nada:

```bash
node --check meu-snippet/meu-snippet.js
```

## Commit e PR

- Mensagens em **PT-BR** no mesmo tom dos commits existentes (use
  `git log --oneline` pra referência).
- Um PR = um snippet novo (ou uma correção). Não combine adições e
  refactors no mesmo PR.
- Descreva no PR:
  - **O que o snippet faz** (1 parágrafo).
  - **Decisões de design** não óbvias (ex.: "ativação automática é o
    default porque…").
  - **Test plan** em checklist.

## Licença

Ao contribuir, você concorda que seu código será publicado sob a
[licença MIT](./LICENSE) deste repositório.
