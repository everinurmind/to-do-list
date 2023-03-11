export const editTask = (id) => {
  const options = document.querySelector(`.las.la-ellipsis-v[data-id="${id}"]`);
  const remove = document.querySelector(`.las.la-trash-alt[data-id="${id}"]`);
  const description = document.querySelector(`.task-description[data-id="${id}"]`);
  const task = document.querySelector(`li[data-id="${id}"]`);

  task.classList.add('editing');
  options.classList.add('hide');
  remove.classList.add('active');
  description.readOnly = false;
};

export const updateTask = (id, toDoList) => {
  const editedDescription = document.querySelector(`.task-description[data-id="${id}"]`);
  if (editedDescription.value.trim() === '') {
    return;
  }

  const index = toDoList.findIndex((task) => task.index === +id);

  toDoList[index].description = editedDescription.value;
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
};

export const clearCompletedTasks = () => {
  let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
  toDoList = toDoList.filter((task) => !task.completed);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
};