(function () {
  function init() {
    const prefs = typeof vaGetPrefs === "function" ? vaGetPrefs() : {};
    const body = document.getElementById("lesson-body");
    const slug = new URLSearchParams(location.search).get("slug");
    const tag = document.getElementById("lesson-tag");
    if (!body || !slug || !body.children.length || (tag && tag.textContent === "Coming Soon")) return;
    const toast = (m, t) => (typeof vaToast === "function" ? vaToast(m, t) : alert(m));
    const pos = document.getElementById("lesson-position");
    const lessonEl = document.querySelector(".va-lesson");

    // Extra diagrams, placed by heading (see js/lesson-figures.js)
    const figs = typeof LESSON_FIGURES !== "undefined" ? LESSON_FIGURES[slug] : null;
    if (figs && typeof DIAGRAMS !== "undefined") {
      const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
      figs.forEach((f) => {
        const html = DIAGRAMS[f.id];
        if (!html) return;
        let anchor = null;
        if (f.after === "@intro") anchor = body.querySelector("p");
        else {
          const h = Array.from(body.querySelectorAll("h2")).find((x) => norm(x.textContent).startsWith(norm(f.after)));
          if (h) {
            anchor = h;
            for (let n = f.n || 1; n > 0; n--) {
              const nx = anchor.nextElementSibling;
              if (!nx || /^H[1-6]$/.test(nx.tagName)) break;
              anchor = nx;
            }
          }
        }
        if (anchor) anchor.insertAdjacentHTML("afterend", html);
      });
    }

    // Key takeaways / common mistake / apply it
    const ex = typeof LESSON_EXTRAS !== "undefined" ? LESSON_EXTRAS[slug] : null;
    if (ex && prefs.showExtras !== false) {
      const box = document.createElement("section");
      box.className = "va-extras";
      box.innerHTML =
        (ex.takeaways ? `<div class="va-extras__card"><h2>Key takeaways</h2><ul>${ex.takeaways.map((t) => `<li>${t}</li>`).join("")}</ul></div>` : "") +
        (ex.mistake ? `<div class="va-extras__card va-extras__card--warn"><h3>Common mistake</h3><p>${ex.mistake}</p></div>` : "") +
        (ex.apply ? `<div class="va-extras__card va-extras__card--do"><h3>Apply it</h3><p>${ex.apply[0]}</p>${ex.apply[1] ? `<a class="va-btn" href="${ex.apply[1]}">${ex.apply[2] || "Go"}</a>` : ""}</div>` : "");
      body.insertAdjacentElement("afterend", box);
    }

    // Guided live-chart exercise at the end of a section (see js/lesson-charts.js)
    const lab = typeof LESSON_CHARTS !== "undefined" ? LESSON_CHARTS[slug] : null;
    if (lab) {
      const nm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
      const hd = Array.from(body.querySelectorAll("h2")).find((x) => nm(x.textContent).startsWith(nm(lab.after)));
      if (hd) {
        let end = hd;
        while (end.nextElementSibling && end.nextElementSibling.tagName !== "H2") end = end.nextElementSibling;
        const height = window.innerWidth < 600 ? 380 : 460;
        const card = document.createElement("section");
        card.className = "va-chartlab";
        card.setAttribute("aria-label", "Live chart exercise");
        card.innerHTML = `
          <div class="va-chartlab__head"><span class="va-chartlab__tag">Try it live</span><h3>${vaEscapeHtml(lab.title)}</h3></div>
          <ol class="va-chartlab__steps">${lab.steps.map((t) => `<li>${vaEscapeHtml(t)}</li>`).join("")}</ol>
          <div class="va-chartlab__frame" style="min-height:${height}px"><span class="va-chartlab__wait">Chart loads as you scroll here…</span></div>
          <p class="va-chartlab__check"><strong>Check yourself:</strong> ${vaEscapeHtml(lab.check)}</p>
          ${lab.link ? `<a class="va-btn" href="${lab.link[0]}">${vaEscapeHtml(lab.link[1])}</a>` : ""}
          <p class="va-chartlab__fine">A practice exercise on live market data, not a trade signal. Drawings on the embedded chart aren't saved, so jot down your answers before you leave.</p>`;
        end.insertAdjacentElement("afterend", card);

        const frame = card.querySelector(".va-chartlab__frame");
        let loaded = false, shown = "", timer = null;
        const themeNow = () => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

        const render = () => {
          shown = themeNow();
          const old = card.querySelector(".va-chartlab__fallback");
          if (old) old.remove();
          frame.innerHTML = "";
          const wrap = document.createElement("div");
          wrap.className = "tradingview-widget-container";
          wrap.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
          const s = document.createElement("script");
          s.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
          s.async = true;
          s.textContent = JSON.stringify({
            width: "100%", height,
            symbol: lab.symbol, interval: lab.interval,
            timezone: "Etc/UTC", theme: shown, style: "1", locale: "en",
            allow_symbol_change: true, hide_side_toolbar: false, withdateranges: true,
            studies: lab.studies || [],
            support_host: "https://www.tradingview.com",
          });
          wrap.appendChild(s);
          frame.appendChild(wrap);
          clearTimeout(timer);
          timer = setTimeout(() => {
            if (frame.querySelector("iframe") || card.querySelector(".va-chartlab__fallback")) return;
            const p = document.createElement("p");
            p.className = "va-chartlab__fallback";
            p.innerHTML = `The chart didn't load. <a href="https://www.tradingview.com/chart/?symbol=${encodeURIComponent(lab.symbol)}" target="_blank" rel="noopener">Open it on TradingView</a>.`;
            frame.insertAdjacentElement("afterend", p);
          }, 8000);
        };

        const load = () => { if (!loaded) { loaded = true; render(); } };
        if ("IntersectionObserver" in window) {
          const io = new IntersectionObserver((es) => {
            if (es.some((e) => e.isIntersecting)) { io.disconnect(); load(); }
          }, { rootMargin: "400px 0px" });
          io.observe(card);
        } else load();

        // Reload in the other theme if the visitor toggles dark mode
        new MutationObserver(() => { if (loaded && themeNow() !== shown) render(); })
          .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      }
    }


    const info = typeof COURSE_DATA !== "undefined" ? COURSE_DATA.find((c) => c.slug === slug) : null;
    if (info) {
      const BASE = "https://visualvoyagestudios.github.io/voyager-Academy/";
      const url = `${BASE}lesson.html?slug=${slug}`;
      const setMeta = (attr, key, value) => {
        let m = document.querySelector(`meta[${attr}="${key}"]`);
        if (!m) { m = document.createElement("meta"); m.setAttribute(attr, key); document.head.appendChild(m); }
        m.content = value;
      };
      setMeta("name", "description", info.summary);
      setMeta("property", "og:title", document.title);
      setMeta("property", "og:description", info.summary);
      setMeta("property", "og:url", url);
      let canon = document.querySelector('link[rel="canonical"]');
      if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
      canon.href = url;
      const level = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" }[info.track];
      const ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org", "@type": "LearningResource",
        name: info.title, description: info.summary, url, inLanguage: "en", isAccessibleForFree: true,
        ...(level ? { educationalLevel: level } : {}),
        provider: { "@type": "Organization", name: "Voyager Academy", url: BASE },
      });
      document.head.appendChild(ld);
    }

    // Remember where you were (powers "Resume" in the sidebar)
    try {
      localStorage.setItem("va_last", JSON.stringify({ slug, title: (document.getElementById("lesson-title") || {}).textContent || "" }));
    } catch (e) {}

    // Reading progress bar
    document.body.insertAdjacentHTML("beforeend", '<div class="va-readbar" id="va-readbar" aria-hidden="true"></div>');
    const bar = document.getElementById("va-readbar");
    if (prefs.showReadbar === false) bar.style.display = "none";
    let tick = false;
    const update = () => {
      const top = body.getBoundingClientRect().top + window.scrollY;
      const span = body.offsetHeight - window.innerHeight * 0.6;
      const pct = span > 0 ? Math.min(1, Math.max(0, (window.scrollY - top + window.innerHeight * 0.3) / span)) : 0;
      bar.style.width = (pct * 100).toFixed(1) + "%";
      tick = false;
    };
    window.addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();

    // Read time
    const words = (body.textContent || "").trim().split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    if (pos) pos.textContent = (pos.textContent ? pos.textContent + " · " : "") + `${mins} min read`;

    // Share + print
    const tools = document.createElement("div");
    tools.className = "va-lesson-tools";
    tools.innerHTML = '<button type="button" id="va-save"></button><button type="button" id="va-share"><i class="fa-solid fa-share-nodes" aria-hidden="true"></i> Share</button><button type="button" id="va-print"><i class="fa-solid fa-print" aria-hidden="true"></i> Print / save as PDF</button>';
    (pos || tag).insertAdjacentElement("afterend", tools);
    document.getElementById("va-print").addEventListener("click", () => window.print());
    
    const getSaved = () => { try { return JSON.parse(localStorage.getItem("va_saved") || "[]"); } catch (e) { return []; } };
    const saveBtn = document.getElementById("va-save");
    const paintSave = () => {
      const on = getSaved().includes(slug);
      saveBtn.innerHTML = `<i class="${on ? "fa-solid" : "fa-regular"} fa-bookmark" aria-hidden="true"></i> ${on ? "Saved" : "Save"}`;
      saveBtn.setAttribute("aria-pressed", String(on));
    };
    saveBtn.addEventListener("click", () => {
      const cur = getSaved();
      const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [slug, ...cur];
      localStorage.setItem("va_saved", JSON.stringify(next));
      paintSave();
      toast(next.includes(slug) ? "Lesson saved." : "Removed from saved.", "success");
    });
    paintSave();
    
    document.getElementById("va-share").addEventListener("click", async () => {
      const data = { title: document.title, text: "Check out this free trading lesson", url: location.href };
      if (navigator.share) { try { await navigator.share(data); } catch (e) {} return; }
      try { await navigator.clipboard.writeText(location.href); toast("Link copied.", "success"); }
      catch (e) { toast("Couldn't copy the link.", "error"); }
    });

    // Section ids
    const heads = Array.from(body.querySelectorAll("h2"));
    heads.forEach((h, i) => { h.id = h.id || `sec-${i + 1}`; });

    // Collapsible contents (shown on narrower screens)
    if (heads.length >= 3) {
      const toc = document.createElement("details");
      toc.className = "va-toc";
      toc.innerHTML = `<summary>In this lesson · ${heads.length} sections</summary><ol>${
        heads.map((h) => `<li><a href="#${h.id}">${vaEscapeHtml(h.textContent)}</a></li>`).join("")
      }</ol>`;
      body.insertAdjacentElement("beforebegin", toc);
    }

    // Sticky right rail with scroll-spy (shown on wide screens)
    if (lessonEl && heads.length >= 2) {
      const rail = document.createElement("aside");
      rail.className = "va-rail";
      rail.setAttribute("aria-label", "In this lesson");
      rail.innerHTML = `<div class="va-rail__title">In this lesson</div>
        <ol class="va-rail__toc">${heads.map((h) => `<li><a href="#${h.id}" data-sec="${h.id}">${vaEscapeHtml(h.textContent)}</a></li>`).join("")}</ol>`;
      lessonEl.appendChild(rail);
      const links = rail.querySelectorAll("a[data-sec]");
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.dataset.sec === en.target.id));
          });
        }, { rootMargin: "-20% 0px -70% 0px" });
        heads.forEach((h) => io.observe(h));
      }
    }

    // Private notes (this device only)
    const key = "va_note_" + slug;
    const saved = localStorage.getItem(key) || "";
    const notes = document.createElement("details");
    notes.className = "va-notes";
    notes.open = !!saved;
      notes.innerHTML = `<summary>${saved ? '<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> ' : ""}My notes</summary>
      <textarea id="va-note-text" placeholder="Jot down what stood out, questions, or setups to look for…"></textarea>
      <small id="va-note-status">Private — saved on this device only.</small>`;
    const pager = document.getElementById("lesson-pager");
    if (pager) pager.insertAdjacentElement("beforebegin", notes);
    const ta = notes.querySelector("#va-note-text");
    ta.value = saved;
    let timer = null;
    ta.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const v = ta.value.trim();
        if (v) localStorage.setItem(key, ta.value); else localStorage.removeItem(key);
        notes.querySelector("#va-note-status").textContent = "Saved on this device.";
      }, 400);
    });

    // ← → for previous / next lesson
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      const t = e.target;
      if (t && t.matches && t.matches("input, textarea, select, [contenteditable='true']")) return;
      const sel = e.key === "ArrowLeft" ? "#lesson-pager a:not(.va-lesson-pager--next)"
        : e.key === "ArrowRight" ? "#lesson-pager a.va-lesson-pager--next" : null;
      const link = sel && document.querySelector(sel);
      if (link) location.href = link.href;
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();