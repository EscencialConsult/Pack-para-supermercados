// ../../js/finalActions.js


function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("User") || "null");
  } catch {
    return null;
  }
}

function setStoredUser(next) {
  localStorage.setItem("User", JSON.stringify(next));
}

function clearArea() {
  const area = document.getElementById("finalDynamicArea");
  if (area) area.innerHTML = "";
  return area;
}

function renderRetryButton({ remaining }) {
  const area = clearArea();
  if (!area) return;

  // Si no hay remaining, no mostramos nada
  if (!remaining || remaining <= 0) return;

  area.innerHTML = `
    <button id="btnRetryTest" class="btn btn-secondary" type="button">
      Volver a realizar el test (${remaining} intento${remaining === 1 ? "" : "s"} disponible${remaining === 1 ? "" : "s"})
    </button>
  `;

  document.getElementById("btnRetryTest").addEventListener("click", () => {
    // Lo más simple: recargar para reiniciar flujo desde login/instrucciones
    window.location.reload();
  });
}

function jsonpRequest(url, params = {}, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const cb = "cb_" + Math.random().toString(36).slice(2);

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("JSONP timeout"));
    }, timeoutMs);

    function cleanup() {
      clearTimeout(timer);
      try {
        delete window[cb];
      } catch {}
      if (script && script.parentNode) script.parentNode.removeChild(script);
    }

    window[cb] = (data) => {
      cleanup();
      resolve(data);
    };

    const u = new URL(url);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) u.searchParams.set(k, String(v));
    });
    u.searchParams.set("callback", cb);

    const script = document.createElement("script");
    script.src = u.toString();
    script.async = true;
    script.onerror = () => {
      cleanup();
      reject(new Error("JSONP network error"));
    };

    document.head.appendChild(script);
  });
}

/**
 * Llama al Apps Script para incrementar count y renderiza botón si hay remaining.
 * Ahora usa JSONP (GET) para poder leer respuesta cross-domain.
 */
export async function incrementCountAndRenderRetry() {
  const u = getStoredUser();
  console.log("Usuario recuperado:", u);

  // Si no hay usuario, no hacemos nada
  if (!u?.userId || !u?.id_test) {
    console.warn("No hay usuario válido, limpiando área...");
    clearArea();
    return;
  }

  // Si ya no tiene intentos según localStorage, no mostramos botón y listo
  console.log("Intentos actuales:", u.count, "Máximo permitido:", u.amount);
  if (Number(u.count) >= Number(u.amount)) {
    console.warn("Ya alcanzó el máximo de intentos, limpiando área...");
    clearArea();
    return;
  }

  const ENDPOINT =
    "https://script.google.com/macros/s/AKfycbwu0X43xAAYZYIbTPr-hrcPkab_SWOCjbd906SJ3w2wBURaqEW19ghUJkno3pYfk5L0/exec";

  // JSONP al Apps Script (GET)
  const params = {
    action: "incrementCount",
    id_user: u.userId,
    id_test: u.id_test,
  };

  console.log("Params JSONP a enviar:", params);

  let resJson;
  try {
    resJson = await jsonpRequest(ENDPOINT, params, 15000);
    console.log("Respuesta JSONP:", resJson);
  } catch (err) {
    console.error("incrementCount JSONP error:", err);
    clearArea();
    return;
  }

  if (!resJson?.ok) {
    console.warn("Respuesta no OK:", resJson);
    clearArea();
    return;
  }

  // Apps Script devuelve: { ok:true, count, amount, state, finished, ... }
  const nextCount = Number(resJson.count ?? u.count ?? 0);
  const nextAmount = Number(resJson.amount ?? u.amount ?? 0);
  const remaining = Math.max(0, nextAmount - nextCount);

  console.log("Valores calculados:", { nextCount, nextAmount, remaining });

  // Actualiza localStorage con lo nuevo
  setStoredUser({
    ...u,
    count: nextCount,
    amount: nextAmount,
    state: resJson.state,
    finished: resJson.finished,
    remaining,
  });

  console.log("Usuario actualizado en storage:", getStoredUser());

  // Renderiza según remaining
  renderRetryButton({ remaining });
  console.log("Renderizado botón con remaining:", remaining);
}

// ../../js/finalActions.js

/**
 * Devuelve el email guardado en localStorage ("User.email").
 * Si no existe o está vacío, devuelve "escencialconsult@gmail.com".
 */
export function getStoredEmail(defaultEmail = "escencialconsult@gmail.com") {
  try {
    const raw = localStorage.getItem("User");
    if (!raw) return defaultEmail;

    const u = JSON.parse(raw);
    const email = typeof u?.email === "string" ? u.email.trim() : "";

    return email || defaultEmail;
  } catch {
    return defaultEmail;
  }
}