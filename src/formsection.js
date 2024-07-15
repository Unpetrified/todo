import makers from "./elementMakers";

function todoFieldGenerator() {
    const todo_form = document.createElement("fieldset");
    todo_form.classList.add("todo-field");

    const title_label = makers.getLabel("title", "Title");
    const title_input = makers.getInput("title", "text");

    const description_label = makers.getLabel("description", "Description");
    const description_input = makers.getTextArea("description", "description", "3");

    const due_date_label = makers.getLabel("due-date", "Due Date");
    const due_date_input = makers.getInput("due-date", "date");

    const priority = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "Priority";

    priority.append(legend);

    const priority_list = ["Low", "Medium", "High"];
    for (let i = 0; i < priority_list.length; i++) {
        const input = makers.getInput("priority-"+priority_list[i].toLowerCase, "radio", "priority", priority_list[i].toLowerCase);
        const label = makers.getLabel( "priority", priority_list[i]);
        const wrapper = document.createElement("span");
        wrapper.append(input);
        wrapper.append(label)
        priority.append(wrapper);
    }

    [title_label, title_input, description_label, description_input, due_date_label, due_date_input, priority].forEach(element => {
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

function noteFieldGenerator() {
    const note_form = document.createElement("fieldset");
    note_form.classList.add("notes-field");

    const title_label = makers.getLabel("title", "Title");
    const title_input = makers.getInput("title", "text");

    const description_label = makers.getLabel("description", "Description");
    const description_input = makers.getTextArea("description", "description", "3");

    [title_label, title_input, description_label, description_input].forEach(element => {
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