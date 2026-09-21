import { incrementCountAndRenderRetry,getStoredEmail } from '../../js/helpers/finalActions.js';

(function guard() {
  const logged = localStorage.getItem('sessionLoggedIn') === '1';
})();

let currentPage = 0;
const questionsPerPage = 10;
let totalPages = 5;
let questionOrder = [];
let answers = {};
let currentResults = null;
let userFirstName = '';
let userLastName = '';
let userName = '';
let userEmail = '';

const questionDatabase = {
  extraversion: [
    { id: 1, text: 'Soy la vida de la fiesta', reverse: false },
    { id: 6, text: 'No hablo mucho', reverse: true },
    { id: 11, text: 'Me siento cómodo/a estando rodeado/a de gente', reverse: false },
    { id: 16, text: 'Me quedo en segundo plano', reverse: true },
    { id: 21, text: 'Inicio conversaciones', reverse: false },
    { id: 26, text: 'Tengo poco que decir', reverse: true },
    { id: 31, text: 'Hablo con muchas personas diferentes en las fiestas', reverse: false },
    { id: 36, text: 'No me gusta llamar la atención', reverse: true },
    { id: 41, text: 'Tomo el control', reverse: false },
    { id: 46, text: 'Soy callado/a cerca de extraños', reverse: true }
  ],
  agreeableness: [
    { id: 2, text: 'Siento poco interés por los demás', reverse: true },
    { id: 7, text: 'Me interesan los problemas de otras personas', reverse: false },
    { id: 12, text: 'Insulto a la gente', reverse: true },
    { id: 17, text: 'Simpatizo con los sentimientos de otros', reverse: false },
    { id: 22, text: 'No me interesan los problemas de otras personas', reverse: true },
    { id: 27, text: 'Tengo un corazón suave', reverse: false },
    { id: 32, text: 'No estoy realmente interesado/a en otros', reverse: true },
    { id: 37, text: 'Me tomo tiempo para otros', reverse: false },
    { id: 42, text: 'No estoy interesado/a en los problemas de otras personas', reverse: true },
    { id: 47, text: 'Hago sentir cómodos a los demás', reverse: false }
  ],
  conscientiousness: [
    { id: 3, text: 'Siempre estoy preparado/a', reverse: false },
    { id: 8, text: 'Dejo mis pertenencias por ahí tiradas', reverse: true },
    { id: 13, text: 'Presto atención a los detalles', reverse: false },
    { id: 18, text: 'Hago un lío de las cosas', reverse: true },
    { id: 23, text: 'Hago las cosas de acuerdo a un plan', reverse: false },
    { id: 28, text: 'A menudo olvido poner las cosas en su lugar', reverse: true },
    { id: 33, text: 'Me gusta el orden', reverse: false },
    { id: 38, text: 'Evado mis deberes', reverse: true },
    { id: 43, text: 'Sigo un horario', reverse: false },
    { id: 48, text: 'Hago las cosas a medias', reverse: true }
  ],
  neuroticism: [
    { id: 4, text: 'Me estreso fácilmente', reverse: false },
    { id: 9, text: 'Estoy relajado/a la mayor parte del tiempo', reverse: true },
    { id: 14, text: 'Me preocupo por las cosas', reverse: false },
    { id: 19, text: 'Rara vez me siento triste', reverse: true },
    { id: 24, text: 'Me irrito fácilmente', reverse: false },
    { id: 29, text: 'Me siento cómodo/a conmigo mismo/a', reverse: true },
    { id: 34, text: 'Cambio de humor frecuentemente', reverse: false },
    { id: 39, text: 'Tengo frecuentes cambios de humor', reverse: false },
    { id: 44, text: 'Me molesto fácilmente', reverse: false },
    { id: 49, text: 'Rara vez pierdo la calma', reverse: true }
  ],
  openness: [
    { id: 5, text: 'Tengo un vocabulario rico y extenso', reverse: false },
    { id: 10, text: 'Tengo dificultad para entender ideas abstractas', reverse: true },
    { id: 15, text: 'Tengo una imaginación vívida', reverse: false },
    { id: 20, text: 'No me interesan las ideas abstractas', reverse: true },
    { id: 25, text: 'Paso tiempo reflexionando sobre las cosas', reverse: false },
    { id: 30, text: 'Evito conversaciones filosóficas', reverse: true },
    { id: 35, text: 'No me interesan conceptos abstractos', reverse: true },
    { id: 40, text: 'No tengo buena imaginación', reverse: true },
    { id: 45, text: 'Tengo excelentes ideas', reverse: false },
    { id: 50, text: 'No soy una persona muy imaginativa', reverse: true }
  ]
};

const reverseItems = {
  extraversion: [6, 16, 26, 36, 46],
  agreeableness: [2, 12, 22, 32, 42],
  conscientiousness: [8, 18, 28, 38, 48],
  neuroticism: [9, 19, 29, 49],
  openness: [10, 20, 30, 35, 40, 50]
};

const allReverseItems = Object.values(reverseItems).flat();

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateRandomizedQuestions() {
  const dimensions = ['extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness'];
  const dimensionNames = {
    extraversion: 'Extraversión',
    agreeableness: 'Amabilidad',
    conscientiousness: 'Responsabilidad',
    neuroticism: 'Neuroticismo',
    openness: 'Apertura'
  };

  const shuffledDimensions = shuffleArray(dimensions);
  const randomizedQuestions = [];

  shuffledDimensions.forEach(dimension => {
    const shuffledQuestions = shuffleArray(questionDatabase[dimension]);
    shuffledQuestions.forEach(q => {
      randomizedQuestions.push({
        ...q,
        dimension: dimension,
        dimensionName: dimensionNames[dimension]
      });
    });
  });

  return randomizedQuestions;
}

function startTest() {
  userFirstName = document.getElementById('userFirstName').value.trim();
  userLastName = document.getElementById('userLastName').value.trim();
  userEmail = document.getElementById('userEmail').value.trim();
  userName = `${userFirstName} ${userLastName}`.trim();

  if (!userFirstName || !userLastName || !userEmail) {
    const formError = document.getElementById('formError');
    formError.textContent = '⚠️ Por favor completa todos los campos requeridos.';
    formError.classList.remove('hidden');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail)) {
    const formError = document.getElementById('formError');
    formError.textContent = '⚠️ Por favor ingresa un email válido.';
    formError.classList.remove('hidden');
    return;
  }

  document.getElementById('formError').classList.add('hidden');

  questionOrder = generateRandomizedQuestions();
  currentPage = 0;
  answers = {};
  renderPage();

  document.getElementById('intro').classList.add('hidden');
  document.getElementById('test').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage() {
  const startIdx = currentPage * questionsPerPage;
  const endIdx = startIdx + questionsPerPage;
  const pageQuestions = questionOrder.slice(startIdx, endIdx);

  let html = '';
  pageQuestions.forEach((q, idx) => {
    const globalIdx = startIdx + idx;
    const reverseTag = q.reverse ? '<span class="reverse-indicator">INVERSO</span>' : '';
    const isAnswered = answers[q.id] !== undefined ? 'answered' : '';

    html += `
      <div class="question-block ${isAnswered}" data-question="${q.id}">
        <div class="question-number">Pregunta ${globalIdx + 1} - ${q.dimensionName}${reverseTag}</div>
        <div class="question-text">${q.text}</div>
        <div class="options">
          <div class="option">
            <input type="radio" name="q${q.id}" value="5" id="q${q.id}-1" ${answers[q.id] === 5 ? 'checked' : ''}>
            <label for="q${q.id}-1">Muy de acuerdo</label>
          </div>
          <div class="option">
            <input type="radio" name="q${q.id}" value="4" id="q${q.id}-2" ${answers[q.id] === 4 ? 'checked' : ''}>
            <label for="q${q.id}-2">De acuerdo</label>
          </div>
          <div class="option">
            <input type="radio" name="q${q.id}" value="3" id="q${q.id}-3" ${answers[q.id] === 3 ? 'checked' : ''}>
            <label for="q${q.id}-3">Neutral</label>
          </div>
          <div class="option">
            <input type="radio" name="q${q.id}" value="2" id="q${q.id}-4" ${answers[q.id] === 2 ? 'checked' : ''}>
            <label for="q${q.id}-4">En desacuerdo</label>
          </div>
          <div class="option">
            <input type="radio" name="q${q.id}" value="1" id="q${q.id}-5" ${answers[q.id] === 1 ? 'checked' : ''}>
            <label for="q${q.id}-5">Muy en desacuerdo</label>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById('testForm').innerHTML = html;

  document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', function () {
      const qId = parseInt(this.name.replace('q', ''), 10);
      answers[qId] = parseInt(this.value, 10);
      const questionBlock = this.closest('.question-block');
      questionBlock.classList.add('answered');
      updateProgress();
    });
  });

  updateProgress();
  updateButtons();
}

function updateProgress() {
  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / 50) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
  document.getElementById('currentQ').textContent = totalAnswered;
  document.getElementById('currentPage').textContent = currentPage + 1;
}

function updateButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');

  prevBtn.classList.toggle('hidden', currentPage === 0);

  if (currentPage === totalPages - 1) {
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
  }
}

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function nextPage() {
  const startIdx = currentPage * questionsPerPage;
  const endIdx = startIdx + questionsPerPage;
  const pageQuestions = questionOrder.slice(startIdx, endIdx);

  const allAnswered = pageQuestions.every(q => answers[q.id] !== undefined);

  if (!allAnswered) {
    document.getElementById('validationMessage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  document.getElementById('validationMessage').classList.add('hidden');

  if (currentPage < totalPages - 1) {
    currentPage++;
    renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function submitTest() {
  if (Object.keys(answers).length < 50) {
    document.getElementById('validationMessage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  calculateResults();
}

function calculateResults() {
  const responses = {};

  questionOrder.forEach(q => {
    let value = answers[q.id];
    if (allReverseItems.includes(q.id)) {
      value = 6 - value;
    }
    responses[q.id] = value;
  });

  const extraversion = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46].reduce((sum, id) => sum + (responses[id] || 0), 0);
  const agreeableness = [2, 7, 12, 17, 22, 27, 32, 37, 42, 47].reduce((sum, id) => sum + (responses[id] || 0), 0);
  const conscientiousness = [3, 8, 13, 18, 23, 28, 33, 38, 43, 48].reduce((sum, id) => sum + (responses[id] || 0), 0);
  const neuroticism = [4, 9, 14, 19, 24, 29, 34, 39, 44, 49].reduce((sum, id) => sum + (responses[id] || 0), 0);
  const openness = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50].reduce((sum, id) => sum + (responses[id] || 0), 0);

  currentResults = { extraversion, agreeableness, conscientiousness, neuroticism, openness };

  displayResults(currentResults);
}

function displayResults(scores) {
  // Q1–Q50 (sin inversión, tal como marcó el usuario)
  const originalAnswers = [];
  for (let i = 1; i <= 50; i++) originalAnswers.push(answers[i] ?? 0);

  const dataForSheets = {
    // IMPORTANTE: poné acá el nombre REAL de la hoja que existe en tu Spreadsheet
    // Si solo tenés "Respuestas", dejalo así:
    nombreHoja: "Respuestas",
    nombre: userFirstName,
    apellido: userLastName,
    userEmail : userEmail,
    respuestas: originalAnswers
  };

  sendToGoogleSheets(dataForSheets).then(success => {
    const msg = document.getElementById('results-message');
    console.log('Envío a Google Sheets:', success);

    msg.textContent = success
      ? '✅ Tus respuestas han sido registradas y enviadas correctamente. ¡Gracias por completar el test!'
      : '⚠️ Hubo un problema al enviar tus respuestas. Por favor, intenta nuevamente o contacta al administrador.';
  });

  document.getElementById('test').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function sendToGoogleSheets(data) {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbwozcyVHg0liuKMRNUm7ukuv9redYfW1fvIsHcrk0qbtoyxSmyCnxX6Mxw5JjgA3LY_/exec";

  const timestamp = new Date().toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });

  const respuestasCSV = Array.isArray(data.respuestas)
    ? data.respuestas.join(',')
    : String(data.respuestas || '');

  const fila = [
    timestamp,
    data.nombre || '',
    data.apellido || '',
    getStoredEmail() || '',
    respuestasCSV
  ];

  const payload = { nombreHoja: data.nombreHoja || 'Respuestas', fila };

  try {
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    // Con no-cors NO hay confirmación real: asumimos OK si no hubo error
    console.log("POST enviado (no-cors). No se puede leer respuesta.");
    incrementCountAndRenderRetry();
    return true; 

  } catch (err) {
    console.error('❌ Error POST:', err);
    return false;
  }
}
function exportResults() {
  window.print();
}

function restartTest() {
  currentPage = 0;
  answers = {};
  questionOrder = [];

  document.getElementById('results').classList.add('hidden');
  document.getElementById('intro').classList.remove('hidden');
  document.getElementById('validationMessage').classList.add('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.startTest = startTest;
window.nextPage = nextPage;
window.previousPage = previousPage;
window.submitTest = submitTest;
window.exportResults = exportResults;
window.restartTest = restartTest;