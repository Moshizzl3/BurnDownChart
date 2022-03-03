
let taskArray = [];

const divnotstarted = document.getElementById('divnotstarted');
const divinprogress = document.getElementById('divinprogress');
const divreview = document.getElementById('divreview');
const divdone = document.getElementById('divdone');
const pbButtonStatus = document.getElementById('setstatus');

sessionStorage.setItem("name", "finn")

let isFilled = false

function fillTaskToBoard(section, task) {


    console.log("inde i task board")
    const newDiv = document.createElement("div");
    newDiv.classList.add("taskdiv");
    newDiv.setAttribute('id', task.id);

    const labelName = document.createElement("p");
    const labelNodeName = document.createTextNode(task.name);
    labelName.append(labelNodeName);

    const labelDate = document.createElement("p");
    const labelNodeDate = document.createTextNode(task.date);
    labelDate.append(labelNodeDate);

    const labelStatus = document.createElement("p");
    const labelNodeStatus = document.createTextNode(task.status);
    labelStatus.append(labelNodeStatus);

    newDiv.append(labelName)
    newDiv.append(labelDate)
    newDiv.append(labelStatus)
    section.append(newDiv)

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    newDiv.style.backgroundColor = "#" + randomColor;

    // When the user clicks on the div, open the modal
    newDiv.addEventListener('click', () => {
        modal.style.display = "block";
        let pName = document.getElementById('p-modal-name')
        pName.textContent = "Name: " + task.name;
        let pDate = document.getElementById('p-modal-date')
        pDate.textContent = "Date: " + task.date;
        let pStatus = document.getElementById('p-modal-status')
        pStatus.textContent = "Status: " + task.status;
        let pId = document.getElementById('p-modal-id')
        pId.textContent = task.id;

    })
}





function loadTasks() {

    taskArray.forEach(task1 => {
        let test = task1.status;

        if ("notstarted" == test)
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

loopThroughArray();
loadTasks();


console.log("date = " + new Date().toLocaleDateString('en-GB'));


// Get the modal
const modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function changeStatusOnTask(){


    let getTaskId = document.getElementById('p-modal-id').textContent;
    taskArray[getTaskId].status = document.getElementById("dropDownModal").value;
    console.log( document.getElementById("dropDownModal").value)

    let clearNotStarted = document.getElementById('divnotstarted');
    clearNotStarted.innerHTML ='';

    let clearInProgress = document.getElementById('divinprogress');
    clearInProgress.innerHTML ='';

    let clearReview = document.getElementById('divreview');
    clearReview.innerHTML ='';

    let clearDone = document.getElementById('divdone');
    clearDone.innerHTML ='';
    loadTasks();
    console.log(taskArray)
    modal.style.display = "none";
}




function removeChildren(HtmlChildren){
    for(child of HtmlChildren){
        child.remove;
    }
}
pbButtonStatus.addEventListener('click',changeStatusOnTask)



























//test data

function loopThroughArray() {
    let ids=0;
    for (let i = 0; i < 3; i++) {
        let task1 = {
            id: ids++,
            name: "task " + i,
            date: new Date().toLocaleDateString('en-GB'),
            status: "notstarted",
            user: {
                name: "Finn"
            }
        }
        taskArray.push(task1);
    }

    for (let i = 0; i < 2; i++) {
        let task1 = {
            id: ids++,
            name: "task " + i,
            date: new Date().toLocaleDateString('en-GB'),
            status: "inprogress",
            user: {
                name: "Finn"
            }
        }
        taskArray.push(task1);
    }

    for (let i = 0; i < 2; i++) {
        let task1 = {
            id: ids++,
            name: "Task " + i,
            date: new Date().toLocaleDateString('en-GB'),
            status: "review",
            user: {
                name: "Finn"
            }
        }
        taskArray.push(task1);
    }

    for (let i = 0; i < 1; i++) {
        let task1 = {
            id: ids++,
            name: "task " + i,
            date: new Date().toLocaleDateString('en-GB'),
            status: "done",
            user: {
                name: "Finn"
            }
        }
        taskArray.push(task1);
    }
}

console.log(taskArray)