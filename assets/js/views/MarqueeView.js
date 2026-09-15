// View — renders the infinite-scroll gallery marquee
window.KTM = window.KTM || {};

KTM.MarqueeView = {
  render() {
    const marquee = document.querySelector("#marquee");
    if (!marquee) return;
    // Duplicate for seamless CSS loop
    const items = [...KTM.DataModel.mall.gallery, ...KTM.DataModel.mall.gallery];
    marquee.innerHTML = items.map(name => `
      <div class="flex-shrink-0 w-[260px] h-[170px] rounded-2xl overflow-hidden glass">
        <img src="${KTM.CONFIG.IMG_BASE}${name}.jpg" alt="" class="w-full h-full object-cover" loading="lazy" />
      </div>
    `).join("");
  }
};
