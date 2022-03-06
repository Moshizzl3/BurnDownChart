// Get the modal
const modalTask = document.getElementById("myModal");
const modalNewTask = document.getElementById("myModaltask");


// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modalTask.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalTask) {
        modalTask.style.display = "none";
    }
    if (event.target == modalNewTask) {
        modalNewTask.style.display = "none";
    }
}


// Get the <span> element that closes the modal
const span1 = document.getElementsByClassName("close2")[0];

pbButtonSubmit.addEventListener('click', () => {
    modalNewTask.style.display = "block";
})
// When the user clicks on <span> (x), close the modal
span1.onclick = function () {
    modalNewTask.style.display = "none";
}


pbButtonStatus.addEventListener('click', changeStatusOnTask);
pbButtonDelete.addEventListener('click', changeStatusOnTaskDelete);
