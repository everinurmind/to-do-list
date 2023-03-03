import './style.css';
import {
  addTask, renderList, clearCompletedTasks,
} from './modules/methods.js';
import { form } from './modules/variables.js';

renderList();
clearCompletedTasks();
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});