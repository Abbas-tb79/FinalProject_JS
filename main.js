
const taskManager = new TaskManager();
// const taskNameRegex;
// const descriptionRegex;

// function validateTaskName(taskName) {
//     return taskNameRegex.test(taskName.trim());
// }

const form = document.querySelector('form');
const taskListAdd = document.getElementById("TaskList");
const nameInput=document.getElementById("taskName");
const descriptionInput=document.getElementById("taskDescription");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputName = nameInput.value.trim();
    const inputDescription = descriptionInput.value.trim();

    const newTask = new Task(inputName, inputDescription);
    taskManager.addTask(newTask);
    render(taskManager.filterTasks(filterSelect.value));

})

function render(tasksArray) {
    taskListAdd.innerHTML = '';

    tasksArray.forEach(task => {
        const isCompleted = task.getIsCompleted();

        const div = document.createElement('div');
        div.innerHTML = `
            <strong>${task.getName()}</strong>: ${task.getDescription()}
            [Status: ${isCompleted ? '✅ Completed' : '⏳ Pending'}]
            <button data-id="${task.getId()}">Toggle</button>
        `;
        taskListAdd.appendChild(div);
    });
}

    const filterSelect = document.getElementById('filterSelect');

    filterSelect.addEventListener('change', () => {
        const filteredTasks = taskManager.filterTasks(filterSelect.value);
        render(filteredTasks);
    });







