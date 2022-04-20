const storyNotStarted = document.getElementById('backlog');
const storyInProgress = document.getElementById('sprint-backlog');
const submitFormButton = document.getElementById('storySubmitBtn');

let userStoryArray = []

fillUserStoryArray().then(loadStories).then(console.log(userStoryArray));

function fetchAllStories() {
    return fetch('getAllUserStories').then(res => res.json())
}

function loadStories() {


    userStoryArray.forEach(story => {
        if ("backlog" === story.status)
            fillStoryToBoard(storyNotStarted, story, '#d9cfce');

        else if ("sprint-backlog" === story.status)
            fillStoryToBoard(storyInProgress, story, '#f5d9a9');

        else {
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


async function fillStoryToBoard(section, story, color) {

    const newDiv = document.createElement("div");
    newDiv.classList.add("story-div");
    newDiv.setAttribute('id', story.userStoryId);
    newDiv.setAttribute('data-bs-toggle', 'modal');
    newDiv.setAttribute('data-bs-target', '#myModal4')
    newDiv.setAttribute('draggable', 'true')

    const pName = document.createElement("p");
    const pNodeName = document.createTextNode('Task Name: ' + story.name);
    pName.append(pNodeName);

    const pDate = document.createElement("p");
    const pNodeDate = document.createTextNode('Creation Date: ' + story.creationDate);
    pDate.append(pNodeDate);

    const pStatus = document.createElement("p");
    const pNodeStatus = document.createTextNode('Task Status: ' + story.status);
    pStatus.append(pNodeStatus);

    const pTaskTime = document.createElement("p");
    const pNodeEstimatedTime = document.createTextNode('Story Points: ' + story.storyPoints);
    pTaskTime.append(pNodeEstimatedTime);

    newDiv.append(pName)
    newDiv.append(pDate)
    newDiv.append(pStatus)
    newDiv.append(pTaskTime)
    section.append(newDiv)

    newDiv.style.backgroundColor = color;

    // When the user clicks on the div, open the modal
    newDiv.addEventListener('click', () => {
        let pName = document.getElementById('p-smodal-name')
        pName.textContent = "Name: " + story.name;
        let pStatus = document.getElementById('p-smodal-status')
        pStatus.textContent = "Status: " + story.status;
        let pId = document.getElementById('p-smodal-id')
        pId.textContent = story.userStoryId;
        let pdesc = document.getElementById('sdescriptionText')
        pdesc.textContent = story.description;

    })
    newDiv.addEventListener('dragstart', handleDragStart);
}

async function updateStatusStory(story, status) {

    story.status = status;
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
        console.log("shiiit, gik sq ikk")
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
        status: 'backlog'
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
        console.log("something went wrong")
    }
    ;
}

submitFormButton.addEventListener('click', updateTableNewStory)