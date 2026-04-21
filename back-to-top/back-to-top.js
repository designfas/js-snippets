/*!
 * back-to-top
 * Botão flutuante que aparece após X pixels de scroll e rola a página até o topo.
 * Sem dependências. Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.BackToTop = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    selector: '[data-back-to-top]',
    offset: 400,
    visibleClass: 'is-visible'
  };

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    var buttons = Array.prototype.slice.call(document.querySelectorAll(opts.selector));
    if (buttons.length === 0) return function destroy() {};

    function update() {
      var show = window.pageYOffset > opts.offset;
      buttons.forEach(function (btn) {
        btn.classList.toggle(opts.visibleClass, show);
        btn.setAttribute('aria-hidden', show ? 'false' : 'true');
      });
    }

    function onClick(event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    buttons.forEach(function (btn) { btn.addEventListener('click', onClick); });
    update();

    return function destroy() {
      window.removeEventListener('scroll', update);
      buttons.forEach(function (btn) { btn.removeEventListener('click', onClick); });
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
