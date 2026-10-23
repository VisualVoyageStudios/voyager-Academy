(function () {
  if (window.__vaShell) return;
  window.__vaShell = true;

  const PUBLIC = ["index.html", "auth.html", "forgot-password.html", "reset-password.html", "about.html",
    "terms.html", "privacy.html", "risk-disclaimer.html", "404.html", "offline.html", "verify.html"];
  const here = location.pathname.split("/").pop() || "index.html";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const student = typeof vaGetStudent === "function" ? vaGetStudent() : null;

  function loadUx() {
    ["js/ux.js", "js/delight.js"].forEach((src) => {
      const s = document.createElement("script");
      s.src = src;
      document.body.appendChild(s);
    });
  }

  if (PUBLIC.includes(here) || /not found/i.test(document.title)) {
    document.documentElement.classList.add("va-public");
    loadUx();
    return;
  }

  try {
        const NAV = [
      ["Learn", [
        ["fa-house", "Dashboard", "dashboard.html", true],
        ["fa-book-open", "Courses", "courses.html"],
        ["fa-bookmark", "Saved lessons", "saved.html"],
        ["fa-arrows-rotate", "Review mode", "review.html", true],
        ["fa-award", "Certificates", "certificates.html"],
      ]],
      ["Practice", [
        ["fa-calculator", "Calculators", "tools.html"],
        ["fa-calendar-days", "Economic calendar", "calendar.html"],
        ["fa-chart-line", "Live chart", "live-chart.html"],
        ["fa-book", "Glossary", "glossary.html"],
      ]],
      ["Connect", [
        ["fa-users", "Community", "community.html"],
        ["fa-comments", "Live chat", "chat.html", true],
      ]],
    ];
    const ALIAS = { "lesson.html": "courses.html", "quiz.html": "courses.html", "community-post.html": "community.html", "certificate.html": "certificates.html" };
    const activeHref = ALIAS[here] || here;
    const curTrack = new URLSearchParams(location.search).get("track");

    const link = ([icon, label, href]) =>
      `<a class="va-side__link ${href === activeHref ? "active" : ""}" href="${href}" title="${esc(label)}"><span class="va-side__ico"><i class="fa-solid ${icon}" aria-hidden="true"></i></span><span class="va-side__txt">${esc(label)}</span></a>`;

    const sections = NAV.map(([title, items]) => {
      const visible = items.filter((i) => !i[3] || student);
      return visible.length ? `<div class="va-side__group"><div class="va-side__label">${title}</div>${visible.map(link).join("")}</div>` : "";
    }).join("");

    const tracks = typeof VA_TRACKS !== "undefined" ? VA_TRACKS : [];
    const tracksHtml = tracks.length
      ? `<details class="va-side__group va-side__tracks" ${here === "courses.html" ? "open" : ""}><summary class="va-side__label">Tracks</summary>${
          tracks.map(([k, label]) =>
            `<a class="va-side__link va-side__link--sub ${here === "courses.html" && curTrack === k ? "active" : ""}" href="courses.html?track=${k}" title="${esc(label)}"><span class="va-side__dot"></span><span class="va-side__txt">${esc(label.replace(/ \(.*\)/, ""))}</span></a>`
          ).join("")
        }</details>`
      : "";

    const admin = student && student.is_admin
      ? `<div class="va-side__group"><div class="va-side__label">Admin</div>${[["fa-chart-column", "Stats", "stats.html"], ["fa-flag", "Reports", "reports.html"]].map(link).join("")}</div>`
      : "";

    let last = null;
    try { last = JSON.parse(localStorage.getItem("va_last") || "null"); } catch (e) {}
    const resume = last && last.slug && here !== "lesson.html"
      ? `<a class="va-side__resume" href="lesson.html?slug=${encodeURIComponent(last.slug)}"><span class="va-side__resume-k">Resume</span><span class="va-side__resume-t">${esc(last.title || "Last lesson")}</span></a>`
      : "";

    const userBox = student
      ? `<a class="va-side__user" href="settings.html"><span class="va-side__avatar">${esc((student.name || "?").trim().charAt(0).toUpperCase())}</span><span class="va-side__txt"><strong>${esc(student.name)}</strong><small>${student.is_admin ? "Administrator" : "Student"} · Settings</small></span></a>`
      : `<a class="va-btn va-side__cta" href="auth.html">Log in / Sign up</a>`;

    const side = document.createElement("aside");
    side.className = "va-side";
    side.setAttribute("aria-label", "Main navigation");
    side.innerHTML = `
      <a class="va-side__brand" href="${student ? "dashboard.html" : "index.html"}"><span class="va-side__logo">V</span><span class="va-side__txt">Voyager <b>Academy</b></span></a>
      <button type="button" class="va-side__search" id="va-side-search"><span class="va-side__ico"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></span><span class="va-side__txt">Search</span><kbd class="va-side__txt">/</kbd></button>
      ${resume}
      <nav class="va-side__nav">${sections}${tracksHtml}${admin}</nav>
      <div class="va-side__foot">${userBox}
        <button type="button" class="va-side__collapse" id="va-side-collapse" aria-label="Collapse sidebar"><span class="va-side__ico"><i class="fa-solid fa-angles-left" aria-hidden="true"></i></span><span class="va-side__txt">Collapse</span></button>
      </div>`;

    // Wrap everything except scripts and fixed overlays
    const SKIP = "script, style, link, noscript, template, .va-skip, .va-readbar, .va-top, .va-tabbar, .va-palette, #va-toast-container";
    const app = document.createElement("div");
    app.className = "va-app";
    const main = document.createElement("div");
    main.className = "va-main";
    Array.from(document.body.children).forEach((el) => { if (!el.matches(SKIP)) main.appendChild(el); });
    app.appendChild(side);
    app.appendChild(main);
    document.body.insertBefore(app, document.body.firstChild);
    document.documentElement.classList.add("va-shell");

    // Top bar: page title on the left, keep only theme + account on the right
    const nav = main.querySelector(".va-nav");
    if (nav) {
      nav.insertAdjacentHTML("afterbegin", `<div class="va-topbar__title">${esc((document.title || "").split(" — ")[0])}</div>`);
      nav.querySelectorAll(".va-nav__links > li").forEach((li) => {
        if (li.id === "nav-auth-slot" || li.querySelector("#theme-toggle-btn")) li.dataset.keep = "1";
      });
    }

    const KEY = "va_side_collapsed";
    const setCollapsed = (v) => {
      document.documentElement.classList.toggle("va-side-collapsed", v);
      localStorage.setItem(KEY, v ? "1" : "0");
    };
    setCollapsed(localStorage.getItem(KEY) === "1");
    document.getElementById("va-side-collapse").addEventListener("click", () =>
      setCollapsed(!document.documentElement.classList.contains("va-side-collapsed")));
    document.getElementById("va-side-search").addEventListener("click", () =>
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })));
  } catch (e) {
    console.warn("[shell] layout failed, using the classic layout:", e);
  }

  loadUx();
})();