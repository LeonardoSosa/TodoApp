const form = document.querySelector(".form")
const input = document.querySelector(".form__input-text")
const common = document.querySelector(".category--common")

// Load all todos from localStorage
let todosList = JSON.parse(localStorage.getItem("todosList"))
if(!todosList){
    todosList = []
}
todosList.forEach(element => {
    console.log(element);
    createTodo(element.todo.text, element.todo.locked)
});

// Icons logic
common.addEventListener("click", (e) => {
    let todo = e.target.closest(".todo"); if(!todo) return
    let trashIcon = todo.querySelector(".todo__icon--trash")
    let lockClosedIcon = todo.querySelector("[name = 'lock-closed-outline']")
    let lockOpenIcon = todo.querySelector("[name = 'lock-open-outline']")

    switch(e.target) {
        case trashIcon: {
            if(lockOpenIcon){
                e.target.closest(".todo").remove()
                // updateTodos()
            }
            else{
                lockClosedIcon.classList.add("shake")
                setTimeout(() => {
                    lockClosedIcon.classList.remove("shake")
                }, 500);
            }
            break
        }
        case lockClosedIcon: {
            e.target.setAttribute("name", "lock-open-outline")
            updateTodos()
            break
        }
        case lockOpenIcon: {
            e.target.setAttribute("name", "lock-closed-outline")
            updateTodos()
            break
        }
    }

})

// Create todo from input
form.addEventListener("submit", (e) => {
    e.preventDefault()

    if(!input.value){
        return
    }
    
    createTodo(input.value)
    updateTodos()
    
    input.value = ""
    input.focus()
})

//! Functions
function createTodo(text, locked = true) {
    let newTodo = document.createElement('div')
    let newTodoText = document.createElement('p')
    let newLockIcon = document.createElement('ion-icon')
    let newDeleteIcon = document.createElement('ion-icon')
    
    newTodo.classList.add("todo")

    newTodoText.classList.add("todo__p")
    newTodoText.textContent = text

    newLockIcon.classList.add("todo__icon--lock", "todo__icon")
    if(locked == true)  newLockIcon.setAttribute("name", "lock-closed-outline")
    else                newLockIcon.setAttribute("name", "lock-open-outline")

    newDeleteIcon.classList.add("todo__icon--trash", "todo__icon")
    newDeleteIcon.setAttribute("name", "trash-outline")
    
    newTodo.appendChild(newTodoText)
    newTodo.appendChild(newLockIcon)
    newTodo.appendChild(newDeleteIcon)
    common.appendChild(newTodo)
}

function updateTodos() {
    let todosDivs = document.querySelectorAll(".todo")
    let todosList = []

    todosDivs.forEach(element => {

        let locked = element.querySelector("[name = 'lock-closed-outline']")
        if(locked){
            todosList.push({"todo": 
                {
                    "text": element.textContent,
                    "locked": true
                }
            })
        }
        else{
            todosList.push({"todo": 
                {
                    "text": element.textContent,
                    "locked": false
                }
            })
        }

    })
    localStorage.setItem("todosList", JSON.stringify(todosList))
}