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
      const li = document.createElement('li');
      li.textContent = task;
      tasksList.appendChild(li);
    });

    // Add new task
    addButton.addEventListener('click', () => {
      const task = newTaskInput.value.trim();
      if (task) {
        this.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        const li = document.createElement('li');
        li.textContent = task;
        tasksList.appendChild(li);
        newTaskInput.value = '';
      }
    });
  }
}

customElements.define('custom-todo-list', TodoList);
