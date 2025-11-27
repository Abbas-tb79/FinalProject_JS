class TaskManager {
    #tasks;

    constructor() {
        this.#tasks = [];

    }

    getTasks() {
        return this.#tasks;
    }

    save(){
        localStorage.setItem('tasks', JSON.stringify(this.#tasks.map(t => t.toJSON())));
    }

    addTask(task) {
        this.#tasks.push(task);
        this.save();
    }

    filterTasks(filter) {
        return this.#tasks.filter(task => {
            const isCompleted = task.getIsCompleted();
            if (filter === 'completed') return isCompleted;
            if (filter === 'pending') return !isCompleted;
            return true;
        });
    }


}