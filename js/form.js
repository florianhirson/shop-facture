/* ── FORMULAIRE DE CONTACT ─────────────────────────────────────────────────
   Soumission Web3Forms en arrière-plan (fetch), validation côté client de
   l'email, puis affichage d'un message de confirmation sans recharger la page.
   Cloudflare Turnstile est géré automatiquement via l'attribut data-sitekey :
   son jeton est inclus dans les données envoyées.
────────────────────────────────────────────────────────────────────────── */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const emailField = form.querySelector('input[name="email"]');
  const submitBtn = form.querySelector('button[type="submit"]');

  function clearError() {
    form.classList.remove('has-error');
  }

  emailField && emailField.addEventListener('input', clearError);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validation : email requis et valide (s'appuie sur la contrainte native).
    if (!emailField || !emailField.value.trim() || !emailField.checkValidity()) {
      form.classList.add('has-error');
      emailField && emailField.focus();
      return;
    }
    clearError();

    const originalLabel = submitBtn ? submitBtn.textContent.trim() : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi…';
    }

    const data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    })
      .then(function (response) { return response.json(); })
      .then(function (result) {
        if (result && result.success) {
          form.classList.add('is-sent');
        } else {
          showSubmitFailure(submitBtn, originalLabel);
        }
      })
      .catch(function () {
        showSubmitFailure(submitBtn, originalLabel);
      });
  });

  function showSubmitFailure(btn, label) {
    form.classList.add('has-error');
    if (btn) {
      btn.disabled = false;
      btn.textContent = label || 'Envoyer';
    }
  }
}

initContactForm();
