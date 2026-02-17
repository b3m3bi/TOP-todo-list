import todoItemTemplate from "./todo-item-template.html";
import todoPageTemplate from "./todo-page-template.html";
import projectItemTemplate from "./project-item-template.html";
import projectPageTemplate from "./project-page-template.html";


class Renderer {
    constructor(app){
        this.app = app;
    }

    createTodoItem(projectId, todo){
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
            const parentProject = this.app.getProject(todoElement.dataset.projectId);
            parentProject.deleteTodo(todo.id);
            this.renderProjectPage(parentProject);
        })
        return todoElement;    
    }
    
    createProjectPage(project){   
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
                todosContainer.appendChild(this.createTodoItem(project.id, todo));
            });
    
        const returnBtn = projectPageElement.querySelector('.return-btn-container');
        returnBtn.addEventListener('click', () => {
            this.renderProjectsPage(this.app);
        })
        return projectPageElement;
    }
    
    createProjectItem(project){
        let html = projectItemTemplate 
            .replaceAll('{{title}}', project.title)
            .replaceAll('{{numElements}}', project.getTodos().length )
    
        const div = document.createElement('div');
        div.innerHTML = html;
    
        const projectElement = div.firstElementChild;   
        projectElement.addEventListener('click', () => {
            this.renderProjectPage(project);
    
        })
        return projectElement;
    }
    
    createProjectsPage(){
        let html = projectPageTemplate;
    
        const div = document.createElement('div');
        div.innerHTML = html;
        const projectPageElement = div.firstElementChild;
    
        const projectsContainer = projectPageElement.querySelector('.projects-container');
        this.app.getProjects().forEach(
            project => {
                projectsContainer.appendChild(this.createProjectItem(project));
            }
        );
        return projectPageElement;
    
    }
    
    renderProjectPage(project){
        const mainContainter = document.querySelector('.main-container');
        mainContainter.innerHTML = '';
        const projectPage = this.createProjectPage(project);
        mainContainter.appendChild(projectPage);
    }
    
    renderProjectsPage(){
        const mainContainter = document.querySelector('.main-container');
        mainContainter.innerHTML = '';
        const projectsPage = this.createProjectsPage();
        mainContainter.appendChild(projectsPage);
    }
}

export {Renderer};