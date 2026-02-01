import { Todo } from "./todo.js";

class Project {
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.todoItems = [];
    }

    createTodo(name){
        const todo = new Todo(name);
        this.todoItems.push(todo);
        return todo;
    }

    getTodos(){
        return this.todoItems;
    }

    getTodo(id){
        return this.todoItems.find(item => item.id === id);
    }

    deleteTodo(id){
        const index = this.todoItems.findIndex(item => item.id === id);
        this.todoItems.splice(index, 1);
    }
}

export { Project }