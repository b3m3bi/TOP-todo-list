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
    projectElement.addEventListener('click', () => {
        renderProjectPage(project);
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
    return projectPageElement;
}
    
function renderAllProjectsPage(app){
    const mainContainter = document.querySelector('.main-container');
    mainContainter.innerHTML = '';
    const projectsPage = createAllProjectsPage(app);
    mainContainter.appendChild(projectsPage);
}

export {renderAllProjectsPage };
