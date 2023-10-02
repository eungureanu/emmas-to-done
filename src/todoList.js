import { Todo } from './todo.js';

export class TodoList {
    constructor(){
        this.todoList = [];
        this.id=1;
        this.owner = "Emma";
    }

    createTodo(title, details, duedate, prio, category){
        this.todoList.push(new Todo(this.id, title, details, duedate, prio, category));
        this.id++;
        return this.todoList;
    }
    
    updateTodo(id, newTitle, newDetails, newDuedate, newPriority, newCategory) {
        this.objectToUpdate = this.todoList.find(object => object.id == id);

        this.objectToUpdate.title = newTitle;
        this.objectToUpdate.details = newDetails;
        this.objectToUpdate.duedate = newDuedate;
        this.objectToUpdate.priority = newPriority;
        this.objectToUpdate.category = newCategory;
    
        return this.todoList;
    }

    deleteTodo(id){
        this.todoList = this.todoList.filter(object => object.id !== id);
        return this.todoList;
    }

    getTodo(id){
        return this.todoList.find(object => object.id == id);
    }
}