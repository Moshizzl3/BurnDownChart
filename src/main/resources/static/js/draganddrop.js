let dragEleSrc;

function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragEleSrc = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.target.id);
}

function handleDragEnd(e) {
    this.style.opacity = '1';


    itemsTasks.forEach(item => {
        item.classList.remove('over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

async function handleDrop(e) {
    e.stopPropagation();
    if (document.querySelector(".userStoryDiv").contains(e.target)) {
        const getId = e.dataTransfer.getData('text');
        let getStory = userStoryArray.find(story => story.userStoryId == getId);
        let backlogList = itemsStory.item(0);
        let sprintList = itemsStory.item(1);
        let currentPosition;
        if (getStory.status == "backlog") {
            currentPosition = backlogList;
        } else if (getStory.status == "sprint-backlog") {
            currentPosition = sprintList;
        }

        if (e.target !== currentPosition) {
            let success = false;
            if (e.target === backlogList) {
                getStory.status = "backlog";
                dragEleSrc.status = "backlog";
                success = true
            } else if (e.target === sprintList) {
                getStory.status = "sprint-backlog"
                dragEleSrc.status = "spring-backlog";
                success = true;
            }
            if (success) {

                clearAndLoad()
                let update = updateStatusStory(getStory, e.target.id)

                clearContent().then(loadTasks);
                await reloadUserStory(update);
            } else {
                clearAndLoad()
            }
        }
    } else {
        clearAndLoad();
    }
}

async function handleDropTask(e) {
    e.stopPropagation();
    if (document.getElementById("table-div").contains(e.target)) {
        const getId = e.dataTransfer.getData('text');
        let getTask = taskArray.find(task => task.taskId == getId);
        let notStartedList = itemsTasks.item(0);
        let inProgressList = itemsTasks.item(1);
        let reviewList = itemsTasks.item(2);
        let doneList = itemsTasks.item(3);
        if (true == true) {
            if (notStartedList.contains(dragEleSrc)) {
                getTask.status = e.target.id
                dragEleSrc.status = e.target.id
            } else {

            }
            clearAndLoad()
            clearContent().then(loadTasks);
            await updateTaskStatus(getTask, e.target.id)


        }
    } else {
        clearAndLoad();
    }
}

async function reloadUserStory(update) {
    await update;
    await fillUserStoryArray();
    await clearUserStories();
    await loadStories();
}


function clearAndLoad() {
    itemsStory.forEach(item => {
        item.innerHTML = ''
    });

    loadStories();
}

async function clearUserStories() {
    itemsStory.forEach(item => {
        item.innerHTML = ''
    });
}

let itemsStory = document.querySelectorAll('.story-row');

itemsStory.forEach((item) => {
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
});

let itemsTasks = document.querySelectorAll('.taskZone');

itemsTasks.forEach((item) => {
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDropTask);
});

