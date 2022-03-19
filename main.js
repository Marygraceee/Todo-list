

let projectsContainer = document.querySelector(".projects")
let tabsContainer = document.querySelector(".tabs")
let projectNameInput = document.getElementById("projectname")
projectNameInput.value = ""
let addProjectBtn = document.getElementById("addprojectbtn")
let deleteProjectBtn = document.getElementById("deleteprojectbtn")
let projects = Array.from(projectsContainer.children)
let tabs = Array.from(tabsContainer.children)



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
                if (project.classList[0] === tab.classList[0]){
                    project.className = project.className + " active"
                    tab.classList.add("active")
                    tab.classList.remove("disabled")
                    console.log(project.classList)
                    console.log(tab.classList)
                }
            })
        })
    })
}




// 2. adding the ability to create projects and their related tab

function addProject(){ 
    addProjectBtn.addEventListener("click", ()=>{
        // Create the new project
        let newProject = document.createElement("div")
        newProject.textContent = projectNameInput.value 
        newProject.classList.add(`${projectNameInput.value}`)
        // Create the new tab
        let newTab = document.createElement("div")
        // creating and appending the button and the input to the tab
        let newTaskButton = document.createElement("button")
        newTaskButton.textContent = "Add task"
        newTaskButton.classList.add("addTaskBtn")
        let newTaskInput = document.createElement("input")
        newTaskInput.classList.add("addTaskInput")
        newTab.append(newTaskButton, newTaskInput)
        // -----------------------------------------------------------
        newTab.classList.add(`${projectNameInput.value}`, "disabled")
        // adding the new project and the new tab to the containers
        tabsContainer.append(newTab)
        projectsContainer.appendChild(newProject)
        // adding the new project and tab to the arrays, in order to make the "selectProject" function work
       projects = Array.from(projectsContainer.children)
       tabs = Array.from(tabsContainer.children)
       projectNameInput.value = ""
       selectProject()
    })    
}

addProject()


// 3. When you have an active project and you click the delete button, it deletes the project and its tab

deleteProjectBtn.addEventListener("click", deleteProject)

function deleteProject(){
   
    projects.forEach((project)=>{
        if (project.classList.contains("active")){
            console.log(project)
            project.remove()
            projects = Array.from(projectsContainer.children)
            console.log(projectsContainer)
            console.log(projects)
        }  
        })

        tabs.forEach((tab)=>{
            if (tab.classList.contains("active")){
                console.log(tab)
                tab.remove()
                tabs = Array.from(tabsContainer.children)
                console.log(tabsContainer)
                console.log(tab)
            }
            })
       
    
}