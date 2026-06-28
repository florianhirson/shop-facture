/* ── ANNÉE DU FOOTER ───────────────────────────────────────────────────────
   Met à jour l'année du copyright avec l'année courante. La valeur en dur
   dans le HTML sert de repli (JavaScript désactivé ou avant exécution).
────────────────────────────────────────────────────────────────────────── */

function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (!el) return;
  el.textContent = new Date().getFullYear();
}

initFooterYear();
