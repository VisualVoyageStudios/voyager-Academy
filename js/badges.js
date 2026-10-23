(function () {
  const BASE = [
    ["first-lesson", "fa-rocket", "First steps", "Complete your first lesson", (c) => c.lessons >= 1],
    ["five-lessons", "fa-book", "Getting serious", "Complete 5 lessons", (c) => c.lessons >= 5],
    ["ten-lessons", "fa-book-open", "Double digits", "Complete 10 lessons", (c) => c.lessons >= 10],
    ["twenty-five", "fa-graduation-cap", "Scholar", "Complete 25 lessons", (c) => c.lessons >= 25],
    ["all-lessons", "fa-landmark", "Completionist", "Complete every lesson", (c) => c.total > 0 && c.lessons >= c.total],
    ["streak-3", "fa-fire", "On a roll", "Reach a 3-day streak", (c) => c.bestStreak >= 3],
    ["streak-7", "fa-bolt", "Week warrior", "Reach a 7-day streak", (c) => c.bestStreak >= 7],
    ["streak-30", "fa-trophy", "Unstoppable", "Reach a 30-day streak", (c) => c.bestStreak >= 30],
    ["first-cert", "fa-scroll", "Certified", "Earn your first track certificate", (c) => c.certs >= 1],
    ["master-cert", "fa-star", "Full curriculum", "Earn the Full Curriculum certificate", (c) => c.master],
  ];

  function context(progress, certs, streak) {
    const done = new Set(progress.map((p) => p.lesson_slug));
    const trackDone = {};
    [...new Set(COURSE_DATA.map((c) => c.track))].forEach((t) => {
      const l = COURSE_DATA.filter((c) => c.track === t);
      trackDone[t] = l.length > 0 && l.every((c) => done.has(c.slug));
    });
    return {
      lessons: COURSE_DATA.filter((c) => done.has(c.slug)).length,
      total: COURSE_DATA.length,
      bestStreak: streak ? streak.best : 0,
      certs: certs.filter((c) => c.track !== "master" && c.earned).length,
      master: !!(certs.find((c) => c.track === "master") || {}).earned,
      trackDone,
    };
  }

  function list(ctx) {
    const tracks = typeof VA_TRACKS !== "undefined" ? VA_TRACKS : [];
    const perTrack = tracks.map(([k, label]) => {
      const short = label.replace(/ \(.*\)/, "");
      return [`track-${k}`, "fa-flag-checkered", `${short} complete`, `Finish every lesson in ${short}`, (c) => !!c.trackDone[k]];
    });
    return [...BASE, ...perTrack].map(([id, icon, name, desc, test]) => ({ id, icon, name, desc, earned: !!test(ctx) }));
  }

  function render(el, badges) {
    el.innerHTML = badges.map((b) =>
      `<div class="badge ${b.earned ? "earned" : "locked"}" title="${b.desc}">
        <span class="badge__icon"><i class="fa-solid ${b.icon}" aria-hidden="true"></i></span><strong>${b.name}</strong><small>${b.desc}</small>
      </div>`).join("");
  }

  function announce(studentId, badges) {
    const key = "va_badges_seen_" + studentId;
    const earned = badges.filter((b) => b.earned).map((b) => b.id);
    let seen = null;
    try { seen = JSON.parse(localStorage.getItem(key)); } catch (e) {}
    if (!Array.isArray(seen)) { localStorage.setItem(key, JSON.stringify(earned)); return; }
    const fresh = badges.filter((b) => b.earned && !seen.includes(b.id));
    if (fresh.length && typeof vaToast === "function") {
      fresh.forEach((b, i) => setTimeout(() => vaToast(`New badge: ${b.name}`, "success"), i * 1200));
    }
    localStorage.setItem(key, JSON.stringify(earned));
  }

  window.vaBadges = { context, list, render, announce };
})();