// View — renders filter chips and the spaces grid
window.KTM = window.KTM || {};

KTM.SpacesView = {

  renderChips(categories, activeCategory, onFilterChange) {
    const container = document.querySelector("#filter-chips");
    if (!container) return;
    container.innerHTML = categories.map(c => `
      <button class="chip text-sm px-4 py-2 rounded-full glass border border-white/10 hover:border-gold/40 transition"
              data-cat="${c}" aria-pressed="${c === activeCategory}">${c}</button>
    `).join("");
    container.querySelectorAll(".chip").forEach(btn => {
      btn.addEventListener("click", () => onFilterChange(btn.dataset.cat));
    });
  },

  renderGrid(spaces) {
    const grid = document.querySelector("#space-grid");
    if (!grid) return;
    grid.innerHTML = spaces.map(s => `
      <article class="space-card glass rounded-2xl overflow-hidden" data-book="${s.id}">
        <div class="img-wrap aspect-[4/3]">
          <img src="${KTM.CONFIG.IMG_BASE}${s.image}" alt="${s.name}" class="w-full h-full object-cover ${s.class || ""}" loading="lazy" />
          <div class="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold flex items-center gap-1.5">
            <span class="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-gold"></span>
            Available
          </div>
          <div class="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider">${s.zone}</div>
          <div class="hover-cta">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-ink text-sm font-semibold">
              Book this space
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </span>
          </div>
        </div>
        <div class="p-5">
          <div class="text-[10px] uppercase tracking-[0.2em] text-gold/80 mb-1">${s.category}</div>
          <div class="font-serif text-xl mb-1">${s.name}</div>
          <div class="text-mute text-xs mb-3">${s.size}</div>
          <div class="flex items-center justify-between">
            <div class="text-gold font-semibold text-sm">Contact for price</div>
            ${s.quantity > 1 ? `<div class="text-[11px] text-mute">${s.quantity} units</div>` : ""}
          </div>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll(".space-card").forEach(card => {
      card.addEventListener("click", () => {
        const space = KTM.DataModel.getById(card.dataset.book);
        if (space) KTM.ModalView.open(space);
      });
    });
  }
};
