// Controller — booking form submission and modal lifecycle
window.KTM = window.KTM || {};

KTM.BookingController = {
  _lastSubmitAt: 0,

  init() {
    // Close modal on backdrop / close-button clicks
    document.querySelectorAll("[data-modal-close]").forEach(el => {
      el.addEventListener("click", () => KTM.ModalView.close());
    });

    // Close modal on Escape key
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !document.querySelector("#modal").classList.contains("hidden")) {
        KTM.ModalView.close();
      }
    });

    // Handle [data-book] buttons outside the space grid (e.g. flagship CTA)
    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-book]");
      if (btn && !btn.classList.contains("space-card")) {
        const space = KTM.DataModel.getById(btn.dataset.book);
        if (space) KTM.ModalView.open(space);
      }
    });

    // Form submit
    document.querySelector("#booking-form").addEventListener("submit", e => this._handleSubmit(e));
  },

  _validatePhone(phone) {
    return /^9[678]\d{8}$/.test(phone);
  },

  async _handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);

    if (fd.get("company_url")) return; // honeypot triggered

    const now = Date.now();
    if (now - this._lastSubmitAt < 30000) {
      KTM.ToastView.show("Please wait a few seconds before submitting again.");
      return;
    }

    const phone = String(fd.get("phone") || "").trim();
    if (!this._validatePhone(phone)) {
      KTM.ToastView.show("Please enter a valid 10-digit Nepal mobile (starts with 98 / 97 / 96).");
      return;
    }

    const payload = Object.fromEntries(fd.entries());
    payload.submitted_at = new Date().toISOString();
    payload.source       = "ktm-mall-spaces-page";
    payload.user_agent   = navigator.userAgent;

    KTM.ModalView.setLoading(true);

    let ok = false;
    try {
      const base = KTM.CONFIG.N8N_BASE;
      if (base && !base.includes("{{")) {
        const r = await fetch(base + KTM.CONFIG.BOOKING_PATH, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload)
        });
        ok = r.ok;
      } else {
        console.warn("[booking] N8N_BASE not configured — payload:", payload);
        await new Promise(r => setTimeout(r, 700));
        ok = true;
      }
    } catch (err) {
      console.error("[booking] error", err);
      ok = false;
    }

    KTM.ModalView.setLoading(false);

    if (ok) {
      this._lastSubmitAt = now;
      KTM.ModalView.showSuccess();
      KTM.ToastView.show("Reserved — sales team will WhatsApp you within 1 hour.");
    } else {
      KTM.ToastView.show("Couldn't send right now. Please try again or WhatsApp 9860499000.");
    }
  }
};
