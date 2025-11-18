export default class Task {
    #id;
    #tittle;
    #description;
    #completed = false;
    #dateCreated = Date.now();


    constructor(title, description) {
        this.#id = crypto.randomUUID();
        this.#tittle = title;
        this.#description = description;
        this.#completed = completed;
        this.#dateCreated = Date.now();
    }
}