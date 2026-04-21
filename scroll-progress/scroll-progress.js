/*!
 * scroll-progress
 * Atualiza uma barra [data-scroll-progress] conforme o scroll da página
 * (ou de um elemento alvo) progride. Sem dependências.
 * Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.ScrollProgress = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    selector: '[data-scroll-progress]',
    target: null, // seletor de um elemento (ex.: 'article') ou null para a página inteira
    cssVariable: '--scroll-progress'
  };

  function pageProgress() {
    var docEl = document.documentElement;
    var scrollable = docEl.scrollHeight - docEl.clientHeight;
    if (scrollable <= 0) return 1;
    return Math.min(Math.max(window.pageYOffset / scrollable, 0), 1);
  }

  function elementProgress(target) {
    var rect = target.getBoundingClientRect();
    var viewport = window.innerHeight || document.documentElement.clientHeight;
    var total = rect.height + viewport; // começa quando topo entra, termina quando base sai
    if (total <= 0) return 0;
    var passed = viewport - rect.top;
    return Math.min(Math.max(passed / total, 0), 1);
  }

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    var bars = Array.prototype.slice.call(document.querySelectorAll(opts.selector));
    if (bars.length === 0) return function destroy() {};

    var target = opts.target ? document.querySelector(opts.target) : null;
    var ticking = false;

    function apply() {
      var progress = target ? elementProgress(target) : pageProgress();
      var percent = (progress * 100).toFixed(2);
      bars.forEach(function (bar) {
        bar.style.setProperty(opts.cssVariable, progress.toFixed(4));
        if (bar.getAttribute('role') === 'progressbar') {
          bar.setAttribute('aria-valuenow', Math.round(progress * 100));
        }
        bar.dataset.progress = percent;
      });
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    apply();

    return function destroy() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
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
