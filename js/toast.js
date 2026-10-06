function vaToast(message, type = "info") {
  let container = document.getElementById("va-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "va-toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `va-toast va-toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}