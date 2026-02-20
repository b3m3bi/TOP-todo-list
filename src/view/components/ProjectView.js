import todoItemTemplate from "../templates/todo-item-template.html";
import todoPageTemplate from "../templates/todo-page-template.html";
import {appController} from "../../index.js";
import {formatDistance} from 'date-fns';

function createTodoItem(projectId, todo){
    let html = todoItemTemplate
        .replaceAll("{{todoId}}", todo.id);
    const div = document.createElement('div');
    div.innerHTML = html;

    const todoElement =  div.firstElementChild;
    todoElement.dataset.projectId = projectId;

    const checkbox = todoElement.querySelector('#status');
    checkbox.addEventListener('change', () => {
        todo.changeState();
        todoElement.classList.toggle('todo-completed');
    });
    if (todo.getState() === "done"){
        checkbox.checked = true;
        todoElement.classList.toggle('todo-completed');
    } else {
        checkbox.checked = false;
    }

    const deleteBtn = todoElement.querySelector('.todo-btn-delete');
    deleteBtn.addEventListener('click', () => {
        appController.deleteTodoFromProject(projectId, todo.id);
        todoElement.remove();
        appController.saveToLocalStorage();
    })

    const editBtn = todoElement.querySelector('.todo-btn-edit');
    editBtn.addEventListener('click', () => {
        const isEditing = todoElement.dataset.editing === "true";
        if (isEditing) {
            todoElement.dataset.editing = "false";
            updateTodoViewMode(todoElement, todo);
        } else {
            appController.deactivateEditModeOnAllTodos();
            todoElement.dataset.editing = "true";
        }
    });

    updateTodoEditMode(todoElement, todo);
    updateTodoViewMode(todoElement, todo);

    return todoElement;    
}

function updateTodoEditMode(todoElement, todo) {
    const inputTitle = todoElement.querySelector('.edit-title');
    inputTitle.value = todo.title;
    inputTitle.addEventListener('input', () => {
        todo.title = inputTitle.value;
        updateTodoViewMode(todoElement, todo);
        appController.saveToLocalStorage();
    });
    if (todo.title == undefined){
        inputTitle.value = ""
    }

    const radiosPriority = todoElement.querySelectorAll(`input[name="priority-${todo.id}"]`);
    radiosPriority.forEach(radio => {
        radio.checked = radio.value === todo.priority;
        radio.addEventListener('change', () => {
            todo.priority = radio.value;
            updateTodoViewMode(todoElement, todo);
            appController.saveToLocalStorage();
        });
    });

    const inputDate = todoElement.querySelector('.edit-date');
    inputDate.valueAsDate = todo.dueDate ? new Date(todo.dueDate) : null;
    inputDate.addEventListener('change', () => {
        todo.dueDate = inputDate.valueAsDate;
        updateTodoViewMode(todoElement, todo);
        appController.saveToLocalStorage();
    })

    const textDescription = todoElement.querySelector('.edit-description');
    textDescription.value = todo.description;
    textDescription.addEventListener('input', () => {
        todo.description = textDescription.value;
        updateTodoViewMode(todoElement, todo);
        appController.saveToLocalStorage();
    })

}

function updateTodoViewMode(todoElement, todo){
    const todoTitle = todoElement.querySelector('.todo-title');
    todoTitle.textContent = todo.title;
    if (todo.title == undefined){
        todoTitle.textContent = "Elemento sin título"
    }

    const todoPriority = todoElement.querySelector('.todo-priority');
    todoPriority.textContent = todo.priority;
    todoPriority.classList = `${todo.priority}-priority`;
    todoPriority.classList.add("todo-priority", "view-mode");

    const todoDate = todoElement.querySelector('.todo-date');
    if (todo.dueDate){
        todoDate.textContent = formatDistance(todo.dueDate, new Date(), { addSuffix: true});
    }

    const todoDescription = todoElement.querySelector('.todo-description');
    todoDescription.textContent = todo.description;

}

function createProjectPage(project){   
    let html = todoPageTemplate;

    const div = document.createElement('div');
    div.innerHTML = html;
    const projectPageElement = div.firstElementChild;
    
    const inputTitle = projectPageElement.querySelector("#project-title");
    inputTitle.value = project.title;

    inputTitle.addEventListener('input', () => {
        project.title = inputTitle.value;
    })

    const  todosContainer = projectPageElement.querySelector('.todos-container');
    project.getTodos().forEach( 
        todo => {
            todosContainer.appendChild(createTodoItem(project.id, todo));
        });

    const returnBtn = projectPageElement.querySelector('.return-btn-container');
    returnBtn.addEventListener('click', () => {
        appController.showAllProjectsPage();
    });

    const addTodoBtn = projectPageElement.querySelector('.add-todo-btn');
    addTodoBtn.addEventListener('click', () => {
        const newTodo = appController.addTodoToProject(project.id);
        const newTodoElement = createTodoItem(project.id, newTodo);
        todosContainer.appendChild(newTodoElement);

        turnOffEditModeOnAllTodos();
        newTodoElement.querySelector('.todo-btn-edit').click();
        newTodoElement.querySelector('.edit-title').focus();
    });

    return projectPageElement;
}

function turnOffEditModeOnAllTodos(){
    const todosContainer = document.querySelector('.todos-container'); 
    const todosItems = todosContainer.querySelectorAll('.todo-item');
    todosItems.forEach(todoItem => {
        todoItem.dataset.editing = "false";
    });
}


function renderProjectPage(project, focusProjectTitle = false){
    const mainContainter = document.querySelector('.main-container');
    mainContainter.innerHTML = '';
    const projectPage = createProjectPage(project);
    mainContainter.appendChild(projectPage);

    if (focusProjectTitle){
        const inputTitle = projectPage.querySelector('.project-title');
        inputTitle.focus();
    }
}

export {renderProjectPage, turnOffEditModeOnAllTodos};