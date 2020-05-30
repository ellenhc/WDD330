//import Todos from './ToDos.js';
let taskList = [];


import { getLocalStorage, saveToLocalStorage, removeFromLocalStorage } from './ls.js'; //imports local storage helper functions
import { renderAllTasks, loadPage } from './utilities.js'; //imports DOM manipulation helper functions

document.addEventListener("DOMContentLoaded", loadApp);

function loadApp() {
    console.log("LOADED");
    taskList = getLocalStorage();
    //renders tasks on load
    loadPage();
}


export function completeTask(taskId) {
    // step 1 - go through all taskList and find the task that has the taskId
    const index = taskList.findIndex(task => taskId == task.taskid);
    //step 2 - change task's complete boolean
    let task = taskList[index];
    task.completed = !task.completed;
    // step 3 - save to local storage so it stays completed
    saveToLocalStorage(taskList);
}

export function deleteTask(taskId) {
    // step 1 - go through all taskList and find the task that has the taskId
    const index = taskList.findIndex(task => taskId == task.taskid);
    //step 2 - change task's complete boolean
    let task = taskList[index];
    // step 3 - 
    removeFromLocalStorage(task.taskid);
    // step 4 - reload to remove deleted task from html
    taskList = getLocalStorage();
    renderAllTasks();
}

export function getTaskList() {
    return taskList;
}
export function addTaskToTaskList(task) {
    taskList.push(task);
}