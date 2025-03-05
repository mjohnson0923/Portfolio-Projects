// src/components/TodoList.js
class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .todo-list {
          font-family: Arial, sans-serif;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          width: 300px;
        }
        .todo-list ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }
        .todo-list li {
          margin: 5px 0;
          font-size: 14px;
          display: flex;
          align-items: center;
        }
        .todo-list li.completed {
          text-decoration: line-through;
          color: #888;
        }
        .todo-list input[type="text"] {
          margin-top: 10px;
          padding: 5px;
          width: 100%;
        }
        .todo-list button {
          margin-top: 10px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .todo-list input[type="checkbox"] {
          margin-right: 10px;
          cursor: pointer;
        }
      </style>
      <div class="todo-list">
        <h3>To-Do List</h3>
        <ul id="tasks"></ul>
        <input type="text" id="new-task" placeholder="Add a task">
        <button id="add-task">Add</button>
      </div>
    `;

    const addButton = this.shadowRoot.getElementById('add-task');
    const newTaskInput = this.shadowRoot.getElementById('new-task');
    const tasksList = this.shadowRoot.getElementById('tasks');

    // Render existing tasks
    this.tasks.forEach(task => {
      const li = this.createTaskElement(task);
      tasksList.appendChild(li);
    });

    // Add new task
    addButton.addEventListener('click', () => {
      const task = newTaskInput.value.trim();
      if (task) {
        this.tasks.push({ text: task, completed: false });
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        const li = this.createTaskElement({ text: task, completed: false });
        tasksList.appendChild(li);
        newTaskInput.value = '';
      }
    });
  }

  createTaskElement(task) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    // Add event listener to toggle completion
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      li.classList.toggle('completed', task.completed);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    });

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
      li.classList.add('completed');
    }

    li.appendChild(checkbox);
    li.appendChild(taskText);
    return li;
  }
}

customElements.define('custom-todo-list', TodoList);
