// Import variables from variables.js
import { toDoList } from './variables.js';

// Update task status when checkbox is clicked
const updateStatus = (id) => {
  const checkbox = document.querySelector(`.checkbox[data-id="${id}"]`);
  const index = toDoList.findIndex((task) => task.index === +id);
  toDoList[index].completed = checkbox.checked;
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  window.location.reload();
};

// Clear completed tasks from toDoList and update localStorage
const clearCompletedTasks = () => {
  const filteredList = toDoList.filter((task) => task.completed !== true);
  filteredList.forEach((task, index) => {
    task.index = index + 1;
  });
  localStorage.setItem('toDoList', JSON.stringify(filteredList));
  window.location.reload();
};

export { updateStatus, clearCompletedTasks };