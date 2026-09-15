// ================================================
// App entry point — boots all views and controllers
// ================================================

window.KTM = window.KTM || {};

document.addEventListener("DOMContentLoaded", () => {

  // Render static sections
  KTM.WhyView.render();
  KTM.MarqueeView.render();

  // Boot controllers (each binds its own event listeners and triggers initial render)
  KTM.SpacesController.init();
  KTM.BookingController.init();
  KTM.ChatController.init();
  KTM.NavController.init();

  // GSAP entrance & scroll animations
  gsap.registerPlugin(ScrollTrigger);

  gsap.from("#hero-text > *", {
    y: 30, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.15
  });
  gsap.from("#hero-visual", {
    y: 60, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.3
  });

  ScrollTrigger.batch(".reveal", {
    start:   "top 85%",
    onEnter: els => gsap.to(els, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" })
  });
});
