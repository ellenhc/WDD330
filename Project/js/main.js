//example url https://opentdb.com/api.php?amount=11&category=19&difficulty=easy&type=multiple
//amount=11 is the number of questions
//category=19 is the category (each is given a number)
//difficulty=easy
//will always show type=multiple
const startURL = "https://opentdb.com/api.php?";

//the url is a json file. each multiple choice question has 4 answers. each question has a category, type, difficulty, question, correct_answer, and incorrect_answers

let questionList = [];
let currentQuestionIndex = 0;

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
        let question = { question: questions[i].question, correct_answer: questions[i].correct_answer, incorrect_answers: questions[i].incorrect_answers };
        questionList.push(question);
    }
    //console.log(questions);
    //console.log(questionList);
    renderOneQuestion();
}

function getQuestionList() {
    return questionList;
}

function getCurrentQuestion() {
    return questionList[currentQuestionIndex];
}

function renderOneQuestion() {
    //step 1 - remove page content (this works, i've checked)
    const node = document.querySelector("body");
    node.innerHTML = "";
    //step 2 - render to page
    const currentQuestion = getCurrentQuestion();
    const container = document.createElement("div");
    container.classList.add("trivia-container"); //adds a class to container

    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-div"); //adds a class to style the question
    questionDiv.innerHTML = `<h1>${currentQuestion.question}</h1>`;
    node.appendChild(container); //adds trivia-container to page
    container.appendChild(questionDiv); //adds questionDiv to page

    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");

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
            questionContainer.appendChild(answer);

            //add a click handler for correct answer
            answer.addEventListener("click", () => {
                //change background-color to green
                answer.style.backgroundColor = "#007849";
                answer.style.transition = "all 0.5s"; //adds gradual transition to green color
            })
        } else {
            const answer = document.createElement("div");
            answer.innerHTML = `<p>${currentQuestion.incorrect_answers[i]}</p>`;
            answer.classList.add("answer");
            questionContainer.appendChild(answer);

            //add a click handler for incorrect answers
            answer.addEventListener("click", () => {
                //change background-color to red
                answer.style.backgroundColor = "#C30916";
                answer.style.transition = "all 0.5s"; //adds a gradual transition to red color
            })
        }
    });

    container.appendChild(questionContainer); //adds the question container to page
}

function renderButtons() {
    const backButton = document.createElement("span");
    backButton.innerHTML = `&#9664 Back`;
    backButton.classList.add("btn");

    const nextButton = document.createElement("span");
    nextButton.innerHTML = `Next &#9658`;
    nextButton.classList.add("btn");
}