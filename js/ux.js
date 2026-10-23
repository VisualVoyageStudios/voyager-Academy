(function () {
  if (window.__vaUx) return;
  window.__vaUx = true;

  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const student = typeof vaGetStudent === "function" ? vaGetStudent() : null;
  const here = location.pathname.split("/").pop() || "index.html";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const typing = (el) => !!(el && el.matches && el.matches("input, textarea, select, [contenteditable='true']"));

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src; s.onload = resolve; s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  async function toast(msg, type) {
    if (typeof vaToast !== "function") { try { await loadScript("js/toast.js"); } catch (e) { return; } }
    if (typeof vaToast === "function") vaToast(msg, type);
  }

  function skipLink() {
    const main = $(".va-lesson") || $(".va-hero-new") || $("main");
    if (main) { main.id = main.id || "main-content"; main.setAttribute("tabindex", "-1"); }
    document.body.insertAdjacentHTML("afterbegin", `<a class="va-skip" href="#${main ? main.id : "main-content"}">Skip to content</a>`);
  }

  function backToTop() {
    document.body.insertAdjacentHTML("beforeend", `<button class="va-top" id="va-top" aria-label="Back to top" hidden>↑</button>`);
    const btn = $("#va-top");
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { btn.hidden = window.scrollY < 700; ticking = false; });
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  }

  function tabBar() {
    const tabs = student
      ? [["fa-house", "Home", "dashboard.html"], ["fa-book-open", "Learn", "courses.html"], ["fa-comments", "Chat", "chat.html"], ["fa-users", "Community", "community.html"]]
      : [["fa-house", "Home", "index.html"], ["fa-book-open", "Learn", "courses.html"], ["fa-users", "Community", "community.html"], ["fa-right-to-bracket", "Log in", "auth.html"]];
    const html = tabs.map(([i, l, h]) => `<a href="${h}" class="${h === here ? "active" : ""}"><span><i class="fa-solid ${i}" aria-hidden="true"></i></span><span>${l}</span></a>`).join("") +
      `<button type="button" id="va-tab-search"><span><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></span><span>Search</span></button>`;
    document.body.insertAdjacentHTML("beforeend", `<nav class="va-tabbar" aria-label="Quick navigation">${html}</nav>`);
    document.addEventListener("focusin", (e) => { if (typing(e.target)) document.body.classList.add("va-kb"); });
    document.addEventListener("focusout", () => document.body.classList.remove("va-kb"));
  }

  function commandPalette() {
    const PAGES = [
      ["Dashboard", "dashboard.html", "Your progress and streak", true],
      ["Courses", "courses.html", "All lessons"],
      ["Review Mode", "review.html", "Practice with random questions", true],
      ["Live Chat", "chat.html", "Talk to other students", true],
      ["Community", "community.html", "Forum"],
      ["Trading Calculators", "tools.html", "Position size, risk reward, drawdown"],
      ["Economic Calendar", "calendar.html", "Live data releases"],
      ["Glossary", "glossary.html", "Trading terms"],
      ["Certificates", "certificates.html", "Your certificates"],
      ["Settings", "settings.html", "Account and appearance", true],
      ["Verify a Certificate", "verify.html", "Check a certificate ID"],
      ["Saved Lessons", "saved.html", "Lessons you've bookmarked"],
    ].filter((p) => !p[3] || student);

    let items = [], sel = 0, lastFocus = null;
    const pal = document.createElement("div");
    pal.className = "va-palette";
    pal.innerHTML = `<div class="va-palette__box" role="dialog" aria-modal="true" aria-label="Search">
      <input class="va-palette__input" id="va-pal-input" type="text" placeholder="Search lessons and pages…" autocomplete="off" aria-label="Search">
      <ul class="va-palette__list" id="va-pal-list"></ul>
      <div class="va-palette__hint">↑ ↓ to move · Enter to open · Esc to close</div></div>`;
    document.body.appendChild(pal);
    const input = $("#va-pal-input", pal), list = $("#va-pal-list", pal);

    const labelOf = (t) => {
      const hit = typeof VA_TRACKS !== "undefined" ? VA_TRACKS.find((x) => x[0] === t) : null;
      return hit ? hit[1] : t;
    };

    function search(q) {
      q = q.trim().toLowerCase();
      const lessons = typeof COURSE_DATA !== "undefined" ? COURSE_DATA : [];
      const L = lessons.map((c) => ({
        title: c.title, href: `lesson.html?slug=${c.slug}`, meta: labelOf(c.track).replace(/ \(.*\)/, ""),
        hay: `${c.title} ${c.summary} ${labelOf(c.track)}`.toLowerCase(), t: c.title.toLowerCase(),
      }));
      const P = PAGES.map((p) => ({ title: p[0], href: p[1], meta: "Page", hay: `${p[0]} ${p[2]}`.toLowerCase(), t: p[0].toLowerCase() }));
      if (!q) return P.slice(0, 8);
      const words = q.split(/\s+/);
      return [...P, ...L]
        .map((it) => ({ it, s: words.every((w) => it.hay.includes(w)) ? (it.t.includes(q) ? 3 : 1) + (it.t.startsWith(q) ? 2 : 0) : 0 }))
        .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 8).map((x) => x.it);
    }

    function renderList() {
      items = search(input.value);
      sel = 0;
      list.innerHTML = items.length
        ? items.map((it, i) => `<li class="va-palette__item ${i === 0 ? "sel" : ""}"><a href="${it.href}"><span>${esc(it.title)}</span><span class="va-palette__meta">${esc(it.meta)}</span></a></li>`).join("")
        : `<li style="padding:14px 12px;color:var(--color-text-muted,#6b6b72);font-size:0.9rem;">No matches. Try another word.</li>`;
    }

    function move(d) {
      if (!items.length) return;
      list.children[sel].classList.remove("sel");
      sel = (sel + d + items.length) % items.length;
      const el = list.children[sel];
      el.classList.add("sel");
      el.scrollIntoView({ block: "nearest" });
    }

    async function openPal() {
      lastFocus = document.activeElement;
      pal.classList.add("open");
      input.value = "";
      renderList();
      input.focus();
      if (typeof COURSE_DATA === "undefined") {
        try { await loadScript("js/courses-data.js"); } catch (e) {}
        renderList();
      }
    }
    function closePal() {
      pal.classList.remove("open");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    input.addEventListener("input", renderList);
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter" && items[sel]) location.href = items[sel].href;
    });
    pal.addEventListener("click", (e) => { if (e.target === pal) closePal(); });

    document.addEventListener("keydown", (e) => {
      const open = pal.classList.contains("open");
      if ((e.ctrlKey || e.metaKey) && e.key && e.key.toLowerCase() === "k") { e.preventDefault(); open ? closePal() : openPal(); }
      else if (e.key === "/" && !typing(e.target) && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); openPal(); }
      else if (e.key === "Escape" && open) closePal();
    });
    document.addEventListener("click", (e) => { if (e.target.closest("#va-search-btn, #va-tab-search")) openPal(); });

    const links = $(".va-nav__links");
    if (links) {
      links.insertAdjacentHTML("afterbegin",
        `<li><button id="va-search-btn" aria-label="Search (press /)" style="background:none;border:none;cursor:pointer;"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button></li>`);
    }
  }

  function offlineNotices() {
    window.addEventListener("offline", () => toast("You're offline — some features won't work until you reconnect.", "error"));
    window.addEventListener("online", () => toast("Back online.", "success"));
  }

  [skipLink, backToTop, tabBar, commandPalette, offlineNotices].forEach((fn) => {
    try { fn(); } catch (e) { console.warn("[ux]", fn.name, e); }
  });
})();