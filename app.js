// Interactive To-Do List with LocalStorage
// Keep the app state in one array, then rebuild the list with render().

const STORAGE_KEY = "sneha-todo-tasks";
let tasks = load();
let currentFilter = "all";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");
const emptyState = document.getElementById("empty-state");
const hint = document.getElementById("input-hint");
const clearButton = document.getElementById("clear-completed");
const completedSummary = document.getElementById("completed-summary");
const filterButtons = document.querySelectorAll(".filter-button");

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved.filter(isValidTask) : [];
  } catch (error) {
    // Invalid or corrupted saved data should never stop the app.
    return [];
  }
}

function isValidTask(task) {
  return task && typeof task.id === "number" &&
    typeof task.text === "string" && typeof task.done === "boolean";
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    hint.textContent = "Your browser could not save this list. Check storage settings.";
    hint.classList.add("error");
  }
}

function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter(task => !task.done);
  if (currentFilter === "done") return tasks.filter(task => task.done);
  return tasks;
}

function render() {
  list.replaceChildren();

  getVisibleTasks().forEach(task => {
    const item = document.createElement("li");
    item.className = `task-item${task.done ? " done" : ""}`;
    item.dataset.id = String(task.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Mark "${task.text}" ${task.done ? "active" : "complete"}`);
    checkbox.dataset.action = "toggle";

    const text = document.createElement("span");
    text.className = "task-text";
    // textContent safely displays user input without interpreting it as HTML.
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";
    deleteButton.setAttribute("aria-label", `Delete "${task.text}"`);

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  const remaining = tasks.filter(task => !task.done).length;
  const completed = tasks.filter(task => task.done).length;
  count.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} left`;
  completedSummary.textContent = completed
    ? `${completed} completed — nice work!`
    : "Stay focused. You've got this.";
  clearButton.disabled = completed === 0;
  emptyState.hidden = getVisibleTasks().length !== 0;

  filterButtons.forEach(button => {
    const selected = button.dataset.filter === currentFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    hint.textContent = "Please enter a task before adding it.";
    hint.classList.add("error");
    input.focus();
    return;
  }

  tasks.push({ id: Date.now() + Math.floor(Math.random() * 1000), text, done: false });
  input.value = "";
  hint.textContent = "Press Enter or click Add task to add to your list.";
  hint.classList.remove("error");
  save();
  render();
  input.focus();
});

// One delegated listener handles checkbox toggles and delete buttons.
list.addEventListener("click", event => {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) return;

  const item = actionElement.closest("li[data-id]");
  if (!item) return;

  const id = Number(item.dataset.id);
  const action = actionElement.dataset.action;

  if (action === "delete") {
    tasks = tasks.filter(task => task.id !== id);
  } else if (action === "toggle") {
    tasks.forEach(task => {
      if (task.id === id) task.done = !task.done;
    });
  }

  save();
  render();
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    render();
  });
});

clearButton.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.done);
  save();
  render();
});

document.getElementById("today-date").textContent =
  new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(new Date()).toUpperCase();

render();
