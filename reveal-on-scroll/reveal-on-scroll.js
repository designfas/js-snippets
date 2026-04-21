/*!
 * reveal-on-scroll
 * Adiciona uma classe a elementos [data-reveal] quando entram na viewport.
 * Sem dependências. Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.RevealOnScroll = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    selector: '[data-reveal]',
    className: 'is-revealed',
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
    once: true
  };

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function revealAll(elements, className) {
    elements.forEach(function (el) { el.classList.add(className); });
  }

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    var elements = Array.prototype.slice.call(document.querySelectorAll(opts.selector));
    if (elements.length === 0) return function destroy() {};

    // Fallback: sem IntersectionObserver ou movimento reduzido — revela tudo
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      revealAll(elements, opts.className);
      return function destroy() {};
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(opts.className);
          if (opts.once) observer.unobserve(entry.target);
        } else if (!opts.once) {
          entry.target.classList.remove(opts.className);
        }
      });
    }, { rootMargin: opts.rootMargin, threshold: opts.threshold });

    elements.forEach(function (el) { observer.observe(el); });

    return function destroy() {
      observer.disconnect();
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
