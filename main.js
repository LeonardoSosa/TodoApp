const form = document.querySelector("form")
const input = document.querySelector("input")
const common = document.querySelector(".common")

// Load all todos from localStorage
let todosList = JSON.parse(localStorage.getItem("todosList"))
if(!todosList){
    todosList = []
}
todosList.forEach(element => {
    createTodo(element.todoText)
});

common.addEventListener("click", (e) => {

    if(e.target.tagName === "ION-ICON"){
        e.target.closest(".todo").remove()
        updateTodos()
    }
    input.focus()
})

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
function createTodo(text) {
    let newTodo = document.createElement('div')
    let newTodoText = document.createElement('p')
    let newDeleteIcon = document.createElement('ion-icon')
    
    newTodo.classList.add("todo")
    newTodoText.textContent = text
    newDeleteIcon.setAttribute("name", "trash-outline")
    
    newTodo.appendChild(newTodoText)
    newTodo.appendChild(newDeleteIcon)
    common.appendChild(newTodo)
}

function updateTodos() {
    let todosDivs = document.querySelectorAll(".todo")
    let todosList = []

    todosDivs.forEach(element => {
        todosList.push({"todoText": element.textContent})

    })
    localStorage.setItem("todosList", JSON.stringify(todosList))
}