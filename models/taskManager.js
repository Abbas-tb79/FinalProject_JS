class TaskManager {
    #tasks = [];

    constructor() {
        this.load();
    }

    addTask(task) {
        this.#tasks.push(task);
        this.save();
    }

    getTasks() { return this.#tasks; }

    getTaskById(id) {
        return this.#tasks.find(t => t.getId() === id);
    }

    removeTask(id) {
        this.#tasks = this.#tasks.filter(t => t.getId() !== id);
        this.save();
    }

    save() {
        localStorage.setItem("tasks", JSON.stringify(this.#tasks.map(t => t.toJSON())));
    }

    load() {
        const data = localStorage.getItem("tasks");
        if (data) {
            this.#tasks = JSON.parse(data).map(obj => Task.fromJSON(obj));
        }
    }

    filterTasks(filter) {
        return this.#tasks.filter(t => {
            if (filter === "completed") return t.getIsCompleted();
            if (filter === "pending") return !t.getIsCompleted();
            return true;
        });
    }

    sortTasks(type, arr) {
        const tasks = [...arr];
        if (type === "name") return tasks.sort((a,b)=>a.getName().localeCompare(b.getName()));
        if (type === "date") return tasks.sort((a,b)=>new Date(b.getCreatedAt())-new Date(a.getCreatedAt()));
        return tasks;
    }
}
