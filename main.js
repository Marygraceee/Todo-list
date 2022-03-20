

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
                if (project.classList[0] === tab.classList[0] && (projects.indexOf(project)) === (tabs.indexOf(tab))){
                    project.classList.add("active")
                    tab.classList.add("active")
                    tab.classList.remove("disabled")
                    console.log(projects.indexOf(project))
                    console.log(tabs.indexOf(tab))
                    
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
            
            project.remove()
            projects = Array.from(projectsContainer.children)
            
        }  
        })

        tabs.forEach((tab)=>{
            if (tab.classList.contains("active")){
                
                tab.remove()
                tabs = Array.from(tabsContainer.children)
                
            }
            })
}
    // 4. within a specific tab, you can add tasks to it

function addTask(){
    let newTaskBtn = document.querySelectorAll(".addTaskBtn")
    

    for (let i = newTaskBtn.length - 1; i < newTaskBtn.length; i++){
        newTaskBtn[i].addEventListener("click", ()=>{
            if (newTaskBtn[i].nextSibling.value !== ""){
                
                let newTask = document.createElement("div")
                newTask.textContent = newTaskBtn[i].nextSibling.value
                newTask.className = `${i}`
                let deleteTaskBtn = document.createElement("button")
                deleteTaskBtn.classList.add("deleteTaskBtn")
                deleteTaskBtn.textContent = "Delete"
                newTask.append(deleteTaskBtn)
                newTaskBtn[i].parentElement.parentElement.append(newTask)
                newTaskBtn[i].nextSibling.value = ""
                deleteTask()
            }
            else {
                alert("Insert a task description, you can't have an empty task!")
            }
        
            
        })
    }
    
}
 

/*newTaskBtn.forEach((button)=>{
    button.addEventListener("click", ()=>{
        console.log(button.nextSibling.value)
        
    }) */


   /* for (let i = newTaskBtn.length - 1; i < newTaskBtn.length; i++){
        newTaskBtn[i].addEventListener("click", ()=>{
            console.log(newTaskBtn[i].nextSibling.value)
        })
    }*/




    // 5. within a specific tab, you can delete a single task.

    function deleteTask(){
        let deleteTaskBtn = document.querySelectorAll(".deleteTaskBtn")
    

    for (let i = deleteTaskBtn.length - 1; i < deleteTaskBtn.length; i++){
        deleteTaskBtn[i].addEventListener("click", ()=>{
            
                console.log(deleteTaskBtn[i])
                console.log(deleteTaskBtn[i].parentElement)
                deleteTaskBtn[i].parentElement.remove(deleteTaskBtn[i])
        })
    }
}
        
            
   