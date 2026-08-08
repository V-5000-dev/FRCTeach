function TextBlock({ heading, body }) {
    const container = document.getElementById('lesson-content');
    const block = document.createElement('div');
    block.className = 'text-block';
    block.innerHTML = `<h2>${heading}</h2><p>${body}</p>`;
    container.appendChild(block);
}

function Quiz({ questions, containerId = 'lesson-content' }) {
  const container = document.getElementById(containerId);
  const quizDiv = document.createElement('div');
  quizDiv.className = 'quiz-block';
  container.appendChild(quizDiv);

  let currentQ = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    answered = false;
    const q = questions[currentQ];

    quizDiv.innerHTML = `
      <div class="quiz-header">
        <h3 class="quiz-question">${currentQ + 1}. ${q.question}</h3>
        <span class="quiz-tracker">${currentQ + 1}/${questions.length}</span>
      </div>
      <div class="quiz-options"></div>
      <button class="next-btn" disabled></button>
    `;

    const optionsDiv = quizDiv.querySelector('.quiz-options');
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.onclick = () => selectAnswer(i, btn);
      optionsDiv.appendChild(btn);
    });

    const nextBtn = quizDiv.querySelector('.next-btn');
    nextBtn.textContent = 'Next';
    nextBtn.onclick = () => {
      currentQ++;
      if (currentQ < questions.length) {
        renderQuestion();
      } else {
        showResults();
      }
    };
  }

  function selectAnswer(i, btn) {
    if (answered) return; // ignore clicks after the question is already answered
    answered = true;

    const q = questions[currentQ];
    const correct = i === q.answer;
    if (correct) score++;

    btn.classList.add(correct ? 'correct' : 'incorrect');

    const allButtons = quizDiv.querySelectorAll('.quiz-option');
    allButtons[q.answer].classList.add('correct');
    allButtons.forEach(b => b.disabled = true);

    quizDiv.querySelector('.next-btn').disabled = false;
  }

  function showResults() {
    const percent = Math.round((score / questions.length) * 100);
    quizDiv.innerHTML = `
      <h3>You got ${score}/${questions.length} correct</h3>
      <div class="score-bar-track">
        <div class="score-bar-fill" style="width: ${percent}%"></div>
      </div>
      <p class="score-percent">${percent}%</p>
      <button class="retry-btn">Try Again</button>
    `;
    quizDiv.querySelector('.retry-btn').onclick = () => {
      currentQ = 0;
      score = 0;
      renderQuestion();
    };
  }

  renderQuestion();
}
  function CodeEditor({ starterCode = '', containerId = 'lesson-content' }) {
    const container = document.getElementById(containerId);
    const wrapper = document.createElement('div');
    wrapper.className = 'code-editor-block';
    wrapper.innerHTML = `
      <textarea class="code-input" spellcheck="false">${starterCode}</textarea>
      <button class="run-btn">Run</button>
      <pre class="code-output"></pre>
    `;
    container.appendChild(wrapper);
  
    const runBtn = wrapper.querySelector('.run-btn');
    const input = wrapper.querySelector('.code-input');
    const output = wrapper.querySelector('.code-output');
  
    runBtn.onclick = () => {
      try {
        const result = eval(input.value);
        output.textContent = result === undefined ? '(no return value)' : result;
      } catch (e) {
        output.textContent = 'Error: ' + e.message;
      }
    };
  }