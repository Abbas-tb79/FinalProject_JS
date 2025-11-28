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
        this.#isCompleted = false;
        this.#createdAt = new Date();
    }

    getId() { return this.#id; }
    getName() { return this.#name; }
    getDescription() { return this.#description; }
    getIsCompleted() { return this.#isCompleted; }
    getCreatedAt() { return this.#createdAt; }

    toggleIsCompleted() { this.#isCompleted = !this.#isCompleted; }
    setName(name) { this.#name = name; }
    setDescription(desc) { this.#description = desc; }

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
        const t = new Task(obj.name, obj.description);
        t.#id = obj.id;
        t.#isCompleted = obj.isCompleted;
        t.#createdAt = new Date(obj.createdAt);
        return t;
    }
}
