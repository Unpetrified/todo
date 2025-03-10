import makers from "./elementMakers";

const section = document.querySelector(".list");

function generateTodos(todoList, section_head = "Todos") {

    let sectionHeading = makers.getSectionHeading(section_head),
        todos = makers.getProjectContainer();
    
    todoList.forEach(todo => {
        let todoItem = makers.getProjectCard(),
            todoHeadingContainer = makers.getProjectHeading(),
            todoHeading = makers.getProjectTitle(todo["title"]),
            actionBtns = makers.getButtons(),
            todo_description = makers.getProjectDescription(todo["description"]),
            todo_date = makers.getProjectDate(todo["due_date"]);

        todoHeadingContainer.append(todoHeading, actionBtns);
        todoItem.append(todoHeadingContainer, todo_description, todo_date);
        todos.append(todoItem);
    });

    section.innerHTML = "";
    section.append(sectionHeading, todos);
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
    "notes" : generateNotes,
}

export default domGenerator;