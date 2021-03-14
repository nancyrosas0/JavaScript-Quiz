//var to keep track of 
var time = 100;
var currentQuestionIndex = 0;
var timerWrapper;
var score = 100;

//vars for DOM elements
var introEl = document.querySelector(".intro");
var feedbackEl = document.querySelector(".explain")
var questionsEl = document.getElementById("questions");
var startBtn = document.getElementById("start"); 
var timerWrapperEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var titleEl = document.getElementById("question-title");
var homeEl = document.getElementById("landing-page")
var endEl = document.getElementById("end-screen");
var highscoresEl = document.getElementById("highscores")
var highscoresBtn = document.getElementById("highscoresBtn")
var returnBtn = document.getElementById("returnBtn")


function startQuiz() {
    
//document.getElementById.removeAttribute("class");
//this remove, REMOVES the class and pops up a NEW class! This will make a new div pop up behind it. 
    homeEl.classList.add("hide")
    questionsEl.classList.remove("hide")
    //timerWrapperEl.classList.remove("hide")    
    timerWrapper = setInterval(clockTick, 1000)
    timerWrapperEl.textContent = time;
    getQuestion();
    }

//this goes with LINE 3!
function getQuestion(){
        var currentQuestion = questions[currentQuestionIndex];
        //var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.textContent = "";
    currentQuestion.choices.forEach(function(choice){
        var c = document.createElement("button");
        c.setAttribute('class', 'choice')
        c.setAttribute('value', choice);
        c.textContent = choice;
        c.onclick = choiceClick;
        //append the button we just made to the entire choices div
        choicesEl.append(c);
    });
    
}

function choiceClick(){
    var correctAnswer = questions[currentQuestionIndex].answers;
    var buttonValue = this.value
    if (buttonValue === correctAnswer){
        feedbackEl.textContent = "Correct!"
        //no deductions on the timerWrapper and move forward
    }else {
        time = time-5;
        score = score-20;
        feedbackEl.textContent = "Incorrect"
        //the timerWrapper deducts 5 secs and move forward
    }
    feedbackEl.classList.remove("hide")
    setTimeout(function() {
      feedbackEl.classList.add("hide")
    }, 2000);

    nextQuestion()
}

function nextQuestion(){
    currentQuestionIndex = currentQuestionIndex +1
    if (questions[currentQuestionIndex] === undefined) {

        quizEnd()
    }else {
        getQuestion()
    }
}

function quizEnd() {
    clearInterval(timerWrapper);
    endEl.classList.remove("hide")
    questionsEl.classList.add("hide")  
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = score;
}

function clockTick(){
    time--; 
    timerWrapperEl.textContent = time; 
    if(time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    var initials = initialsEl.value.trim()
    console.log(initials)
    var highscores = []
    var newUser = {
        score: score,
        initials: initials
    }
    highscores.push(newUser)
    localStorage.setItem('highscores', JSON.stringify(highscores));
viewHighscores()
}

function viewHighscores() {
    endEl.classList.add("hide")
    homeEl.classList.add("hide")
    questionsEl.classList.add("hide")
    highscoresEl.classList.remove("hide")    
}

function viewHome() {
    highscoresEl.classList.add("hide")
    homeEl.classList.remove("hide")
}

startBtn.onclick = startQuiz;
submitBtn.addEventListener("click", saveHighscore);
highscoresBtn.addEventListener("click", viewHighscores);
returnBtn.addEventListener("click", viewHome);

//PUll out timerWrapper and view Highscores into a Navbar so they don't hide <nav>
//Style with css
//use getitem local storage to put items into an array. Get what exists and put them into the highscores array []
//**remember, nr should not have been replaced by tt 
//view highscores page - need to get the item from local storage and use it to render their scores & initials on the page
//need to fix the return home button
//when return button is clicked, reset timerWrapper and score-- this may fix the return home button (check if the timerWrapper is causing this misfire)