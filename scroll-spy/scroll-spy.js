/*!
 * scroll-spy
 * Marca o link de navegação correspondente à seção visível na viewport.
 * Usa IntersectionObserver. Sem dependências.
 * Licença MIT.
 */
(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.ScrollSpy = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var DEFAULTS = {
    navSelector: '[data-scroll-spy]',
    linkSelector: 'a[href^="#"]',
    activeClass: 'is-active',
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  function collectSections(nav, linkSelector) {
    var links = Array.prototype.slice.call(nav.querySelectorAll(linkSelector));
    var sections = [];
    links.forEach(function (link) {
      var id = (link.getAttribute('href') || '').slice(1);
      if (!id) return;
      var section = document.getElementById(id);
      if (section) sections.push({ link: link, section: section });
    });
    return sections;
  }

  function init(userOptions) {
    var opts = Object.assign({}, DEFAULTS, userOptions || {});
    var navs = Array.prototype.slice.call(document.querySelectorAll(opts.navSelector));
    if (navs.length === 0) return function destroy() {};

    if (typeof IntersectionObserver === 'undefined') {
      return function destroy() {};
    }

    var destroyers = navs.map(function (nav) {
      var pairs = collectSections(nav, opts.linkSelector);
      if (pairs.length === 0) return function () {};

      var linkBySection = new Map();
      pairs.forEach(function (p) { linkBySection.set(p.section, p.link); });
      var visible = new Set();

      function updateActive() {
        // Entre as seções visíveis, escolhe a que aparece mais alto no documento
        var best = null;
        visible.forEach(function (section) {
          if (!best || section.offsetTop < best.offsetTop) best = section;
        });

        pairs.forEach(function (p) {
          var isActive = p.section === best;
          p.link.classList.toggle(opts.activeClass, isActive);
          if (isActive) p.link.setAttribute('aria-current', 'true');
          else p.link.removeAttribute('aria-current');
        });
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        updateActive();
      }, { rootMargin: opts.rootMargin, threshold: opts.threshold });

      pairs.forEach(function (p) { observer.observe(p.section); });

      return function () { observer.disconnect(); };
    });

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
