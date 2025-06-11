function CreateToDoItems() {
  const input = document.getElementById("todoText");
  const alertMsg = document.getElementById("Alert");
  const list = document.getElementById("list-items");

  const text = input.value.trim();

  if (text === "") {
    alertMsg.textContent = "Please enter something!";
    alertMsg.style.color = "red";
    return;
  }

  // Clear alert
  alertMsg.textContent = "";

  // Create list item
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${text}</span>
    <div>
      <img src="check.png" title="Mark Done" class="todo-controls" onclick="toggleDone(this)">
      <img src="delete.png" title="Delete" class="todo-controls" onclick="deleteItem(this)">
    </div>
  `;

  list.appendChild(li);
  input.value = ""; // clear input
}

// Toggle "done" class
function toggleDone(element) {
  const taskText = element.parentElement.parentElement.querySelector(".task-text");
  taskText.style.textDecoration = 
    taskText.style.textDecoration === "line-through" ? "none" : "line-through";
}

// Delete item
function deleteItem(element) {
  const li = element.parentElement.parentElement;
  li.remove();
}