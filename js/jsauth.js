// =====================================
// MIGRACIÓN AUTOMÁTICA DE USUARIOS
// =====================================
(function migrarUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  let cambiado = false;

  for (const email in usuarios) {
    if (!usuarios[email].username) {
      usuarios[email].username = email.split("@")[0];
      cambiado = true;
    }

    if (usuarios[email].banHasta === undefined) {
      usuarios[email].banHasta = null;
      cambiado = true;
    }

    if (!usuarios[email].role) {
      usuarios[email].role =
        email === "franbriosoolvera@gmail.com" ? "admin" : "user";
      cambiado = true;
    }
  }

  if (cambiado) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
})();

// =====================================
// REGISTRO (1 USUARIO POR CORREO)
// =====================================
function registro() {
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const password2 = document.getElementById('regPassword2').value;

  if (!email || !password || !password2) {
    alert("Completa todos los campos");
    return;
  }

  if (password !== password2) {
    alert("Las contraseñas no coinciden");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  if (usuarios[email]) {
    alert("Este correo ya está registrado");
    return;
  }

  const username = email.split("@")[0];

  usuarios[email] = {
    username,
    password,
    banHasta: null,
    role: email === "franbriosoolvera@gmail.com" ? "admin" : "user"
  };

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuario', username);
  localStorage.setItem('emailUsuario', email);

  sessionStorage.setItem(
    "bienvenida",
    `¡Bienvenido, ${username}! Cuenta creada correctamente`
  );

  window.location.href = "index.html";
}

// =====================================
// LOGIN (EMAIL + PASSWORD)
// =====================================
function login() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert("Completa todos los campos");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  if (!usuarios[email]) {
    alert("Correo no registrado");
    return;
  }

  const usuario = usuarios[email];

  if (usuario.banHasta && Date.now() < usuario.banHasta) {
    alert("Tu cuenta está baneada");
    return;
  }

  if (usuario.password !== password) {
    alert("Contraseña incorrecta");
    return;
  }

  localStorage.setItem("usuario", usuario.username);
  localStorage.setItem("emailUsuario", email);

  sessionStorage.setItem(
    "bienvenida",
    `¡Bienvenido de nuevo, ${usuario.username}!`
  );

  window.location.href = "index.html";
}

// =====================================
// MOSTRAR / OCULTAR PASSWORD
// =====================================
function togglePassword(id) {
  const input = document.getElementById(id);
  if (input) {
    input.type = input.type === "password" ? "text" : "password";
  }
}
