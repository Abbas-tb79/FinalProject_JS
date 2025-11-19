export default class Task {
    #id;
    #title;
    #description;
    #completed ;
    #dateCreated = Date.now();


    constructor(title, description) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#description = description;
        this.#completed = false;
        this.#dateCreated = Date.now();
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get completed () {
        return this.#completed;
    }

    get dateCreated () {
        return this.#dateCreated;
    }

    switchCompleted () {
        this.#completed  = !this.#completed;
    }

    update(newTask){
        if(newTask.title !== this.#title){this.#title = newTask.title;}
        if(newTask.description !== this.#description){this.#description = newTask.description;}
    }




}