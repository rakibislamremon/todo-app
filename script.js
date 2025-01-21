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

  // Task Text
  const span = document.createElement('span');
  span.textContent = text;
  span.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };

  // Edit Button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => editTask(li, span);

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
};

// Edit Task
const editTask = (li, span) => {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.textContent;
  li.replaceChild(input, span);

  // Save Changes
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.onclick = () => {
    span.textContent = input.value.trim() || 'Untitled Task';
    li.replaceChild(span, input);
    li.replaceChild(editButton, saveButton);
    saveTasks();
  };

  // Replace Edit Button with Save Button
  const editButton = li.querySelector('button:nth-child(2)');
  li.replaceChild(saveButton, editButton);
};

// Load tasks on page load
loadTasks();
