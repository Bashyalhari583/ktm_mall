// View — renders the "Why Kathmandu Mall" highlights grid
window.KTM = window.KTM || {};

KTM.WhyView = {
  render() {
    const grid = document.querySelector("#why-grid");
    if (!grid) return;
    grid.innerHTML = KTM.DataModel.mall.highlights.map(h => `
      <div class="glass rounded-2xl p-6 reveal">
        <div class="text-3xl mb-3">${h.icon}</div>
        <div class="font-serif text-xl mb-1">${h.title}</div>
        <div class="text-mute text-sm leading-relaxed">${h.text}</div>
      </div>
    `).join("");
  }
};
