// View — chatbot panel DOM helpers
window.KTM = window.KTM || {};

KTM.ChatView = {

  pushMessage(role, text) {
    const msgs = document.querySelector("#chat-messages");
    if (!msgs) return null;
    const div = document.createElement("div");
    div.className = (role === "bot" ? "chat-msg-bot" : "chat-msg-user") +
                    " rounded-2xl px-4 py-2.5 max-w-[85%] whitespace-pre-wrap";
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  },

  getInput() {
    return (document.querySelector("#chat-input")?.value || "").trim();
  },

  clearInput() {
    const input = document.querySelector("#chat-input");
    if (input) input.value = "";
  },

  toggle() {
    document.querySelector("#chat-panel")?.classList.toggle("open");
  },

  close() {
    document.querySelector("#chat-panel")?.classList.remove("open");
  }
};
