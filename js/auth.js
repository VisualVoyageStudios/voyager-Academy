const API_BASE = "https://voyager-academy.onrender.com";

let vaWakeupToastShown = false;
async function vaFetchWithWakeupHint(url, options) {
  const timer = setTimeout(() => {
    if (!vaWakeupToastShown && typeof vaToast === "function") {
      vaWakeupToastShown = true;
      vaToast("Waking up the server — this can take up to a minute on the first request today.", "info");
    }
  }, 3000);
  try {
    return await fetch(url, options);
  } finally {
    clearTimeout(timer);
  }
}

function vaGetToken() { return localStorage.getItem("va_token"); }
function vaGetStudent() {
  const raw = localStorage.getItem("va_student");
  return raw ? JSON.parse(raw) : null;
}

async function vaGetMe() {
  const token = vaGetToken();
  if (!token) return null;
  const res = await vaFetchWithWakeupHint(`${API_BASE}/me`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return null;
  const student = await res.json();
  vaSetStudent(student);
  return student;
}

function vaErrorMessage(err, fallback) {
  const d = err && err.detail;
  if (typeof d === "string") return d;
  if (Array.isArray(d) && d[0] && d[0].msg) return String(d[0].msg).replace(/^Value error, /, "");
  return fallback;
}

function vaSetStudent(student) { localStorage.setItem("va_student", JSON.stringify(student)); }
function vaLogout() {
  localStorage.removeItem("va_token");
  localStorage.removeItem("va_student");
  window.location.href = "index.html";
}

async function vaRegister(name, email, password) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/auth/register`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(vaErrorMessage(err, "Registration failed.")); }  const data = await res.json();
  localStorage.setItem("va_token", data.access_token);
  vaSetStudent(data.student);
  return data;
}

async function vaLogin(email, password) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/auth/login`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(vaErrorMessage(err, "Login failed.")); }
  const data = await res.json();
  localStorage.setItem("va_token", data.access_token);
  vaSetStudent(data.student);
  return data;
}

async function vaChangePassword(currentPassword, newPassword) {
  const token = vaGetToken();
  const res = await vaFetchWithWakeupHint(`${API_BASE}/me/change-password`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(vaErrorMessage(err, "Failed to change password.")); }  const data = await res.json();
  if (data.access_token) localStorage.setItem("va_token", data.access_token);
  return data;
}

async function vaForgotPassword(email) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/auth/forgot-password`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Something went wrong. Try again.");
  return res.json();
}

async function vaResetPassword(token, newPassword) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/auth/reset-password`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, new_password: newPassword }),
  });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(vaErrorMessage(err, "Failed to reset password.")); }  return res.json();
}

async function vaUpdateProfile(name, email, currentPassword, certificateName) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${vaGetToken()}` },
    body: JSON.stringify({ name, email, current_password: currentPassword || null, certificate_name: certificateName || null }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(typeof err.detail === "string" ? err.detail : "Couldn't update profile.");
  }
  const student = await res.json();
  vaSetStudent(student);
  return student;
}

async function vaLogoutEverywhere() {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/me/logout-everywhere`, {
    method: "POST", headers: { Authorization: `Bearer ${vaGetToken()}` },
  });
  if (!res.ok) throw new Error("Couldn't sign out your other devices.");
  const data = await res.json();
  localStorage.setItem("va_token", data.access_token);
}

// ---- Settings sync ----
const VA_SYNC_KEYS = ["accent", "text", "font", "width", "density", "reduceMotion", "contrast", "links",
  "showStreak", "weeklyGoal", "reviewLength", "shuffleQuiz", "chatRoom", "calcBalance", "calcRisk", "theme",
  "lineHeight", "showExtras", "showReadbar", "hideDone", "showBadges", "chatSound", "calcStop"];

function vaSyncEnabled() { return localStorage.getItem("va_sync") !== "0"; }

function vaCollectPrefs() {
  let p = {};
  try { p = JSON.parse(localStorage.getItem("va_prefs") || "{}"); } catch (e) {}
  const out = {};
  VA_SYNC_KEYS.forEach((k) => { if (p[k] !== undefined) out[k] = p[k]; });
  out.theme = localStorage.getItem("va_theme") || "system";
  return out;
}

async function vaPushPreferences() {
  if (!vaGetToken() || !vaSyncEnabled()) return;
  try {
    await fetch(`${API_BASE}/me/preferences`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${vaGetToken()}` },
      body: JSON.stringify({ preferences: vaCollectPrefs() }),
    });
  } catch (e) { console.warn("Settings sync failed:", e); }
}

let _vaPushTimer = null;
function vaQueuePush() { clearTimeout(_vaPushTimer); _vaPushTimer = setTimeout(vaPushPreferences, 800); }

async function vaPullPreferences() {
  if (!vaGetToken() || !vaSyncEnabled()) return false;
  try {
    const res = await fetch(`${API_BASE}/me/preferences`, { headers: { Authorization: `Bearer ${vaGetToken()}` } });
    if (!res.ok) return false;
    const { preferences } = await res.json();
    if (!preferences || !Object.keys(preferences).length) { vaPushPreferences(); return false; }
    const { theme, ...rest } = preferences;
    localStorage.setItem("va_prefs", JSON.stringify(rest));
    if (theme === "light" || theme === "dark") localStorage.setItem("va_theme", theme);
    else localStorage.removeItem("va_theme");
    return true;
  } catch (e) { return false; }
}

async function vaExportData() {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/me/export`, {
    headers: { Authorization: `Bearer ${vaGetToken()}` },
  });
  if (!res.ok) throw new Error("Couldn't export your data.");
  return res.json();
}

async function vaGetProgress() {
  const token = vaGetToken();
  if (!token) return [];
  const res = await vaFetchWithWakeupHint(`${API_BASE}/progress`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return [];
  return res.json();
}

async function vaMarkComplete(lessonSlug) {
  const token = vaGetToken();
  if (!token) throw new Error("Not logged in.");
  const res = await vaFetchWithWakeupHint(`${API_BASE}/progress/${lessonSlug}`, {
    method: "POST", headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Could not save progress.");
  return res.json();
}

async function vaGetCertificates() {
  const token = vaGetToken();
  if (!token) return [];
  const res = await vaFetchWithWakeupHint(`${API_BASE}/certificates`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return [];
  return res.json();
}

async function vaVerifyCertificate(certId) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/certificates/verify/${encodeURIComponent(certId)}`);
  if (!res.ok) return null;
  return res.json();
}

async function vaGetPosts(category, page = 1) {
  const params = new URLSearchParams({ page });
  if (category && category !== "all") params.set("category", category);
  const res = await vaFetchWithWakeupHint(`${API_BASE}/community/posts?${params}`);
  if (!res.ok) return { items: [], has_more: false };
  return res.json();
}

async function vaGetPost(postId) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/community/posts/${postId}`);
  if (!res.ok) throw new Error("Post not found.");
  return res.json();
}

async function vaCreatePost(category, title, body) {
  const token = vaGetToken();
  if (!token) throw new Error("Not logged in.");
  const res = await vaFetchWithWakeupHint(`${API_BASE}/community/posts`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ category, title, body }),
  });
  if (!res.ok) throw new Error("Couldn't create post.");
  return res.json();
}

async function vaCreateReply(postId, body) {
  const token = vaGetToken();
  if (!token) throw new Error("Not logged in.");
  const res = await vaFetchWithWakeupHint(`${API_BASE}/community/posts/${postId}/replies`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ body }),
  });
  if (!res.ok) throw new Error("Couldn't post reply.");
  return res.json();
}

async function vaReportPost(postId) {
  const token = vaGetToken();
  if (!token) throw new Error("Not logged in.");
  const res = await vaFetchWithWakeupHint(`${API_BASE}/community/posts/${postId}/report`, {
    method: "POST", headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Couldn't report post.");
  return res.json();
}

async function vaQuizStart(slug) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/quiz/${encodeURIComponent(slug)}/start`, {
    method: "POST", headers: { Authorization: `Bearer ${vaGetToken()}` },
  });
  if (!res.ok) { const e = new Error("Couldn't start the quiz."); e.status = res.status; throw e; }
  return res.json();
}

async function vaQuizSubmit(slug, attemptId, answers) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/quiz/${encodeURIComponent(slug)}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${vaGetToken()}` },
    body: JSON.stringify({ attempt_id: attemptId, answers }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(typeof data.detail === "string" ? data.detail : "Couldn't record your attempt.");
  return data;
}


async function vaDeletePost(postId) {
  const token = vaGetToken();
  const res = await vaFetchWithWakeupHint(`${API_BASE}/community/posts/${postId}`, {
    method: "DELETE", headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Couldn't delete post.");
  return res.json();
}

async function vaDeleteReply(postId, replyId) {
  const token = vaGetToken();
  const res = await vaFetchWithWakeupHint(`${API_BASE}/community/posts/${postId}/replies/${replyId}`, {
    method: "DELETE", headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Couldn't delete reply.");
  return res.json();
}

function vaEscapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

async function vaUpdateNotifications(notifyOnReply) {
  const token = vaGetToken();
  const res = await vaFetchWithWakeupHint(`${API_BASE}/me/notifications`, {
    method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ notify_on_reply: notifyOnReply }),
  });
  if (!res.ok) throw new Error("Couldn't update notification settings.");
  const student = await res.json();
  vaSetStudent(student);
  return student;
}

async function vaDeleteAccount(password) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/me`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${vaGetToken()}` },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(typeof err.detail === "string" ? err.detail : "Couldn't delete account.");
  }
  return res.json();
}

async function vaEraseMyData(password) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/me/data`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${vaGetToken()}` },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(typeof err.detail === "string" ? err.detail : "Couldn't erase your data.");
  }
  return res.json();
}

async function vaGetStreak() {
  const token = vaGetToken();
  if (!token) return null;
  const offset = new Date().getTimezoneOffset();
  const res = await vaFetchWithWakeupHint(`${API_BASE}/streak?tz_offset=${offset}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

async function vaGetReports() {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/community/reports`, {
    headers: { Authorization: `Bearer ${vaGetToken()}` },
  });
  if (!res.ok) throw new Error("Couldn't load reports.");
  return res.json();
}

async function vaDismissReport(postId) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/community/posts/${postId}/dismiss-report`, {
    method: "POST", headers: { Authorization: `Bearer ${vaGetToken()}` },
  });
  if (!res.ok) throw new Error("Couldn't dismiss report.");
  return res.json();
}
