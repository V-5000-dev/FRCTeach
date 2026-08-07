function TextBlock({ heading, body }) {
    const container = document.getElementById('lesson-content');
    const block = document.createElement('div');
    block.className = 'text-block';
    block.innerHTML = `<h2>${heading}</h2><p>${body}</p>`;
    container.appendChild(block);
}

  function Quiz({questions, containerId = 'lesson-content' }) {
    const container = document.getElementById(containerId);
    const quizDiv = document.createElement('div');
    quizDiv.className = 'block-quiz';
    container.appendChild(quizDiv);
  
    let currentQ = 0;
    let score = 0;
  
    function renderQuestion() {
      const q = questions[currentQ];
      quizDiv.innerHTML = `
        <h3 class="quiz-question">${q.question}</h3>
        <div class="quiz-options"></div>
      `;
      const optionsDiv = quizDiv.querySelector('.quiz-options');
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i, btn);
        optionsDiv.appendChild(btn);
      });
    }
  
    function selectAnswer(i, btn) {
      const correct = i === questions[currentQ].answer;
      if (correct) score++;
      btn.classList.add(correct ? 'correct' : 'incorrect');
  
      Array.from(quizDiv.querySelectorAll('.quiz-option')).forEach(b => b.disabled = true);
  
      setTimeout(() => {
        currentQ++;
        if (currentQ < questions.length) {
          renderQuestion();
        } else {
          quizDiv.innerHTML = `<h3>Score: ${score}/${questions.length}</h3>`;
        }
      }, 800);
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