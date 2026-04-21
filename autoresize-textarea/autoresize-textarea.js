/*!
 * autoresize-textarea
 * Ajusta a altura de <textarea data-autoresize> ao conteúdo, com limite
 * opcional via data-max-rows. Sem dependências.
 * Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.AutoresizeTextarea = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    selector: 'textarea[data-autoresize]'
  };

  function getLineHeight(el) {
    var computed = window.getComputedStyle(el);
    var lh = parseFloat(computed.lineHeight);
    if (!isNaN(lh)) return lh;
    // lineHeight pode ser 'normal' — estima como 1.2 * font-size
    return parseFloat(computed.fontSize) * 1.2;
  }

  function resize(el) {
    var maxRows = parseInt(el.getAttribute('data-max-rows'), 10);
    // Reset é obrigatório: sem isso, o scrollHeight só cresce (nunca diminui)
    el.style.height = 'auto';

    var target = el.scrollHeight;
    if (!isNaN(maxRows) && maxRows > 0) {
      var computed = window.getComputedStyle(el);
      var padding = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
      var border = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
      var maxHeight = getLineHeight(el) * maxRows + padding + border;
      if (target > maxHeight) {
        target = maxHeight;
        el.style.overflowY = 'auto';
      } else {
        el.style.overflowY = 'hidden';
      }
    } else {
      el.style.overflowY = 'hidden';
    }
    el.style.height = target + 'px';
  }

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    var elements = Array.prototype.slice.call(document.querySelectorAll(opts.selector));
    if (elements.length === 0) return function destroy() {};

    function onInput(event) { resize(event.target); }
    function onResize() { elements.forEach(resize); }

    elements.forEach(function (el) {
      el.addEventListener('input', onInput);
      // box-sizing: border-box é necessário para o cálculo ficar consistente
      el.style.boxSizing = 'border-box';
      resize(el);
    });
    window.addEventListener('resize', onResize, { passive: true });

    return function destroy() {
      elements.forEach(function (el) { el.removeEventListener('input', onInput); });
      window.removeEventListener('resize', onResize);
    };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { init(); });
    } else {
      init();
    }
  }

  return { init: init, resize: resize };
});
