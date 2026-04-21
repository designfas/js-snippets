/*!
 * theme-toggle
 * Alterna entre tema claro/escuro com persistência em localStorage e
 * respeito a prefers-color-scheme. Aplica o tema antes do paint quando
 * incluído no <head>, evitando FOUC. Sem dependências.
 * Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.ThemeToggle = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    selector: '[data-theme-toggle]',
    storageKey: 'theme',
    attribute: 'data-theme', // atributo setado em <html>. Use 'class' para adicionar classe.
    dark: 'dark',
    light: 'light'
  };

  function readStored(key) {
    try { return localStorage.getItem(key); }
    catch (e) { return null; }
  }

  function writeStored(key, value) {
    try { localStorage.setItem(key, value); }
    catch (e) { /* modo privado ou bloqueado — sem persistência */ }
  }

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(opts, theme) {
    var root = document.documentElement;
    if (opts.attribute === 'class') {
      root.classList.remove(opts.light, opts.dark);
      root.classList.add(theme);
    } else {
      root.setAttribute(opts.attribute, theme);
    }
  }

  function resolveInitial(opts) {
    var stored = readStored(opts.storageKey);
    if (stored === opts.dark || stored === opts.light) return stored;
    return prefersDark() ? opts.dark : opts.light;
  }

  // Aplica o tema imediatamente (antes do paint, se o script estiver no <head>)
  var boot = Object.assign({}, DEFAULTS);
  if (typeof document !== 'undefined') {
    applyTheme(boot, resolveInitial(boot));
  }

  function currentTheme(opts) {
    if (opts.attribute === 'class') {
      return document.documentElement.classList.contains(opts.dark) ? opts.dark : opts.light;
    }
    return document.documentElement.getAttribute(opts.attribute) || opts.light;
  }

  function syncButtons(buttons, opts) {
    var theme = currentTheme(opts);
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', theme === opts.dark ? 'true' : 'false');
      btn.dataset.theme = theme;
    });
  }

  function bindButtons(opts) {
    var buttons = Array.prototype.slice.call(document.querySelectorAll(opts.selector));
    if (buttons.length === 0) return function () {};

    function onClick() {
      var next = currentTheme(opts) === opts.dark ? opts.light : opts.dark;
      applyTheme(opts, next);
      writeStored(opts.storageKey, next);
      syncButtons(buttons, opts);
    }

    // Se o usuário não tem preferência salva, segue mudanças do sistema
    var mql = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    function onSystemChange() {
      if (readStored(opts.storageKey)) return;
      applyTheme(opts, prefersDark() ? opts.dark : opts.light);
      syncButtons(buttons, opts);
    }

    buttons.forEach(function (btn) { btn.addEventListener('click', onClick); });
    if (mql && mql.addEventListener) mql.addEventListener('change', onSystemChange);

    syncButtons(buttons, opts);

    return function destroy() {
      buttons.forEach(function (btn) { btn.removeEventListener('click', onClick); });
      if (mql && mql.removeEventListener) mql.removeEventListener('change', onSystemChange);
    };
  }

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    // Reaplica caso o usuário customize nomes de tema
    applyTheme(opts, resolveInitial(opts));
    return bindButtons(opts);
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
