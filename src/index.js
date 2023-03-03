// Import styles
import './style.css';

// Import variables and functions from modules
import { form, newTaskBtn, clearBtn } from './modules/variables.js';
import { addTask, renderList } from './modules/functions.js';
import { clearCompletedTasks } from './modules/methods.js';

// Render the list on page load
renderList();

// Add event listener to the form for adding new task
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});

// Add event listener to the new task button for adding new task
newTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addTask();
});

// Add event listener to the clear button for clearing completed tasks
clearBtn.addEventListener('click', clearCompletedTasks);