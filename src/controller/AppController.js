import { renderAllProjectsPage } from "../view/components/AllProjectsView.js";
import { renderProjectPage, turnOffEditModeOnAllTodos } from "../view/components/ProjectView.js";

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
        return this.app.getProject(projectId).createTodo();
    }

    deactivateEditModeOnAllTodos(){
        turnOffEditModeOnAllTodos();
    }

    deleteProject(projectId){
        this.app.deleteProject(projectId);
    }

    saveToLocalStorage(){
        localStorage.setItem( "todoApp", JSON.stringify(this.app));
    }

}

export {AppController};