const addbtn = document.getElementById("task-btn");
const input  = document.getElementById("task-input");
const parent = document.getElementById("todo-parent");

let ctr = 0;
let todos = [];

function addItem() {
    const errorMessage = document.getElementById("error-message");

    if ((input.value).trim() === "") {
        errorMessage.textContent = "Please enter a task!";
        errorMessage.classList.remove("hidden");
        return;
    }

    errorMessage.classList.add("hidden");

    todos.push({
        todoId: "todo-input-" + ctr,
        editId: "edit-" + ctr,
        deleteId: "delete-" + ctr,
        TodoTextId: "todo-text-" + ctr,
        checkId: "check-" + ctr,
        title: input.value,
        isEditing: false, 
        isCompleted: false 
    });
    ctr++;
    renderTodos(todos);
    input.value = "";
}

function deleteItem(id) {
    todos = todos.filter((todo) => todo.todoId !== id);
    renderTodos(todos);
}

function toggleEditItem(id) {
    todos = todos.map((todo) => {
        if (todo.todoId === id) {
            if (todo.isEditing) {
                todo.title = document.getElementById(todo.TodoTextId).value;
            }
            todo.isEditing = !todo.isEditing;
        }
        return todo;
    });
    renderTodos(todos);
}

function checkItem(id) {
    todos = todos.map((todo) => {
        if (todo.todoId === id) {
            todo.isCompleted = !todo.isCompleted;
        }
        return todo;
    });
    renderTodos(todos);
}


// Render the todo list
function renderTodos(todos) {
    parent.innerHTML = "";
    todos.forEach((todo) => {
        parent.innerHTML += `
            <div id="${todo.todoId}" class="flex items-center justify-between bg-[#5E503F] p-3 rounded-lg">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" id="${todo.checkId}" ${todo.isCompleted ? 'checked' : ''} class="form-checkbox h-5 w-5 text-black" />
                    <input
                        type="text"
                        id="${todo.TodoTextId}"
                        value="${todo.title}"
                        ${todo.isEditing ? 'class="bg-transparent border-none text-[#EAE0D5] focus:outline-none focus:ring focus:ring-[#C6AC8F]"' : 'class="bg-transparent border-none text-[#EAE0D5] focus:outline-none" readonly'}
                    />
                </div>
                <div class="space-x-2">
                    <button
                        id="${todo.editId}"
                        class="bg-${todo.isEditing ? '[#22333B]' : '[#242423]'} hover:bg-${todo.isEditing ? '[#22333B]' : '[#C6AC8F]'} text-white font-bold py-1 px-3 rounded-lg transition">
                        ${todo.isEditing ? 'Save' : 'Edit'}
                    </button>
                    <button
                        id="${todo.deleteId}"
                        class="bg-[#242423] hover:bg-[#0A0908] text-white font-bold py-1 px-3 rounded-lg transition">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });

    todos.forEach((todo) => {
        document.getElementById(todo.deleteId).addEventListener('click', () => {
            deleteItem(todo.todoId);
        });
        document.getElementById(todo.editId).addEventListener('click', () => {
            toggleEditItem(todo.todoId);
        });

        if (todo.isEditing) {
            const inputField = document.getElementById(todo.TodoTextId);
            inputField.focus();
            inputField.classList.add('outline-none', 'ring', 'ring-[#C6AC8F]', 'rounded-md', 'p-1');
        }

        document.getElementById(todo.checkId).addEventListener('click', () => {
            checkItem(todo.todoId);
        });

        if (todo.isCompleted) {
            const inputText = document.getElementById(todo.TodoTextId);
            inputText.classList.add('line-through', 'text-[#C6AC8F]');
        }
    });
}

addbtn.addEventListener("click", () => {
    addItem();
});