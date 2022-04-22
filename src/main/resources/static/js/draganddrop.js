
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
    const getId = e.dataTransfer.getData('text');
    let getStory = userStoryArray.find( story => story.userStoryId == getId);
    itemsStory.forEach(item => {
        item.innerHTML = "";
    })
    if (true == true){
        await updateStatusStory(getStory,e.target.id )
        console.log(e.target.class)
    }


     fillUserStoryArray().then(loadStories);
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
    item.addEventListener('drop', handleDrop);
});

