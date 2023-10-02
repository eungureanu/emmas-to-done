export class Todo {
    constructor (id, title, details, duedate, priority, category){
        this.id = id;
        this.title = title;
        this.details = details;
        this.duedate = duedate;
        this.priority = priority;
        this.category = "To Do";
        this.isDone = false;
    }
}