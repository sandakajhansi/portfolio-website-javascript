let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active"){
            return !task.completed;
        }

        if(currentFilter === "completed"){
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed':''}">
                ${task.text}
            </span>

            <div>
                <button class="toggle" data-id="${index}">
                    ✓
                </button>

                <button class="edit" data-id="${index}">
                    Edit
                </button>

                <button class="delete" data-id="${index}">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

document.getElementById("addBtn").addEventListener("click",()=>{

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text:text,
        completed:false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
});

taskList.addEventListener("click",(e)=>{

    const id = e.target.dataset.id;

    if(id === undefined) return;

    if(e.target.classList.contains("toggle")){
        tasks[id].completed = !tasks[id].completed;
    }

    if(e.target.classList.contains("delete")){
        tasks.splice(id,1);
    }

    if(e.target.classList.contains("edit")){

        const updated = prompt(
            "Edit Task",
            tasks[id].text
        );

        if(updated){
            tasks[id].text = updated;
        }
    }

    saveTasks();
    renderTasks();
});

document
.querySelectorAll("[data-filter]")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        currentFilter = btn.dataset.filter;

        renderTasks();
    });
});

renderTasks();
