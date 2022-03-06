const url = 'http:/localhost:8080/getAllTasks';

const divnotstarted = document.getElementById('divnotstarted');
const divinprogress = document.getElementById('divinprogress');
const divreview = document.getElementById('divreview');
const divdone = document.getElementById('divdone');
const pbButtonStatus = document.getElementById('setstatus');
const pbButtonSubmit = document.getElementById('create-new-task-button');

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




function fillTaskToBoard(section, task) {

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
    console.log(taskArray)
    taskArray.forEach(task1 => {
        let test = task1.taskId;
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
    console.log(getTaskId)
    taskArray[getTaskId-1].status = document.getElementById("dropDownModal").value;
    console.log(document.getElementById("dropDownModal").value)

    let clearNotStarted = document.getElementById('divnotstarted');
    clearNotStarted.innerHTML = '';

    let clearInProgress = document.getElementById('divinprogress');
    clearInProgress.innerHTML = '';

    let clearReview = document.getElementById('divreview');
    clearReview.innerHTML = '';

    let clearDone = document.getElementById('divdone');
    clearDone.innerHTML = '';
    loadTasks();
    console.log(taskArray)
    modalTask.style.display = "none";
}



