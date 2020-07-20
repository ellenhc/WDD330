const startURL = "https://opentdb.com/api.php?";

let questionList = [];
let currentQuestionIndex = 0;
let score = 0;

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

            //add a click handler for correct answer
            answer.addEventListener("click", () => {
                if (!container.classList.contains("done")) {
                    container.classList.add("done"); //adds class "done"

                    answer.style.backgroundColor = "#007849"; //change background-color to green
                    answer.style.transition = "all 0.5s"; //adds gradual transition to green color

                    score++; //increments the score
                }
            })
        } else {
            const answer = document.createElement("div");
            answer.innerHTML = `<p>${currentQuestion.incorrect_answers[i]}</p>`;
            answer.classList.add("answer");
            answerContainer.appendChild(answer);

            //add a click handler for incorrect answers
            answer.addEventListener("click", () => {
                if (!container.classList.contains("done")) {
                    container.classList.add("done"); //adds class "done"
                    answer.style.backgroundColor = "#C30916"; //change background-color to red
                    answer.style.transition = "all 0.5s"; //adds a gradual transition to red color
                }
            })
        }
    });

    container.appendChild(answerContainer); //adds the answer container to page
    renderButtons(); //adds next button once an answer has been clicked
}

function renderButtons() {
    const node = document.querySelector(".trivia-container");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-container");

    /*const backButton = document.createElement("span");
    backButton.innerHTML = `&#9664 Back`;
    backButton.classList.add("btn");
    buttonContainer.appendChild(backButton);*/

    const nextButton = document.createElement("span");
    nextButton.innerHTML = `Next &#9658`;
    nextButton.classList.add("btn");
    buttonContainer.appendChild(nextButton);
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        renderOneQuestion();
    })

    node.appendChild(buttonContainer);
}

function renderStats(node) {
    const statsBox = document.createElement("div");
    statsBox.classList.add("stats-box");
    node.appendChild(statsBox);

    statsBox.innerHTML = `<div class="score-box"><p>Score:</p> <h3>${score} / ${questionList.length}</h3></div>`;
}