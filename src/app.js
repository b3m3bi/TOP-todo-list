import { Project } from "./project.js";

class App {
    constructor(){
        this.projects = [ new Project("Default") ]
    }

    createProject(name){
        const project = new Project(name);
        this.projects.push( project);
        return project;
    }

    getProjects(){
        return this.projects;
    }

    getProject(id){
        return this.projects.find(project => project.id === id);
    }

    deleteProject(id){
        const index = this.projects.find(project => project.id === id);
        this.projects.splice(index, 1);
    }
}

export { App };