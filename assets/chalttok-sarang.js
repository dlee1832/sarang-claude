(function () {
  if (window.__ctSarangLoaded) return;
  window.__ctSarangLoaded = true;

  function revealEl(el) {
    el.classList.add('ct-in');
  }

  function observeAll(root) {
    var els = (root || document).querySelectorAll('.ct-reveal:not(.ct-in)');
    if (!els.length) return;

    // In Shopify theme editor: skip animation, show everything immediately
    if (window.Shopify && window.Shopify.designMode) {
      els.forEach(revealEl);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach(revealEl);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealEl(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  function initParallax() {
    var heroBg = document.querySelector('.ct-hero__bg');
    if (!heroBg) return;
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = 'scale(1.04) translateY(' + (scrolled * 0.12) + 'px)';
      }
    }, { passive: true });
  }

  // Re-observe when sections are added/reloaded in the theme editor
  document.addEventListener('shopify:section:load', function (e) {
    observeAll(e.target);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      observeAll();
      initParallax();
    });
  } else {
    observeAll();
    initParallax();
  }
})();
