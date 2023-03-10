export const updateStatus = (id) => {
  const toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
  const checkbox = document.querySelector(`.checkbox[data-id="${id}"]`);
  const index = toDoList.findIndex((task) => task.index === +id);
  if (checkbox) {
    toDoList[index].completed = checkbox.checked;
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }
};

export const clearCompletedTasks = () => {
  let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
  toDoList = toDoList.filter((task) => !task.completed);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
};
  