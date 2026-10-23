(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function fillShell() {
    const brand = $("au-brand");
    if (brand) brand.innerHTML = `
      <svg viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,130 50,100 90,115 140,60 190,80 240,35 290,55 340,15 400,25" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>
      <a class="au__logo" href="index.html"><i>V</i><span>Voyager <b>Academy</b></span></a>
      <div class="au__pitch">
        <h2>Learn to read the market before you risk a cent.</h2>
        <ul>
          <li>Free lessons from your first trade to advanced concepts</li>
          <li>Quizzes, streaks and certificates you can verify</li>
          <li>Live charts, calculators and an economic calendar</li>
          <li>A community and live chat to learn alongside</li>
        </ul>
      </div>
      <p class="au__fine">Educational content only — not financial advice.</p>`;
    const top = $("au-top");
    if (top) top.innerHTML = `<a class="au__logo" href="index.html"><i>V</i><span>Voyager <b>Academy</b></span></a><a href="index.html">← Back to site</a>`;
  }

  function wirePasswordToggles() {
    document.querySelectorAll(".au__pw").forEach((wrap) => {
      const input = wrap.querySelector("input"), btn = wrap.querySelector(".au__eye");
      if (!input || !btn) return;
      btn.addEventListener("click", () => {
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.textContent = show ? "Hide" : "Show";
        btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
        btn.setAttribute("aria-pressed", String(show));
      });
    });
  }

  // 0 = too short ... 4 = strong. Length matters most; variety only helps longer passwords.
  function strength(pw) {
    if (pw.length < 8) return 0;
    let s = pw.length >= 14 ? 3 : pw.length >= 11 ? 2 : 1;
    const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(pw)).length;
    if (classes >= 3 && pw.length >= 11) s++;
    return Math.min(s, 4);
  }

  function meter(input, meterEl, labelEl) {
    const labels = ["Too short — use at least 8 characters", "Weak — longer is stronger", "Okay", "Good", "Strong"];
    const update = () => {
      const v = input.value;
      const s = strength(v);
      meterEl.dataset.s = v ? String(s) : "0";
      labelEl.textContent = v ? labels[s] : "At least 8 characters";
    };
    input.addEventListener("input", update);
    update();
  }

  function busy(btn, on, text) {
    if (on) {
      btn.dataset.label = btn.textContent;
      btn.textContent = text || "Please wait…";
      btn.classList.add("is-busy");
      btn.disabled = true;
    } else {
      btn.textContent = btn.dataset.label || btn.textContent;
      btn.classList.remove("is-busy");
      btn.disabled = false;
    }
  }

  function showAlert(el, msg, ok) {
    el.textContent = msg || "";
    el.hidden = !msg;
    el.classList.toggle("au__ok", !!ok);
  }

  function setHint(inputId, hintId, msg) {
    const input = inputId ? $(inputId) : null, hint = $(hintId);
    if (!hint) return;
    if (hint.dataset.default === undefined) hint.dataset.default = hint.textContent;
    hint.textContent = msg || hint.dataset.default;
    hint.classList.toggle("err", !!msg);
    if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function slowHint(statusEl) {
    const t = setTimeout(() => { statusEl.textContent = "Waking up the server — the first request can take up to a minute…"; }, 3000);
    return () => { clearTimeout(t); statusEl.textContent = ""; };
  }

  async function apiPost(path, body) {
    const res = await vaFetchWithWakeupHint(`${API_BASE}${path}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    let data = null;
    try { data = await res.json(); } catch (e) {}
    if (!res.ok) {
      let msg = data && (typeof data.detail === "string" ? data.detail : data.error || "");
      if (res.status === 429) msg = "Too many attempts — please wait a while and try again.";
      if (!msg) msg = res.status === 422 ? "Please check what you entered and try again." : "Something went wrong. Please try again.";
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data;
  }

  window.AU = { $, esc, fillShell, wirePasswordToggles, strength, meter, busy, showAlert, setHint, slowHint, apiPost };
})();