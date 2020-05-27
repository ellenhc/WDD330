let taskList = [];
//taskList will contain ALL tasks whether they're incomplete or complete

//perhaps add each task to this array as well and then remove tasks upon completion
let incompleteList = [];

//completed tasks will be added here
let completedList = [];

function createTask(event) {
    event.preventDefault();
    let time = event.timeStamp;
    let taskContent = document.getElementById("add-task").value;
    let complete = false;

    //creates task object
    let task = { id: time, content: taskContent, completed: complete };

    //adds task object to list array
    taskList.push(task);
    incompleteList.push(task);

    //calls renderTask() so task appears on webpage
    renderTask(task);
}

function renderTask(task) {
    const item = document.createElement("div");
    let node = document.getElementsByClassName("toDoList")[0];
    node.appendChild(item);
    item.innerHTML = `<input type="checkbox" class="checkbox" onlick="completeTask()">
    <span>${task.content}</span>`;
    node.addEventListener("click", getStats());
    return item;
}

function getStats() {
    let numTasks = incompleteList.length;
    document.getElementById("incomplete-tasks").innerHTML = numTasks;
}

//process to mark tasks as complete
function completeTask() {
    let checkBox = document.getElementsByClassName("checkbox");
    if (checkBox.checked == true) {
        //do something
    }
}

function showCompletedTasks() {

}