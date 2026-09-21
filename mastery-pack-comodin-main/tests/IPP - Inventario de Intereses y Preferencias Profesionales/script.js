import { incrementCountAndRenderRetry,getStoredEmail } from '../../js/helpers/finalActions.js';

// ========== DATOS: 108 ÍTEMS ==========
const ITEMS_IPP = [
  { id: 1, text: "Investigar las causas de una enfermedad", campo: "C" },
  { id: 2, text: "Realizar experimentos en un laboratorio", campo: "C" },
  { id: 3, text: "Biólogo/a o Químico/a", campo: "C" },
  { id: 4, text: "Analizar datos de investigaciones científicas", campo: "C" },
  { id: 5, text: "Investigador/a científico/a", campo: "C" },
  { id: 6, text: "Estudiar el funcionamiento del cuerpo humano", campo: "C" },

  { id: 7, text: "Reparar aparatos electrónicos o mecánicos", campo: "T" },
  { id: 8, text: "Diseñar planos técnicos", campo: "T" },
  { id: 9, text: "Ingeniero/a mecánico/a o industrial", campo: "T" },
  { id: 10, text: "Manejar herramientas y maquinaria", campo: "T" },
  { id: 11, text: "Técnico/a electrónico/a", campo: "T" },
  { id: 12, text: "Supervisar procesos de fabricación", campo: "T" },

  { id: 13, text: "Atender pacientes enfermos", campo: "S" },
  { id: 14, text: "Realizar primeros auxilios y curaciones", campo: "S" },
  { id: 15, text: "Médico/a o Enfermero/a", campo: "S" },
  { id: 16, text: "Asistir en intervenciones quirúrgicas", campo: "S" },
  { id: 17, text: "Fisioterapeuta o Nutricionista", campo: "S" },
  { id: 18, text: "Trabajar en urgencias hospitalarias", campo: "S" },

  { id: 19, text: "Investigar problemas sociales", campo: "CS" },
  { id: 20, text: "Estudiar el comportamiento de grupos humanos", campo: "CS" },
  { id: 21, text: "Psicólogo/a o Sociólogo/a", campo: "CS" },
  { id: 22, text: "Realizar encuestas y estudios de opinión", campo: "CS" },
  { id: 23, text: "Antropólogo/a o Historiador/a", campo: "CS" },
  { id: 24, text: "Analizar tendencias económicas y sociales", campo: "CS" },

  { id: 25, text: "Escribir cuentos, novelas o artículos", campo: "L" },
  { id: 26, text: "Corregir textos y revisar ortografía", campo: "L" },
  { id: 27, text: "Escritor/a o Periodista", campo: "L" },
  { id: 28, text: "Traducir textos de otros idiomas", campo: "L" },
  { id: 29, text: "Editor/a o Guionista", campo: "L" },
  { id: 30, text: "Redactar discursos o contenido web", campo: "L" },

  { id: 31, text: "Pintar cuadros o crear ilustraciones", campo: "AP" },
  { id: 32, text: "Diseñar logotipos y marcas", campo: "AP" },
  { id: 33, text: "Diseñador/a gráfico/a o Ilustrador/a", campo: "AP" },
  { id: 34, text: "Realizar fotografía artística", campo: "AP" },
  { id: 35, text: "Arquitecto/a o Diseñador/a de interiores", campo: "AP" },
  { id: 36, text: "Crear animaciones y efectos visuales", campo: "AP" },

  { id: 37, text: "Tocar un instrumento musical", campo: "M" },
  { id: 38, text: "Componer melodías y canciones", campo: "M" },
  { id: 39, text: "Músico/a profesional o Cantante", campo: "M" },
  { id: 40, text: "Dirigir un coro o una orquesta", campo: "M" },
  { id: 41, text: "Productor/a musical o DJ", campo: "M" },
  { id: 42, text: "Grabar y mezclar música en estudio", campo: "M" },

  { id: 43, text: "Ayudar a personas con problemas personales", campo: "SA" },
  { id: 44, text: "Trabajar con comunidades vulnerables", campo: "SA" },
  { id: 45, text: "Trabajador/a social o Educador/a social", campo: "SA" },
  { id: 46, text: "Coordinar programas de voluntariado", campo: "SA" },
  { id: 47, text: "Orientador/a familiar o Mediador/a", campo: "SA" },
  { id: 48, text: "Defender derechos de grupos vulnerables", campo: "SA" },

  { id: 49, text: "Gestionar presupuestos y finanzas", campo: "EE" },
  { id: 50, text: "Crear planes de negocio", campo: "EE" },
  { id: 51, text: "Administrador/a de empresas o Contador/a", campo: "EE" },
  { id: 52, text: "Dirigir equipos de trabajo", campo: "EE" },
  { id: 53, text: "Gerente o Director/a financiero/a", campo: "EE" },
  { id: 54, text: "Analizar mercados e inversiones", campo: "EE" },

  { id: 55, text: "Vender productos o servicios", campo: "PC" },
  { id: 56, text: "Convencer a otros de una idea", campo: "PC" },
  { id: 57, text: "Vendedor/a profesional o Ejecutivo/a comercial", campo: "PC" },
  { id: 58, text: "Realizar presentaciones comerciales", campo: "PC" },
  { id: 59, text: "Director/a de marketing o Publicista", campo: "PC" },
  { id: 60, text: "Captar y fidelizar clientes", campo: "PC" },

  { id: 61, text: "Organizar archivos y documentos", campo: "A" },
  { id: 62, text: "Gestionar agenda y coordinar reuniones", campo: "A" },
  { id: 63, text: "Secretario/a ejecutivo/a o Asistente", campo: "A" },
  { id: 64, text: "Procesar datos en hojas de cálculo", campo: "A" },
  { id: 65, text: "Auxiliar contable o Recepcionista", campo: "A" },
  { id: 66, text: "Realizar trámites y gestiones administrativas", campo: "A" },

  { id: 67, text: "Defender casos ante tribunales", campo: "JP" },
  { id: 68, text: "Redactar contratos y documentos legales", campo: "JP" },
  { id: 69, text: "Abogado/a o Juez/a", campo: "JP" },
  { id: 70, text: "Participar en debates políticos", campo: "JP" },
  { id: 71, text: "Político/a o Diplomático/a", campo: "JP" },
  { id: 72, text: "Asesorar sobre temas legales o normativos", campo: "JP" },

  { id: 73, text: "Presentar noticias en radio o televisión", campo: "CI" },
  { id: 74, text: "Realizar entrevistas a personajes", campo: "CI" },
  { id: 75, text: "Presentador/a de TV o Locutor/a", campo: "CI" },
  { id: 76, text: "Gestionar redes sociales y contenido digital", campo: "CI" },
  { id: 77, text: "Productor/a audiovisual o Community Manager", campo: "CI" },
  { id: 78, text: "Editar videos y contenido multimedia", campo: "CI" },

  { id: 79, text: "Explicar conceptos a estudiantes", campo: "E" },
  { id: 80, text: "Preparar materiales didácticos", campo: "E" },
  { id: 81, text: "Maestro/a o Profesor/a", campo: "E" },
  { id: 82, text: "Motivar a estudiantes en su aprendizaje", campo: "E" },
  { id: 83, text: "Orientador/a educativo/a o Pedagogo/a", campo: "E" },
  { id: 84, text: "Diseñar programas de formación", campo: "E" },

  { id: 85, text: "Patrullar y vigilar zonas", campo: "SE" },
  { id: 86, text: "Investigar escenas de crímenes", campo: "SE" },
  { id: 87, text: "Policía o Detective", campo: "SE" },
  { id: 88, text: "Realizar rescates de emergencia", campo: "SE" },
  { id: 89, text: "Bombero/a o Militar", campo: "SE" },
  { id: 90, text: "Proteger personas o custodiar bienes", campo: "SE" },

  { id: 91, text: "Entrenar a deportistas", campo: "D" },
  { id: 92, text: "Planificar programas de entrenamiento", campo: "D" },
  { id: 93, text: "Entrenador/a deportivo/a o Preparador/a físico/a", campo: "D" },
  { id: 94, text: "Practicar deportes de competición", campo: "D" },
  { id: 95, text: "Deportista profesional o Árbitro/a", campo: "D" },
  { id: 96, text: "Organizar eventos deportivos", campo: "D" },

  { id: 97, text: "Cultivar plantas y vegetales", campo: "AA" },
  { id: 98, text: "Proteger espacios naturales", campo: "AA" },
  { id: 99, text: "Ingeniero/a agrónomo/a o ambiental", campo: "AA" },
  { id: 100, text: "Trabajar en conservación de fauna", campo: "AA" },
  { id: 101, text: "Veterinario/a de campo o Guardaparques", campo: "AA" },
  { id: 102, text: "Gestionar recursos naturales y reciclaje", campo: "AA" },

  { id: 103, text: "Programar aplicaciones o páginas web", campo: "I" },
  { id: 104, text: "Administrar bases de datos y redes", campo: "I" },
  { id: 105, text: "Programador/a o Desarrollador/a web", campo: "I" },
  { id: 106, text: "Desarrollar videojuegos o apps móviles", campo: "I" },
  { id: 107, text: "Ingeniero/a de software o Analista de sistemas", campo: "I" },
  { id: 108, text: "Implementar ciberseguridad o inteligencia artificial", campo: "I" }
];

// ========== ESTADO GLOBAL ==========
let user = {};
let answers = {};
let timeStart = 0, timeEnd = 0;
let timerInterval;
let elapsedSeconds = 0;

// ✅ URL DE GOOGLE APPS SCRIPT
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyclvBobnRiPw_M3b8Cz17uZUNr_sK2ramc38Xri1_gHbWiTC_0reSKeD6ZdKMJb3-e/exec";

// ========== NAVEGACIÓN ==========
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  window.scrollTo(0, 0);
}

function goToInstructions() {
  const n = document.getElementById('userName').value.trim();
  const l = document.getElementById('userLast').value.trim();
  const e = document.getElementById('userEmail').value.trim();
  if (!n || !l || !e) return alert("Complete todos los campos");
  user = { name: n, lastname: l, email: e };
  showSection('instSection');
}

// ========== TEST ==========
function startTest() {
  timeStart = Date.now();
  renderQuestions();
  showSection('testSection');
  document.getElementById('timerDisplay').style.display = 'block';
  elapsedSeconds = 0;
  startTimer();
}

function renderQuestions() {
  const container = document.getElementById('questionsContainer');
  container.innerHTML = '';

  ITEMS_IPP.forEach(q => {
    const div = document.createElement('div');
    div.className = 'question-item';
    div.id = 'q-' + q.id;
    div.innerHTML = `
      <span class="q-number">${q.id}</span>
      <span class="q-text">${q.text}</span>
      <div class="options-ipp">
        <button class="opt-btn-ipp" onclick="selectAnswer(${q.id}, 'A', this)" title="Agrada">A</button>
        <button class="opt-btn-ipp" onclick="selectAnswer(${q.id}, 'I', this)" title="Indiferente">I</button>
        <button class="opt-btn-ipp" onclick="selectAnswer(${q.id}, 'D', this)" title="Desagrada">D</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function selectAnswer(qId, val, btnElem) {
  answers[qId] = val;

  const parent = btnElem.parentElement;
  Array.from(parent.children).forEach(child => {
    child.classList.remove('selected-a', 'selected-i', 'selected-d');
  });
  btnElem.classList.add('selected-' + val.toLowerCase());

  document.getElementById('q-' + qId).classList.add('answered');
  updateProgress();
}

function updateProgress() {
  const answered = Object.keys(answers).length;
  const total = 108;
  const percent = Math.round((answered / total) * 100);

  document.getElementById('progressBar').style.width = percent + '%';
  document.getElementById('progressCount').innerText = answered;
  document.getElementById('progressPercent').innerText = percent + '%';
}

function finishTest() {
  const answeredCount = Object.keys(answers).length;
  if (answeredCount < 108) {
    if (!confirm(`Ha respondido ${answeredCount} de 108 preguntas.\n\n¿Desea finalizar de todos modos?`)) return;
  }
  clearInterval(timerInterval);
  timeEnd = Date.now();
  document.getElementById('timerDisplay').style.display = 'none';
  showSection('finalSection');
  sendResults();
}

// ========== ENVIAR RESULTADOS ==========
async function sendResults() {
  const tiempoUsado = formatTimeUsed(timeStart, timeEnd);
  const respuestasFormateadas = formatAnswers(answers);
  const respuestasFinal = `{${tiempoUsado} - ${respuestasFormateadas}}`;

  const today = new Date();
  const fecha = today.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });

  const sessionUser = JSON.parse(localStorage.getItem('sessionUser')) || {};
  const permisoRaw = sessionUser.reenvioSimultaneo || 'NO';
  const emailAdmin = sessionUser.adminEmail || "escencialconsult@gmail.com";

  const filaOrdenada = [
    fecha,
    user.name || "SinNombre",
    user.lastname || "SinApellido",
    getStoredEmail(),   
    respuestasFinal
  ];

  const payload = {
    nombreHoja: "Respuestas",
    fila: filaOrdenada
  };

  console.log("Enviando a la base de datos:", payload);

  try {
    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const txt = await res.text().catch(() => "");
    console.log("GAS Response:", txt);

    document.getElementById('loadingMsg').innerText = "¡Datos guardados correctamente!";
    document.getElementById('loadingMsg').style.color = "#059669";
    incrementCountAndRenderRetry();
  } catch (error) {
    console.error("Error enviando a Google Sheets:", error);
    document.getElementById('loadingMsg').innerText = "⚠️ Error de conexión, avise al administrador.";
    document.getElementById('loadingMsg').style.color = "orange";
  }
}

// ========== UTILIDADES ==========
function formatTimeUsed(startTime, endTime) {
  if (!startTime || !endTime) return "0m 0s";
  const diffMs = endTime - startTime;
  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

function formatAnswers(answersObj) {
  const sortedIds = Object.keys(answersObj).map(Number).sort((a, b) => a - b);
  const formatted = sortedIds.map(id => `${id};${answersObj[id]}`).join(', ');
  return formatted || "Sin respuestas";
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
  document.getElementById('timerDisplay').innerText = `${m}:${s}`;
}

// ===============================
// ✅ EXPORTAR A WINDOW (por onclick en HTML)
// ===============================
window.goToInstructions = goToInstructions;
window.startTest = startTest;
window.finishTest = finishTest;
window.selectAnswer = selectAnswer;
