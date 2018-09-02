//create global variable for currnt qustion and increment
let currentQuestion = 0;
let score = 0;
let wrong = 0;
let pageCount = 0;

function startPage() {
  $(".inner-container").html(`
        <div class="btnBox">
        <button tabindex="0" type="submit" class="startBtn">Start Quiz</button>
        </div>
        `);
}

function startQuiz() {
  $('.score').text(`Correct: ${score}`);
  $('.wrongScore').text(`Incorrect: ${wrong}`);
  $('.startBtn').on('click', function() {
    renderQuestion(currentQuestion);
  });
}

function renderQuestion(num) {
  pageCount++;
  const quizQuestion = STORE[num].question;
  const answerChoice = STORE[num].answers;
  const answers = answerChoice.map(answer => (
    `
    <div class="col-6">
      <div class="btnContainer">
        <button role="button" tabindex="0" type="submit" class="js-answer_btn">${answer}</button>
      </div>
    </div>
  `
  )).join('');

  $('.inner-container').html(
    `
  <form role="form">
    <p class="center_Text">Question ${pageCount} of 10</p>
  <h3 class="cur_quest" >${quizQuestion}</h3>

  <fieldset>
  <legend class="center_Text">Select an answer:</legend>
  ${answers}
</fieldset>
</form>  `
  );
}

//Render a new question after clicking next question
function nextQuestion() {
  $('.inner-container').on("click", ".nextQuestion", function() {
    currentQuestion++
    if (currentQuestion <= 9) {
      renderQuestion(currentQuestion);
    } else {
      renderFinalScore();
    }
  });
}


function getAnswer() {
  $('.inner-container').on('click','.js-answer_btn', function(event) {
    event.preventDefault()
    let answerClicked = $(this).text();
    confirmAnswer(answerClicked);
  });
}

function confirmAnswer(answer) {

  const CHECKANS = STORE[currentQuestion].rightAnswer;

  if (answer == CHECKANS) {
    score += 1;
    $('.score').text(`Correct: ${score}`);
    correctAnswer();
  } else {
    wrong += 1;
    $('.wrongScore').text(`Incorrect: ${wrong}`);
    wrongAnswer();
  }
}


function correctAnswer() {
  if (pageCount <= 9) {
    $('.inner-container').html(
      `<h1 class="check_answer">Correct!</h1>
          <button type="submit" class="nextQuestion">Next Question</button>
        `);
  } else {
    $('.inner-container').html(
      `<h1 class="check_answer">Correct!</h1>
          <button type="submit" class="nextQuestion">
          Final Results
          </button>
        `);
  }
}

function wrongAnswer() {
  let isAnswer = STORE[currentQuestion].rightAnswer;
  $('.inner-container').html(
    ` <h1 class="check_answer" >Incorrect!</h1>
    <p class="corrected">The correct answer is ${isAnswer}.</p>
          <button type="submit" class="nextQuestion">
          Next Question
          </button>
            `);
}

function restartQuiz() {
  $('.inner-container').on('click', '.restart', function() {
     currentQuestion = 0;
     score = 0;
     wrong = 0;
     pageCount = 0;
     $('.score').text(`Correct: ${score}`);
     $('.wrongScore').text(`Incorrect: ${wrong}`);
    renderQuestion(currentQuestion);
  });
}

function renderFinalScore() {
  $('.inner-container').html(
    `
    <h3>Your final score is: ${score} / 10, or ${score * 10}% </h3>
    <button type="submit" class="restart">Restart Quiz</button>    `

  );
}

//in charge of all functions that create event listeners
function handleQuizElements() {
  startPage();
  startQuiz();
  nextQuestion();
  getAnswer();
  restartQuiz();
}

$(handleQuizElements);
