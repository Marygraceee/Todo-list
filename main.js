

let projectsContainer = document.querySelector(".projects")
let tabsContainer = document.querySelector(".tabs")
let projectNameInput = document.getElementById("projectname")
projectNameInput.value = ""
let addProjectBtn = document.getElementById("addprojectbtn")
let deleteProjectBtn = document.getElementById("deleteprojectbtn")
let projects = Array.from(projectsContainer.children)
let tabs = Array.from(tabsContainer.children)
let projectsStorageArray = []
let tasksStorageArray = []

// creating the object contructor for a project

function Project(name){
    this.name = name;
}

// creating the object constructor for tasks

function Tasks(name, content){
    
    this.name = name;
    this.content = content;
}


// 1. Iterating through the arrays, to select a specific project and tab

function selectProject(){
    projects.forEach((project)=>{
        project.addEventListener("click", ()=>{  
            // Removing the "active" class from the projects    
    projects.forEach((project)=>{
        project.classList.remove("active")
    })
    // adding the "disabled" class to tabs
    tabs.forEach((tab)=>{
        tab.classList.remove("active")
        tab.classList.add("disabled")
    })
            tabs.forEach((tab)=>{
                if (project.classList[0] === tab.classList[0] && (projects.indexOf(project)) === (tabs.indexOf(tab))){
                    project.classList.add("active")
                    tab.classList.add("active")
                    tab.classList.remove("disabled")
                    
                    
                }
            })
        })
    })
    
}




// 2. adding the ability to create projects and their related tab

addProjectBtn.addEventListener("click", addProject)

function addProject(){ 
    
   
       
        
    
 // Create the new project
        
 let newProject = document.createElement("div")
 newProject.textContent = projectNameInput.value 
 newProject.className = `${projectNameInput.value}`
 if (projectNameInput.value === ""){
     alert("Give a name to the project!")
 }
 
 else {
     // creating a project object and appending it to the array that will be saved in localStorage
let newProjectObject = new Project(`${projectNameInput.value}`)
    projectsStorageArray.push(newProjectObject)
    localStorage.setItem("projects", JSON.stringify(projectsStorageArray))
// Create the new tab
let newTab = document.createElement("div")
// creating and appending the button, the input and the delete button to the tab
let newTask = document.createElement("div")
let newTaskButton = document.createElement("button")
newTaskButton.textContent = "Add task"
newTaskButton.classList.add("addTaskBtn")
let newTaskInput = document.createElement("input")
newTaskInput.classList.add("addTaskInput")

newTask.append(newTaskButton, newTaskInput)
newTab.append(newTask)
// -----------------------------------------------------------

newTab.className = `${projectNameInput.value} disabled` 
// adding the new project and the new tab to the containers
tabsContainer.append(newTab)
projectsContainer.appendChild(newProject)
// adding the new project and tab to the arrays, in order to make the "selectProject" function work
projects = Array.from(projectsContainer.children)
tabs = Array.from(tabsContainer.children)
projectNameInput.value = ""
selectProject()
addTask()

 }
        
       
       
       
}




// 3. When you have an active project and you click the delete button, it deletes the project and its tab

deleteProjectBtn.addEventListener("click", deleteProject)

function deleteProject(){
   
    projects.forEach((project)=>{
        if (project.classList.contains("active")){
            
            projectsStorageArray.splice(projects.indexOf(project), 1)
            localStorage.setItem("projects", JSON.stringify(projectsStorageArray))
            project.remove()
            projects = Array.from(projectsContainer.children)
            
        }  
        })

        tabs.forEach((tab)=>{
            if (tab.classList.contains("active")){
                tasksStorageArray.forEach((task)=>{
                    let filteredItems = tasksStorageArray.filter( (task) => task.name !== tab.classList[0])
                    tasksStorageArray = filteredItems
                    console.log(tasksStorageArray)
                    localStorage.setItem("tasks", JSON.stringify(tasksStorageArray))
                })
                
                   

                
                tab.remove()
                tabs = Array.from(tabsContainer.children)
                console.log(tab)
                
            }
            })
        
}

    // 4. within a specific tab, you can add tasks to it

function addTask(){
    let newTaskBtn = document.querySelectorAll(".addTaskBtn")
    

    for (let i = newTaskBtn.length - 1; i < newTaskBtn.length; i++){
        newTaskBtn[i].addEventListener("click", ()=>{
            if (newTaskBtn[i].nextSibling.value === ""){

                console.log(newTaskBtn[i].nextSibling.value)
                alert("Insert a task description, you can't have an empty task!")
                
               
            }
            else {
                // saving the task to local storage
                
               let newTaskObject = new Tasks(`${newTaskBtn[i].parentElement.parentElement.classList[0]}`, `${newTaskBtn[i].nextSibling.value}`)
               tasksStorageArray.push(newTaskObject)
               localStorage.setItem(`tasks`, JSON.stringify(tasksStorageArray))
                
            
                // -------------------------------------------------------------
                let newTask = document.createElement("div")
                newTask.textContent = newTaskBtn[i].nextSibling.value
                newTask.className = `${newTaskBtn[i].parentElement.parentElement.classList[0]}`
                let deleteTaskBtn = document.createElement("button")
                deleteTaskBtn.classList.add("deleteTaskBtn")
                deleteTaskBtn.innerText = "Delete"
                newTask.append(deleteTaskBtn)
                newTaskBtn[i].parentElement.parentElement.append(newTask)
                newTaskBtn[i].nextSibling.value = ""

                deleteTask()
               
                
                
                
            }
        
            
        })
    }
    
}
 
       
   // 6. get "projects" from local storage, and for each project create a project dom element with the right name

   function renderLocalStorageProjects(){
    let newProjectsLocalStorageArray = JSON.parse(localStorage.getItem("projects") || "[]");
    projectsStorageArray = newProjectsLocalStorageArray
    if (localStorage.projects !== "[]"){
        projectsStorageArray = newProjectsLocalStorageArray
        newProjectsLocalStorageArray.forEach((project)=>{
            

            // Create the new project
        
 let newProject = document.createElement("div")
 newProject.textContent = project.name
 newProject.className = `${project.name}`

// Create the new tab

let newTab = document.createElement("div")

// creating and appending the button, the input and the delete button to the tab

let newTask = document.createElement("div")
let newTaskButton = document.createElement("button")
newTaskButton.textContent = "Add task"
newTaskButton.classList.add("addTaskBtn")
let newTaskInput = document.createElement("input")
newTaskInput.classList.add("addTaskInput")

newTask.append(newTaskButton, newTaskInput)
newTab.append(newTask)
// -----------------------------------------------------------

newTab.className = `${project.name} disabled` 
// adding the new project and the new tab to the containers
tabsContainer.append(newTab)
projectsContainer.appendChild(newProject)
// adding the new project and tab to the arrays, in order to make the "selectProject" function work
projects = Array.from(projectsContainer.children)
tabs = Array.from(tabsContainer.children)
projectNameInput.value = ""
selectProject()
addTask()
        })
    }
   }
renderLocalStorageProjects()
   



   // 7. get "tasks" from localStorage and assign them to the corrent "projects", then render them in the page wwhen you refresh

   function renderTasks(){
    let newTasksStorageArray = JSON.parse(localStorage.getItem("tasks") || "[]");
    
    tasksStorageArray = newTasksStorageArray
    if (localStorage.tasks !== "[]"){
        tasksStorageArray = newTasksStorageArray
        tabs.forEach((tab)=>{
            
            newTasksStorageArray.forEach((task)=>{
                if (task.name === tab.classList[0]){
                    
                    //creating the task
                    let newTask = document.createElement("div")
                    newTask.textContent = task.content
                    newTask.className = task.name
                    //creating the delete button
                    let deleteTaskBtn = document.createElement("button")
                deleteTaskBtn.classList.add("deleteTaskBtn")
                deleteTaskBtn.textContent = "Delete"
                newTask.append(deleteTaskBtn)
                // appending to the correct place
                tab.append(newTask)
                
                
                }
            })
            addTask()
            deleteTask()
                
        })
    }
    
   }

renderTasks()















   // 5. within a specific tab, you can delete a single task.

   document.addEventListener("click", (e)=>{
    if (e.target.className === "deleteTaskBtn"){
console.log(e.target.previousSibling.textContent)
tasksStorageArray.forEach((task)=>{
    if (e.target.previousSibling.textContent === task.content){
        console.log("ciao")
        e.target.parentElement.remove(e.target)
        tasksStorageArray.splice(tasksStorageArray.indexOf(task), 1)
        localStorage.setItem("tasks", JSON.stringify(tasksStorageArray))
    }
})
      
         
    }   
 })

   function deleteTask(){
    let deleteTaskBtn = document.querySelectorAll(".deleteTaskBtn")
   }
 
 

