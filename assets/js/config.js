// ================================================
// KTM Mall — Frontend Configuration
// ================================================
// All environment-specific values are centralised here.
// In a server-rendered setup these would be injected from .env at build time.
// For local dev, edit N8N_BASE to match your running n8n instance.
// ================================================

window.KTM = window.KTM || {};

KTM.CONFIG = {
  // n8n webhook base URL — update for production deployment
  N8N_BASE:     "https://n8n-mard.srv1527661.hstgr.cloud",
  BOOKING_PATH: "/webhook/ktm-mall-booking",
  CHAT_PATH:    "/webhook/ktm-mall-chat",

  // Base path for space images
  IMG_BASE: "assets/img/spaces/",
};
