/* ── SCROLL REVEAL ─────────────────────────────────────────────────────────
   Observe les éléments [data-reveal] et leur ajoute .is-visible lorsqu'ils
   entrent dans le viewport. Si IntersectionObserver n'est pas disponible
   (ou si l'utilisateur préfère moins d'animations), tout est révélé d'emblée.
────────────────────────────────────────────────────────────────────────── */

function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  items.forEach(function (el) { observer.observe(el); });
}

initScrollReveal();
