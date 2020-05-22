var dataObj = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo : [],
    completed : []
}

// Store DataObject in local Storage
// Call function wherever dataObj is
function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(dataObj));
}



function renderTodoList() {
    if (!dataObj.todo.length && !dataObj.completed.length) return;

    for (let x = 0; x < dataObj.todo.length; x++) {
      const value =  dataObj.todo[x];
      addItemToDom(value);
    }

    for (let y = 0; y < dataObj.completed.length; y++) {
        const value = dataObj.completed[y];
        addItemToDom(value, true)
    }
}


const completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" xml:space="preserve"><style type="text/css">.st0{fill:none;}.st1{fill:#26B999;}</style><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
const removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

renderTodoList();
// Display current date
const currentDate = new Date();
// date selector
const date = document.getElementById('date');

// display whole words for 'weekday', abbreviation for 'month', and  digits for day
options = {weekday: 'long', month: 'short', day: 'numeric'}
date.innerHTML = currentDate.toLocaleString('en-Us', options);

// Add text to ToDo list if there's any text inside item field
const add = document.getElementById('add');
add.addEventListener('click', function() {
    const todoInput = document.getElementById('item').value;
    if (todoInput) {
        addItem(todoInput)
    }
});

// Event for Enter
document.getElementById('item').addEventListener('keydown', function(e) {
    const todoInput = this.value;
    if (e.code === 'Enter' && todoInput) {
        addItem(todoInput);
    }
});

function addItem(todoInput) {
    addItemToDom(todoInput);
    // Empty input field/box after clicking
    document.getElementById('item').value = '';

    // Push toDo Input to todo array of dataObj
    dataObj.todo.push(todoInput);
    dataObjectUpdated();
}


// Add new Todo Items to todo list
function addItemToDom(text, completed) {
    const todoList = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    const newItem = document.createElement('li');
    newItem.innerHTML = text;
    
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;


    // Event for complete list
    complete.addEventListener('click', function() {
        const item = this.parentNode.parentNode, 
            parent = item.parentNode;
        const id = parent.id;
        const value = item.innerText;

        // Move inner text from todo dataObj to completed list and vice versa
        // NOTE: This can't be moved. Therefore, delete from todo and add to completed list and vice versa
        if (id === 'todo') {
            dataObj.todo.splice(dataObj.todo.indexOf(value), 1);
            dataObj.completed.push(value)
        } else {
            dataObj.completed.splice(dataObj.todo.indexOf(value), 1);
            dataObj.todo.push(value)
        }
        dataObjectUpdated();
        
        // Add item to completed or back to Todo i.e initial state when clicked
        let choice = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
        parent.removeChild(item);
        choice.insertBefore(item, choice.childNodes[0]);
    })

    const remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // Event for removing list
    remove.addEventListener('click', function () {
        const item = this.parentNode.parentNode, parent = item.parentNode; 
        parent.removeChild(item);
        const id = parent.id;
        const value = item.innerText;

        if (id === 'todo') {
            dataObj.todo.splice(dataObj.todo.indexOf(value), 1);
        } else {
            dataObj.completed.splice(dataObj.completed.indexOf(value), 1);
        }
        dataObjectUpdated();
    })
    

    // Append elements
    buttons.appendChild(complete);
    buttons.appendChild(remove);
    newItem.appendChild(buttons);
    todoList.insertBefore(newItem, todoList.childNodes[0]);
}

// Search Filter
document.getElementById('search-text').addEventListener('keypress', function(e){
    const searchChar = e.target.value.toUpperCase();
    const ul = document.getElementById('todo');
    const li = document.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        let text = li[i].innerText;
        li[i].style.display = (text.toUpperCase().indexOf(searchChar)) > -1 ? 'block' : 'none';
    }
})

function clearTodo() {
    const list = document.querySelector('ul.todo');
    list.innerHTML = '';
    localStorage.clear();   
}