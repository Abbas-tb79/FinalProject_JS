
const taskNameRegex;
const descriptionRegex;

function validateTaskName(taskName) {
    return taskNameRegex.test(taskName.trim());
}

