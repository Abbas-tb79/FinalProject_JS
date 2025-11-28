const taskManager = new TaskManager();
taskManager.load(); // загружаем задачи из localStorage

// Элементы
const taskListDiv = document.getElementById("TaskList");
const form = document.querySelector("form");
const nameInput = document.getElementById("taskName");
const descInput = document.getElementById("taskDescription");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("SortBy");

const editForm = document.getElementById("editForm");
const backBtn = document.getElementById("backBtn");
const detailsDiv = document.getElementById("taskDetails");

// ---------------- INDEX PAGE ----------------
if (taskListDiv && form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const desc = descInput.value.trim();
        if (!name || !desc) return;
        taskManager.addTask(new Task(name, desc));
        applyFiltersAndSorting();
        form.reset();
    });

    function render(tasks) {
        taskListDiv.innerHTML = "";
        tasks.forEach(task => {
            const div = document.createElement("div");
            div.classList.add("task-item");

            div.innerHTML = `
                <input type="checkbox" class="toggle" data-id="${task.getId()}" ${task.getIsCompleted() ? "checked" : ""}>
                <span class="task-name" data-id="${task.getId()}">${task.getName()}</span>
                <button class="editBtn" data-id="${task.getId()}">Edit</button>
                <button class="deleteBtn" data-id="${task.getId()}">Remove</button>
            `;

            taskListDiv.appendChild(div);

            div.querySelector(".toggle").addEventListener("change", () => {
                task.toggleIsCompleted();
                taskManager.save();
                applyFiltersAndSorting();
            });

            div.querySelector(".deleteBtn").addEventListener("click", () => {
                taskManager.removeTask(task.getId());
                applyFiltersAndSorting();
            });

            div.querySelector(".editBtn").addEventListener("click", () => {
                window.location.href = `edit.html?id=${task.getId()}`;
            });

            div.querySelector(".task-name").addEventListener("click", () => {
                window.location.href = `details.html?id=${task.getId()}`;
            });
        });
    }

    function applyFiltersAndSorting() {
        const filtered = taskManager.filterTasks(filterSelect.value);
        const sorted = taskManager.sortTasks(sortSelect.value, filtered);
        render(sorted);
    }

    filterSelect.addEventListener("change", applyFiltersAndSorting);
    sortSelect.addEventListener("change", applyFiltersAndSorting);

    applyFiltersAndSorting();
}

// ---------------- EDIT PAGE ----------------
if (editForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("id");
    const task = taskManager.getTaskById(taskId);

    const editNameInput = document.getElementById("editName");
    const editDescInput = document.getElementById("editDescription");

    if (!task) {
        document.body.innerHTML = "<h1>404: Task not found</h1>";
    } else {
        editNameInput.value = task.getName();
        editDescInput.value = task.getDescription();

        editForm.addEventListener("submit", e => {
            e.preventDefault();
            task.setName(editNameInput.value.trim());
            task.setDescription(editDescInput.value.trim());
            taskManager.save();
            window.location.href = "index.html";
        });

        if (backBtn) backBtn.addEventListener("click", () => window.location.href = "index.html");
    }
}

// ---------------- DETAILS PAGE ----------------
if (detailsDiv) {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("id");
    const task = taskManager.getTaskById(taskId);

    if (!task) {
        detailsDiv.innerHTML = "<h1>404: Task not found</h1>";
    } else {
        detailsDiv.innerHTML = `
            <p><strong>Name:</strong> ${task.getName()}</p>
            <p><strong>Description:</strong> ${task.getDescription()}</p>
            <p><strong>Status:</strong> ${task.getIsCompleted() ? " Completed" : " Pending"}</p>
            <p><strong>Created At:</strong> ${task.getCreatedAt().toLocaleString()}</p>
        `;
    }

    if (backBtn) backBtn.addEventListener("click", () => window.location.href = "index.html");
}
