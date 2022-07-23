(function(){
    const itemInput = document.getElementById("item-input")
    const todoAddForm = document.getElementById("todo-add")
    const ul = document.getElementById("todo-list")
    const lis = ul.getElementsByTagName("li")

    

    function addEventLi(li){
        li.addEventListener("click", function(){
            console.log(this)
        })
    }

    function addTask(task){
        const li = document.createElement("li")
        li.className = "todo-item"
        const p = document.createElement("p")
        p.className = "task-name"
        p.textContent = task
        li.appendChild(p)
        ul.appendChild(li)
        addEventLi(li)
    }

    todoAddForm.addEventListener("submit", function(e){
        e.preventDefault
        addTask(itemInput.value)
        itemInput.value = ""
        itemInput.focus()
    });

    [...lis].forEach(li => {
        addEventLi(li)
    })


})()