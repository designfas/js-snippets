/*!
 * tabs
 * Implementa o ARIA Tabs Pattern com roving tabindex e navegação por teclado
 * (Setas, Home, End). Sem dependências. Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.Tabs = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    selector: '[data-tabs]',
    // 'automatic' = setas movem foco E ativam; 'manual' = setas só movem foco (Enter/Espaço ativa)
    activation: 'automatic'
  };

  var INITIALIZED = '__tabsInitialized';

  function setupGroup(container, opts) {
    // Evita re-bind se init() for chamado depois do auto-init no mesmo container
    if (container[INITIALIZED]) return function () {};
    container[INITIALIZED] = true;

    var tablist = container.querySelector('[role="tablist"]');
    if (!tablist) return function () {};

    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    if (tabs.length === 0) return function () {};

    var panels = tabs.map(function (tab) {
      var id = tab.getAttribute('aria-controls');
      return id ? document.getElementById(id) : null;
    });

    var orientation = tablist.getAttribute('aria-orientation') === 'vertical'
      ? 'vertical' : 'horizontal';

    // data-activation no container sobrescreve a opção global
    var activation = container.getAttribute('data-activation') === 'manual'
      ? 'manual'
      : (container.getAttribute('data-activation') === 'automatic' ? 'automatic' : opts.activation);

    function activate(index) {
      tabs.forEach(function (tab, i) {
        var active = i === index;
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.setAttribute('tabindex', active ? '0' : '-1');
        if (panels[i]) panels[i].hidden = !active;
      });
    }

    function focusTab(index) {
      tabs[index].focus();
      if (activation === 'automatic') activate(index);
    }

    function currentIndex() {
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].getAttribute('aria-selected') === 'true') return i;
      }
      return 0;
    }

    function onKeydown(event) {
      var i = tabs.indexOf(event.target);
      if (i === -1) return;

      var prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
      var nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';

      var target = -1;
      if (event.key === prevKey) target = (i - 1 + tabs.length) % tabs.length;
      else if (event.key === nextKey) target = (i + 1) % tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate(i);
        return;
      } else return;

      event.preventDefault();
      focusTab(target);
    }

    function onClick(event) {
      var tab = event.target.closest('[role="tab"]');
      var i = tabs.indexOf(tab);
      if (i === -1) return;
      activate(i);
      tab.focus();
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('keydown', onKeydown);
      tab.addEventListener('click', onClick);
    });

    // Estado inicial: honra aria-selected se vier marcado, senão ativa o primeiro
    var initial = currentIndex();
    activate(initial);

    return function destroy() {
      tabs.forEach(function (tab) {
        tab.removeEventListener('keydown', onKeydown);
        tab.removeEventListener('click', onClick);
      });
      container[INITIALIZED] = false;
    };
  }

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    var groups = Array.prototype.slice.call(document.querySelectorAll(opts.selector));
    if (groups.length === 0) return function destroy() {};

    var destroyers = groups.map(function (group) { return setupGroup(group, opts); });

    return function destroy() {
      destroyers.forEach(function (d) { d(); });
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
