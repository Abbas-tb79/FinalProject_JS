
const taskManager = new TaskManager();

// const taskNameRegex;
// const descriptionRegex;

// function validateTaskName(taskName) {
//     return taskNameRegex.test(taskName.trim());
// }



const form = document.querySelector("form");
const list = document.getElementById("TaskList");

const nameInput = document.getElementById("taskName");
const descriptionInput = document.getElementById("taskDescription");

const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("SortBy");


form.addEventListener('submit', e => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const desc = descriptionInput.value.trim();

    if (!name || !desc) return;

    const task = new Task(name, desc);
    taskManager.addTask(task);

    applyFiltersAndSorting();
    form.reset();
});


function render(tasks) {
    list.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.innerHTML = `
            <input type="checkbox" class="toggle" data-id="${task.getId()}" ${task.getIsCompleted() ? "checked" : ""}>
            <strong>${task.getName()}</strong>: ${task.getDescription()}
        `;
        list.appendChild(div);
    });

    document.querySelectorAll(".toggle").forEach(ch => {
        ch.addEventListener("change", () => {
            const id = ch.dataset.id;
            const task = taskManager.getTasks().find(t => t.getId() === id);
            task.toggleIsCompleted();
            taskManager.save();
            applyFiltersAndSorting();
        });
    });
}


function applyFiltersAndSorting() {
    let filtered = taskManager.filterTasks(filterSelect.value);
    let sorted = taskManager.sortTasks(sortSelect.value, filtered);
    render(sorted);
}

filterSelect.addEventListener("change", applyFiltersAndSorting);
sortSelect.addEventListener("change", applyFiltersAndSorting);

applyFiltersAndSorting();




