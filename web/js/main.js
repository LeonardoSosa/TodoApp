const form = document.querySelector(".form")
const formText = document.querySelector(".form__input-text")
const formCategory = document.querySelector(".form__select-category")
const categories = document.querySelectorAll(".category")

updateFormCategory()
// Load all todos from localStorage
let categoriesListJSON = JSON.parse(localStorage.getItem("categoriesListJSON"))
if(!categoriesListJSON){
    categoriesListJSON = []
}
categoriesListJSON.forEach(category => {
    category.todos.forEach(todo => {
        createTodo(todo.text, todo.locked, category.name)
    })
});

// Icons logic
categories.forEach(category => {
    category.addEventListener("click", (e) => {
        let todo = e.target.closest(".todo"); if(!todo) return
        let trashIcon = todo.querySelector(".todo__icon--trash")
        let lockClosedIcon = todo.querySelector("[name = 'lock-closed-outline']")
        let lockOpenIcon = todo.querySelector("[name = 'lock-open-outline']")

        switch(e.target) {
            case trashIcon: {
                if(lockOpenIcon){
                    todo.remove()
                    updateTodos()
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
})

// Create todo from input
form.addEventListener("submit", (e) => {
    e.preventDefault()

    if(!formText.value){
        return
    }
    
    createTodo(formText.value, true, formCategory.value)
    updateTodos()
    
    formText.value = ""
    formText.focus()
})

//! Functions
function createTodo(text, locked, category) {
    let categoryContainer = document.querySelector(`[data-category=${category}]`)

    let newTodo = document.createElement('div')
    newTodo.classList.add("todo")

    if(locked == true) {
        newTodo.innerHTML += `
            <p class="todo__p">${text}</p>
            <ion-icon class="todo__icon--lock todo__icon" name="lock-closed-outline"></ion-icon>
            <ion-icon class="todo__icon--trash todo__icon" name="trash-outline"></ion-icon>
        `
    }
    else {
        newTodo.innerHTML += `
            <p class="todo__p">${text}</p>
            <ion-icon class="todo__icon--lock todo__icon" name="lock-open-outline"></ion-icon>
            <ion-icon class="todo__icon--trash todo__icon" name="trash-outline"></ion-icon>
        `
    }

    categoryContainer.appendChild(newTodo)
}

function updateTodos() {
    let categoriesListJSON = []
    let categoriesNames = []
    categories.forEach(category => categoriesNames.push(category.getAttribute("data-category")) );

    categoriesNames.forEach( categoryName => {
        let todos = document.querySelectorAll(`[data-category=${categoryName}] > .todo`)
        let todosJSON = []
        todos.forEach( todo => {
            let locked = todo.querySelector("[name = 'lock-closed-outline']")
            let lockedValue
            if(locked) lockedValue = true
            else lockedValue = false

            todosJSON.push({
                "text": todo.textContent,
                "locked": lockedValue
            })
        })


        let categoryJSON = {
            "name": categoryName,
            "todos": todosJSON
        }
        categoriesListJSON.push(categoryJSON)
    })
    localStorage.setItem("categoriesListJSON", JSON.stringify(categoriesListJSON))

}

function updateFormCategory() {
    categories.forEach( category => {
        let newOption = document.createElement("option")
        newOption.textContent = category.getAttribute("data-category")
        formCategory.appendChild(newOption)
    })
}