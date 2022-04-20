const divNotStarted = document.getElementById('divnotstarted');
const divInProgress = document.getElementById('divinprogress');
const divReview = document.getElementById('divreview');
const divDone = document.getElementById('divdone');
const pbButtonStatus = document.getElementById('setstatus');
const pbButtonSubmit = document.getElementById('create-new-task-button');
const pbButtonDelete = document.getElementById('delete');
const sprintDropDown = document.getElementById('sprint-select')
const userDropDown = document.getElementById('dropDownUserTask')

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
    await fillUserStoryArray()
    for (let story of userStoryArray) {
        for (let task of story.tasks) {
            taskArray.push(task)
        }
    }
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
    if (input === 'done') {
        task.completionDate = new Date().toLocaleDateString('en-CA');
    }
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


async function fillTaskToBoard(section, task, color) {

    const newDiv = document.createElement("div");
    newDiv.classList.add("taskdiv");
    newDiv.setAttribute('id', task.taskId);
    newDiv.setAttribute('data-bs-toggle', 'modal');
    newDiv.setAttribute('data-bs-target', '#myModal')

    const pName = document.createElement("p");
    const pNodeName = document.createTextNode('Task Name: ' + task.name);
    pName.append(pNodeName);

    const pDate = document.createElement("p");
    const pNodeDate = document.createTextNode('Creation Date: ' + task.creationDate);
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

    newDiv.style.backgroundColor = color;

    // When the user clicks on the div, open the modal
    newDiv.addEventListener('click', () => {
        let pName = document.getElementById('p-modal-name')
        pName.textContent = "Name: " + task.name;
        let pDate = document.getElementById('p-modal-date')
        pDate.textContent = "Date: " + task.creationDate;
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
            fillTaskToBoard(divNotStarted, task1, '#d9cfce');

        else if ("inprogress" === task1.status)
            fillTaskToBoard(divInProgress, task1, '#f5d9a9');

        else if ("review" === task1.status)
            fillTaskToBoard(divReview, task1, '#84f0ca');

        else if ("done" === task1.status)
            fillTaskToBoard(divDone, task1, '#62f075');

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
}

async function onTaskDelete() {

    let getTaskId = document.getElementById('p-modal-id').textContent;
    let getTask = taskArray.find(task => task.taskId == getTaskId);

    await clearContent();

    deleteTask(getTask)
        .then(() => taskArray = [])
        .then(fillTaskArray)
        .then(loadTasks)
}

async function updateTableNewTask() {
    await clearContent();

    await createNewStory("postTask");
    fillTaskArray().then(loadTasks);
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

pbButtonStatus.addEventListener('click', changeStatusOnTask);
pbButtonDelete.addEventListener('click', onTaskDelete);

sprintDropDown.addEventListener('change', () => {
    clearContent().then(loadTasks).then(setHeader);
});

console.log(new Date().toLocaleDateString('en-CA'))