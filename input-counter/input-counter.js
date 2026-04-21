/*!
 * input-counter
 * Conta caracteres de um input/textarea e exibe em um elemento
 * [data-counter-for="id"] com anúncio via aria-live.
 * Sem dependências. Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.InputCounter = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    selector: '[data-counter-for]',
    template: '{current} / {max}',          // quando há maxlength
    templateNoMax: '{current}',              // quando não há maxlength
    nearLimitRatio: 0.9,                     // ≥ 90% → .is-near-limit
    nearLimitClass: 'is-near-limit',
    overLimitClass: 'is-over-limit'
  };

  function render(template, current, max) {
    return template
      .replace('{current}', String(current))
      .replace('{max}', String(max || ''))
      .replace('{remaining}', String(Math.max((max || 0) - current, 0)));
  }

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    var counters = Array.prototype.slice.call(document.querySelectorAll(opts.selector));
    if (counters.length === 0) return function destroy() {};

    var pairs = [];

    counters.forEach(function (counter) {
      var id = counter.getAttribute('data-counter-for');
      var field = document.getElementById(id);
      if (!field) return;

      // aria-live garante o anúncio no leitor de tela; polite não interrompe
      if (!counter.hasAttribute('aria-live')) counter.setAttribute('aria-live', 'polite');
      if (!counter.hasAttribute('aria-atomic')) counter.setAttribute('aria-atomic', 'true');

      function update() {
        var max = parseInt(field.getAttribute('maxlength'), 10);
        var current = field.value.length;
        var hasMax = !isNaN(max) && max > 0;
        var tpl = counter.getAttribute('data-template') ||
                  (hasMax ? opts.template : opts.templateNoMax);

        counter.textContent = render(tpl, current, hasMax ? max : 0);

        var near = hasMax && current / max >= opts.nearLimitRatio;
        var over = hasMax && current > max;
        counter.classList.toggle(opts.nearLimitClass, near && !over);
        counter.classList.toggle(opts.overLimitClass, over);
      }

      field.addEventListener('input', update);
      update();
      pairs.push({ field: field, update: update });
    });

    return function destroy() {
      pairs.forEach(function (p) { p.field.removeEventListener('input', p.update); });
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
