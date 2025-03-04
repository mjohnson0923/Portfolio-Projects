import '/src/components/Calendar';
import '/src/components/TodoList';
import '/src/components/Weather';

const app = document.getElementById('app');
app.innerHTML = `
  <div style="display: flex; gap: 20px;">
    <custom-calendar></custom-calendar>
    <custom-todo-list></custom-todo-list>
    <custom-weather></custom-weather>
  </div>
`;
