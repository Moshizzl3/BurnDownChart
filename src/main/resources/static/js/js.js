const url = 'http:/localhost:8080/getAllTasks';

const divNotStarted = document.getElementById('divnotstarted');
const divInProgress = document.getElementById('divinprogress');
const divReview = document.getElementById('divreview');
const divDone = document.getElementById('divdone');
const pbButtonStatus = document.getElementById('setstatus');
const pbButtonSubmit = document.getElementById('create-new-task-button');
const pbButtonDelete = document.getElementById('delete');
const sprintDropDown = document.getElementById('sprint-select')
const userDropDown = document.getElementById('dropDownUserTask')
const submitFormButton = document.getElementById('submitBtn')

let taskArray = [];
let sprintArray = [];
let userArray = [];

//load data and fills elements on start and on refresh
fillSprintArray().then(loadSprints).then(setHeader);
fillTaskArray().then(loadTasks);
fillUserArray().then(loadUsers);

function fetchAllTasks() {
    return fetch('getAllTasks').then(res => res.json())
}

function fetchAllSprints() {
    return fetch('getAllSprint').then(res => res.json())
}

function fetchAllUsers() {
    return fetch('getAllUsers').then(res => res.json())
}

async function fillSprintArray() {
    const sprintList = await fetchAllSprints();
    sprintList.forEach((sprint) => {
        sprintArray.push(sprint)
    })
}


async function fillTaskArray() {
    taskArray = [];
    const taskList = await fetchAllTasks();
    taskList.forEach((task) => {
        taskArray.push(task)
    })
}

async function fillUserArray() {
    const userList = await fetchAllUsers();
    userList.forEach(user => {
        userArray.push(user)
    })
}


async function updateStatusTask(task) {
    const urlUpdate = 'task/' + task.taskId;

    const fetchOption = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }

    const jsonString = JSON.stringify(task);
    fetchOption.body = jsonString;

    //call backend and wait for response
    const response = await fetch(urlUpdate, fetchOption);
    if (!response.ok) {
        console.log("shiiit, gik sq ikk")
    }
    return response;
}

async function updateTaskStatus(task, input) {
    task.status = input;
    await updateStatusTask(task);
}

async function deleteTask(task) {
    const urlDelete = 'task/' + task.taskId;

    const fetchOption = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }

    const jsonString = JSON.stringify(task);
    fetchOption.body = jsonString;

    //call backend and wait for response
    const response = await fetch(urlDelete, fetchOption);
    if (!response.ok) {
        console.log("shiiit, gik sq ikk")
    }
    return response;
}


async function fillTaskToBoard(section, task) {

    const newDiv = document.createElement("div");
    newDiv.classList.add("taskdiv");
    newDiv.setAttribute('id', task.taskId);

    const pName = document.createElement("p");
    const pNodeName = document.createTextNode('Task Name: ' + task.name);
    pName.append(pNodeName);

    const pDate = document.createElement("p");
    const pNodeDate = document.createTextNode('Creation Date: ' + task.date);
    pDate.append(pNodeDate);

    const pStatus = document.createElement("p");
    const pNodeStatus = document.createTextNode('Task Status: ' + task.status);
    pStatus.append(pNodeStatus);

    const pAssignedTo = document.createElement("p");
    const pNodeAssignedTo = document.createTextNode('Assigned To: ' + task.user.userName);
    pAssignedTo.append(pNodeAssignedTo);
    const pTaskTime = document.createElement("p");

    if (section != divDone) {
        const pNodeEstimatedTime = document.createTextNode('Estimated time: ' + task.estimatedTime);
        pTaskTime.append(pNodeEstimatedTime);
    } else {
        const pNodeEstimatedTime = document.createTextNode('Time spent: ' + task.timeSpent);
        pTaskTime.append(pNodeEstimatedTime);
    }


    newDiv.append(pName)
    newDiv.append(pDate)
    newDiv.append(pStatus)
    newDiv.append(pAssignedTo)
    newDiv.append(pTaskTime)
    section.append(newDiv)

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    newDiv.style.backgroundColor = "#" + randomColor;

    // When the user clicks on the div, open the modal
    newDiv.addEventListener('click', () => {
        modalTask.style.display = "block";
        let pName = document.getElementById('p-modal-name')
        pName.textContent = "Name: " + task.name;
        let pDate = document.getElementById('p-modal-date')
        pDate.textContent = "Date: " + task.date;
        let pStatus = document.getElementById('p-modal-status')
        pStatus.textContent = "Status: " + task.status;
        let pId = document.getElementById('p-modal-id')
        pId.textContent = task.taskId;
        let pdesc = document.getElementById('descriptionText')
        pdesc.textContent = task.description;

    })
}


function loadTasks() {


    let filteredTasks = taskArray.filter(function (task) {
        return task.sprint.sprintId == sprintDropDown.value;
    });

    filteredTasks.forEach(task1 => {
        if ("notstarted" === task1.status)
            fillTaskToBoard(divNotStarted, task1);

        else if ("inprogress" === task1.status)
            fillTaskToBoard(divInProgress, task1);

        else if ("review" === task1.status)
            fillTaskToBoard(divReview, task1);

        else if ("done" === task1.status)
            fillTaskToBoard(divDone, task1);

        else {
            console.log("defualt");
        }
    })
}

function loadSprints() {

    sprintArray.forEach(sprint => {
        const option = document.createElement("option");
        const optionNode = document.createTextNode(sprint.sprintName);
        option.setAttribute('id', 'sprint')
        option.setAttribute('value', sprint.sprintId)
        option.append(optionNode);
        sprintDropDown.append(option)
    })
}


function loadUsers() {

    userArray.forEach(user => {
        const option = document.createElement("option");
        const optionNode = document.createTextNode(user.userName);
        option.setAttribute('id', 'user')
        option.setAttribute('value', user.userId)
        option.append(optionNode);
        userDropDown.append(option)
    })
}

async function changeStatusOnTask() {

    let getTaskId = document.getElementById('p-modal-id').textContent;
    let getTask = taskArray.find(task => task.taskId == getTaskId);
    let taskStatus = document.getElementById("dropDownModal").value;
    let taskTime = document.getElementById("input-time").value;

    await clearContent();

    await updateTaskAssignedTo(getTask, userDropDown.value)
    await updateTaskTime(getTask, taskTime);
    await updateTaskStatus(getTask, taskStatus)
    await fillTaskArray
    fillTaskArray().then(loadTasks);
    modalTask.style.display = "none";
}

async function onTaskDelete() {

    let getTaskId = document.getElementById('p-modal-id').textContent;
    let getTask = taskArray.find(task => task.taskId == getTaskId);

    await clearContent();

    deleteTask(getTask)
        .then(() => taskArray = [])
        .then(fillTaskArray)
        .then(loadTasks)

    modalTask.style.display = "none";
}

async function updateTableNewTask() {
    await clearContent();

    await createNewTask();
    fillTaskArray().then(loadTasks);
}


async function createNewTask() {

    let body2 = {
        name: document.getElementById('tname').value,
        description: document.getElementById('description').value,
        estimatedTime: 0.0,
        sprint: {
            sprintId: sprintDropDown.value,
        },
        user: {
            userId: 1,
        }
    }

    const url = "http://localhost:8080/postTask";

    const fetchOptions = {
        method: "Post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body2)
    }

    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        console.log("something went wrong")
    }
    ;
    modalNewTask.style.display = "none";

}

async function updateTaskTime(task, input) {
    task.timeSpent = input;
    await updateStatusTask(task);
}

async function updateTaskAssignedTo(task, input) {
    task.user.userId = input;
    await updateStatusTask(task);
}

async function setHeader() {
    const sprintHeader = document.getElementById('header-sprint');
    sprintHeader.innerHTML = '';
    const sprint = sprintArray.find(sprint => sprint.sprintId == sprintDropDown.value)
    const sprintText = document
        .createTextNode(sprint.sprintName + ' - Period from: ' + sprint.startDate + ' to: ' + sprint.endDate);
    sprintHeader.append(sprintText);
}


async function clearContent() {
    let clearNotStarted = document.getElementById('divnotstarted');
    clearNotStarted.innerHTML = '';

    let clearInProgress = document.getElementById('divinprogress');
    clearInProgress.innerHTML = '';

    let clearReview = document.getElementById('divreview');
    clearReview.innerHTML = '';

    let clearDone = document.getElementById('divdone');
    clearDone.innerHTML = '';
}

//Event listeners
submitFormButton.addEventListener('click', updateTableNewTask)

sprintDropDown.addEventListener('change', () => {
    clearContent().then(loadTasks).then(setHeader);
});
