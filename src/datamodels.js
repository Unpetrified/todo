export class Todo {
    constructor(title, description, due_date, priority, project) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.priority = priority;
        this.project = project;
    }

}

export class Notes {
    constructor(title, description, project) {
        this.title = title;
        this.description = description;
        this.project = project;
    }
}

export class Project {
    constructor(title) {
        this.title = title;
    }
}