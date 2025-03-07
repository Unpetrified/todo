import makers from "./elementMakers";

const section = document.querySelector(".list");

function generateTodos(todoList) {

    let sectionHeading = makers.getSectionHeading("Todos"),
        todos = makers.getProjectContainer();
    
    todoList.forEach(todo => {
        let todoItem = makers.getProjectCard(),
            todoHeadingContainer = makers.getProjectHeading(),
            todoHeading = makers.getProjectTitle(todo["title"]),
            actionBtns = makers.getButtons(),
            todo_description = makers.getProjectDescription(todo["description"]),
            todo_date = makers.getProjectDate(todo["due_date"]),
            todo_priority = makers.getProjectPriority();

        todoHeadingContainer.append(todoHeading, actionBtns);
        todoItem.append(todoHeadingContainer, todo_description, todo_date, todo_priority);
        todos.append(todoItem);
    });

    section.innerHTML = "";
    section.append(sectionHeading, todos);
}

function generateProject(projectList, projectName) {

    let sectionHeading = makers.getSectionHeading(projectName);
    let projectTodos = makers.getProjectContainer();

    projectList.forEach(project_todo => {
        let todoItem = makers.getProjectCard(),
            todoHeadingContainer = makers.getProjectHeading(),
            todoHeading = makers.getProjectTitle(project_todo["title"]),
            actionBtns = makers.getButtons(),
            todo_description = makers.getProjectDescription(project_todo["description"]),
            todo_date = makers.getProjectDate(project_todo["due_date"]),
            todo_priority = makers.getProjectPriority();

        todoHeadingContainer.append(todoHeading, actionBtns);
        todoItem.append(todoHeadingContainer, todo_description, todo_date, todo_priority);
        projectTodos.append(todoItem);
    });

    section.innerHTML = "";
    section.append(sectionHeading, projectTodos);
}

function generateNotes(noteList) {

    let sectionHeading = makers.getSectionHeading("Notes");
    let notes = makers.getProjectContainer();

    noteList.forEach(note => {
        let noteItem = makers.getProjectCard(),
            noteHeadingContainer = makers.getProjectHeading(),
            noteHeading = makers.getProjectTitle(note["title"]),
            actionBtns = makers.getButtons(),
            note_description = makers.getProjectDescription(note["description"]);

        noteHeadingContainer.append(noteHeading, actionBtns);
        noteItem.append(noteHeadingContainer, note_description);
        notes.append(noteItem);
    });

    section.innerHTML = "";
    section.append(sectionHeading, notes);
}

const domGenerator = {
    "todos" : generateTodos,
    "projects" : generateProject,
    "notes" : generateNotes,
}

export default domGenerator;