const email = localStorage.getItem("emailUsuario");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

if (!email || !usuarios[email] || usuarios[email].role !== "admin") {
  alert("Acceso restringido");
  window.location.href = "../index.html";
}
