// Controller — chatbot message handling and n8n / local-fallback logic
window.KTM = window.KTM || {};

KTM.ChatController = {
  _history: [], // [{role: 'user'|'assistant', content: ''}]

  init() {
    document.querySelector("#chat-toggle")?.addEventListener("click", () => KTM.ChatView.toggle());
    document.querySelector("#chat-close")?.addEventListener("click",  () => KTM.ChatView.close());

    // Quick-suggestion chips
    document.querySelectorAll("#chat-suggestions .chip").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelector("#chat-input").value = btn.textContent;
        document.querySelector("#chat-form").requestSubmit();
      });
    });
    
    document.querySelector("#chat-form")?.addEventListener("submit", e => this._handleSend(e));
  },
  
  _localFallback(q) {
    const lo = q.toLowerCase();
    if (/cheap|low|afford|budget|price|cost|rate|rs|rupee/.test(lo)) {
      return "We share pricing on request — rates depend on the space, duration and design. Message our sales team on WhatsApp at 9860499000 and we'll send you the rate for any space, or tap a card on the page to get a callback within 1 hour.";
    }
    if (/lift/.test(lo)) {
      const lifts = KTM.DataModel.spaces.filter(s => s.category === "Lift").map(s => `• ${s.name}`).join("\n");
      return "Lift branding options:\n" + lifts + "\n\nMessage us on WhatsApp 9860499000 for pricing, or tap the space on the page.";
    }
    if (/footfall|traffic|people|visit/.test(lo)) {
      return "12,000+ shoppers daily — and Kathmandu Mall is the gateway for visitors from all 77 districts of Nepal.";
    }
    if (/contact|phone|whatsapp|reach/.test(lo)) {
      return "WhatsApp our sales team at 9860499000 — or click any space on the page and we'll call you within 1 hour.";
    }
    if (/tour|visit/.test(lo)) {
      return "Sure — share your phone (or WhatsApp 9860499000) and we'll arrange a site tour. You can also click any space card to send your contact in seconds.";
    }
    return `We have ${KTM.DataModel.spaces.length} branding spaces across façade, main gate, lift, floors, pillars & parking. Tell us your preferred location and we'll share the options — pricing is shared on WhatsApp (9860499000) or via a quick callback.`;
  },
  
  async _handleSend(e) {
    const base = KTM.CONFIG.N8N_BASE; 
    e.preventDefault();
    const q = KTM.ChatView.getInput();
    if (!q) return;

    KTM.ChatView.clearInput();
    KTM.ChatView.pushMessage("user", q);
    this._history.push({ role: "user", content: q });

    const typing = KTM.ChatView.pushMessage("bot", "…");
    let reply = "";

    try {
        // 1. Define 'base' FIRST
        
        // 2. Now you can safely use 'base'
        if (base && !base.includes("{{")) {
            const r = await fetch(base + KTM.CONFIG.CHAT_PATH, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: q,
                    history: this._history.slice(-10),
                    spaces: KTM.DataModel.spaces
                })
            });

            const text = await r.text();
            if (!text) throw new Error("Empty response");

            const j = JSON.parse(text);
            reply = j.reply || j.text || this._localFallback(q);
        } else {
            reply = this._localFallback(q);
        }
    } catch (err) {
        console.error("[chat] error", err);
        reply = this._localFallback(q);
    }

    if (typing) typing.textContent = reply;
    this._history.push({ role: "assistant", content: reply });

    // Auto-capture phone numbers shared in chat as booking leads
    const phoneMatch = q.match(/9[678]\d{8}/);
    if (phoneMatch && base && !base.includes("{{")) {
      fetch(base + KTM.CONFIG.BOOKING_PATH, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          space_id:     "CHATBOT",
          space_name:   "Chatbot lead",
          name:         "Chat user",
          phone:        phoneMatch[0],
          company:      "",
          source:       "ktm-mall-chatbot",
          submitted_at: new Date().toISOString()
        })
      }).catch(() => {});
      KTM.ChatView.pushMessage("bot", "Got it — sales will WhatsApp you shortly. ✓");
    }
  }
};
