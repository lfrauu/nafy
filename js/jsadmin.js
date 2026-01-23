const usuario = localStorage.getItem("usuario");

if (usuario !== "lfrau") {
  alert("Acceso no autorizado");
  window.location.href = "../index.html";
}

let TOKEN = null;
const API = "https://TU_BACKEND.onrender.com/api";

// ===============================
// LOGIN ADMIN
// ===============================
async function loginAdmin() {
  const usuario = prompt("Usuario administrador:");
  const password = prompt("Contraseña administrador:");

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.mensaje || "Acceso denegado");
    window.location.href = "../index.html";
    return;
  }

  TOKEN = data.token;
  cargarUsuarios();
}

// ===============================
// CARGAR USUARIOS
// ===============================
async function cargarUsuarios() {
  const res = await fetch(`${API}/usuarios`, {
    headers: {
      "Authorization": "Bearer " + TOKEN
    }
  });

  const usuarios = await res.json();
  const tbody = document.querySelector("#tablaUsuarios tbody");
  tbody.innerHTML = "";

  usuarios.forEach(u => {
    const baneado = u.banhasta && new Date(u.banhasta) > new Date();

    const tr = document.createElement("tr");
    tr.className = baneado ? "baneado" : "activo";

    tr.innerHTML = `
      <td><input value="${u.username}" onchange="cambiarUsername('${u.email}', this.value)"></td>
      <td>${u.email}</td>
      <td><input value="${u.password}" onchange="cambiarPassword('${u.email}', this.value)"></td>
      <td>${baneado ? new Date(u.banhasta).toLocaleString() : "-"}</td>
      <td>
        <button onclick="banearMinutos('${u.email}')">Ban minutos</button>
        <button onclick="banearFecha('${u.email}')">Ban fecha</button>
        <button onclick="quitarBan('${u.email}')">Quitar ban</button>
        <button onclick="eliminarUsuario('${u.email}')">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ===============================
// ACCIONES
// ===============================
async function cambiarUsername(email, username) {
  await fetch(`${API}/usuarios/${email}/username`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ username })
  });
}

async function cambiarPassword(email, password) {
  await fetch(`${API}/usuarios/${email}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ password })
  });
}

async function banearMinutos(email) {
  const min = prompt("Minutos de ban:");
  if (!min || isNaN(min)) return;

  const banHasta = Date.now() + min * 60000;

  await fetch(`${API}/usuarios/${email}/ban`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ banHasta })
  });

  cargarUsuarios();
}

async function banearFecha(email) {
  const fecha = prompt("Fecha fin ban (YYYY-MM-DD HH:MM)");
  const ts = new Date(fecha).getTime();
  if (isNaN(ts)) return alert("Fecha inválida");

  await fetch(`${API}/usuarios/${email}/ban`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ banHasta: ts })
  });

  cargarUsuarios();
}

async function quitarBan(email) {
  await fetch(`${API}/usuarios/${email}/unban`, {
    method: "PUT",
    headers: {
      "Authorization": "Bearer " + TOKEN
    }
  });

  cargarUsuarios();
}

async function eliminarUsuario(email) {
  if (!confirm("¿Eliminar usuario definitivamente?")) return;

  await fetch(`${API}/usuarios/${email}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + TOKEN
    }
  });

  cargarUsuarios();
}

// ===============================
loginAdmin();
