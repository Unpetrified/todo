export class Todo {
    constructor(title, description, due_date, priority) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.priority = priority;
    }

}

export class Notes {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

export class Project {
    constructor(title, data) {
        this.title = title;
        this.data = data;
    }
}

Project.prototype.getData = function() {   
    return this.data
}

Project.prototype.updateData = function(item) {   
    this.data.push(item);
}

Project.prototype.removeItem = function(item) {   
    this.data.splice(this.data.indexof(item), 1);
}