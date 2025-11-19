import Task from "./models/Task.js";
import TaskManager from "./models/TaskManager.js";
import { StorageService } from "./LocalStorage.js";


const manager = new TaskManager();

const addTaskForm = document.getElementById("taskForm");
const taskTitleInput = addTaskForm.querySelector('input[placeholder="Enter Task Name"]');
const taskDescInput = addTaskForm.querySelector('input[placeholder="Enter Task Description"]');
const tasksContainer = document.querySelector(".newTask");
const addButton = addTaskForm.querySelector(".addSubmit");

function addNewTask() {
    tasksContainer.context = null;
    manager.showAllTasks().forEach(task => {
        const ul = document.createElement("ul");
        const li = document.createElement("li");
        li.textContent = `${task.title} - ${task.description}`;
        ul.appendChild(li);
        tasksContainer.appendChild(ul);
    })
}

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();

    if (!title || !description) {
        console.log("Please fill in both title and description!");
        return;
    }

    const newTask = new Task(title, description);
    manager.addTask(newTask);


    taskTitleInput.value = "";
    taskDescInput.value = "";

    addNewTask();
});


