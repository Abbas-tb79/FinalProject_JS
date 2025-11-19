import Task from "./Task.js";
import {localStorage, StorageService} from "../LocalStorage";


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
        StorageService.save(this);
    }

    removeTask(id) {
        this.#tasks = this.#tasks.filter(task => task.id !== id);
        StorageService.save(this);
    }

    searchById(id) {
        return this.#tasks.find(task => task.id === id) || null;
    }

    updateTask(id, data) {
        const task = this.searchById(id);
        if (task) {
            task.update(data);
            StorageService.save(this);
        }
    }

    showAllTasks() {
        return [...this.#tasks];
    }



}