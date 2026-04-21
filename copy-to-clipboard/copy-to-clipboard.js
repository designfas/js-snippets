/*!
 * copy-to-clipboard
 * Botão que copia texto ou o conteúdo de outro elemento para o clipboard,
 * com feedback visual e anúncio para leitores de tela.
 * Sem dependências. Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.CopyToClipboard = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    selector: '[data-copy], [data-copy-target]',
    copiedClass: 'is-copied',
    copiedLabel: 'Copiado!',
    resetMs: 2000,
    liveRegionId: 'copy-to-clipboard-live'
  };

  // Região ARIA live compartilhada para anunciar o sucesso da cópia aos leitores de tela
  function getLiveRegion(id) {
    var region = document.getElementById(id);
    if (region) return region;
    region = document.createElement('div');
    region.id = id;
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;';
    document.body.appendChild(region);
    return region;
  }

  function announce(region, message) {
    region.textContent = '';
    // timeout força leitores de tela a reanunciar em cliques repetidos
    setTimeout(function () { region.textContent = message; }, 50);
  }

  function resolveText(trigger) {
    var targetSelector = trigger.getAttribute('data-copy-target');
    if (targetSelector) {
      var target = document.querySelector(targetSelector);
      if (!target) return null;
      if ('value' in target) return target.value;
      return target.textContent.trim();
    }
    return trigger.getAttribute('data-copy');
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return Promise.reject(new Error('Clipboard API indisponível'));
  }

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    var liveRegion = getLiveRegion(opts.liveRegionId);
    var resetTimers = new WeakMap();

    function flashCopied(trigger) {
      var label = trigger.getAttribute('data-copied-label') || opts.copiedLabel;
      trigger.classList.add(opts.copiedClass);
      announce(liveRegion, label);

      var original = trigger.getAttribute('data-original-label');
      if (original === null) {
        trigger.setAttribute('data-original-label', trigger.getAttribute('aria-label') || '');
      }

      clearTimeout(resetTimers.get(trigger));
      resetTimers.set(trigger, setTimeout(function () {
        trigger.classList.remove(opts.copiedClass);
      }, opts.resetMs));
    }

    function onClick(event) {
      var trigger = event.target.closest && event.target.closest(opts.selector);
      if (!trigger) return;

      event.preventDefault();
      var text = resolveText(trigger);
      if (text == null || text === '') return;

      copyText(text).then(
        function () { flashCopied(trigger); },
        function () { announce(liveRegion, 'Falha ao copiar'); }
      );
    }

    document.addEventListener('click', onClick);
    return function destroy() {
      document.removeEventListener('click', onClick);
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
