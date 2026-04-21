/*!
 * SmoothScroll-on-anchor
 * Rolagem suave ao clicar em links âncora (#id). Sem dependências.
 * Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.SmoothScrollOnAnchor = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    offset: -200,
    duration: 1000,
    selector: 'a[href*="#"]:not([href="#"]):not([href="#0"])',
    updateURL: true
  };

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // easeInOutQuad — curva suave de aceleração/desaceleração
  function ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function animateScroll(targetY, duration) {
    return new Promise(function (resolve) {
      var startY = window.pageYOffset;
      var diff = targetY - startY;
      var startTime = performance.now();

      function step(now) {
        var progress = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, startY + diff * ease(progress));
        if (progress < 1) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
  }

  function isSamePage(anchor) {
    return (
      location.pathname.replace(/^\//, '') === anchor.pathname.replace(/^\//, '') &&
      location.hostname === anchor.hostname
    );
  }

  function findTarget(hash) {
    if (!hash || hash === '#') return null;
    var id = decodeURIComponent(hash.slice(1));
    return (
      document.getElementById(id) ||
      document.querySelector('[name="' + CSS.escape(id) + '"]')
    );
  }

  function manageFocus(target) {
    var hadTabIndex = target.hasAttribute('tabindex');
    if (!hadTabIndex) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (!hadTabIndex) {
      target.addEventListener(
        'blur',
        function () { target.removeAttribute('tabindex'); },
        { once: true }
      );
    }
  }

  function numberOr(value, fallback) {
    var n = Number(value);
    return isNaN(n) ? fallback : n;
  }

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});

    function onClick(event) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      var anchor = event.target.closest && event.target.closest(opts.selector);
      if (!anchor || !isSamePage(anchor)) return;

      var target = findTarget(anchor.hash);
      if (!target) return;

      event.preventDefault();

      var offset = numberOr(anchor.dataset.scrollOffset, opts.offset);
      var duration = numberOr(anchor.dataset.scrollDuration, opts.duration);
      var targetY = target.getBoundingClientRect().top + window.pageYOffset + offset;

      var scroll = prefersReducedMotion() || duration <= 0
        ? (window.scrollTo(0, targetY), Promise.resolve())
        : animateScroll(targetY, duration);

      scroll.then(function () {
        if (opts.updateURL && anchor.hash && location.hash !== anchor.hash) {
          history.pushState(null, '', anchor.hash);
        }
        manageFocus(target);
      });
    }

    document.addEventListener('click', onClick);
    return function destroy() {
      document.removeEventListener('click', onClick);
    };
  }

  // Auto-inicialização quando usado via <script> no navegador
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { init(); });
    } else {
      init();
    }
  }

  return { init: init };
});
