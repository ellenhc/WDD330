//example url https://opentdb.com/api.php?amount=11&category=19&difficulty=easy&type=multiple
//amount=11 is the number of questions
//category=19 is the category (each is given a number)
//difficulty=easy
//will always show type=multiple
const startURL = "https://opentdb.com/api.php?";

//the url is a json file. each multiple choice question has 4 answers. each question has a category, type, difficulty, question, correct_answer, and incorrect_answers

const form = document.querySelector("form"); //grabs the form element

form.addEventListener('submit', (event) => {
    event.preventDefault(); //prevents page from reloading
    const url = startURL + `amount=${form.quantity.value}` + ((form.category.value != 'any') ? `&category=${form.category.value}` : '') + ((form.difficulty.value != 'any') ? `&difficulty=${form.difficulty.value}` : '') + `&type=multiple`; //creates url from user's input

    const request = new Request(url, {
        method: 'GET',
        mode: 'cors',
    })
    fetch(request)
        .then(response => response.json()) // convert from json to object
        .then(data => data.results) // then grab just the results
        .then(storeQuestions)
        .catch(error => console.log('There was an error:', error))
});

function storeQuestions(questions) {
    console.log(questions);

}