export const toDoList = localStorage.getItem('toDoList') ? JSON.parse(localStorage.getItem('toDoList')) : [];
export const tasksContainer = document.querySelector('ul');
export const form = document.querySelector('form');
export const newTaskInput = document.getElementById('new-task');
export const indexCounter = 1;