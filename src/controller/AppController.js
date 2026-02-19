import { renderAllProjectsPage } from "../view/components/AllProjectsView.js";
import { renderProjectPage } from "../view/components/ProjectView.js";

class AppController{

    constructor(app){
        this.app = app
    }

    showAllProjectsPage(){
        renderAllProjectsPage(this.app);
    }

    showProjectPage(projectId, focusProjectTitle){
        const project = this.app.getProject(projectId);
        renderProjectPage(project, focusProjectTitle);
    }

    deleteTodoFromProject(projectId, todoId){
        this.app.getProject(projectId).deleteTodo(todoId);
    }

    addTodoToProject(projectId){
        this.app.getProject(projectId).createTodo();
    }
}

export {AppController};