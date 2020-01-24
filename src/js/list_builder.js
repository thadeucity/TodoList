var listElement = document.querySelector('#list ul');

var inputTask = document.querySelector('#todo');
var inputTime = document.querySelector('#time');

var btnSaveTask = document.querySelector('#save-task');

// var taksList = JSON.parse(localStorage.getItem('list_todos')) || [];

var taskList = JSON.parse(localStorage.getItem('list_tasks')) || [];

function renderTasks(){
  listElement.innerHTML = '';

  for(todo of taskList) {
      var taskElement = document.createElement('li');
      var taskTitle = document.createElement('strong');
      var taskHour = document.createElement('span');
      var btnDeleteTask = document.createElement('button');

      var todoText = document.createTextNode(todo.task);
      var todoTime = document.createTextNode(todo.time);
      var btnText = document.createTextNode('X');

      var pos = taskList.indexOf(todo);

      taskElement.setAttribute('class', 'task');
      btnDeleteTask.setAttribute('onclick', `deleteTask(${pos})`);

      taskTitle.appendChild(todoText);
      taskHour.appendChild(todoTime);
      btnDeleteTask.appendChild(btnText);
      
      taskElement.appendChild(taskTitle);
      taskElement.appendChild(taskHour);
      taskElement.appendChild(btnDeleteTask);

      listElement.appendChild(taskElement);
  }
}

function addTask(){
  var taskText = inputTask.value;
  var taskTime = inputTime.value;

  var taskInfo = {
    task: taskText,
    time: taskTime
  };

  if (taskText != ''){
      taskList.push(taskInfo);
      inputTask.value = '';
      inputTime.value = '';
      renderTasks();
      saveToStorage();
  }

}

function deleteTask(pos){
  taskList.splice(pos, 1);
  renderTasks();
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('list_tasks', JSON.stringify(taskList));
}

// function notifyTask() {
//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//   }

//   else if (Notification.permission === "granted") {
//     var notification = new Notification("Deu CERTO");
//   }

//   else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then(function (permission) {
//       if (permission === "granted") {
//         var notification = new Notification("Deu CERTO");
//       }
//     });
//   }
// }

btnSaveTask.onclick = addTask;

renderTasks();