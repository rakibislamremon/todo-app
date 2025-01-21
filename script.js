const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
};

// Save tasks to local storage
const saveTasks = () => {
  const tasks = Array.from(taskList.children).map(li => ({
    text: li.querySelector('span').textContent,
    completed: li.classList.contains('completed')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add a new task
const addTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    renderTask(taskText, false);
    saveTasks();
    taskInput.value = '';
  }
};

// Render a task
const renderTask = (text, completed) => {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;
  span.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
};

// Load tasks on page load
loadTasks();