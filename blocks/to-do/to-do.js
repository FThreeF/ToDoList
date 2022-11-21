const menuButtons = document.querySelectorAll(".to-do__button");
const windows = document.querySelectorAll(".to-do__window");
const winList = document.querySelector("#WinList");
const winCreate = document.querySelector("#WinCreate");
const taskList = document.querySelector(".to-do__task-list");
const elementCreateTaskName = document.querySelector(".to-do__create-task-name");
let createTaskDate = () => `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`;

const elementCreateTaskDescription = document.querySelector(".to-do__create-task-description");

const classStatusActive = "to-do__button to-do__button_status_active";
const classStatusInactive = "to-do__button to-do__button_status_inactive";
const getAllTask = () => document.querySelectorAll(".to-do__task");

//Parameters
let idCurrentTask = undefined;
let idCreateTask = 0;
let modeEdit = false;
const listOfIdWindows = ["WinList", "WinCreate"];

//Start
setWindow(listOfIdWindows[0]);
createTask("Задача", createTaskDate(), "Описание");

//Code
function setWindow(id) {
    windows.forEach((window) => (window.style.display = window.id == id ? "flex" : "none"));
    updateStatusMenuButton();
}

function updateStatusMenuButton() {
    menuButtons.forEach((button) => (button.className = classStatusInactive));
    menuButtons.forEach((button) => button.classList.add("to-do__button"));
    if (getComputedStyle(winList).display == "flex") {
        getStatusButtonMenu("Add", classStatusActive);
        if (idCurrentTask != undefined) {
            getStatusButtonMenu("Remove", classStatusActive);
            getStatusButtonMenu("Edit", classStatusActive);

            getAllTask().forEach((task) => {
                if (task.id == idCurrentTask) {
                    if (getComputedStyle(task.querySelector(".to-do__task-mark")).display != "flex") {
                        getStatusButtonMenu("Mark", classStatusActive);
                    } else {
                        getStatusButtonMenu("RemMark", classStatusActive);
                    }
                }
            });
        }
    } else if (getComputedStyle(winCreate).display == "flex") {
        getStatusButtonMenu("Save", classStatusActive);
        getStatusButtonMenu("Cancel", classStatusActive);
    }
}

function getStatusButtonMenu(name, status) {
    menuButtons.forEach((button) => {
        if (button.id == name) button.className = status;
    });
}

menuButtons.forEach((button) => {
    button.onclick = () => {
        if (button.className == classStatusInactive) return;
        switch (button.id) {
            case "Add":
                setWindow(listOfIdWindows[1]);
                break;
            case "Save":
                if (modeEdit) {
                    document.querySelectorAll(".to-do__task").forEach((task) => {
                        if (task.id == idCurrentTask) {
                            task.querySelector(".to-do__task-name").textContent = elementCreateTaskName.value;
                            task.querySelector(".to-do__task-description").textContent = elementCreateTaskDescription.value;
                        }
                    });
                    modeEdit = false;
                } else {
                    createTask(elementCreateTaskName.value, createTaskDate(), elementCreateTaskDescription.value);
                }
                setWindow(listOfIdWindows[0]);
                [elementCreateTaskName, elementCreateTaskDescription].map((element) => (element.value = ""));
                break;
            case "Cancel":
                if (modeEdit) {
                    [elementCreateTaskName, elementCreateTaskDescription].map((element) => (element.value = ""));
                }
                modeEdit = false;
                setWindow(listOfIdWindows[0]);
                break;
            case "Mark":
                document.querySelectorAll(".to-do__task").forEach((task) => {
                    if (task.id == idCurrentTask) task.querySelector(".to-do__task-mark").style.display = "flex";
                });
                updateStatusMenuButton();
                break;
            case "RemMark":
                document.querySelectorAll(".to-do__task").forEach((task) => {
                    if (task.id == idCurrentTask) task.querySelector(".to-do__task-mark").style.display = "none";
                });
                updateStatusMenuButton();
                break;
            case "Edit":
                modeEdit = true;
                setWindow(listOfIdWindows[1]);
                document.querySelectorAll(".to-do__task").forEach((task) => {
                    if (task.id == idCurrentTask) {
                        elementCreateTaskName.value = task.querySelector(".to-do__task-name").textContent;
                        elementCreateTaskDescription.value = task.querySelector(".to-do__task-description").textContent;
                    }
                });
                updateStatusMenuButton();
                break;
            case "Remove":
                document.querySelectorAll(".to-do__task").forEach((task) => {
                    if (task.id == idCurrentTask) task.remove(), (idCurrentTask = undefined), updateStatusMenuButton();
                });

                break;
        }
    };
});

function createTask(name, date, description) {
    const currentTask = document.createElement("div");
    currentTask.className = "to-do__task";
    currentTask.id = idCreateTask++;
    taskList.prepend(currentTask);

    const setStyleElement = (element, className, text) => {
        element = document.createElement("div");
        element.className = className;
        element.textContent = text;
        currentTask.append(element);
    };

    let taskMark;
    let taskName;
    let taskDate;
    let taskDescription;

    setStyleElement(taskMark, "to-do__task-mark", "Выполнено");
    setStyleElement(taskName, "to-do__task-name", name);
    setStyleElement(taskDate, "to-do__task-date", date);
    setStyleElement(taskDescription, "to-do__task-description", description);

    currentTask.onclick = () => setActiveTask(currentTask);
}

function setActiveTask(currentTask) {
    idCurrentTask = currentTask.id;
    setCurrentTaskMode(currentTask);
    updateStatusMenuButton();
}

function setCurrentTaskMode(currentTask) {
    document.querySelectorAll(".to-do__task").forEach((task) => {
        let currentBorderStyleMode = setCurrentBorderStyleMode(currentTask, task);
        task.style.border = currentBorderStyleMode;
        task.querySelector(".to-do__task-name").style.borderRight = currentBorderStyleMode;
        task.querySelector(".to-do__task-description").style.borderTop = currentBorderStyleMode;
    });
}

function setCurrentBorderStyleMode(currentTask, task) {
    return currentTask.id == task.id ? "2px solid rgb(250, 200, 0)" : "2px solid rgb(100, 150, 150)";
}
