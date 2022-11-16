const ButtonsMenu = document.querySelectorAll('.to-do__button');
const Windows = document.querySelectorAll('.to-do__window');
const WinList = document.querySelector('#WinList');
const WinCreate = document.querySelector('#WinCreate');
const TaskList = document.querySelector('.to-do__task-list');
const CreateTaskName = document.querySelector('.to-do__create-task-name');
const CreateTaskDate = `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`;
const CreateTaskDescription = document.querySelector('.to-do__create-task-description');

const BActive = 'to-do__button to-do__button_status_active';
const BDeactive = 'to-do__button to-do__button_status_deactive';

//Parameters
let currentIdTask = undefined;
let numTask = 0;

const ListIdWin = [
    'WinList',
    'WinCreate',
]


//Start
ManagerWin(ListIdWin[0]);
CreateTask('23', '43', '5s');



//Code



function ManagerWin(IdWin) {
    Windows.forEach(win => win.style.display = win.id == IdWin ? 'flex' : 'none')
    UpdateButtonsTask()
}


function UpdateButtonsTask() {
    ButtonsMenu.forEach(button => button.className = BDeactive);
    ButtonsMenu.forEach(button => button.classList.add('to-do__button'));
    if (getComputedStyle(WinList).display == 'flex') {
        GetStatusButtonMenu('Add', BActive);
    }

    else if (getComputedStyle(WinCreate).display == 'flex') {
        GetStatusButtonMenu('Save', BActive);
        GetStatusButtonMenu('Cancel', BActive);
    }
}

function GetStatusButtonMenu(name, status) {
    ButtonsMenu.forEach(button => {
        if (button.id == name) {
            button.className = status;  
        }
    })
}






ButtonsMenu.forEach(button => {
    button.onclick = () => {
        if (button.className == BDeactive) return;
        switch (button.id) {
            case 'Add':
                ManagerWin(ListIdWin[1]);
                break;
            case 'Save':
                ManagerWin(ListIdWin[0]);
                CreateTask(CreateTaskName.value, CreateTaskDate, CreateTaskDescription.value);
                break;
            case 'Cancel':
                ManagerWin(ListIdWin[0]);
                break;
            case 'Mark':
                alert('SetMark');
                break;
            case 'RemMark':
                alert('RemoveMark');
                break;
            case 'Edit':
                alert('Edit');
                break;
            case 'RemTask':
                alert('Remove');
                break;
        }
    }
})



function CreateTask(name, date, description) {
    const currentTask = document.createElement('div');
    currentTask.className = 'to-do__task';
    currentTask.id = numTask++;
    TaskList.prepend(currentTask);

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


