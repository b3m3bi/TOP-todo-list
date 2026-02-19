class Todo {
    state = "todo"
    constructor(title, description = null, dueDate = null, priority = null) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    editTodo(title = null, description = null, dueDate = null, priority = null){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    changeState() {
        this.state = this.state === "todo" ? "done" : "todo";
    }

    getState() {
        return this.state;
    }
}

export { Todo }