var startBtn = document.querySelector("#startBtn");
var displayQuestion = document.getElementById("quizSection");
var displayScoreAndName = document.getElementById("score-name-input");
var score = 0;
var timeLeft = 0;
var currentQuestion = -1;
//Array of questions and answers
var questionsArr = [
  {
    question: "What type of language is JavaScript?",
    choices: ["Object-Oriented", "Object-Based", "Assembly-Language", "High-level"],
    answer: "Object-Based",
  },
  {
    question: "Function and Var are known as:",
    choices: [
      "Keywords",
      "Data Types",
      "Declaration Statements",
      "Prototypes",
    ],
    answer: "Declaration Statements",
  },
  {
    question:
      "In JavaScript, which of the following is not considered an error?",
    choices: [
      'Syntax error',
      'Missing semicolons',
      'Division of zero',
      'Missing bracket',
    ],
    answer: 'Division of zero',
  },
];

//Function to display the score leader on page load
window.onload = function () {
  var scoreAndNameInput = localStorage.getItem("score-name-input");

  if (!scoreAndNameInput) {
    displayScoreAndName.textContent = "N/A";
  } else {
    displayScoreAndName.textContent = scoreAndNameInput;
  }
};

//Function to start the quiz
function startQuiz() {
  timeLeft = 60;
  timer = setInterval(function () {
    document.getElementById("timer").innerHTML = timeLeft;
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("timer").textContent = "0";
      endQuiz();
    }
  }, 1000);

  startBtn.remove();
  startQuestions();
}

function startQuestions() {
  currentQuestion++;

  if (currentQuestion < questionsArr.length && timeLeft > 0) {
    displayQuestion.innerHTML = questionsArr[currentQuestion].question;
    createChoicesBtns();
  } else {
    endQuiz();
  }
};

function createChoicesBtns() {
  var btnsDiv = document.createElement("div");
  console.log(score);

  for (var i = 0; i < questionsArr[currentQuestion].choices.length; i++) {
    var choicesBtn = document.createElement("button");
    choicesBtn.className = "button";
    choicesBtn.textContent = questionsArr[currentQuestion].choices[i];
    btnsDiv.appendChild(choicesBtn);
    displayQuestion.append(btnsDiv);
    choicesBtn.setAttribute("onclick", "answerVerify(questionsArr[currentQuestion].answer, event.target.textContent)");
  };
};

//Function to see if the answer is correct
function answerVerify(answer,userChoice) {
  if (answer == userChoice) {
    score = score + 20;
  } else {
    incorrect();
  }
  startQuestions();
};

//Function subtract time
var incorrect = function() {
  timeLeft -= 15; 
  return;
};

//Function to end the quiz
function endQuiz() {
  timeLeft = 0;

  displayQuestion.innerHTML =
    "<h2>Congratulations!</h2><h3>You got a score of " +
    score +
    "/60!</h3><div><input type=text id='name' placeholder='Enter Initials Here'><button class='button' id='scoreBtn' onclick='saveScore()'>Submit Score</button></div>";
};

//Function save score to local storage
function saveScore() {
  localStorage.setItem("score-name-input", document.getElementById("name").value + " " + score+"pts");
  location.reload();
};

startBtn.addEventListener("click", startQuiz);