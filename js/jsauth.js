function registrar() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Rellena todos los campos");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

  if (usuarios[email]) {
    alert("Este correo ya está registrado");
    return;
  }

  usuarios[email] = {
    username: username,
    password: password,
    role: email === "franbriosoolvera@gmail.com" ? "admin" : "user"
  };

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Cuenta creada correctamente");
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

  if (!usuarios[email] || usuarios[email].password !== password) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  localStorage.setItem("emailUsuario", email);
  window.location.href = "index.html";
}

function cerrarSesion() {
  localStorage.removeItem("emailUsuario");
  window.location.href = "index.html";
}
