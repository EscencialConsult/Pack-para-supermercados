// js/helpers/finalActions.js
// Helpers compartidos por los 8 tests del pack.
// Cada test importa estas dos funciones al terminar de enviar sus respuestas.

// ============================================
// EMAIL DEL PARTICIPANTE
// ============================================

// Cada test pide el email en su pantalla inicial, pero con un id distinto.
const EMAIL_INPUT_IDS = ['userEmail', 'user-email', 'email'];
const EMAIL_KEY = 'participantEmail';

function leerStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null; // modo incógnito o cookies bloqueadas
  }
}

function guardarStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    /* sin storage disponible: seguimos sin persistir */
  }
}

/**
 * Devuelve el email que cargó el participante.
 * Lo busca primero en el campo del propio test, y si la pantalla ya cambió
 * (varios tests ocultan el formulario inicial) lo recupera de localStorage.
 */
export function getStoredEmail() {
  for (const id of EMAIL_INPUT_IDS) {
    const input = document.getElementById(id);
    const valor = input && typeof input.value === 'string' ? input.value.trim() : '';
    if (valor) {
      guardarStorage(EMAIL_KEY, valor);
      return valor;
    }
  }

  const guardado = leerStorage(EMAIL_KEY);
  if (guardado) return guardado;

  // Último recurso: la sesión que dejó usuarios.html al iniciar sesión.
  try {
    const sesion = JSON.parse(leerStorage('sessionUser') || '{}');
    return sesion.email || sesion.Email || '';
  } catch (e) {
    return '';
  }
}

// ============================================
// CIERRE DEL TEST
// ============================================

/** Nombre de la carpeta del test, para contar los intentos por separado. */
function idDelTest() {
  const partes = window.location.pathname.split('/').filter(Boolean);
  const carpeta = partes[partes.length - 2];
  return carpeta || 'test';
}

function contenedorDeCierre() {
  const msg = document.getElementById('loadingMsg');
  if (msg && msg.parentElement) return msg.parentElement;

  const secciones = Array.from(document.querySelectorAll('.section, section, main'));
  const visible = secciones.reverse().find(el => el.offsetParent !== null);
  return visible || document.body;
}

/**
 * Suma un intento al contador del test y muestra las acciones finales:
 * volver al panel de evaluaciones o rehacer el test.
 * Se llama una sola vez, después de que el envío a la planilla salió bien.
 */
export function incrementCountAndRenderRetry() {
  const clave = `testAttempts:${idDelTest()}`;
  const intentos = Number(leerStorage(clave) || 0) + 1;
  guardarStorage(clave, String(intentos));

  if (document.getElementById('finalActions')) return;

  const caja = document.createElement('div');
  caja.id = 'finalActions';
  caja.style.cssText = [
    'margin:1.5rem auto 0',
    'max-width:520px',
    'display:flex',
    'flex-wrap:wrap',
    'gap:.75rem',
    'justify-content:center',
    'font-family:inherit'
  ].join(';');

  const estiloBoton = [
    'padding:.75rem 1.4rem',
    'border-radius:999px',
    'border:1px solid rgba(107,225,227,.45)',
    'background:rgba(107,225,227,.12)',
    'color:inherit',
    'font-size:.92rem',
    'font-weight:700',
    'cursor:pointer',
    'font-family:inherit'
  ].join(';');

  const volver = document.createElement('button');
  volver.type = 'button';
  volver.textContent = '← Volver al panel';
  volver.style.cssText = estiloBoton;
  volver.addEventListener('click', () => {
    window.location.href = '../../usuarios.html';
  });

  const rehacer = document.createElement('button');
  rehacer.type = 'button';
  rehacer.textContent = 'Rehacer el test';
  rehacer.style.cssText = estiloBoton + ';border-color:rgba(198,201,215,.35);background:rgba(254,254,255,.06)';
  rehacer.addEventListener('click', () => {
    window.location.reload();
  });

  const detalle = document.createElement('p');
  detalle.textContent = intentos === 1
    ? 'Registramos tu primer envío.'
    : `Registramos ${intentos} envíos de este test.`;
  detalle.style.cssText = 'width:100%;text-align:center;margin:0 0 .25rem;font-size:.85rem;opacity:.75';

  caja.appendChild(detalle);
  caja.appendChild(volver);
  caja.appendChild(rehacer);
  contenedorDeCierre().appendChild(caja);
}
