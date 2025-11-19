import Task from 'models/Task.js';
import TaskManager from 'models/TaskManager.js';

export class StorageService {
    #saveValid = null;
    #loadValid  = null;

    constructor(saveValid, loadValid ){
        this.#saveValid = saveValid;
        this.#loadValid = loadValid ;
    }

    static save(taskManager) {
        const key = "tasks"; // ключ локально
        const json = taskManager.tasks.map(task => task.toJSON());
        localStorage.setItem(key, JSON.stringify(json));
    }

    static load() {
        const key = "tasks"; // ключ локально
        const data = localStorage.getItem(key);
        if (!data) return new TaskManager();

        const parsed = JSON.parse(data);
        const tasks = parsed.map(obj => Task.fromJSON(obj));
        return new TaskManager(tasks);
    }
}