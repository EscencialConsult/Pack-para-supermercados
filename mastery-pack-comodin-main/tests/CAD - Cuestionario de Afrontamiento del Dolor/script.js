// script.js (CAD) — Fecha | Nombre | Apellido | Email | Escalas | Respuestas

import { incrementCountAndRenderRetry,getStoredEmail } from '../../js/helpers/finalActions.js';

// ========== ÍTEMS CAD ==========
const ITEMS_CAD = [
  { id: 1,  text: "Ignoro el dolor pensando en otra cosa." },
  { id: 2,  text: "Intento saber más sobre mi dolor para así poder hacerle frente." },
  { id: 3,  text: "Rezo para curarme." },
  { id: 4,  text: "Me olvido de todo y me concentro en mi dolor intentando que desaparezca." },
  { id: 5,  text: "Cuando tengo dolor no me rindo, peleo." },
  { id: 6,  text: "Hablo con un profesional (médico, psicólogo, sacerdote, etc) del problema para que me ayude a hacerle frente." },
  { id: 7,  text: "Busco algún amigo o allegado que me comprenda y me ayude a sentirme mejor con el dolor." },
  { id: 8,  text: "Rezo para conseguir fuerza y guía sobre el problema." },
  { id: 9,  text: "Cuento a la gente la situación porque ello me ayuda a encontrar soluciones." },
  { id: 10, text: "Cuando tengo dolor pienso en otra cosa." },
  { id: 11, text: "Me doy ánimos por aguantar el dolor." },
  { id: 12, text: "Cuando tengo dolor me concentro en él e intento disminuirlo mentalmente." },
  { id: 13, text: "Cuando tengo dolor les digo a los demás lo mucho que me duele, pues el compartir mis sentimientos me hace encontrarme mejor." },
  { id: 14, text: "Me digo a mí mismo que tengo que ser fuerte." },
  { id: 15, text: "Cuando tengo dolor me esfuerzo en distraerme con algún pasatiempo." },
  { id: 16, text: "Cuando tengo dolor intento hablar con alguien y contarle lo que me pasa. Esto me ayuda a soportarlo." },
  { id: 17, text: "Utilizo la fe para aliviar mis dolores." },
  { id: 18, text: "Busco algo en qué pensar para distraerme." },
  { id: 19, text: "Cuando tengo dolor me concentro en su localización e intensidad para intentar controlarlo." },
  { id: 20, text: "Trato de dejar la mente en blanco." },
  { id: 21, text: "Hablo con alguien que puede hacer algo concreto sobre mi dolor." },
  { id: 22, text: "Pido a Dios que me alivie de mis dolores." },
  { id: 23, text: "Intento recrear mentalmente un paisaje." },
  { id: 24, text: "Me concentro en el punto en que más me duele intentando disminuir el dolor." },
  { id: 25, text: "Rezo para que mis dolores desaparezcan." },
  { id: 26, text: "Aunque me duele me contengo y procuro que no se me note." },
  { id: 27, text: "Intento que me expliquen qué puedo hacer para disminuir el dolor." },
  { id: 28, text: "Cuando tengo dolor imagino situaciones placenteras." },
  { id: 29, text: "Hablo con la gente de mi dolor, porque el hablar me ayuda a sentirme mejor." },
  { id: 30, text: "Pienso que he de tener fuerzas y no desfallecer." },
  { id: 31, text: "Busco a algún amigo, familiar o profesional para que me aconseje cómo superar la situación." }
];

const TOTAL = 31;
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwg0PMZY-ieNVFjnDEuiaewpeQv1ewt8k2zm_8QBzpNvHPt3Ku0M4hb5fEMqRpyFB2G/exec";

const ESCALAS = {
  "Religión":                { items: [3, 8, 17, 22, 25] },
  "Catarsis":                { items: [7, 9, 13, 16, 29] },
  "Distracción":             { items: [1, 10, 15, 18, 23, 28] },
  "Autocontrol mental":      { items: [4, 12, 19, 20, 24] },
  "Autoafirmación":          { items: [5, 11, 14, 26, 30] },
  "Búsqueda de información": { items: [2, 6, 21, 27, 31] }
};

const OPCIONES = [
  { letra: "A", valor: 4, label: "Totalmente de acuerdo" },
  { letra: "B", valor: 3, label: "Ligeramente de acuerdo" },
  { letra: "C", valor: 2, label: "Ni Sí ni No" },
  { letra: "D", valor: 1, label: "Ligeramente en desacuerdo" },
  { letra: "E", valor: 0, label: "Totalmente en desacuerdo" }
];

// ========== ESTADO ==========
let user = {};
let answersCAD = {};
let timeStart = 0, timeEnd = 0;
let timerInterval, elapsedSeconds = 0;

// ========== UI ==========
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  window.scrollTo(0, 0);
}

// ========== FLUJO ==========
function goToInstructions() {
  const n = document.getElementById('userName').value.trim();
  const l = document.getElementById('userLast').value.trim();
  const e = document.getElementById('userEmail').value.trim();

  if (!n || !l || !e) return alert("Complete todos los campos obligatorios.");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(e)) return alert("Ingrese un email válido.");

  user = { name: n, lastname: l, email: e };
  showSection('instSection');
}

function startCAD() {
  timeStart = Date.now();
  renderQuestionsCAD();
  showSection('cadSection');

  const timerEl = document.getElementById('timerDisplay');
  if (timerEl) timerEl.style.display = 'inline-block';

  elapsedSeconds = 0;
  startTimer();
}

function renderQuestionsCAD() {
  const container = document.getElementById('questionsContainerCAD');
  container.innerHTML = '';

  ITEMS_CAD.forEach(q => {
    const div = document.createElement('div');
    div.className = 'question-item';
    div.id = 'cad-' + q.id;

    let optionsHtml = `<div class="options-likert" data-qid="${q.id}">`;
    OPCIONES.forEach(op => {
      optionsHtml += `
        <label class="opt-likert" data-val="${op.valor}">
          <input type="radio" name="cad-${q.id}" value="${op.valor}">
          <span class="likert-value">${op.letra}</span>
          <span class="likert-label">${op.label}</span>
        </label>
      `;
    });
    optionsHtml += '</div>';

    div.innerHTML = `
      <div class="q-header">
        <span class="q-number">${q.id}.</span>
        <span class="q-text">${q.text}</span>
      </div>
      ${optionsHtml}
    `;

    container.appendChild(div);
  });

  container.addEventListener('click', (e) => {
    const label = e.target.closest('.opt-likert');
    if (!label) return;
    const wrap = label.closest('.options-likert');
    if (!wrap) return;
    const qId = Number(wrap.dataset.qid);
    const val = Number(label.dataset.val);
    selectOption(qId, val, label);
  });
}

function selectOption(qId, value, labelElem) {
  answersCAD[qId] = value;

  const item = document.getElementById('cad-' + qId);
  if (item) item.classList.add('answered');

  const parent = labelElem.parentElement;
  Array.from(parent.children).forEach(child => child.classList.remove('selected'));
  labelElem.classList.add('selected');

  const radio = labelElem.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;

  updateProgress();
}

function updateProgress() {
  const answered = Object.keys(answersCAD).length;
  const percent = Math.round((answered / TOTAL) * 100);
  document.getElementById('progressBarCAD').style.width = percent + '%';
  document.getElementById('progressCountCAD').innerText = answered;
  document.getElementById('progressPercentCAD').innerText = percent + '%';
}

function finishCAD() {
  const answered = Object.keys(answersCAD).length;
  if (answered < TOTAL) {
    if (!confirm(`Ha respondido ${answered} de ${TOTAL} preguntas.\n\n¿Desea finalizar de todos modos?`)) return;
  }

  clearInterval(timerInterval);
  timeEnd = Date.now();

  const timerEl = document.getElementById('timerDisplay');
  if (timerEl) timerEl.style.display = 'none';

  showSection('finalSection');
  sendResults();
}

// ========== CÁLCULO DE ESCALAS ==========
function calcularEscalasDetalladas() {
  const resultado = {};

  for (const [nombre, config] of Object.entries(ESCALAS)) {
    let total = 0;
    const n = config.items.length;
    const max = n * 4;

    config.items.forEach(itemId => {
      total += answersCAD[itemId] !== undefined ? answersCAD[itemId] : 0;
    });

    const avg = n > 0 ? +(total / n).toFixed(2) : 0;
    const pct = max > 0 ? +((total / max) * 100).toFixed(0) : 0;

    resultado[nombre] = { total, n, max, avg, pct };
  }

  return resultado;
}

// ========== FORMATO RESPUESTAS: {"1":3,"2":2,...} ==========
function formatAnswers(obj) {
  const sorted = Object.keys(obj).map(Number).sort((a, b) => a - b);
  if (sorted.length === 0) return "Sin respuestas";
  const entries = sorted.map(id => `"${id}":${obj[id]}`).join(',');
  return `{${entries}}`;
}

function getFechaHoraAR() {
  const now = new Date();
  return now.toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
}

// ========== ENVÍO ==========
// Columnas: Fecha | Nombre | Apellido | Email | Escalas | Respuestas
async function sendResults() {
  const escalasJSON    = JSON.stringify(calcularEscalasDetalladas());
  const respuestasJSON = formatAnswers(answersCAD);

  const filaOrdenada = [
    getFechaHoraAR(),
    user.name     || "SinNombre",
    user.lastname || "SinApellido",
    getStoredEmail() || "",
    respuestasJSON,
    escalasJSON
  ];

  const payload = {
    nombreHoja: "Respuestas",
    fila: filaOrdenada
  };

  try {
    await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const msg = document.getElementById('loadingMsg');
    msg.innerText = "¡Resultados CAD guardados correctamente!";
    msg.style.color = "#059669";
    incrementCountAndRenderRetry();
  } catch (error) {
    console.error("Error:", error);
    const msg = document.getElementById('loadingMsg');
    msg.innerText = "⚠️ Error de conexión, avise al administrador.";
    msg.style.color = "orange";
  }
}

// ========== TIMER ==========
function startTimer() {
  updateTimer();
  timerInterval = setInterval(() => {
    elapsedSeconds++;
    updateTimer();
  }, 1000);
}

function updateTimer() {
  const m = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
  const s = (elapsedSeconds % 60).toString().padStart(2, '0');
  const el = document.getElementById('timerDisplay');
  if (el) el.innerText = `${m}:${s}`;
}

// ========== NAVEGACIÓN PANEL ==========
function volverAlPanelUsuarios() {
  window.location.href = "../../index.html";
}

// ========== INIT ==========
function init() {
  window.goToInstructions      = goToInstructions;
  window.startCAD              = startCAD;
  window.finishCAD             = finishCAD;
  window.volverAlPanelUsuarios = volverAlPanelUsuarios;
}

document.addEventListener('DOMContentLoaded', init);