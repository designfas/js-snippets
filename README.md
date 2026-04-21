# js-snippets

> **11 mini bibliotecas JavaScript sem dependências**, focadas em uma coisa
> só, acessíveis por padrão, com código legível. Feitas pra usar, estudar e
> copiar.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Snippets](https://img.shields.io/badge/snippets-11-38bdf8)](#snippets)
[![No dependencies](https://img.shields.io/badge/dependencies-0-success)](#filosofia)
[![jsDelivr](https://img.shields.io/jsdelivr/gh/hm/designfas/js-snippets?color=orange)](https://www.jsdelivr.com/package/gh/designfas/js-snippets)

🔗 **[Ver todas as demos →](https://designfas.github.io/js-snippets/)**

## Filosofia

- **Uma feature por snippet.** Se precisa de outra coisa importante, vira outro snippet.
- **Zero dependências** — nenhum polyfill, nenhuma toolchain, nenhum `node_modules`.
- **Acessível por padrão** — respeita `prefers-reduced-motion`, gerencia foco,
  funciona com teclado, preserva `Ctrl`/`Cmd`-click em links.
- **Legível** — é para estudar, não só para usar.
- **Compatível** com as últimas 2 versões de Chrome, Firefox, Safari e Edge.

Cada snippet é um `.js` vanilla com UMD wrapper, auto-inicialização no
`DOMContentLoaded` e uma função `init()` que retorna um `destroy`.

## Snippets

| Snippet                                            | O que faz                                                                | Tamanho |
| -------------------------------------------------- | ------------------------------------------------------------------------ | ------- |
| [`autoresize-textarea`](./autoresize-textarea)     | Textarea que cresce conforme o usuário digita, com limite opcional.      | ~2.6 KB |
| [`back-to-top`](./back-to-top)                     | Botão flutuante "voltar ao topo" que aparece após X pixels de scroll.    | ~1.8 KB |
| [`copy-to-clipboard`](./copy-to-clipboard)         | Botão copiar texto com feedback visual e anúncio para leitor de tela.    | ~3.5 KB |
| [`input-counter`](./input-counter)                 | Contador de caracteres com `aria-live` para leitores de tela.            | ~2.8 KB |
| [`reveal-on-scroll`](./reveal-on-scroll)           | Anima elementos `[data-reveal]` quando entram na viewport.               | ~2.0 KB |
| [`scroll-progress`](./scroll-progress)             | Barra de progresso de leitura atualizada conforme o scroll.              | ~2.6 KB |
| [`scroll-spy`](./scroll-spy)                       | Marca o link de nav correspondente à seção visível na viewport.          | ~2.9 KB |
| [`smooth-scroll`](./smooth-scroll)                 | Rolagem suave em cliques de links âncora (`<a href="#secao">`).          | ~3.7 KB |
| [`sticky-header`](./sticky-header)                 | Header que some ao rolar para baixo e reaparece ao rolar para cima.      | ~2.2 KB |
| [`tabs`](./tabs)                                   | Tabs com ARIA Pattern, roving tabindex e navegação por teclado.          | ~4.2 KB |
| [`theme-toggle`](./theme-toggle)                   | Alterna claro/escuro com persistência, segue `prefers-color-scheme`.     | ~3.8 KB |

> Tamanhos são do arquivo bruto (não minificado, não gzipado).

## Como usar

### Via CDN (jsDelivr)

Nenhum setup. Cole no seu HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/designfas/js-snippets/tabs/tabs.js"></script>
```

Troque `tabs/tabs.js` pelo snippet que quiser. Em produção, prefira fixar a
versão quando houver releases:

```html
<script src="https://cdn.jsdelivr.net/gh/designfas/js-snippets@v0.1.0/tabs/tabs.js"></script>
```

### Copiando o arquivo

Clone ou baixe o repo e copie só o `.js` do snippet que você quer:

```html
<script src="./js/tabs.js"></script>
```

Todos auto-inicializam com defaults razoáveis. Se quiser customizar, cada
um expõe uma função `init(options)` — veja o `README.md` da pasta
correspondente.

## Testando localmente

Não há build. Basta servir a raiz do repositório:

```bash
python3 -m http.server 8080
```

Acesse `http://localhost:8080/` para a landing da coleção, ou vá direto a
uma demo como `http://localhost:8080/smooth-scroll/demo.html`.

## Contribuindo

Sugestões e PRs são muito bem-vindos. Antes de abrir um PR novo, dê uma
olhada em [**CONTRIBUTING.md**](./CONTRIBUTING.md) — ele explica o que eu
aceito como snippet e o padrão de código/documentação.

Para sugerir um snippet novo, abra uma
[**issue usando o template "Sugerir snippet"**](https://github.com/designfas/js-snippets/issues/new?template=sugerir-snippet.md).

## Licença

[MIT](./LICENSE) © Francismar Almeida (designfas) e contribuidores.
