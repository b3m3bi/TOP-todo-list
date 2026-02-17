import { renderAllProjectsPage } from "../view/components/AllProjectsView.js";
import { renderProjectPage } from "../view/components/ProjectView.js";

class AppController{

    constructor(app){
        this.app = app
    }

    showAllProjectsPage(){
        renderAllProjectsPage(this.app);
    }

    showProjectPage(projectId){
        const project = this.app.getProject(projectId);
        renderProjectPage(project);
    }

    deleteTodoFromProject(projectId, todoId){
        this.app.getProject(projectId).deleteTodo(todoId);
    }
}

export {AppController};