/* ── NAV STICKY ────────────────────────────────────────────────────────────
   Ajoute la classe .nav--scrolled dès que la page dépasse 20 px de défilement,
   ce qui révèle la bordure et l'ombre sous la barre de navigation.
────────────────────────────────────────────────────────────────────────── */

function initStickyNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 20;
  let ticking = false;

  function update() {
    nav.classList.toggle('nav--scrolled', window.scrollY > SCROLL_THRESHOLD);
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}

initStickyNav();
