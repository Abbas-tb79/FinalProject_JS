class TaskManager {
    #tasks = [];

    constructor() {

    }

    addTask(task) {
        this.#tasks.push(task);
        this.save();
    }

    getTasks() { return this.#tasks; }

    save() {
        localStorage.setItem("tasks", JSON.stringify(this.#tasks.map(t => t.toJSON())));
    }



    filterTasks(filter) {
        return this.#tasks.filter(t => {
            if (filter === "completed") return t.getIsCompleted();
            if (filter === "pending") return !t.getIsCompleted();
            return true;
        });
    }

    sortTasks(sortType, arr) {
        const tasks = [...arr];

        if (sortType === "name") {
            return tasks.sort((a, b) => a.getName().localeCompare(b.getName()));
        }
        if (sortType === "date") {
            return tasks.sort((a, b) => new Date(b.getCreatedAt()) - new Date(a.getCreatedAt()));
        }

        return tasks;
    }
}
