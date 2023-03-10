import { updateStatus } from "./edit";

describe('Update status', () => {
    test('Update task status', () => {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = 'new-task';
        input.checked = true;
        const list = document.createElement('ul');
        list.appendChild(input);
        document.body.appendChild(list);
        const localObject = JSON.parse(localStorage.getItem('toDoList'));
        updateStatus('new-task');
        expect(localObject[0].completed).toBe(false);
    })
})