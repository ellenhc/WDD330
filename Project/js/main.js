const startURL = "https://opentdb.com/api.php?";

let questionList = [];
let currentQuestionIndex = 0;
let score = 0;

const correctSound = new Audio("http://f5361a5c08a4c03f7c6f-acbeb9602bd0a56bf9c1a6bed3d8280b.r27.cf2.rackcdn.com/RightSound2%202.mp3");
const wrongSound = new Audio("http://f5361a5c08a4c03f7c6f-acbeb9602bd0a56bf9c1a6bed3d8280b.r27.cf2.rackcdn.com/wrongSound2.mp3");

const form = document.querySelector("form"); //grabs the form element

form.addEventListener('submit', (event) => {
    event.preventDefault(); //prevents page from reloading
    const url = startURL + `amount=${form.quantity.value}` + ((form.category.value != 'any') ? `&category=${form.category.value}` : '') + ((form.difficulty.value != 'any') ? `&difficulty=${form.difficulty.value}` : '') + `&type=multiple`; //creates url from user's input

    const request = new Request(url, {
        method: 'GET',
        mode: 'cors',
    })
    fetch(request)
        .then(response => response.json()) // converts from json to object
        .then(data => data.results) // then grab just the results
        .then(storeQuestions)
        .catch(error => console.log('There was an error:', error))
});

function storeQuestions(questions) {
    for (let i = 0; i < questions.length; i++) {
        let question = { question: questions[i].question, correct_answer: questions[i].correct_answer, incorrect_answers: questions[i].incorrect_answers }; //just saves the question, the correct answer, and the incorrect answers and not the other data
        questionList.push(question); //adds it to the questionList array
    }

    renderOneQuestion();
}

function getQuestionList() {
    return questionList;
}

function getCurrentQuestion() {
    return questionList[currentQuestionIndex];
}

function renderOneQuestion() {
    /*step 1 - remove previous page content*/
    const node = document.querySelector("body");
    node.innerHTML = "";
    renderStats(node);
    renderTimer();

    /*step 2 - renders current question to page*/
    const currentQuestion = getCurrentQuestion();
    const container = document.createElement("div"); //creates a div to hold the question content
    container.classList.add("trivia-container"); //adds a class to that div

    const questionDiv = document.createElement("div"); //adds a div to hold the question itself
    questionDiv.classList.add("question-div"); //adds a class to style the question
    questionDiv.innerHTML = `<h1>${currentQuestion.question}</h1>`; //adds the question text as an h1
    node.appendChild(container); //adds trivia-container to page
    container.appendChild(questionDiv); //adds questionDiv to page

    const answerContainer = document.createElement("div"); //creates container to hold the answers
    answerContainer.classList.add("answer-container"); //adds a class to that container

    let randomAnswer = [0, 1, 2, 3]; //has same length as number of possible answers
    //Shuffles array to get a number in no particular order using the Fisher Yates method
    for (i = randomAnswer.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i)
        k = randomAnswer[i]
        randomAnswer[i] = randomAnswer[j]
        randomAnswer[j] = k
    }
    randomAnswer.forEach((i) => {
        if (i == 3) {
            const answer = document.createElement("div");
            answer.innerHTML = `<p>${currentQuestion.correct_answer}</p>`;
            answer.classList.add("answer");
            answerContainer.appendChild(answer);

            //add a click handler for CORRECT answer
            answer.addEventListener("click", () => {
                if (!container.classList.contains("done")) {
                    container.classList.add("done"); //adds class "done"

                    answer.style.backgroundColor = "#007849"; //change background-color to green
                    answer.style.transition = "all 1.5s"; //adds gradual transition to green color

                    correctSound.play(); //sound effect

                    score++; //increments the score
                    //re-renders the scoreBox to reflect new score
                    const scoreBox = document.querySelector(".score-box");
                    scoreBox.innerHTML = renderScore();

                    renderTimer()
                }
            })
        } else {
            const answer = document.createElement("div");
            answer.innerHTML = `<p>${currentQuestion.incorrect_answers[i]}</p>`;
            answer.classList.add("answer");
            answerContainer.appendChild(answer);

            //add a click handler for INCORRECT answers
            answer.addEventListener("click", () => {
                if (!container.classList.contains("done")) {
                    container.classList.add("done"); //adds class "done"

                    wrongSound.play(); //sound effect

                    answer.style.backgroundColor = "#C30916"; //change background-color to red
                    answer.style.transition = "all 1.5s"; //adds a gradual transition to red color

                    renderTimer()

                    //alert(`The correct answer was ${currentQuestion.correct_answer}`);
                    showCorrectAnswer();
                }
            })
        }
    });

    container.appendChild(answerContainer); //adds the answer container to page
    renderButton(); //adds next button once an answer has been clicked
}

function renderButton() {
    const node = document.querySelector(".trivia-container");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-container");

    const nextButton = document.createElement("span");
    nextButton.innerHTML = `Next &#9658`;
    nextButton.classList.add("btn");
    buttonContainer.appendChild(nextButton);
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++; //increments the currentQuestionIndex to go to next q when fxn is called
        //renders the next question if the questions have not been exhausted
        if (currentQuestionIndex != questionList.length) {
            renderOneQuestion();
        } else {
            renderGoodbye();
        }
    })

    node.appendChild(buttonContainer);
}

function renderStats(node) {
    const statsBox = document.createElement("div");
    statsBox.classList.add("stats-box");
    node.appendChild(statsBox);

    const scoreBox = document.createElement("div");
    scoreBox.classList.add("score-box");
    scoreBox.innerHTML = renderScore();
    statsBox.appendChild(scoreBox);

    const timerBox = document.createElement("div");
    timerBox.classList.add("timer-box");
    timerBox.innerHTML = `<p>Timer</p><div id="timer"></div>`;
    statsBox.appendChild(timerBox);
}

function renderScore() {
    return `<p>Score</p><h3>${score} / ${questionList.length}</h3>`;
}

function renderTimer() {
    var i = 0;

    function move() {
        if (i == 0) {
            i = 1;
            var elem = document.getElementById("timer");
            var width = 1;
            var id = setInterval(frame, 600);

            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++;
                    elem.style.width = width + "%";
                }
            }
        }
    }
}

function renderGoodbye() {
    /*step 1 - remove question/answer content*/
    const node = document.querySelector(".trivia-container");
    node.innerHTML = "";

    /*step 2 - show message and play again button */
    const goodbyeContainer = document.createElement("div");
    goodbyeContainer.classList.add("goodbye-div");
    goodbyeContainer.innerHTML = `<p>Thanks for playing Ellen's trivia game!</p>`;

    const playAgain = document.createElement("div");
    playAgain.classList.add("play-again");
    playAgain.innerHTML = `Play Again?`
    goodbyeContainer.appendChild(playAgain);

    node.appendChild(goodbyeContainer);

    /*step 3 - reload page to go back to the original form when play again is clicked*/
    playAgain.addEventListener("click", () => {
        location.reload();
    })
}

function showCorrectAnswer() {
    const currentQuestion = getCurrentQuestion();
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const span = document.createElement("span");
    span.classList.add("close");
    span.innerHTML = `&times;`;
    modalContent.appendChild(span); //adds the span to modalContent

    modalContent.innerHTML = `<p>The correct answer was ${currentQuestion.correct_answer}</p>`
    modal.appendChild(modalContent); //adds modalContent to the modal

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}