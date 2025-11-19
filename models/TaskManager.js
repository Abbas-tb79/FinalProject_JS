import Task from "./Task.js";


export default class TaskManager {
    #tasks;

    constructor(tasks = []) {
        this.#tasks = tasks;
    }

    get tasks() {
        return this.#tasks;
    }

    addTask(task) {
        this.#tasks.push(task);
    }

    removeTask(id) {
        this.#tasks = this.#tasks.filter(task => task.id !== id);
    }

    searchById(id) {
        return this.#tasks.find(task => task.id === id) || null;
    }

    updateTask(id, data) {
        const task = this.searchById(id);
        if (task) {
            task.update(data);
        }
    }

    showAllTasks() {
        return [...this.#tasks];
    }

    



}