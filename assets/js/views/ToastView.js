// View — brief notification toast
window.KTM = window.KTM || {};

KTM.ToastView = {
  _timer: null,

  show(msg) {
    const toast = document.querySelector("#toast");
    const text  = document.querySelector("#toast-text");
    if (!toast || !text) return;
    text.textContent = msg;
    toast.classList.remove("hidden");
    clearTimeout(this._timer);
    this._timer = setTimeout(() => toast.classList.add("hidden"), 4500);
  }
};
