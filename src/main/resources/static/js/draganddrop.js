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
    if (document.querySelector(".userStoryDiv").contains(e.target) && document.querySelector(".userStoryDiv").contains(dragEleSrc)) {
        const getId = e.dataTransfer.getData('text');
        let getStory = userStoryArray.find(story => story.userStoryId == getId);
        let backlogList = itemsStory.item(0);
        let sprintList = itemsStory.item(1);
        let currentPosition = dragEleSrc.closest(".story-row");

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
    if (document.getElementById("table-div").contains(e.target) && document.getElementById("table-div").contains(dragEleSrc)) {
        let target = e.target.closest(".colscrollbar");
        const getId = e.dataTransfer.getData('text');
        let getTask = taskArray.find(task => task.taskId == getId);
        let currentPosition = dragEleSrc.closest(".colscrollbar");
        if (target !== currentPosition) {
            if (isWithinScope(target, itemsTasks)) {
                getTask.status = "div" + target.id
                dragEleSrc.status = "div" + target.id
                clearAndLoad()
                clearContent().then(loadTasks);
                await updateTaskStatus(getTask, target.id)
            }
        } else {
            clearAndLoad();
        }
    } else {
        clearAndLoad();
    }
}

function isWithinScope(target, list) {
    let result = false;
    list.forEach((element) => {
        if (element.contains(target)) {
            result = true;
        }
    })
    return result;
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

