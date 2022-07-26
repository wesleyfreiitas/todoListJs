(function(){

    const itemInput = document.getElementById("item-input")
    const todoAddForm = document.getElementById("todo-add")
    const ul = document.getElementById("todo-list")
    const lis = ul.getElementsByTagName("li")

    let arrTasks = getSavedData()
    
    function getSavedData(){
        let tasksData = localStorage.getItem("tasks")
        tasksData = JSON.parse(tasksData)
        
        return  tasksData.length ? tasksData :[
            
            {
                name: "task 1",
                createAt : Date.now(),
                completed : false
            },
            {
                name: "task 2",
                createAt : Date.now(),
                completed : true
            }
        ]
    }

    function setNewData(){
        localStorage.setItem("tasks", JSON.stringify(arrTasks))
    }

    setNewData()

    function generateLiTask(obj){
        const li = document.createElement("li")
        const p = document.createElement("p")
        const checkButton = document.createElement("button")
        const editButton = document.createElement("i")
        const deleteButton = document.createElement("i")

        li.className = "todo-item"
        checkButton.className = "button-check"
        checkButton.innerHTML = `<i class="fas fa-check ${obj.completed ? "" : "displayNone"}" data-action="checkButton"></i>`
        checkButton.setAttribute("data-action","checkButton")
        li.appendChild(checkButton)

        p.className = "task-name"
        p.textContent = obj.name
        li.appendChild(p)

        editButton.className = "fas fa-edit"
        editButton.setAttribute("data-action","editButton")

        li.appendChild(editButton)

        const containerEdit = document.createElement("div")
        containerEdit.className = "editContainer"
        const editInput = document.createElement("input")
        editInput.setAttribute("type", "text")
        editInput.className = "editInput"
        editInput.value = obj.name
        containerEdit.appendChild(editInput)

        const containerEditButton = document.createElement("button")
        containerEditButton.className = "editButton"
        containerEditButton.textContent = "Edit"
        containerEditButton.setAttribute("data-action","containerEditButton")

        containerEdit.appendChild(containerEditButton)

        const cancelButton = document.createElement("button")
        cancelButton.className = "cancelButton"
        cancelButton.textContent = "Cancel"
        cancelButton.setAttribute("data-action","cancelButton")

        containerEdit.appendChild(cancelButton)

        li.appendChild(containerEdit)

        deleteButton.className = "fas fa-trash-alt"
        deleteButton.setAttribute("data-action","deleteButton")

        li.appendChild(deleteButton)
        
        return li
    }

    
    function clickedUl(e){
        const dataAction = e.target.getAttribute("data-action")
        
        if (!dataAction)return
        
        let currentLi = e.target
        
        while(currentLi.nodeName !== "LI"){
            currentLi = currentLi.parentElement
        }
        
        const currentLiIndex = [...lis].indexOf(currentLi)

        const actions = {
            editButton: function(){
                const editContainer = currentLi.querySelector(".editContainer");                
                [...ul.querySelectorAll(".editContainer")].forEach(container => {
                    container.removeAttribute("style")
                });
                editContainer.style.display = "flex" ;
            },
            deleteButton:function(){
                arrTasks.splice(currentLiIndex, 1)
                renderTasks()
                setNewData()
            },
            containerEditButton: function(){
                const val = currentLi.querySelector(".editInput").value
                arrTasks[currentLiIndex].name = val
                renderTasks()
                setNewData()
            },
            cancelButton: function(){
                currentLi.querySelector(".editContainer").removeAttribute("style")
                currentLi.querySelector(".editInput").value = arrTasks[currentLiIndex].name
                
            },
            checkButton: function(){
                arrTasks[currentLiIndex].completed = !arrTasks[currentLiIndex].completed
                //if(arrTasks[currentLiIndex].completed){
                    //   currentLi.querySelector(".fa-check").classList.remove("displayNone")
                    //setNewData()
                    //}else{
                        //    currentLi.querySelector(".fa-check").classList.add("displayNone")
                        //    setNewData()
                        //}
                        renderTasks()
                        setNewData()
                    }
                }
                
                
                if(actions[dataAction]){
                    actions[dataAction]()
                }
            }
            
            function renderTasks(){
                ul.innerHTML = ""
                arrTasks.forEach(task => {
                    ul.appendChild(generateLiTask(task))
                })
                
            }

            function addTask(task){
                arrTasks.push({
                    name: task,
                    createAt : Date.now(),
                    completed : false
                })
                setNewData()
            }
            
            todoAddForm.addEventListener("submit", function(e){
                e.preventDefault
                addTask(itemInput.value)
                renderTasks()
                itemInput.value = ""
                itemInput.focus()
            });
            
            renderTasks()
            
            ul.addEventListener("click", clickedUl)
        })()