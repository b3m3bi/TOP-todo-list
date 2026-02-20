import { appController } from "../../index.js";
import projectItemTemplate from "../templates/project-item-template.html";
import projectPageTemplate from "../templates/project-page-template.html";
import { renderProjectPage } from "./ProjectView.js";
    
function createProjectItem(project){
    let html = projectItemTemplate 
        .replaceAll('{{title}}', project.title)
        .replaceAll('{{numElements}}', project.getTodos().length )

    const div = document.createElement('div');
    div.innerHTML = html;

    const projectElement = div.firstElementChild; 
    const projectTextElement = projectElement.querySelector('.project-item-text');  
    projectTextElement.addEventListener('click', () => {
        renderProjectPage(project);
    })

    const deleteProjectBtn = projectElement.querySelector('.project-btn-delete');
    deleteProjectBtn.addEventListener('click', () => {
        appController.deleteProject(project.id);
        appController.showAllProjectsPage();
        appController.saveToLocalStorage();
    })

    return projectElement;
}

function createAllProjectsPage(app){
    let html = projectPageTemplate;

    const div = document.createElement('div');
    div.innerHTML = html;
    const projectPageElement = div.firstElementChild;

    const projectsContainer = projectPageElement.querySelector('.projects-container');
    app.getProjects().forEach(
        project => {
            projectsContainer.appendChild(createProjectItem(project));
        }
    );

    const addProjectBtn = projectPageElement.querySelector('.create-project-btn');
    addProjectBtn.addEventListener('click', () => {
        const newProject = app.createProject('Nuevo proyecto');
        appController.showProjectPage(newProject.id, true);

        appController.saveToLocalStorage();
    });

    return projectPageElement;
}
    
function renderAllProjectsPage(app){
    const mainContainter = document.querySelector('.main-container');
    mainContainter.innerHTML = '';
    const projectsPage = createAllProjectsPage(app);
    mainContainter.appendChild(projectsPage);
}

export {renderAllProjectsPage };
