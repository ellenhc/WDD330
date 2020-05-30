//DOM manipulation helper functions
let viewMode = "";

import { getTaskList, addTaskToTaskList, deleteTask, completeTask } from "./main.js";
import { getNextTaskId, saveToLocalStorage } from './ls.js'; //imports local storage helper functions

export function loadPage() {
    document.getElementById("all-tasks").addEventListener("click", showAllTasks);
    document.getElementById("active-tasks").addEventListener("click", showActiveTasks);
    document.getElementById("complete-tasks").addEventListener("click", showCompletedTasks);
    document.getElementById("submit").addEventListener("click", createTask);
    showAllTasks();
}

export function createTask(event) {
    const newTaskId = getNextTaskId();
    event.preventDefault();
    let time = event.timeStamp;
    let taskContent = document.getElementById("add-task").value;
    document.getElementById("add-task").value = "";
    let complete = false;
    //creates task object
    let task = { id: time, taskid: newTaskId, content: taskContent, completed: complete };
    //adds task object to list array
    addTaskToTaskList(task);
    //adds to local storage
    const taskList = getTaskList();
    saveToLocalStorage(taskList);
    //calls renderTask() so task appears on webpage
    renderAllTasks();
}

export function renderAllTasks() {
    const taskList = getTaskList();
    // step 1- remove all rendered tasks
    let node = document.getElementsByClassName("toDoList")[0];
    node.innerHTML = "";
    // step 2- render all tasks
    let shownTasks = null;
    if (viewMode == "active") {
        shownTasks = taskList.filter(isTaskIncomplete);
    } else if (viewMode == "completed") {
        shownTasks = taskList.filter(isTaskCompleted);
    } else {
        shownTasks = taskList;
    }
    for (let i = 0; i < shownTasks.length; i++) {
        renderTask(shownTasks[i]);
    }
    // step 3 - render stats
    getStats();
}

function renderTask(task) {

    const item = document.createElement("div");
    let node = document.getElementsByClassName("toDoList")[0];
    node.appendChild(item);
    const checkbox = document.createElement("span");
    const deleteButton = document.createElement("span");
    checkbox.innerHTML = `<input type="checkbox" class="checkbox"><span class="task-content">${task.content}</span>`;
    item.appendChild(checkbox);
    deleteButton.innerHTML = `<span class="delete">x</span>`;
    item.appendChild(deleteButton);
    //add event listener for checkbox and delete
    checkbox.addEventListener("click", function(event) {
        completeTask(task.taskid);
        renderAllTasks();
    });
    deleteButton.addEventListener("click", function(event) {
        deleteTask(task.taskid);
        renderAllTasks();
    });
    if (task.completed) {
        item.getElementsByTagName("input")[0].checked = true;
    }
}

function getStats() {
    const taskList = getTaskList();
    let numTasks = taskList.filter(isTaskIncomplete).length;
    document.getElementById("incomplete-tasks").innerHTML = numTasks;
}

export function showAllTasks() {
    viewMode = "all";
    renderAllTasks();
}

function showActiveTasks() {
    viewMode = "active";
    renderAllTasks();
}

function showCompletedTasks() {
    viewMode = "completed";
    renderAllTasks();
}

function isTaskCompleted(task) {
    if (task.completed) {
        return true;
    }
    return false;
}

function isTaskIncomplete(task) {
    return !isTaskCompleted(task);
}