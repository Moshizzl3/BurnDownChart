const url = 'http:/localhost:8080/getAllTasks';

const divNotStarted = document.getElementById('divnotstarted');
const divInProgress = document.getElementById('divinprogress');
const divReview = document.getElementById('divreview');
const divDone = document.getElementById('divdone');
const pbButtonStatus = document.getElementById('setstatus');
const pbButtonSubmit = document.getElementById('create-new-task-button');
const pbButtonDelete = document.getElementById('delete');
const sprintDropDown = document.getElementById('sprint-select')

sessionStorage.setItem("name", "finn")

let taskArray = [];
let sprintArray = [];

function fetchAllTasks() {
    return fetch('getAllTasks').then(res => res.json())
}

function fetchAllSprints() {
    return fetch('getAllSprint').then(res => res.json())
}

async function fillSprintArray() {
    const sprintList = await fetchAllSprints();
    sprintList.forEach((sprint) => {
        sprintArray.push(sprint)
    })
}


async function fillTaskArray() {
    const taskList = await fetchAllTasks();
    taskList.forEach((task) => {
        taskArray.push(task)
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

async function deleteRow(task) {
    await deleteTask(task);
}


async function fillTaskToBoard(section, task) {

    const newDiv = document.createElement("div");
    newDiv.classList.add("taskdiv");
    newDiv.setAttribute('id', task.taskId);

    const pName = document.createElement("p");
    const pNodeName = document.createTextNode(task.name);
    pName.append(pNodeName);

    const pDate = document.createElement("p");
    const pNodeDate = document.createTextNode(task.date);
    pDate.append(pNodeDate);

    const pStatus = document.createElement("p");
    const pNodeStatus = document.createTextNode(task.status);
    pStatus.append(pNodeStatus);

    newDiv.append(pName)
    newDiv.append(pDate)
    newDiv.append(pStatus)
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

fillTaskArray().then(loadTasks);

function loadTasks() {


    let filteredTasks = taskArray.filter(function (task) {
        return task.sprint.sprintId == sprintDropDown.value;
    });

    filteredTasks.forEach(task1 => {
        if ("notstarted" == task1.status)
            fillTaskToBoard(divNotStarted, task1);

        else if ("inprogress" == task1.status)
            fillTaskToBoard(divInProgress, task1);

        else if ("review" == task1.status)
            fillTaskToBoard(divReview, task1);

        else if ("done" == task1.status)
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
        option.setAttribute('id', sprint.sprintId)
        option.setAttribute('value', sprint.sprintId)
        option.append(optionNode);
        sprintDropDown.append(option)
    })
}

fillSprintArray().then(loadSprints);

async function changeStatusOnTask() {

    let getTaskId = document.getElementById('p-modal-id').textContent;
    let getTask = taskArray.find(task => task.taskId == getTaskId);
    let taskStatus = document.getElementById("dropDownModal").value;
    let taskTime = document.getElementById("input-time").value;
    console.log(document.getElementById("dropDownModal").value)

    await clearContent();
    await updateTaskTime(getTask, taskTime);
    updateTaskStatus(getTask, taskStatus)
        .then(loadTasks)
        .catch(err => console.log(err));
    console.log(getTask)

    modalTask.style.display = "none";
}

async function onTaskDelete() {

    let getTaskId = document.getElementById('p-modal-id').textContent;
    let getTask = taskArray.find(task => task.taskId == getTaskId);

    await clearContent();

    deleteRow(getTask)
        .then(() => taskArray = [])
        .then(fillTaskArray)
        .then(loadTasks)
        .catch(err => console.log(err));

    modalTask.style.display = "none";
}

async function updateTableNewTask(event) {

    await clearContent();

    createNewTask(event)
        .then(() => taskArray = [])
        .then(fillTaskArray)
        .then(loadTasks);
}


async function createNewTask(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    //data.append('status', "notstarted")


    let body2 =   {
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

    const value = Object.fromEntries(data.entries());


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

const myForm = document.getElementById("task-form");
myForm.addEventListener('submit', updateTableNewTask);


async function updateTaskTime(task, input) {
    task.timeSpent = input;
    await updateStatusTask(task);
}

sprintDropDown.addEventListener('change', () => {
    console.log(sprintDropDown.value)
    clearContent().then(loadTasks);
});

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

let value1 = sprintDropDown.value
console.log(value1)





