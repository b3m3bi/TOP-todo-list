import { AppController } from "./controller/AppController.js";
import { App } from "./model/App.js";
import "./styles.css";

const todoApp = new App();
const appController = new AppController(todoApp);

const project01 = todoApp.createProject("Proyecto 1");

project01.createTodo("Hacer popó", "Que salga muy bonita y redondita como de conejo", new Date("1995-08-28"), "high");
project01.createTodo("Limpiar mi cuarto", "Tirar todo lo que no sirva", new Date() , "low");
project01.createTodo("Tocar trompeta");

// console.log(todoApp.getProjects());
// console.log(project01);
// console.log(project01.getTodos());
// const firstTodo = project01.getTodos()[0];
// console.log(project01.getTodos());
// console.log(project01.getTodo(firstTodo.id));
// firstTodo.changeState();
// //project01.deleteTodo(firstTodo.id);
// console.log(project01.getTodos());

//renderAllProjectsPage(todoApp);
//renderer.renderProjectPage(project01);
appController.showAllProjectsPage();

export{appController};

// const mainContainter = document.querySelector('.main-container');
// const projectPage = createProjectPage(project01);
// // const todosContainer = projectPage.querySelector('.todos-container');
// mainContainter.appendChild(projectPage);

// project01.getTodos().forEach(
//     todo => {
//         todosContainer.appendChild(createTodoItem(todo));
//     }
// )
