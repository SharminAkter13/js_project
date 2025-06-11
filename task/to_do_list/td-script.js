const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

// localstorage object 

let todo = JSON.parse(localStorage.getItem("todo-list"));
if(!todo){
    todo =[];
}

// functions for CREATE, READ, UPDATE & DELETE
function CreateTodoItems(){
    if (todoValue.value ===""){
        todoAlert.innerText = "Please enter your todo text";
        todoValue.focus();
    }else {
        let IsPresent = false;
        todo.forEach((element) => {
            if (element.item == todoValue.value){
                IsPresent = true;
            }
        });
        
        if (IsPresent){
            setAlertMessage("This item already present in the list");
            return;
        }
         
        let li = document.createElement(li);
        const  todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                    <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" />
                    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" /></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);

    if(!todo){
        todo = [];
    }
    let itemList = {item:todoValue.value, status:false};
    todo.push(itemList);
    setLocalStorage();
    }
    todoValue.value = "";
    setAlertMessage("Todo item created successfully!");

}

function ReadToDoItems() {
  todo.forEach((element) => {
    let li = document.createElement("li");
    let style = "";
    if (element.status) {
      style = "style='text-decoration: line-through'";
    }
    const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
      element.item
    }
    ${
      style === ""
        ? ""
        : '<img class="todo-controls" src="/images/check-mark.png" />'
    }</div><div>
    ${
      style === ""
        ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" />'
        : ""
    }
    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" /></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}
ReadToDoItems()