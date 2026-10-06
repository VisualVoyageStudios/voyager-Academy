if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) =>
      console.warn("Service worker registration failed:", err)
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".va-nav");
  const links = document.querySelector(".va-nav__links");
  if (nav && links) {
    const toggle = document.createElement("button");
    toggle.className = "va-nav__toggle";
    toggle.setAttribute("aria-label", "Menu");
    toggle.innerHTML = "<span></span><span></span><span></span>";
    nav.insertBefore(toggle, links);
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.classList.toggle("open");
    });
  }

  const slot = document.getElementById("nav-auth-slot");
  if (!slot) return;
  const student = vaGetStudent();
  if (student) {
    slot.insertAdjacentHTML("beforebegin", `<li><a href="dashboard.html">Dashboard</a></li><li><a href="settings.html">Settings</a></li>`);
    if (student.is_admin) {
      slot.insertAdjacentHTML("beforebegin", `<li><a href="stats.html">Stats</a></li>`);
    }
    slot.innerHTML = `<a href="#" id="nav-logout">Log Out (${student.name.split(" ")[0]})</a>`;
    document.getElementById("nav-logout").addEventListener("click", (e) => {
      e.preventDefault();
      vaLogout();
    });
  }
});