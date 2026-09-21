import { URL_TEST15 } from "../../js/config/constants.js";
import { incrementCountAndRenderRetry,getStoredEmail } from "../../js/helpers/finalActions.js";
/* ===== FUNCIÓN COMPARTIDA: ENVÍO CON ADMIN + REENVÍO ===== */
function enviarConReenvioSimultaneo(payload, googleScriptUrl) {
//  const sessionUser = JSON.parse(localStorage.getItem('sessionUser')) || {};
 // let permisoRaw = localStorage.getItem('PERMISO_REENVIO') || 'NO';
 // const permisoReenvio = permisoRaw.replace(/"/g, '');

//   const emailAdmin = sessionUser.adminEmail || null;
  const emailUsuario = payload.fila[3] || null;

  const enviar = (emailDestino) => {
    const copiaPayload = JSON.parse(JSON.stringify(payload));
    copiaPayload.fila[3] = emailDestino;

    return fetch(googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(copiaPayload)
    });
    
  };

//   if (emailAdmin) {
//     enviar(emailAdmin);
//   }

  if ( emailUsuario) {
    setTimeout(() => enviar(emailUsuario), 400);
  }
}

// ========== DATOS: ÍTEMS EBP ==========
const ITEMS_SECTION1 = [
  { id: 1, text: "Acostumbro a ver el lado favorable de las cosas." },
  { id: 2, text: "Me gusta transmitir mi felicidad a los demás." },
  { id: 3, text: "Me siento bien conmigo mismo." },
  { id: 4, text: "Todo me parece interesante." },
  { id: 5, text: "Me gusta divertirme." },
  { id: 6, text: "Me siento jovial." },
  { id: 7, text: "Busco momentos de distracción y descanso." },
  { id: 8, text: "Tengo buena suerte." },
  { id: 9, text: "Estoy ilusionado/a." },
  { id: 10, text: "Se me han abierto muchas puertas en mi vida." },
  { id: 11, text: "Me siento optimista." },
  { id: 12, text: "Me siento capaz de realizar mi trabajo." },
  { id: 13, text: "Creo que tengo buena salud." },
  { id: 14, text: "Duermo bien y de forma tranquila." },
  { id: 15, text: "Me creo útil y necesario/a para la gente." },
  { id: 16, text: "Creo que me sucederán cosas agradables." },
  { id: 17, text: "Creo que como persona (madre/padre, esposa/esposo, trabajador/trabajadora) he logrado lo que quería." },
  { id: 18, text: "Creo que valgo tanto como cualquier otra persona." },
  { id: 19, text: "Creo que puedo superar mis errores y debilidades." },
  { id: 20, text: "Creo que mi familia me quiere." },
  { id: 21, text: "Me siento «en forma»." },
  { id: 22, text: "Tengo muchas ganas de vivir." },
  { id: 23, text: "Me enfrento a mi trabajo y a mis tareas con buen ánimo." },
  { id: 24, text: "Me gusta lo que hago." },
  { id: 25, text: "Disfruto de las comidas." },
  { id: 26, text: "Me gusta salir y ver a la gente." },
  { id: 27, text: "Me concentro con facilidad en lo que estoy haciendo." },
  { id: 28, text: "Creo que, generalmente, tengo buen humor." },
  { id: 29, text: "Siento que todo me va bien." },
  { id: 30, text: "Tengo confianza en mí mismo/a." },
  { id: 31, text: "Vivo con cierto desahogo y bienestar." },
  { id: 32, text: "Puedo decir que soy afortunado/a." },
  { id: 33, text: "Tengo una vida tranquila." },
  { id: 34, text: "Tengo lo necesario para vivir." },
  { id: 35, text: "La vida me ha sido favorable." },
  { id: 36, text: "Creo que tengo una vida asegurada, sin grandes riesgos." },
  { id: 37, text: "Creo que tengo lo necesario para vivir cómodamente." },
  { id: 38, text: "Las condiciones en que vivo son cómodas." },
  { id: 39, text: "Mi situación es relativamente próspera." },
  { id: 40, text: "Estoy tranquilo/a sobre mi futuro económico." }
];

const ITEMS_SECTION2 = [
  { id: 1, text: "Mi trabajo es creativo, variado, estimulante." },
  { id: 2, text: "Mi trabajo da sentido a mi vida." },
  { id: 3, text: "Mi trabajo me exige aprender cosas nuevas." },
  { id: 4, text: "Mi trabajo es interesante." },
  { id: 5, text: "Mi trabajo es monótono, rutinario, aburrido." },
  { id: 6, text: "En mi trabajo he encontrado apoyo y afecto." },
  { id: 7, text: "Mi trabajo me ha proporcionado independencia." },
  { id: 8, text: "Estoy discriminado/a en mi trabajo." },
  { id: 9, text: "Mi trabajo es lo más importante para mí." },
  { id: 10, text: "Disfruto con mi trabajo." }
];

const ITEMS_SECTION3 = [
  { id: 1, text: "Atiendo al deseo sexual de mi esposo/a." },
  { id: 2, text: "Disfruto y me relajo con las relaciones sexuales." },
  { id: 3, text: "Me siento feliz como esposo/a." },
  { id: 4, text: "La sexualidad sigue ocupando un lugar importante en mi vida." },
  { id: 5, text: "Mi marido/mujer manifiesta cada vez menos deseo de realizar el acto sexual." },
  { id: 6, text: "Cuando estoy en casa no aguanto a mi marido/mujer en ella todo el día." },
  { id: 7, text: "Mis relaciones sexuales son ahora poco frecuentes." },
  { id: 8, text: "Mi pareja y yo tenemos una vida sexual activa." },
  { id: 9, text: "No temo expresar a mi marido/mujer mi deseo sexual." },
  { id: 10, text: "A mi marido/mujer le cuesta conseguir la erección." },
  { id: 11, text: "Mi interés sexual ha descendido." },
  { id: 12, text: "El acto sexual me produce dolores físicos, cosa que antes no me ocurría." },
  { id: 13, text: "Mi esposo/a y yo estamos de acuerdo en muchas cosas." },
  { id: 14, text: "Hago con frecuencia el acto sexual." },
  { id: 15, text: "El acto sexual me proporciona placer." }
];

// ========== ESTADO GLOBAL ==========
let user = {};
let answersSection1 = {};
let answersSection2 = {};
let answersSection3 = {};
let timeStart = 0;
let timeEnd = 0;
let timerInterval;
let elapsedSeconds = 0;

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
  const sexM = document.getElementById('sexM').checked;
  const sexF = document.getElementById('sexF').checked;
  
  if(!n || !l || !e) return alert("Complete todos los campos");
  if(!sexM && !sexF) return alert("Seleccione el sexo");
  
  const sex = sexM ? 'M' : 'F';
  user = { name: n, lastname: l, email: e, sex: sex };
  showSection('instSection');
}

// ========== SECCIÓN 1 ==========
function startSection1() {
  timeStart = Date.now();
  renderQuestionsSection1();
  showSection('section1');
  document.getElementById('timerDisplay').style.display = 'block';
  elapsedSeconds = 0;
  startTimer();
}

function renderQuestionsSection1() {
  const container = document.getElementById('questionsContainer1');
  container.innerHTML = '';
  
  ITEMS_SECTION1.forEach(q => {
    const div = document.createElement('div');
    div.className = 'question-item';
    div.id = 's1-' + q.id;
    
    let optionsHtml = '<div class="options-likert">';
    const labels = ['Nunca', 'Algunas veces', 'Bastantes veces', 'Casi siempre', 'Siempre'];
    for(let i = 1; i <= 5; i++) {
      optionsHtml += `
        <label class="opt-likert" onclick="selectOption(1, ${q.id}, ${i}, this)">
          <input type="radio" name="s1-${q.id}" value="${i}">
          <span class="likert-value">${i}</span>
          <span class="likert-label">${labels[i-1]}</span>
        </label>
      `;
    }
    optionsHtml += '</div>';
    
    div.innerHTML = `
      <div class="q-header">
        <span class="q-number">${q.id}</span>
        <span class="q-text">${q.text}</span>
      </div>
      ${optionsHtml}
    `;
    container.appendChild(div);
  });
}

function finishSection1() {
  const answered = Object.keys(answersSection1).length;
  if(answered < 40) {
    if(!confirm(`Ha respondido ${answered} de 40 preguntas en esta sección.\n\n¿Desea continuar de todos modos?`)) {
      return;
    }
  }
  renderQuestionsSection2();
  showSection('section2');
}

// ========== SECCIÓN 2 ==========
function renderQuestionsSection2() {
  const container = document.getElementById('questionsContainer2');
  container.innerHTML = '';
  
  ITEMS_SECTION2.forEach(q => {
    const div = document.createElement('div');
    div.className = 'question-item';
    div.id = 's2-' + q.id;
    
    let optionsHtml = '<div class="options-likert">';
    const labels = ['Nunca', 'Raras Veces', 'Algunas veces', 'Con Frecuencia', 'Casi Siempre'];
    for(let i = 1; i <= 5; i++) {
      optionsHtml += `
        <label class="opt-likert" onclick="selectOption(2, ${q.id}, ${i}, this)">
          <input type="radio" name="s2-${q.id}" value="${i}">
          <span class="likert-value">${i}</span>
          <span class="likert-label">${labels[i-1]}</span>
        </label>
      `;
    }
    optionsHtml += '</div>';
    
    div.innerHTML = `
      <div class="q-header">
        <span class="q-number">${q.id}</span>
        <span class="q-text">${q.text}</span>
      </div>
      ${optionsHtml}
    `;
    container.appendChild(div);
  });
}

function finishSection2() {
  const answered = Object.keys(answersSection2).length;
  if(answered < 10) {
    if(!confirm(`Ha respondido ${answered} de 10 preguntas en esta sección.\n\n¿Desea continuar de todos modos?`)) {
      return;
    }
  }
  renderQuestionsSection3();
  showSection('section3');
}

// ========== SECCIÓN 3 ==========
function renderQuestionsSection3() {
  const container = document.getElementById('questionsContainer3');
  container.innerHTML = '';
  
  ITEMS_SECTION3.forEach(q => {
    const div = document.createElement('div');
    div.className = 'question-item';
    div.id = 's3-' + q.id;
    
    let optionsHtml = '<div class="options-likert">';
    const labels = ['Totalmente en desacuerdo', 'Moderadamente en desacuerdo', 'En parte de acuerdo y en parte en desacuerdo', 'Moderadamente de acuerdo', 'Totalmente de acuerdo'];
    for(let i = 1; i <= 5; i++) {
      optionsHtml += `
        <label class="opt-likert" onclick="selectOption(3, ${q.id}, ${i}, this)">
          <input type="radio" name="s3-${q.id}" value="${i}">
          <span class="likert-value">${i}</span>
          <span class="likert-label">${labels[i-1]}</span>
        </label>
      `;
    }
    optionsHtml += '</div>';
    
    div.innerHTML = `
      <div class="q-header">
        <span class="q-number">${q.id}</span>
        <span class="q-text">${q.text}</span>
      </div>
      ${optionsHtml}
    `;
    container.appendChild(div);
  });
}

function finishTest() {
  const answered = Object.keys(answersSection3).length;
  if(answered < 15) {
    if(!confirm(`Ha respondido ${answered} de 15 preguntas en esta sección.\n\n¿Desea finalizar de todos modos?`)) {
      return;
    }
  }
  clearInterval(timerInterval);
  timeEnd = Date.now();
  document.getElementById('timerDisplay').style.display = 'none';
  showSection('finalSection');
  
  sendResults();
}

// ========== SELECCIÓN DE OPCIONES ==========
function selectOption(section, qId, value, labelElem) {
  if(section === 1) {
    answersSection1[qId] = value;
    document.getElementById('s1-' + qId).classList.add('answered');
    updateProgress(1);
  } else if(section === 2) {
    answersSection2[qId] = value;
    document.getElementById('s2-' + qId).classList.add('answered');
    updateProgress(2);
  } else if(section === 3) {
    answersSection3[qId] = value;
    document.getElementById('s3-' + qId).classList.add('answered');
    updateProgress(3);
  }
  
  const parent = labelElem.parentElement;
  Array.from(parent.children).forEach(child => {
    child.classList.remove('selected');
  });
  labelElem.classList.add('selected');
}

function updateProgress(section) {
  let answered, total, barId, countId, percentId;
  
  if(section === 1) {
    answered = Object.keys(answersSection1).length;
    total = 40;
    barId = 'progressBar1';
    countId = 'progressCount1';
    percentId = 'progressPercent1';
  } else if(section === 2) {
    answered = Object.keys(answersSection2).length;
    total = 10;
    barId = 'progressBar2';
    countId = 'progressCount2';
    percentId = 'progressPercent2';
  } else if(section === 3) {
    answered = Object.keys(answersSection3).length;
    total = 15;
    barId = 'progressBar3';
    countId = 'progressCount3';
    percentId = 'progressPercent3';
  }
  
  const percent = Math.round((answered / total) * 100);
  document.getElementById(barId).style.width = percent + '%';
  document.getElementById(countId).innerText = answered;
  document.getElementById(percentId).innerText = percent + '%';
}

// ========== ENVIAR RESULTADOS ==========
function sendResults() {
  const allAnswers = {
    section1: answersSection1,
    section2: answersSection2,
    section3: answersSection3
  };
  
  const respuestas = formatAnswersJSON(allAnswers);
  const tiempo = formatTimeUsed(timeStart, timeEnd);

  const now = new Date();
  const fechaHora = now.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const adminData = localStorage.getItem("adminData");
  let admin;
  if (adminData) {
    admin = JSON.parse(adminData);
    console.log("Admin logueado:", admin.nombre);
  } else {
    console.log("No hay admin logueado.");
  }

  const filaOrdenada = [
    fechaHora,
    user.name || "SinNombre",
    user.lastname || "SinApellido",
    getStoredEmail() || "SinEmail",
    user.sex || "N/A",
    respuestas
  ];

  const payload = {
    nombreHoja: "Respuestas",
    fila: filaOrdenada
  };

  console.log("Enviando a la base de datos:", payload);

  // ✅✅ CAMBIO: usar URL 15 (no tocar formato de respuestas)
  // Opción A (RECOMENDADA): traerla desde constants.js
  // (asegurate de tener este import arriba del archivo si usás módulos)
  // enviarConReenvioSimultaneo(payload, URL_TEST15);

  // ✅ Opción B (si NO querés usar import): pegá acá la URL 15 literal
  // Reemplazá ESTA constante por tu URL 15 real:
  const GOOGLE_SCRIPT_URL_15 = URL_TEST15;;
  enviarConReenvioSimultaneo(payload, GOOGLE_SCRIPT_URL_15);

  const msg = document.getElementById('loadingMsg');
  msg.innerText = "¡Resultados EBP guardados correctamente!";
  incrementCountAndRenderRetry();
  msg.style.color = "#059669";
}

// ========== FUNCIONES DE UTILIDAD ==========
function formatTimeUsed(startTime, endTime) {
  if(!startTime || !endTime) return "0m 0s";
  const diffMs = endTime - startTime;
  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

function formatAnswersJSON(answers) {
  return JSON.stringify(answers);
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
  const m = Math.floor(elapsedSeconds / 60).toString().padStart(2,'0');
  const s = (elapsedSeconds % 60).toString().padStart(2,'0');
  document.getElementById('timerDisplay').innerText = `${m}:${s}`;
}

function volverAlPanelUsuarios() {
  window.location.href = "../../usuarios.html";
}

// === HACER DISPONIBLES EN HTML (onclick="...") ===
window.goToInstructions = goToInstructions;
window.startSection1 = startSection1;
window.finishSection1 = finishSection1;
window.finishSection2 = finishSection2;
window.finishTest = finishTest;
window.selectOption = selectOption;
window.volverAlPanelUsuarios = volverAlPanelUsuarios;