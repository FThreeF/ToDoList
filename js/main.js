import { 
    buttonAddTask, 
    taskListWindow, 
    windowTaskCreate, 
    buttonSave, 
    buttonCancel,
    buttonMark,
    buttonRemoveMark,
    buttonEdit,
    buttonRemove,
    createTaskName,
    createTaskDate,
    createTaskDescription,
    taskMark,
    
} from "./dom.js";
let idTask;
let window = 'taskList';
let windows = {
    'taskList': [taskListWindow, [buttonRemove]],
    'createTask' : [windowTaskCreate,[buttonSave, buttonCancel]] 
}

updateWindow('taskList');

function updateWindow(value) {
    window = value;
    for (let window in windows) {
        

        if (window == value) {
            windows[window][0].style.display = 'flex';
            windows[window][1].map(el => el.className = 'to-do__button');
        }
        else {
            windows[window][0].style.display = 'none';
            windows[window][1].map(el => el.classList.add('to-do__button_deactive'));
        }  
        updateButtonsTask();      
    }
}



function updateButtonsTask() {
    if (idTask != undefined && window == 'taskList') {
        [buttonMark, buttonEdit, buttonRemove].forEach(el => {
            el.className = 'to-do__button';
        });
        
    }
    else {
        [buttonMark, buttonEdit, buttonRemove].forEach(el => {
            el.classList.add('to-do__button_deactive');
        });
        
    }
}

buttonAddTask.onclick = () => updateWindow('createTask');
buttonSave.onclick = () => {
    if (window != 'createTask') return;
    updateWindow('taskList');
    
    let curDate = new Date();
    let TaskDate = `${curDate.getHours()}:${curDate.getMinutes()} ${curDate.getDate()}.${curDate.getMonth()}.${curDate.getFullYear()}`;
    createTask(createTaskName.value, TaskDate, createTaskDescription.value);
    createTaskName.value = '';
    createTaskDescription.value = '';
}
buttonCancel.onclick = () => updateWindow('taskList');

buttonMark.onclick = () => {
    document.querySelectorAll('.to-do__task').forEach(el => {
      
        if (el.id == (idTask)) {
            console.log(el.id, idTask);
            
          el.querySelector('.to-do__task-mark').style.display = 'flex';
            
            
            updateButtonsTask();
        }
    })
}

buttonRemove.onclick = () => {
    document.querySelectorAll('.to-do__task').forEach(el => {
        if (el.id == idTask) {
            el.remove();
            idTask = undefined;
            updateButtonsTask();
        }
    })
}



let numberTask = 0;
const createTask = (name, date, description) => {
    const currentTask = document.createElement('div');
    currentTask.className = 'to-do__task';
    currentTask.id = numberTask++;
    taskListWindow.prepend(currentTask);

    const taskMark = document.createElement('div');
    taskMark.className = 'to-do__task-mark';
    taskMark.textContent = 'Выполнено';
    currentTask.append(taskMark);

    const taskName = document.createElement('div');
    taskName.className = 'to-do__task-name';
    currentTask.append(taskName);
    taskName.textContent = name;

    const taskDate = document.createElement('div');
    taskDate.className = 'to-do__task-date';
    taskDate.textContent = date;
    currentTask.append(taskDate);

    const taskDescription = document.createElement('div');
    taskDescription.className = 'to-do__task-description';
    taskDescription.textContent = description;
    currentTask.append(taskDescription);

    currentTask.onclick = () => {
        let borderTask = '2px solid rgb(250, 200, 0)';
        
                
        document.querySelectorAll('.to-do__task').forEach(el => {
            borderTask = '2px solid rgb(100, 150, 150)';
            el.style.border = borderTask;
        })

        document.querySelectorAll('.to-do__task-name').forEach(el => {
            borderTask = '2px solid rgb(100, 150, 150)';
            el.style.borderRight = borderTask;
        })

        document.querySelectorAll('.to-do__task-description').forEach(el => {
            borderTask = '2px solid rgb(100, 150, 150)';
            el.style.borderTop = borderTask;
        })
        idTask = currentTask.id;
        
        borderTask = '2px solid rgb(250, 200, 0)';
        currentTask.style.border = borderTask;
        taskName.style.borderRight = borderTask;
        taskDescription.style.borderTop = borderTask;
        updateButtonsTask()
        console.log(idTask);
    }
}





createTask('Опа', 'Хоба', 'Чопа');
