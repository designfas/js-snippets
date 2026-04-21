# js-snippets

Coleção de **mini bibliotecas JavaScript** focadas em uma coisa só. Sem dependências,
sem build step, sem jQuery. Código feito pra ser lido, estudado e copiado.

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

| Snippet                                    | O que faz                                                              | Tamanho |
| ------------------------------------------ | ---------------------------------------------------------------------- | ------- |
| [`smooth-scroll`](./smooth-scroll)         | Rolagem suave em cliques de links âncora (`<a href="#secao">`).        | ~3.7 KB |
| [`reveal-on-scroll`](./reveal-on-scroll)   | Anima elementos `[data-reveal]` quando entram na viewport.             | ~2.0 KB |
| [`back-to-top`](./back-to-top)             | Botão flutuante "voltar ao topo" que aparece após X pixels de scroll.  | ~1.8 KB |

> Tamanhos são do arquivo bruto (não minificado, não gzipado).

## Como usar

Cada pasta é independente. Copie apenas o `.js` do snippet que você quer para o
seu projeto e inclua com uma `<script>`:

```html
<script src="smooth-scroll.js"></script>
```

Os snippets auto-inicializam com defaults razoáveis. Se quiser customizar, cada
um expõe uma função `init(options)` — veja o `README.md` da pasta correspondente.

## Testando localmente

Não há build. Basta servir a raiz do repositório:

```bash
python3 -m http.server 8080
```

E abrir a demo de cada snippet:

- `http://localhost:8080/smooth-scroll/demo.html`
- `http://localhost:8080/reveal-on-scroll/demo.html`
- `http://localhost:8080/back-to-top/demo.html`

## Licença

[MIT](./LICENSE) © Francismar Almeida (designfas) e contribuidores.
