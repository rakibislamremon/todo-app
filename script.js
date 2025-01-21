// Select DOM Elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Add Task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  renderTask(taskText, false);
  taskInput.value = "";
  saveTasks();
}

// Render Task
function renderTask(text, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  // Task Text
  const span = document.createElement("span");
  span.textContent = text;
  span.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  // Button Group
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";

  // Edit Button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = () => editTask(li, span);

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => {
    li.remove();
    saveTasks();
  };

  buttonGroup.appendChild(editButton);
  buttonGroup.appendChild(deleteButton);

  li.appendChild(span);
  li.appendChild(buttonGroup);
  taskList.appendChild(li);
}

// Edit Task
function editTask(li, span) {
  const newTask = prompt("Edit your task:", span.textContent);
  if (newTask !== null && newTask.trim() !== "") {
    span.textContent = newTask.trim();
    saveTasks();
  }
}

// Save Tasks to Local Storage
function saveTasks() {
  const tasks = [];
  taskList.childNodes.forEach((li) => {
    const text = li.querySelector("span").textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task.text, task.completed));
}

// Load tasks on page load
window.onload = loadTasks;
