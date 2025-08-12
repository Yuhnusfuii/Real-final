// src/auth.js
export function isAuthenticated() {
  return localStorage.getItem("auth") === "true";
}

export function logout() {
  localStorage.removeItem("auth");
  localStorage.removeItem("currentUser");
}
