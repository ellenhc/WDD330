//localStorage helper functions
let newTaskId = 0;

export function getNextTaskId() {
    return ++newTaskId;
}

export function getLocalStorage() {
    //clear taskList to prevent duplicates
    let taskList = [];
    for (let i = 0; i < localStorage.length; i++) {
        //https://developer.mozilla.org/en-US/docs/Web/API/Storage
        let key = localStorage.key(i);
        let raw_data = localStorage.getItem(key);
        if (raw_data == null) continue;
        let taskObject = JSON.parse(raw_data);
        //add localStorage to taskList array
        taskList.push(taskObject);
        //add to newTaskId so it doesn't override existing tasks
        if (taskObject.taskid > newTaskId) {
            newTaskId = taskObject.taskid;
        }
    }
    return taskList;
}

export function saveToLocalStorage(tasks) {
    tasks.forEach((task) => {
        let json = JSON.stringify(task);
        localStorage.setItem(task.taskid, JSON.stringify(task));
    });
}

export function removeFromLocalStorage(index) {
    localStorage.removeItem(index);
}