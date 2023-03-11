import {
  editTask, updateTask, clearCompletedTasks, updateStatus,
} from './edit.js';
import localStorageMock from './localStorageMock.js';

const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

beforeEach(() => {
  jest.clearAllMocks();
  window.localStorage = localStorageMock;
  window.localStorage.clear();
});

// UpdateStatus Test
describe('Update status', () => {
  beforeEach(() => {
    const task = { index: 1, description: 'Test task', completed: false };
    localStorage.setItem('toDoList', JSON.stringify([task]));
  });

  test('Update task status', () => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.id = '1';
    input.checked = true;
    document.body.appendChild(input);

    updateStatus('1');

    const localObject = JSON.parse(localStorage.getItem('toDoList'));
    expect(localObject[0].completed).toBe(true);
  });
});

// Edit Task Test
describe('editTask function', () => {
  test('should set task to editing mode', () => {
    const id = 1;
    const task = document.createElement('li');
    task.setAttribute('data-id', id);
    document.body.appendChild(task);

    const options = document.createElement('span');
    options.classList.add('las', 'la-ellipsis-v');
    options.setAttribute('data-id', id);
    document.body.appendChild(options);

    const remove = document.createElement('span');
    remove.classList.add('las', 'la-trash-alt');
    remove.setAttribute('data-id', id);
    document.body.appendChild(remove);

    const description = document.createElement('input');
    description.classList.add('task-description');
    description.setAttribute('data-id', id);
    document.body.appendChild(description);

    editTask(id);

    expect(task.classList.contains('editing')).toBe(true);
    expect(options.classList.contains('hide')).toBe(true);
    expect(remove.classList.contains('active')).toBe(true);
    expect(description.readOnly).toBe(false);
  });
});

// Update Task Test
describe('updateTask', () => {
  it('should update a task description in the toDoList and in localStorage', () => {
    const id = 1;
    const originalDescription = 'Original task description';
    const updatedDescription = 'Updated task description';
    const toDoList = [
      { index: 1, description: originalDescription },
      { index: 2, description: 'Another task description' },
    ];
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    document.body.innerHTML = `<input class="task-description" data-id="${id}" value="${updatedDescription}" />`;
    updateTask(id, toDoList);
    const updatedTask = JSON.parse(localStorage.getItem('toDoList'))[0];
    expect(updatedTask.description).toEqual(updatedDescription);
  });
});

// Clear Tasks Test
describe('clearCompletedTasks function', () => {
  test('should clear completed tasks from toDoList and update localStorage', () => {
    const mockList = [
      { description: 'task 1', completed: false, index: 1 },
      { description: 'task 2', completed: true, index: 2 },
      { description: 'task 3', completed: false, index: 3 },
    ];
    window.localStorage.setItem('toDoList', JSON.stringify(mockList));

    clearCompletedTasks();

    expect(JSON.parse(localStorage.getItem('toDoList')).length).toBe(2);
    expect(JSON.parse(localStorage.getItem('toDoList'))[0].description).toBe('task 1');
    expect(JSON.parse(localStorage.getItem('toDoList'))[1].description).toBe('task 3');
  });
});
