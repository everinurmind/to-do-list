// Import CSS file
import './style.css';

// Get the container where tasks will be displayed
const tasksDiv = document.querySelector('.to-do-list');

// Array of tasks to be displayed
const arrayOfTassks = [
  { description: 'task 1', completed: false, index: 0 },
  { description: 'task 2', completed: false, index: 1 },
  { description: 'task 3', completed: false, index: 2 },
  { description: 'task 4', completed: false, index: 3 },
];

// Function to display tasks
const displayTasks = () => {
// Clear any existing tasks in the container
  tasksDiv.innerHTML = '';

  // Loop through array of tasks and create a div for each one
  arrayOfTassks.forEach((task) => {
    // Create a div element for each task
    const div = document.createElement('div');
    div.className = 'task';
    div.setAttribute('data-id', task.index);

    // Create a check button for each task
    const check = document.createElement('form');
    check.className = 'check';
    check.innerHTML = '<input type="checkbox">';
    div.append(check);

    // Create an input field for the task description
    const taskText = document.createElement('input');
    taskText.className = 'text';
    taskText.type = 'text';
    taskText.value = task.description;
    taskText.setAttribute('readonly', 'readonly');
    div.append(taskText);

    // Create a drag button for each task
    const dragbtn = document.createElement('span');
    dragbtn.innerHTML = '<i class="las la-ellipsis-v"></i>';
    dragbtn.className = 'drag';
    div.append(dragbtn);

    // Add the task div to the container
    tasksDiv.append(div);
  });

  // Create a "clear all completed" button
  const clear = document.createElement('div');
  clear.className = 'clear';
  const link = document.createElement('a');
  link.append(document.createTextNode('Clear all completed'));
  clear.append(link);
  tasksDiv.append(clear);
};

// Call the displayTasks function when the DOM has loaded
window.addEventListener('DOMContentLoaded', () => {
  displayTasks();
});