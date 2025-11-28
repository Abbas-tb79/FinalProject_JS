class Task {
    #id;
    #name;
    #description;
    #isCompleted;
    #createdAt;

    constructor(name, description) {
        this.#id = crypto.randomUUID();
        this.#name = name;
        this.#description = description;
        this.#createdAt = new Date();
        this.#isCompleted = false;
    }

    getId() { return this.#id; }
    getName() { return this.#name; }
    getDescription() { return this.#description; }
    getCreatedAt() { return this.#createdAt; }
    getIsCompleted() { return this.#isCompleted; }

    toggleIsCompleted() { this.#isCompleted = !this.#isCompleted; }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            isCompleted: this.#isCompleted,
            createdAt: this.#createdAt
        };
    }

    static fromJSON(obj) {
        const task = new Task(obj.name, obj.description);
        task.#id = obj.id;
        task.#isCompleted = obj.isCompleted;
        task.#createdAt = new Date(obj.createdAt);
        return task;
    }
}
