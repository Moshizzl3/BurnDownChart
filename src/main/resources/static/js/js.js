

const divnotstarted = document.getElementById('divnotstarted');
const divinprogress = document.getElementById('divinprogress');
const divreview = document.getElementById('divreview');
const divdone = document.getElementById('divdone');

function fillTaskToBoard(section, task) {

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
        pDate.textContent = "Date " + task.date;
        let pStatus = document.getElementById('p-modal-status')
        pStatus.textContent = "Status" + task.status;
    })

    const pbButtonStatus = document.getElementById('setStatus');
    pbButtonStatus.addEventListener('click', () => {
        task.status = document.getElementById('dropDownModal').value;
    });
}

let taskArray = [];
for (let i = 0; i < 10; i++) {
    let task1 = {
        id: i,
        name: "task " + i,
        date: new Date().toLocaleDateString('en-GB'),
        status: "ToDo",
        user: {
            name: "Finn"
        }
    }
    taskArray.push(task1);
}

function loadTasks(){
    taskArray.forEach((task1) =>{
        fillTaskToBoard(divnotstarted, task1);
        fillTaskToBoard(divinprogress, task1);
        fillTaskToBoard(divreview, task1);
        fillTaskToBoard(divdone, task1);
    })
}
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
