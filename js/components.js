import { EditorView, basicSetup } from 'https://esm.sh/codemirror@6.0.1';
import { javascript } from 'https://esm.sh/@codemirror/lang-javascript@6';
import { oneDark } from 'https://esm.sh/@codemirror/theme-one-dark@6';
import { EditorState } from 'https://esm.sh/@codemirror/state@6';

export function TextBlock({ heading, body }) {
  const container = document.getElementById('lesson-content');
  const block = document.createElement('div');
  block.className = 'text-block';
  block.innerHTML = `<h2>${heading}</h2><p>${body}</p>`;
  container.appendChild(block);
}
export function Quiz({ questions, containerId = 'lesson-content' }) {
  const container = document.getElementById(containerId);
  const quizDiv = document.createElement('div');
  quizDiv.className = 'quiz-block';
  container.appendChild(quizDiv);

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    answered = false;
    const q = questions[currentQuestion];

    quizDiv.innerHTML = `
      <div class="quiz-header">
        <h3 class="quiz-question">${currentQuestion + 1}. ${q.question}</h3>
        <span class="quiz-tracker">${currentQuestion + 1}/${questions.length}</span>
      </div>
      <div class="quiz-options"></div>
      <button class="btn" disabled></button>
    `;

    const optionsDiv = quizDiv.querySelector('.quiz-options');
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.onclick = () => selectAnswer(i, btn);
      optionsDiv.appendChild(btn);
    });

    const nextBtn = quizDiv.querySelector('.btn');
    nextBtn.textContent = 'Next';
    nextBtn.onclick = () => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        renderQuestion();
      } else {
        showResults();
      }
    };
  }



  function selectAnswer(i, btn) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const correct = i === q.answer;
    if (correct) score++;

    btn.classList.add(correct ? 'correct' : 'incorrect');

    const allButtons = quizDiv.querySelectorAll('.quiz-option');
    allButtons[q.answer].classList.add('correct');
    allButtons.forEach(b => b.disabled = true);

    quizDiv.querySelector('.btn').disabled = false;
  }

  function showResults() {
    const percent = Math.round((score / questions.length) * 100);
    quizDiv.innerHTML = `
      <h3>You got ${score}/${questions.length} correct.</h3>
      <div class="score-bar-track">
        <div class="score-bar-fill" style="width: ${percent}%"></div>
      </div>
      <p class="score-percent">${percent}%</p>
      <button class="retry-btn">Try Again</button>
    `;
    quizDiv.querySelector('.btn').onclick = () => {
      currentQuestion = 0;
      score = 0;
      renderQuestion();
    };
  }

  renderQuestion();
}

export function CodeViewer({ starterCode = '', containerId = 'lesson-content'}) {
  const container = document.getElementById(containerId);
  const wrapper = document.createElement('div');
  wrapper.className = 'code-editor-block';
  container.appendChild(wrapper);

  const view = new EditorView({
    doc: starterCode,
    extensions: [
      basicSetup,
      javascript(),
      oneDark,
      EditorView.editable.of(false)
    ],
    parent: wrapper
  });

  return view;
}
export function CodeEditor({ starterCode = '', answerCode = '', containerId = 'lesson-content' }) {
  const container = document.getElementById(containerId);
  const wrapper = document.createElement('div');
  wrapper.className = 'code-editor-block';
  container.appendChild(wrapper);

  const view = new EditorView({
    doc: starterCode,
    extensions: [basicSetup, javascript(), oneDark],
    parent: wrapper
  });

  const checkBtn = document.createElement('button');
  checkBtn.className = 'btn';
  checkBtn.textContent = 'Check';
  wrapper.appendChild(checkBtn);

  const resultText = document.createElement('p');
  resultText.className = 'result-text';
  wrapper.appendChild(resultText);

  checkBtn.onclick = () => {
    const viewContent = view.state.doc.toString().trim();
    const expected = answerCode.trim();

    if (viewContent === expected) {
      resultText.textContent = 'Correct';
      resultText.style.color = 'lightgreen';
    } else {
      resultText.textContent = 'Incorrect, ensure your syntax is fully correct.';
      resultText.style.color = 'salmon';
    }
  };

  return view;
}

export function PageNav({ containerId = 'lesson-content' }) {
  const container = document.getElementById(containerId);
  const pages = Array.from(container.querySelectorAll('.page'));
  let currentPage = 0;

  const nav = document.createElement('div');
  nav.className = 'page-nav';
  nav.innerHTML = `
  <button class="btn back-btn">Back</button>
  <span class="page-counter"></span>
  <button class="btn next-btn">Next</button>
`;
  container.appendChild(nav);

  const backBtn = nav.querySelector('.back-btn');
  const nextBtn = nav.querySelector('.next-btn');
  const counter = nav.querySelector('.page-counter');

  function showPage(index) {
    pages.forEach((page, i) => {
      page.style.display = i === index ? 'block' : 'none';
    });
    counter.textContent = `${index + 1} / ${pages.length}`;
    backBtn.disabled = index === 0;
    nextBtn.disabled = index === pages.length - 1;

    container.scrollIntoView({ behavior: 'smooth' });
  }

  backBtn.onclick = () => {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  };

  nextBtn.onclick = () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
      showPage(currentPage);
    }
  };

  showPage(currentPage);
}