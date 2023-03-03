import './style.css';
import {
  form, addTask, renderList, clearCompletedTasks,
} from './modules/utilities.js';

renderList();
clearCompletedTasks();
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});