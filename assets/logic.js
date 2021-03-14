//var to keep track of 
var time = 120;
var currentQuestionIndex = 0;
var timer;

//vars for DOM elements
var introEl = document.querySelector("intro");
var questionsEl = document.getElementById("questions");
var startBtn = document.getElementById("start"); 
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var titleEl = document.getElementById("question-title");


function startQuiz() {
    
//introEl.classList.add("hide")
//this remove, REMOVES the class and pops up a NEW class! This will make a new div pop up behind it. 
        
    timer = setInterval(clockTick, 1000)

    timerEl.textContent = time;

    getQuestion();
}

//this goes with LINE 3!
function getQuestion(){
    var currentQuestion = questions[currentQuestionIndex];
    //var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.textContent = "";
    currentQuestion.choices.forEach(function(choice, i){
        var c = document.createElement("button");
        c.setAttribute('class', 'choice')
        c.setAttribute('value', choice);
        c.textContent = i + 1 + "." + choice;
        c.onclick = choiceClick;
        //append the button we just made to the entire choices div
        choicesEl.append(c);
    });
    
}

function choiceClick(){
    var correctAnswer = questions[currentQuestionIndex].answers;
    var buttonValue = this.value
    if (buttonValue === correctAnswer){
        //no deductions on the timer and move forward
    }else {
        time-= 5;
        //the timer deducts 5 secs and move forward
    }
    //? buttonValue === correctAnswer
//check if correct answer then it's right, if not, it's wrong, then deduct 10 secs from the timer
//
    console.log(buttonValue)
}

function quizEnd() {
    clearInterval(timer);
    var endEl = document.getElementById("end-screen");
    endEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
}

function clockTick(){
    time--; 
    timerEl.textContent = time; 
    if(time <= 0) {
        quizEnd();
    }
}

function saveHighScore() {

}

startBtn.onclick = startQuiz;