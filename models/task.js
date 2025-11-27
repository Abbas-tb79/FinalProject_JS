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

}
