import { Todo } from "./Todo.js";

class Project {
    constructor(title){
        this.id = crypto.randomUUID();
        this.title = title;
        this.todoItems = [];
    }

    createTodo(title, description = null, dueDate = null, priority = null){
        const todo = new Todo(title, description, dueDate, priority);
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