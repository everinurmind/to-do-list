import { addTask, removeTask } from './functions.js';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

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