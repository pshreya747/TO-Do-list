let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" onchange="toggleComplete(${index})" ${task.completed ? 'checked' : ''}>
            <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(listItem);
    });

  
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName !== '') {
        tasks.push({ name: taskName, completed: false });
        renderTasks();
        taskInput.value = '';
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function editTask(index) {
    const newName = prompt('Enter the new task name:');
    if (newName !== null && newName.trim() !== '') {
        tasks[index].name = newName.trim();
        renderTasks();
    }
}


function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
}


renderTasks();
