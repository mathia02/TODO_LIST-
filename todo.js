let task = [];

const listElement = document.getElementById('tasklist');
const completedElement = document.getElementById('completedlist');

window.onload = () => {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        task = JSON.parse(savedTasks);
        rendertask();
    }
};

function rendertask() {
    listElement.innerHTML = "";
    completedElement.innerHTML = "";

    task.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item.text;

        // click: line completed
        li.addEventListener("click", () => {
            item.completed = !item.completed;
            saveTasks();
            rendertask();
        });

        // right-click: delete
        li.addEventListener("contextmenu", (event) => {
            event.preventDefault(); // prevent the default right-click menu
            task.splice(index, 1);
            saveTasks();
            rendertask();
        });

        if (item.completed) {
            li.classList.add("completed");
            completedElement.appendChild(li);
        } else {
            listElement.appendChild(li);
        }
    });
}


function addtask() {
    let item = document.getElementById("taskinput");
    if (item.value.trim() === "") {
        alert("Enter your task");
    } else {
        task.push({ text: item.value, completed: false });
        saveTasks();
        rendertask();
        item.value = "";
       
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(task));

}
