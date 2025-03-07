import { getProject } from "../AppLogic/localStorageQuery";
import makers from "./elementMakers";
// [
// {"title":"Todos",
// "data":[
// {"title":"Print form","description":"Remember to print it on your way home","due_date":"2025-03-08","priority":"medium"},
// {"title":"Go see naza","description":"She is a bitch","due_date":"2025-03-26","priority":"high"}
// ]},
// 
// {"title":"Notes",
// "data":[
// {"title":"Type","description":"I am tired\n"},
// {"title":"Another one","description":"This is a new note\n"}
// ]},
// 
// {"title":"Build software",
// "data":[]},

// {"title":"Write a book",
// "data":[]},

// {"title":"Have some fun",
// "data":[]}]
function todoFieldGenerator(project="todos") {
    const todo_form = document.createElement("fieldset");
    todo_form.classList.add("todo-field");

    const title_label = makers.getLabel("title", "Title");
    const title_input = makers.getInput("title", "text");

    const description_label = makers.getLabel("description", "Description");
    const description_input = makers.getTextArea("description", "description", "3");

    const due_date_label = makers.getLabel("due-date", "Due Date");
    const due_date_input = makers.getInput("due-date", "date");

    const activeTodoProjects = getProject().filter(project => project.title.toLowerCase() !== "notes");
    const project_affliation = makers.getSelection(activeTodoProjects);
    project_affliation.setAttribute("value", project);

    const priority = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "Priority";

    priority.append(legend);

    const priority_list = ["Low", "Medium", "High"];
    for (let i = 0; i < priority_list.length; i++) {
        let priority_value = priority_list[i].toLowerCase();

        const input = makers.getInput(`priority-${priority_value}`, "radio");
        input.setAttribute("name", "priority");
        input.setAttribute("value", `${priority_value}`);

        // set low as the default priority
        if (i===0) input.setAttribute("checked", true);

        const label = makers.getLabel( "priority", priority_list[i]);
        const wrapper = document.createElement("span");
        wrapper.append(input, label);
        priority.append(wrapper);
    }

    [title_label, title_input, description_label, description_input, due_date_label, due_date_input, project_affliation, priority].forEach(element => {
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