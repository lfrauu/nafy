// ================================
// PROTECCIÓN ADMIN DEFINITIVA
// ================================
const email = localStorage.getItem("emailUsuario");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

if (!email || !usuarios[email] || usuarios[email].role !== "admin") {
  alert("Acceso restringido");
  window.location.href = "../index.html";
}

if (
  !emailLogeado ||
  !usuarios[emailLogeado] ||
  usuarios[emailLogeado].role !== "admin"
) {
  alert("Acceso restringido");
  window.location.href = "../index.html";
}

// ================================
// AUTO PROTECCIÓN
// ================================
const adminActivo = sessionStorage.getItem('adminActivo');

if (adminActivo === 'true') {
  mostrarPanel();
}

// ================================
// LOGIN ADMIN
// ================================
function loginAdmin() {
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem('adminActivo', 'true');
    mostrarPanel();
  } else {
    alert('Credenciales incorrectas');
  }
}

// ================================
// MOSTRAR PANEL
// ================================
function mostrarPanel() {
  document.getElementById('adminLogin').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'block';
}

// ================================
// LOGOUT ADMIN
// ================================
function logoutAdmin() {
  sessionStorage.removeItem('adminActivo');
  location.reload();
}
