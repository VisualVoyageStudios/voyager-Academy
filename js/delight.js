(function () {
  if (window.__vaDelight) return;
  window.__vaDelight = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const typing = (el) => !!(el && el.matches && el.matches("input, textarea, select, [contenteditable='true']"));

  // ---------- Confetti: call vaCelebrate() ----------
  window.vaCelebrate = function () {
    if (reduce || document.documentElement.getAttribute("data-motion") === "reduced") return;
    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:4000;";
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--va-red").trim() || "#c8102e";
    const colors = [accent, "#ffffff", "#f5c542", "#111114", "#4ade80"];
    const pieces = Array.from({ length: 140 }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight * 0.4,
      vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4,
      w: 6 + Math.random() * 6, h: 4 + Math.random() * 5,
      r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
      c: colors[(Math.random() * colors.length) | 0],
    }));
    const start = performance.now();
    (function frame(t) {
      const age = t - start;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      pieces.forEach((p) => {
        p.vy += 0.38; p.vx *= 0.995; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.globalAlpha = Math.max(0, 1 - age / 2600);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (age < 2600) requestAnimationFrame(frame); else canvas.remove();
    })(start);
  };

  // ---------- Keyboard shortcuts help: press ? ----------
  const rows = [
    ["/ or Ctrl/⌘ K", "Search lessons and pages"],
    ["← →", "Previous / next lesson (on a lesson page)"],
    ["?", "Show this help"],
    ["Esc", "Close any dialog"],
  ];
  const kbd = "font-family:var(--font-mono);font-size:0.8rem;border:1px solid var(--color-border,#e6e6e9);border-radius:5px;padding:1px 6px;";
  const modal = document.createElement("div");
  modal.className = "va-palette";
  modal.innerHTML = `<div class="va-palette__box" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts" style="max-width:440px;padding:20px;">
    <h2 style="font-family:var(--font-heading);margin:0 0 12px;font-size:1.15rem;">Keyboard shortcuts</h2>
    <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">${
      rows.map(([k, d]) => `<tr><td style="padding:6px 12px 6px 0;white-space:nowrap;"><kbd style="${kbd}">${k}</kbd></td><td style="padding:6px 0;color:var(--color-text-muted,#6b6b72);">${d}</td></tr>`).join("")
    }</table>
    <button type="button" class="va-btn" id="va-sc-close" style="margin-top:16px;">Got it</button></div>`;
  document.body.appendChild(modal);
  const close = () => modal.classList.remove("open");
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.id === "va-sc-close") close(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "?" && !typing(e.target) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      modal.classList.add("open");
      modal.querySelector("#va-sc-close").focus();
    } else if (e.key === "Escape") close();
  });
})();