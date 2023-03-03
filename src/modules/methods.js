import Task from './classes.js';
import {
  toDoList, tasksContainer, newTaskInput, indexCounter,
} from './variables.js';

// Functions
const renderList = () => {
  tasksContainer.innerHTML = '';
  toDoList.forEach((task) => {
    tasksContainer.insertAdjacentHTML('beforeend',
      `<li data-id="${task.index}">
      <input type="checkbox" class="checkbox">
      <input type="text" class="task-description" data-id="${task.index}" value="${task.description}" readonly>
      <span>
        <i class="las la-ellipsis-v" data-id="${task.index}"></i>
        <i class="las la-trash-alt" data-id="${task.index}"></i>
      </span>
    </li>`);
  });

  // To-Do List:
  // Edit Task
  const editTask = (i) => {
    const options = document.querySelector(`.las.la-ellipsis-v[data-id="${i}"]`);
    const remove = document.querySelector(`.las.la-trash-alt[data-id="${i}"]`);
    const description = document.querySelector(`.task-description[data-id="${i}"]`);
    const task = document.querySelector(`li[data-id="${i}"]`);

    task.classList.add('editing');
    options.classList.add('hide');
    remove.classList.add('active');
    description.readOnly = false;
  };

  const updateTask = (i) => {
    const editedDescription = document.querySelector(`.task-description[data-id="${i}"]`);
    if (editedDescription.value.trim() === '') {
      return;
    }

    const index = toDoList.findIndex((task) => task.index === +i);

    toDoList[index].description = editedDescription.value;
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    renderList();
  };

  const updateTaskIndex = () => {
    toDoList.forEach((task) => {
      task.index = indexCounter;
      indexCounter += 1;
    });
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    indexCounter = 1;
  };

  // Remove Task
  const removeTask = (index) => {
    toDoList = toDoList.filter((task) => task.index !== +index);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    updateTaskIndex();
    renderList();
  };

  document.querySelectorAll('.la-ellipsis-v').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      editTask(e.target.dataset.id);
    });
  });
  document.querySelectorAll('.task-description').forEach((task) => {
    task.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        updateTask(e.target.dataset.id);
      }
    });
  });
  document.querySelectorAll('.la-trash-alt').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      removeTask(e.target.dataset.id);
    });
  });
};

// Add Task
const addTask = () => {
  if (newTaskInput.value.trim() === '') {
    return;
  }

  const newTask = new Task({
    description: newTaskInput.value,
    index: toDoList.length + 1,
  });

  toDoList.push(newTask);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  newTaskInput.value = '';
  renderList();
};

const addIcon = document.querySelector('#add');

addIcon.addEventListener('click', () => {
  addTask();
});

// Remove All Completed Tasks
const clearCompletedTasks = () => {
  const completedTasks = document.querySelectorAll('.checkbox:checked');
  for (let i = completedTasks.length - 1; i >= 0; i -= 1) {
    const taskId = parseInt(completedTasks[i].parentNode.getAttribute('data-id'), 10);
    toDoList.splice(taskId - 1, 1);
  }
  // Update the IDs of the remaining tasks
  toDoList.forEach((task, index) => {
    task.index = index + 1;
  });
  renderList();
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
};

const clearButton = document.querySelector('#btn');

clearButton.addEventListener('click', () => {
  clearCompletedTasks();
});

export {
  addTask, renderList, clearCompletedTasks,
};