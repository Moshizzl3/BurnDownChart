let dragSrcEl;
const dropZone = document.getElementById('storyinprogress')


function handleDragStart(e) {
    this.style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.target.id);
}

function handleDragEnd(e) {
    this.style.opacity = '1';

    items.forEach(function (item) {
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
    const getId = e.dataTransfer.getData('text');
    let getStory = userStoryArray.find( story => story.userStoryId == getId);
    console.log(e.target.id)

    items.forEach(item => {
        item.innerHTML = "";
    })

    await updateStatusStory(getStory,e.target.id )

     fillUserStoryArray().then(loadStories).then(console.log(userStoryArray));

}

let items = document.querySelectorAll('.story-row');

items.forEach((item) => {
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
});
