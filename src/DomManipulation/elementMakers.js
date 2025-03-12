import { deleteSvg } from "./todosvgs";

function getLabel(id="", text_content="") {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    
    label.textContent = text_content;

    return label
}

function getInput(id, type, name="", value="") {
    const input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", type);
    input.setAttribute("required", true)

    return input
}

function getTextArea(id, name, rows) {
    const text_area = document.createElement("textarea");
    text_area.setAttribute("id", id);
    text_area.setAttribute("name", name);
    text_area.setAttribute("rows", rows);
    text_area.setAttribute("required", true)

    return text_area
}

function getSelection(choices) {
    let select = document.createElement("select");
    select.setAttribute("id", "affliation");
    select.setAttribute("required", true);

    choices.forEach(choice => {
        let option = document.createElement("option");
        option.setAttribute("value", choice.title.toLowerCase());
        option.textContent = choice.title;
        select.append(option);
    });

    return select
}


function getSectionHeading(section_heading) {
    let section_head = document.createElement("h2");
    section_head.setAttribute("class", "todo-heading");
    section_head.textContent = section_heading;
    return section_head;
}

function getProjectContainer() {
    let div = document.createElement("div");
    div.setAttribute("class", "todo-items");
    return div
}

function getProjectCard() {
    let div = document.createElement("div");
    div.setAttribute("class", "todo-item");
    return div
}

function getProjectHeading() {
    let span = document.createElement("span");
    span.setAttribute("class", "todo-item-heading");
    return span
}

function getProjectTitle(value) {
    let heading = document.createElement("h4");
    heading.textContent = value;
    return heading
}

function getSVG(svg_value, id) {
    let svg = document.createElement("div");
    svg.setAttribute("id", id);
    svg.innerHTML = svg_value;
    return svg
}

function getButtons() {
    let div = document.createElement("div");
    div.setAttribute("class", "buttons");
    let deleteBtn = getSVG(deleteSvg, "delete-btn");
    div.append( deleteBtn);
    return div
}

function getProjectDescription(description) {
    let p = document.createElement("p");
    p.setAttribute("class", "todo-item-description");
    p.textContent = description;
    return p
}

function getProjectDate(date) {
    let p = document.createElement("p");
    p.setAttribute("class", "todo-item-date");
    p.textContent = date;
    return p
}

const makers = {
    "getLabel" : getLabel, 
    "getInput" : getInput,
    "getTextArea" : getTextArea,
    "getSelection" : getSelection,
    "getSectionHeading" : getSectionHeading,
    "getProjectContainer" : getProjectContainer,
    "getProjectCard" : getProjectCard,
    "getProjectHeading" : getProjectHeading,
    "getProjectTitle" : getProjectTitle,
    "getButtons" : getButtons,
    "getProjectDescription" : getProjectDescription,
    "getProjectDate" : getProjectDate,
}

export default makers