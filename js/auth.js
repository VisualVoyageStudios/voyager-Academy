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
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.detail || "Registration failed."); }
  const data = await res.json();
  localStorage.setItem("va_token", data.access_token);
  vaSetStudent(data.student);
  return data;
}

async function vaLogin(email, password) {
  const res = await vaFetchWithWakeupHint(`${API_BASE}/auth/login`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.detail || "Login failed."); }
  const data = await res.json();
  localStorage.setItem("va_token", data.access_token);
  vaSetStudent(data.student);
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
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.detail || "Couldn't reset password."); }
  return res.json();
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

async function vaUpdateProfile(name, email) {
  const token = vaGetToken();
  const res = await vaFetchWithWakeupHint(`${API_BASE}/me`, {
    method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, email }),
  });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.detail || "Couldn't update profile."); }
  const student = await res.json();
  vaSetStudent(student);
  return student;
}

async function vaChangePassword(currentPassword, newPassword) {
  const token = vaGetToken();
  const res = await vaFetchWithWakeupHint(`${API_BASE}/me/change-password`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.detail || "Couldn't change password."); }
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
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}