window.onload = function () {

  const aviso = document.getElementById('avisoLegal');
  const loginBox = document.getElementById('loginBox');
  const contenido = document.getElementById('contenidoPrincipal');

  const recordarme = localStorage.getItem('recordarme');
  const usuario = localStorage.getItem('usuario');

  // =====================================
  // AUTOLOGIN
  // =====================================
  if (recordarme === 'true' && usuario) {
    aviso.style.display = 'none';
    loginBox.style.display = 'none';
    contenido.style.display = 'block';
  } else {

    // =====================================
    // AVISO LEGAL
    // =====================================
    if (!sessionStorage.getItem('avisoAceptado') && !usuario) {
      aviso.style.display = 'flex';
      loginBox.style.display = 'none';
      contenido.style.display = 'none';
    } else {
      aviso.style.display = 'none';

      if (usuario) {
        loginBox.style.display = 'none';
        contenido.style.display = 'block';
      } else {
        loginBox.style.display = 'flex';
        contenido.style.display = 'none';
      }
    }
  }

  // MENSAJE DE BIENVENIDA
  const mensaje = sessionStorage.getItem('bienvenida');
  if (mensaje) {
    mostrarMensaje(mensaje);
    sessionStorage.removeItem('bienvenida');
  }
};

// =====================================
// BOTONES AVISO LEGAL
// =====================================
function aceptarAviso() {
  sessionStorage.setItem('avisoAceptado', 'true');
  document.getElementById('avisoLegal').style.display = 'none';
  document.getElementById('loginBox').style.display = 'flex';
}

function rechazarAviso() {
  window.location.href = 'https://www.google.com';
}

// =====================================
// CERRAR SESIÓN
// =====================================
function cerrarSesion() {
  const usuario = localStorage.getItem('usuario');
  localStorage.removeItem('usuario');
  localStorage.removeItem('recordarme');

  document.getElementById('contenidoPrincipal').style.display = 'none';
  document.getElementById('loginBox').style.display = 'flex';

  mostrarMensaje(`Hasta luego, ${usuario}`);
}

// =====================================
// MENSAJE SUPERIOR
// =====================================
function mostrarMensaje(texto) {
  const msg = document.createElement('div');
  msg.innerText = texto;

  msg.style.position = 'fixed';
  msg.style.top = '20px';
  msg.style.left = '50%';
  msg.style.transform = 'translateX(-50%)';
  msg.style.background = '#222';
  msg.style.color = '#fff';
  msg.style.padding = '12px 25px';
  msg.style.borderRadius = '10px';
  msg.style.zIndex = '9999';

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);
}
