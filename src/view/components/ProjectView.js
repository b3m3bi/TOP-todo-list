import todoItemTemplate from "../templates/todo-item-template.html";
import todoPageTemplate from "../templates/todo-page-template.html";
import {appController} from "../../index.js";

function createTodoItem(projectId, todo){
    let html = todoItemTemplate
        .replaceAll('{{title}}', todo.title)
        .replaceAll('{{priority}}', todo.priority)
        .replaceAll('{{dueDate}}', todo.dueDate)
        .replaceAll('{{description}}', todo.description)

    const div = document.createElement('div');
    div.innerHTML = html;

    const todoElement =  div.firstElementChild;
    todoElement.dataset.projectId = projectId;

    const checkbox = todoElement.querySelector('#status');
    checkbox.addEventListener('change', () => {
        todo.changeState();
        todoElement.classList.toggle('todo-completed');
    })    

    const deleteBtn = todoElement.querySelector('.todo-btn-delete');
    deleteBtn.addEventListener('click', () => {
        appController.deleteTodoFromProject(projectId, todo.id);
        appController.showProjectPage(projectId);
    })
    return todoElement;    
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
    })
    return projectPageElement;
}

function renderProjectPage(project){
    const mainContainter = document.querySelector('.main-container');
    mainContainter.innerHTML = '';
    const projectPage = createProjectPage(project);
    mainContainter.appendChild(projectPage);
}

export {renderProjectPage};