/*!
 * sticky-header
 * Header fixo que some ao rolar para baixo e reaparece ao rolar para cima.
 * Adiciona .is-scrolled quando sai do topo. Sem dependências.
 * Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.StickyHeader = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    selector: '[data-sticky-header]',
    hiddenClass: 'is-hidden',
    scrolledClass: 'is-scrolled',
    scrolledOffset: 10,  // px de scroll para considerar "rolado"
    tolerance: 5         // px de movimento antes de alternar (evita jitter)
  };

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    var headers = Array.prototype.slice.call(document.querySelectorAll(opts.selector));
    if (headers.length === 0) return function destroy() {};

    var lastY = window.pageYOffset;
    var ticking = false;

    function apply() {
      var y = window.pageYOffset;
      var delta = y - lastY;
      var goingDown = delta > opts.tolerance;
      var goingUp = delta < -opts.tolerance;
      var pastOffset = y > opts.scrolledOffset;

      headers.forEach(function (header) {
        // Só esconde se já passou da altura do próprio header (evita sumir no topo)
        var headerHeight = header.offsetHeight;
        if (goingDown && y > headerHeight) {
          header.classList.add(opts.hiddenClass);
        } else if (goingUp || y <= headerHeight) {
          header.classList.remove(opts.hiddenClass);
        }
        header.classList.toggle(opts.scrolledClass, pastOffset);
      });

      if (goingDown || goingUp) lastY = y;
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    apply();

    return function destroy() {
      window.removeEventListener('scroll', onScroll);
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
