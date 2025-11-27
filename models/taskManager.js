class TaskManager {
    #tasks;

    constructor() {
        this.#tasks = [];

    }

    save(){
        localStorage.setItem('tasks', JSON.stringify(this.#tasks.map(t => t.toJSON())));
    }


}