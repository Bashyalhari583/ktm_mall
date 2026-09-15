// Controller — mobile navigation drawer open / close
window.KTM = window.KTM || {};

KTM.NavController = {
  init() {
    const toggle   = document.getElementById("nav-toggle");
    const menu     = document.getElementById("mobile-menu");
    const backdrop = document.getElementById("mobile-menu-backdrop");
    if (!toggle || !menu || !backdrop) return;

    const openMenu = () => {
      menu.classList.add("open");
      toggle.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    toggle.addEventListener("click",   () => menu.classList.contains("open") ? closeMenu() : openMenu());
    backdrop.addEventListener("click", closeMenu);
    menu.querySelector("nav").addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  }
};
