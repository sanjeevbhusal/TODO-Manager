// Selectors
const formInput = document.querySelector('.form-input')
const formButton = document.querySelector('.form-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos)
formButton.addEventListener('click', addTodo );
todoList.addEventListener('click', deleteCheck );
filterOption.addEventListener('click', filterTodo );


//Functions
function addTodo(event){
    //Prevents form from Submitting
    event.preventDefault();
    //Create Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item")
    newTodo.innerText = formInput.value;
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(formInput.value);
    //Create Check Mark Button 
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("btn-completed");
    todoDiv.appendChild(completedButton);
    //Create Delete Button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("btn-trash");
    todoDiv.appendChild(trashButton);
    //Append todoDiv to todo-list
    todoList.appendChild(todoDiv);
    //Clear Form INPUT VALUE
    formInput.value="";
}

function deleteCheck(event){
 const item = event.target;
//  DELETE newTodo
  if(item.classList[0] == "btn-trash"){
      const newTodo =  item.parentElement;
      //Animation
      newTodo.classList.add("fall");
      removelocalTodos(newTodo);
      newTodo.addEventListener('transitionend',function(){
      newTodo.remove();   
      })
  }
   //CHECK MARK
  if(item.classList[0] == "btn-completed"){
    const newTodo =  item.parentElement;
    newTodo.classList.toggle("completed");
}
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
               break; 
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    //CHECK----Do i already have something in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        //Takes a String and converts into object.
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
     
}

function getTodos(){
     //CHECK----Do i already have existing Todos in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        //Takes a String and converts into object.
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todos){
    //Create Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item")
    newTodo.innerText = todos;
    todoDiv.appendChild(newTodo);
    //Create Check Mark Button 
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("btn-completed");
    todoDiv.appendChild(completedButton);
    //Create Delete Button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("btn-trash");
    todoDiv.appendChild(trashButton);
    //Append todoDiv to todo-list
    todoList.appendChild(todoDiv);
    }
    )
}
function removelocalTodos(todo){
     //CHECK----Do i already have existing Todos in there?
     let todos;
     if(localStorage.getItem('todos') === null){
         todos=[];
     }
     else{
         todos = JSON.parse(localStorage.getItem('todos'))
     }
     const innertext = todo.children[0].innerText;
     todos.splice(todos.indexOf(innertext),1);
     localStorage.setItem("todos", JSON.stringify(todos));
    }
