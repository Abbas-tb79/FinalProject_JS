// models/Task.js
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

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getDescription() {
        return this.#description;
    }

    getCreatedAt() {
        return this.#createdAt;
    }

    getIsCompleted() {
        return this.#isCompleted;
    }

    toggleIsCompleted() {
        this.#isCompleted = !this.#isCompleted;
    }

    setName(newName) {
        this.#name = newName;
    }

    setDescription(newDesc) {
        this.#description = newDesc;
    }

    removeTask(id) {}

    toJSON() {
        return {
            id: this.getId(),
            name: this.getName(),
            description: this.getDescription(),
            isCompleted: this.getIsCompleted(),
            createdAt: this.getCreatedAt()
        };
    }

}
