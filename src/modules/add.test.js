import { addTask, removeTask } from './functions.js';
import localStorageMock from './localStorageMock.js';

const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

beforeEach(() => {
  jest.clearAllMocks();
  window.localStorage = localStorageMock;
  window.localStorage.clear();
});

describe('addTask function', () => {
  test('should add a new task to the list and update localStorage', () => {
    const input = document.createElement('input');
    input.id = 'new-task';
    input.value = 'test task';
    document.body.appendChild(input);

    const list = document.createElement('ul');
    document.body.appendChild(list);

    addTask('test task');

    expect(JSON.parse(localStorage.getItem('toDoList')).length).toBe(1);
  });
});

describe('removeTask function', () => {
  test('should delete a task from the list and update localStorage', () => {
    const mockList = [{ description: 'test task', completed: false, index: 1 }];
    window.localStorage.setItem('toDoList', JSON.stringify(mockList));

    const list = document.createElement('ul');
    document.body.appendChild(list);

    removeTask(1);

    expect(JSON.parse(localStorage.getItem('toDoList')).length).toBe(0);
    expect(list.children.length).toBe(0);
  });
});
