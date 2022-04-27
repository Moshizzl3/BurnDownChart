const storyNotStarted = document.getElementById('backlog');
const storyInProgress = document.getElementById('sprint-backlog');
const submitFormButton = document.getElementById('storySubmitBtn');
const taskform = document.getElementById("task-form");
const updateStoryButton = document.getElementById("updateStory");

let userStoryArray = []

function fetchAllStories() {
    return fetch('getAllUserStories').then(res => res.json())
}

function loadStories() {
    console.log(userStoryArray)
    clearContentStoryRows();
    userStoryArray.forEach(story => {
        if ("backlog" === story.status)
            fillStoryToBoard(storyNotStarted, story, '#d9cfce');

        else if ("sprint-backlog" === story.status)
            if (story.sprint.sprintId == sprintDropDown.value) {
                fillStoryToBoard(storyInProgress, story, '#f5d9a9');
            } else {
                console.log("defualt");
            }
    })
}

async function fillUserStoryArray() {
    userStoryArray = [];
    const storyList = await fetchAllStories();
    storyList.forEach((story) => {
        userStoryArray.push(story)
    })

}

function clearContentStoryRows() {
    storyNotStarted.innerHTML = "";
    storyInProgress.innerHTML = "";
}


async function fillStoryToBoard(section, story, color) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("story-div");
    newDiv.setAttribute('id', story.userStoryId);
    newDiv.setAttribute('data-bs-toggle', 'modal');
    newDiv.setAttribute('data-bs-target', '#myModal4')
    newDiv.setAttribute('draggable', 'true')

    const pName = document.createElement("p");
    const pNodeName = document.createTextNode('Story Name: ' + story.name);
    pName.append(pNodeName);

    const pStatus = document.createElement("p");
    const pNodeStatus = document.createTextNode('Story Status: ' + story.status);
    pStatus.append(pNodeStatus);


    const pTaskTime = document.createElement("p");
    const pNodeEstimatedTime = document.createTextNode('Story Points: ' + story.storyPoints);
    pTaskTime.append(pNodeEstimatedTime);

    newDiv.append(pName)
    newDiv.append(pStatus)
    newDiv.append(pTaskTime)
    section.append(newDiv)

    newDiv.style.backgroundColor = color;

    // When the user clicks on the div, open the modal
    newDiv.addEventListener('click', async () => {
        let pName = document.getElementById('p-smodal-name')
        pName.textContent = "Name: " + story.name;
        let pStatus = document.getElementById('p-smodal-status')
        pStatus.textContent = "Status: " + story.status;
        let pId = document.getElementById('p-smodal-id')
        pId.textContent = story.userStoryId;
        let pdesc = document.getElementById('sdescriptionText')
        pdesc.textContent = story.description;
        const modalStoryId = document.getElementById('p-smodal-id');
        let storyTaskDiv = document.getElementById('taskStory')
        fillTableInStory(story, storyTaskDiv)


    })
    newDiv.addEventListener('dragstart', handleDragStart);
}

async function updateStatusStory(story, status) {

    const sprint = sprintArray.find(sprint => sprint.sprintId == sprintDropDown.value)
    story.status = status;
    story.sprint = sprint;
    const urlUpdate = 'userStory/' + story.userStoryId;

    const fetchOption = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }

    const jsonString = JSON.stringify(story);
    fetchOption.body = jsonString;

    //call backend and wait for response
    const response = await fetch(urlUpdate, fetchOption);
    if (!response.ok) {
    }
    return response;
}

async function updateStoryPoints(story) {

    const urlUpdate = 'userStory/' + story.userStoryId;
    const fetchOption = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }

    const jsonString = JSON.stringify(story);
    fetchOption.body = jsonString;

    //call backend and wait for response
    const response = await fetch(urlUpdate, fetchOption);
    if (!response.ok) {
    }
    return response;
}

async function updateTableNewStory() {

    await createNewStory("postUserStory");

    await fillUserStoryArray().then(loadStories);
}

async function createNewStory(url) {
    let body2 = {
        name: document.getElementById('sname').value,
        description: document.getElementById('sdescription').value,
        status: 'backlog',
        sprint: {
            sprintId: 1
        }
    }

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
    }
    ;
}

function fillTableInStory(story, newDiv) {
    let taskTable = story.tasks;
    newDiv.innerHTML = "";
    const tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.style.border = '1px solid black';

    const trHead = tbl.insertRow();
    let tdHead = trHead.insertCell();
    tdHead.append("Name")
    tdHead.style.height = 'auto'
    tdHead = trHead.insertCell();
    tdHead.append("Status")
    tdHead.style.height = 'auto'
    tdHead = trHead.insertCell();
    tdHead.append("points")
    tdHead.style.height = 'auto'

    taskTable.forEach(task => {
        const tr = tbl.insertRow();
        let td = tr.insertCell();
        td.style.height = 'auto'
        td.append(task.name)
        td = tr.insertCell()
        td.style.height = 'auto'
        td.append(task.status)
        td = tr.insertCell()
        td.style.height = 'auto'
        td.append(task.estimatedTime)
        td = tr.insertCell()
        td.style.height = 'auto'
        td.append(task.taskId)
    })

    const button = document.createElement("button");
    button.classList.add("btn", "btn-success", "mt-2");
    button.textContent = "Create new task";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#myModal2')

    button.addEventListener("click", () => {
        taskform.reset();
        taskform.userstory = story;
        let title = document.getElementById("p-modal-storytitle");
        title.textContent = "Create new task for " + story.name + "[" + story.userStoryId + "]";
    })

    newDiv.append(tbl);
    newDiv.append(button);

    updateStoryButton.addEventListener('click',async () => {

        let points = 0;
        story.tasks.forEach(task => points += Number(task.estimatedTime))
        story.storyPoints = points;

        clearContent().then(loadTasks);

        await reloadUserStory(updateStoryPoints(story))
    })
}

submitFormButton.addEventListener('click', updateTableNewStory)


taskform.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(taskform);
    const user = userArray.find(user => user.userId == 1)
    let task = {
        userStoryId: taskform.userstory.userStoryId,
        description: formData.get("taskDescription"),
        estimatedTime: formData.get("estimatedTime"),
        name: formData.get("name"),
        status: "divnotstarted",
        user: user
    }
    taskform.userstory.tasks.push(task);
    createNewTask(task).then(fillUserStoryArray).then(fillTaskArray);
    let storyTaskDiv = document.getElementById('taskStory');
    fillTableInStory(taskform.userstory, storyTaskDiv);
})