import { getProject } from "../AppLogic/localStorageQuery";
import makers from "./elementMakers";

function todoFieldGenerator(project="todos") {
    const todo_form = document.createElement("fieldset");
    todo_form.classList.add("todo-field");

    const title_label = makers.getLabel("title", "Title");
    const title_input = makers.getInput("title", "text");

    const description_label = makers.getLabel("description", "Description");
    const description_input = makers.getTextArea("description", "description", "3");

    const due_date_label = makers.getLabel("due-date", "Due Date");
    const due_date_input = makers.getInput("due-date", "date");

    const project_affliation_label = makers.getLabel("project affliation", "Project Affliation");
    const activeTodoProjects = getProject().filter(project => project.title.toLowerCase() !== "notes");
    const project_affliation = makers.getSelection(activeTodoProjects);
    project_affliation.setAttribute("value", project);

    [title_label, title_input, description_label, description_input, due_date_label, due_date_input, project_affliation_label, project_affliation].forEach(element => {
        todo_form.append(element);
    })

    return todo_form
}

function projectFieldGenerator() {
            
    const project_form = document.createElement("fieldset");
    project_form.classList.add("project-field");

    const title_label = makers.getLabel("title", "Title");
    const title_input = makers.getInput("title", "text");


    [title_label, title_input].forEach(element => {
        project_form.append(element);
    })

    return project_form
}

function noteFieldGenerator(project="notes") {
    const note_form = document.createElement("fieldset");
    note_form.classList.add("notes-field");

    const title_label = makers.getLabel("title", "Title");
    const title_input = makers.getInput("title", "text");

    const description_label = makers.getLabel("description", "Description");
    const description_input = makers.getTextArea("description", "description", "3");

    const project_affliation = makers.getInput("affliation", "text");
    project_affliation.setAttribute("value", project);
    project_affliation.style.display = "none";

    [title_label, title_input, description_label, description_input, project_affliation].forEach(element => {
        note_form.append(element);
    })

    return note_form
}

function submitBtn(activeField) {
    const input = makers.getInput("submit-btn", "submit");
    input.setAttribute("value", activeField);

    return input
}

const formFieldGenerator = {
    "todo" : todoFieldGenerator,
    "project" : projectFieldGenerator,
    "note" : noteFieldGenerator,
    "submit" : submitBtn
}

export default formFieldGenerator;