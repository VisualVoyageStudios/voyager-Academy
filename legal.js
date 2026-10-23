(function () {
  const S = window.VA_SITE || {};
  document.querySelectorAll("[data-site]").forEach((el) => {
    const key = el.dataset.site;
    const val = S[key] || "";
    if (key === "email") {
      if (!val || /^REPLACE/i.test(val)) {
        el.textContent = "[add your email in js/site-config.js]";
        el.classList.add("lg-todo");
      } else {
        const a = document.createElement("a");
        a.href = "mailto:" + val;
        a.textContent = val;
        el.replaceChildren(a);
      }
    } else {
      el.textContent = val;
    }
  });

  const body = document.querySelector(".lg__body");
  const toc = document.getElementById("lg-toc");
  if (body && toc) {
    const heads = Array.from(body.querySelectorAll("h2"));
    heads.forEach((h, i) => { h.id = h.id || "s" + (i + 1); });
    toc.innerHTML = `<div class="lg__toc-title">On this page</div><ol>${
      heads.map((h) => `<li><a href="#${h.id}" data-id="${h.id}">${h.textContent}</a></li>`).join("")
    }</ol>`;
    if ("IntersectionObserver" in window) {
      const links = toc.querySelectorAll("a[data-id]");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.dataset.id === en.target.id));
        });
      }, { rootMargin: "-10% 0px -80% 0px" });
      heads.forEach((h) => io.observe(h));
    }
  }

  const print = document.getElementById("lg-print");
  if (print) print.addEventListener("click", (e) => { e.preventDefault(); window.print(); });
})();