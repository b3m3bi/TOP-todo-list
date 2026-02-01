import { App } from "./app.js";

const todoApp = new App();

const project01 = todoApp.createProject("Proyecto 1");

project01.createTodo("Hacer popó");
project01.createTodo("Limpiar mi cuarto");

console.log(todoApp.getProjects());

console.log(project01.getTodos());

const firstTodo = project01.getTodos()[0];

firstTodo.description = "Esta es una descripcion";
firstTodo.editTodo("Ir al baño", "Algo");

console.log(project01.getTodos());

console.log(project01.getTodo(firstTodo.id));
firstTodo.changeState();
// project01.deleteTodo(firstTodo.id);

console.log(project01.getTodos());