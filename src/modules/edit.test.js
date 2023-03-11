import { editTask, updateTask, clearCompletedTasks } from './edit.js';

document.body.innerHTML = `
  <ul>
    <li data-id="123">
      <span class="las la-ellipsis-v" data-id="123"></span>
      <input type="text" class="task-description" data-id="123" value="Buy groceries" readonly>
      <span class="las la-trash-alt" data-id="123"></span>
    </li>
  </ul>
`;

describe('editTask function', () => {
  test('editTask function should set the task as "editing"', () => {
    editTask('123');

    const options = document.querySelector('.las.la-ellipsis-v[data-id="123"]');
    const remove = document.querySelector('.las.la-trash-alt[data-id="123"]');
    const description = document.querySelector('.task-description[data-id="123"]');
    const task = document.querySelector('li[data-id="123"]');

    expect(task.classList.contains('editing')).toBe(true);
    expect(options.classList.contains('hide')).toBe(true);
    expect(remove.classList.contains('active')).toBe(true);
    expect(description.readOnly).toBe(false);
  });
});

const toDoList = [
  {
    index: 123,
    description: 'Buy groceries',
    completed: false,
  },
  {
    index: 456,
    description: 'Do laundry',
    completed: true,
  },
];
localStorage.setItem('toDoList', JSON.stringify(toDoList));

describe('updateTask function', () => {
  test('updateTask function should update the task description in the toDoList and render the updated list', () => {
    updateTask('123', toDoList);
    const updatedToDoList = JSON.parse(localStorage.getItem('toDoList'));
    expect(updatedToDoList[0].description).toBe('Buy groceries');
    expect(updatedToDoList.length).toBe(2);
  });
});

describe('clearCompletedTasks function', () => {
  test('clearCompletedTasks should remove completed tasks from the toDoList array and update local storage', () => {
    const completedTask1 = { id: 1, description: 'Task 1', completed: true };
    const completedTask2 = { id: 2, description: 'Task 2', completed: true };
    const incompleteTask = { id: 3, description: 'Task 3', completed: false };
    const toDoList = [completedTask1, completedTask2, incompleteTask];
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    clearCompletedTasks();
    const updatedToDoList = JSON.parse(localStorage.getItem('toDoList'));
    expect(updatedToDoList).toEqual([incompleteTask]);
  });
});
