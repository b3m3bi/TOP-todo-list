import { AppController } from "./controller/AppController.js";
import { App } from "./model/App.js";
import { Project } from "./model/Project.js";
import { Todo } from "./model/Todo.js";
import "./styles.css";

let todoApp;

const data = localStorage.getItem("todoApp");
if (data){
    todoApp = JSON.parse(data);
    Object.setPrototypeOf(todoApp, App.prototype);
    todoApp.projects.forEach(project => {
        Object.setPrototypeOf(project, Project.prototype );
        project.todoItems.forEach(todo => {
            Object.setPrototypeOf(todo, Todo.prototype);
            if (todo.dueDate){
                Object.setPrototypeOf(todo.dueDate, Date.prototype);
            }
        });
    });
} else {
    todoApp = new App();
    const project01 = todoApp.createProject("Proyecto 1");
    project01.createTodo("Hacer popó", "Que salga muy bonita y redondita como de conejo", new Date("1995-08-28"), "high");
    project01.createTodo("Limpiar mi cuarto", "Tirar todo lo que no sirva", new Date() , "low");
    project01.createTodo("Tocar trompeta");
}

const appController = new AppController(todoApp);
appController.showAllProjectsPage();
export{appController};
