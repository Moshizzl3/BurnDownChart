const url = 'http:/localhost:8080/getAllTasks';

const divnotstarted = document.getElementById('divnotstarted');
const divinprogress = document.getElementById('divinprogress');
const divreview = document.getElementById('divreview');
const divdone = document.getElementById('divdone');
const pbButtonStatus = document.getElementById('setstatus');
const pbButtonSubmit = document.getElementById('create-new-task-button');
const pbButtonDelete = document.getElementById('delete');

sessionStorage.setItem("name", "finn")

let taskArray = [];

function fetchAllTasks() {
    return fetch('getAllTasks').then(res => res.json())
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

async function updateRow(task, input) {
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
    })
}

fillTaskArray().then(loadTasks);

function loadTasks() {

    taskArray.forEach(task1 => {
        if ("notstarted" == task1.status)
            fillTaskToBoard(divnotstarted, task1);

        else if ("inprogress" == task1.status)
            fillTaskToBoard(divinprogress, task1);

        else if ("review" == task1.status)
            fillTaskToBoard(divreview, task1);

        else if ("done" == task1.status)
            fillTaskToBoard(divdone, task1);

        else {
            console.log("defualt");
        }
    })
}


function changeStatusOnTask() {

    let getTaskId = document.getElementById('p-modal-id').textContent;
    let getTask = taskArray.find(task => task.taskId == getTaskId);
    console.log(getTask)
    let taskStatus = document.getElementById("dropDownModal").value;
    console.log(document.getElementById("dropDownModal").value)

    let clearNotStarted = document.getElementById('divnotstarted');
    clearNotStarted.innerHTML = '';

    let clearInProgress = document.getElementById('divinprogress');
    clearInProgress.innerHTML = '';

    let clearReview = document.getElementById('divreview');
    clearReview.innerHTML = '';

    let clearDone = document.getElementById('divdone');
    clearDone.innerHTML = '';

    updateRow(getTask, taskStatus).then(loadTasks);

    modalTask.style.display = "none";
}

async function changeStatusOnTaskDelete() {

    let getTaskId = document.getElementById('p-modal-id').textContent;
    let getTask = taskArray.find(task => task.taskId == getTaskId);

    let clearNotStarted = document.getElementById('divnotstarted');
    clearNotStarted.innerHTML = '';

    let clearInProgress = document.getElementById('divinprogress');
    clearInProgress.innerHTML = '';

    let clearReview = document.getElementById('divreview');
    clearReview.innerHTML = '';

    let clearDone = document.getElementById('divdone');
    clearDone.innerHTML = '';

    deleteRow(getTask)
        .then(() => taskArray = [])
        .then(fillTaskArray)
        .then(loadTasks);

    modalTask.style.display = "none";
}

async function updateTableNewTask() {

    let getTaskId = document.getElementById('p-modal-id').textContent;
    let getTask = taskArray.find(task => task.taskId == getTaskId);

    let clearNotStarted = document.getElementById('divnotstarted');
    clearNotStarted.innerHTML = '';

    let clearInProgress = document.getElementById('divinprogress');
    clearInProgress.innerHTML = '';

    let clearReview = document.getElementById('divreview');
    clearReview.innerHTML = '';

    let clearDone = document.getElementById('divdone');
    clearDone.innerHTML = '';

}

async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    //data.append('status', "notstarted")


    const value = Object.fromEntries(data.entries());

    const url = "http://localhost:8080/postTask";

    const fetchOptions = {
        method: "Post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(value)
    }

    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        console.log("something went wrong")
    }
    ;
    modalNewTask.style.display = "none";
    loadTasks();
}

const myForm = document.getElementById("task-form");
myForm.addEventListener('submit', handleSubmit);




