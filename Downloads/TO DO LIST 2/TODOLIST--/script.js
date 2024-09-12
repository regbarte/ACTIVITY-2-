const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-buttons button");

let tasks = [];
let filteredTasked = []
let filterBy = "all-tasks"

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDeadline = document.getElementById("calendar");

  if (taskText !== "" && taskDeadline.value !== "") {
    const task = {
      text: taskText,
      completed: false,
      deadline: new Date(taskDeadline.value),
    };

    console.log(task)
    tasks.push(task);
    filterTasks(filterBy)
    renderTasks();
    taskInput.value = "";
  }
}
// function for nearest deadline going first
function sortUpcomingTasks(tasks) {
  return tasks.sort((a, b) => a.deadline - b.deadline);
}

function renderTasks() {
  taskList.innerHTML = "";
  filteredTasked.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    if (task.completed) {
      taskItem.classList.add("task-done");
    }

    const taskTextElement = document.createElement("span");
    taskTextElement.classList.add("task-text");
    taskTextElement.textContent = task.text;

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    // Complete
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
    });

    // Edit
    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.addEventListener("click", () => {
      const newText = prompt("Enter the new task text:", task.text);
      if (newText !== null) {
        task.text = newText;
        renderTasks();
      }
    });

    //delete
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    taskActions.appendChild(completeBtn);
    taskActions.appendChild(editBtn);
    taskActions.appendChild(deleteBtn);

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(taskActions);
    taskList.appendChild(taskItem);
  });
}

function filterTasks(filter) {
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  document.getElementById(filter).classList.add("active");

  if (filter === "all-tasks") {
    filteredTasked = tasks;
  } else if (filter === "completed-tasks") {
    filteredTasked = tasks.filter((task) => task.completed); // Update tasks array
  } else if (filter === "incomplete-tasks") {
    filteredTasked = tasks.filter((task) => !task.completed);
  } else if (filter === "upcoming-tasks") {
    const today = new Date();
    filteredTasked = tasks.filter((task) => task.deadline > today);
    filteredTasked = sortUpcomingTasks(filteredTasked);
  }
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

filterButtons.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    filterBy = event.target.id;
    filterTasks(event.target.id);
  })
);

renderTasks();
