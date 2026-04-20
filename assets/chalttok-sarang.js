(function () {
  if (window.__ctSarangLoaded) return;
  window.__ctSarangLoaded = true;

  /* Reveal on scroll */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.ct-reveal').forEach(function (el) {
        el.classList.add('ct-in');
      });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('ct-in');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.ct-reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* Hero parallax */
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initReveal();
      initParallax();
    });
  } else {
    initReveal();
    initParallax();
  }
})();
