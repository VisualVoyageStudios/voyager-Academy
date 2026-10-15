if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) =>
      console.warn("Service worker registration failed:", err)
    );
  });
}

// Edit tracks / footer links here
const VA_TRACKS = [
  ["beginner", "Liftoff (Beginner)"],
  ["intermediate", "Ascent (Intermediate)"],
  ["advanced", "Summit (Advanced)"],
  ["macro", "Mission Control (Macro)"],
  ["tradingview", "The Bridge (TradingView)"],
  ["funded", "Proving Ground (Funded Prep)"],
];

const VA_ACCENTS = {
  red: ["#c8102e", "#8c0c20", "#ff2d4d"],
  blue: ["#2563eb", "#1d4ed8", "#3b82f6"],
  green: ["#059669", "#047857", "#10b981"],
  purple: ["#7c3aed", "#6d28d9", "#8b5cf6"],
  orange: ["#ea580c", "#c2410c", "#fb923c"],
};
const VA_FONTS = {
  inter: "",
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
};
const VA_TEXT = { sm: "14px", md: "", lg: "18px", xl: "20px" };
const VA_WIDTH = { narrow: "680px", normal: "", wide: "980px" };


function vaGetPrefs() {
  try { return JSON.parse(localStorage.getItem("va_prefs") || "{}"); } catch (e) { return {}; }
}

function vaApplyPreferences() {
  const p = vaGetPrefs();
  const root = document.documentElement;
  const setOrClear = (name, value) => (value ? root.style.setProperty(name, value) : root.style.removeProperty(name));

  const accent = VA_ACCENTS[p.accent];
  ["--va-red", "--va-red-dark", "--va-red-glow"].forEach((n, i) => setOrClear(n, accent ? accent[i] : ""));
  root.style.fontSize = VA_TEXT[p.text] || "";
  setOrClear("--font-base", VA_FONTS[p.font]);
  setOrClear("--va-lesson-max", VA_WIDTH[p.width]);

  const dens = { "--sp-3": "12px", "--sp-4": "18px", "--sp-5": "28px", "--sp-6": "44px" };
  Object.entries(dens).forEach(([k, v]) => setOrClear(k, p.density === "compact" ? v : ""));

  if (p.reduceMotion) root.setAttribute("data-motion", "reduced");
  else root.removeAttribute("data-motion");
}
vaApplyPreferences();


function vaBuildFooter(student) {
  const learn = VA_TRACKS.map(([k, label]) => `<li><a href="courses.html?track=${k}">${label}</a></li>`).join("");
  const account = student
    ? `<li><a href="dashboard.html">Dashboard</a></li><li><a href="settings.html">Settings</a></li>`
    : `<li><a href="auth.html">Log In</a></li>`;
  return `
  <footer class="va-footer-mega">
    <div class="va-footer-mega__glow" aria-hidden="true">
      <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <polyline points="0,160 40,120 70,140 110,60 150,90 190,30 230,70 300,20" fill="none" stroke="#c8102e" stroke-width="3" opacity="0.25"/>
      </svg>
    </div>
    <div class="va-footer-mega__grid">
      <div class="va-footer-mega__brand">
        <div class="va-nav__logo" style="color:#fff;">Voyager <span>Academy</span></div>
        <p>Free trading education, beginner to advanced. Part of the Voyager Analytics family.</p>
      </div>
      <div><h4>Learn</h4><ul>${learn}<li><a href="certificates.html">Certificates</a></li></ul></div>
      <div><h4>Explore</h4><ul>
        <li><a href="community.html">Community</a></li>
        <li><a href="chat.html">Live Chat</a></li>
        <li><a href="tools.html">Trading Calculators</a></li>
        <li><a href="calendar.html">Economic Calendar</a></li>
        <li><a href="glossary.html">Glossary</a></li>
        <li><a href="verify.html">Verify a Certificate</a></li>
      </ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="about.html">About</a></li>
        <li><a href="https://visualvoyagestudios.github.io/vAnalytics">Voyager Analytics</a></li>
        ${account}
      </ul></div>
      <div><h4>Legal</h4><ul>
        <li><a href="terms.html">Terms of Use</a></li>
        <li><a href="privacy.html">Privacy Policy</a></li>
        <li><a href="risk-disclaimer.html">Risk Disclaimer</a></li>
      </ul></div>
    </div>
    <div class="va-footer-mega__bottom">
      <span>&copy; 2026 Voyager Academy.</span>
      <span>Forex trading involves significant risk of loss and is not suitable for all investors. Educational content only — not financial advice.</span>
    </div>
  </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const student = typeof vaGetStudent === "function" ? vaGetStudent() : null;
  const esc = (s) => (typeof vaEscapeHtml === "function" ? vaEscapeHtml(s) : s);
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

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    links.insertAdjacentHTML(
      "afterbegin",
      `<li><button class="va-theme-toggle" id="theme-toggle-btn" aria-label="Toggle dark mode" style="background:none;border:none;cursor:pointer;font-size:1.1rem;">${isDark ? "☀️" : "🌙"}</button></li>`
    );
    document.getElementById("theme-toggle-btn").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("va_theme", next);
      document.getElementById("theme-toggle-btn").textContent = next === "dark" ? "☀️" : "🌙";
    });
  }

  const slot = document.getElementById("nav-auth-slot");
  if (slot && links) {
    const here = location.pathname.split("/").pop() || "index.html";
    const items = [["tools.html", "Tools"]];
    if (student) {
      items.push(["chat.html", "Chat"], ["dashboard.html", "Dashboard"], ["settings.html", "Settings"]);
      if (student.is_admin) items.push(["stats.html", "Stats"], ["reports.html", "Reports"]);
    }
    items.forEach(([href, label]) => {
      if (!links.querySelector(`a[href="${href}"]`)) {
        slot.insertAdjacentHTML("beforebegin", `<li><a href="${href}" ${href === here ? 'class="active"' : ""}>${label}</a></li>`);
      }
    });
    if (student) {
      slot.innerHTML = `<a href="#" id="nav-logout">Log Out (${esc(student.name.split(" ")[0])})</a>`;
      document.getElementById("nav-logout").addEventListener("click", (e) => {
        e.preventDefault();
        vaLogout();
      });
    }
  }

  // One shared footer for every page (replaces any per-page copy)
  document.querySelectorAll("footer.va-footer-mega, footer.va-footer").forEach((f) => f.remove());
  document.body.insertAdjacentHTML("beforeend", vaBuildFooter(student));
});