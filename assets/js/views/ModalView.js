// View — booking modal open/close and state transitions
window.KTM = window.KTM || {};

KTM.ModalView = {

  open(space) {
    const modal = document.querySelector("#modal");
    if (!modal || !space) return;

    document.querySelector("#modal-img").src          = KTM.CONFIG.IMG_BASE + space.image;
    document.querySelector("#modal-img").alt          = space.name;
    document.querySelector("#modal-cat").textContent  = space.category + " · " + space.zone;
    document.querySelector("#modal-name").textContent        = space.name;
    document.querySelector("#modal-name-mobile").textContent = space.name;
    document.querySelector("#modal-price").textContent       = "Contact for pricing";
    document.querySelector("#modal-price-mobile").textContent= "Contact for pricing";

    // WhatsApp deep-link with the space name pre-filled
    const waMsg = encodeURIComponent(
      `Namaste! I'm interested in "${space.name}" at The Kathmandu Mall. Could you please share the price and availability?`
    );
    const wa = document.querySelector("#modal-wa");
    if (wa) wa.href = "https://wa.me/9779860499000?text=" + waMsg;
    document.querySelector("#modal-size").textContent =
      space.size + (space.quantity > 1 ? ` · ${space.quantity} units available` : "");

    document.querySelector("#modal-highlights").innerHTML = (space.highlights || [])
      .map(h => `<li class="flex gap-2"><span class="text-gold">›</span><span>${h}</span></li>`)
      .join("");

    // Reset form, then populate hidden fields (reset clears them)
    document.querySelector("#booking-form").reset();
    document.querySelector("#f-space-id").value   = space.id;
    document.querySelector("#f-space-name").value = space.name;
    document.querySelector("#f-price").value      = space.price_label;

    document.querySelector("#form-view").classList.remove("hidden");
    document.querySelector("#success-view").classList.add("hidden");

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  },

  close() {
    const modal = document.querySelector("#modal");
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  },

  showSuccess() {
    document.querySelector("#form-view").classList.add("hidden");
    document.querySelector("#success-view").classList.remove("hidden");
  },

  setLoading(isLoading) {
    const btn     = document.querySelector("#submit-btn");
    const label   = document.querySelector("#submit-label");
    const arrow   = document.querySelector("#submit-arrow");
    const spinner = document.querySelector("#submit-spinner");
    if (!btn) return;
    btn.disabled = isLoading;
    label.textContent = isLoading ? "Sending…" : "Reserve & get a callback";
    arrow.classList.toggle("hidden", isLoading);
    spinner.classList.toggle("hidden", !isLoading);
  }
};
