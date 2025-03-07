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

function getSVG(titleValue, pathValue) {
    let svg = document.createElement("svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    let title = document.createElement("title");
    title.textContent = titleValue;
    let path = document.createElement("path");
    path.setAttribute("d", pathValue);
    svg.append(title);
    svg.append(path);
    return svg
}

function getButtons() {
    let div = document.createElement("div");
    div.setAttribute("class", "buttons");
    let editBtn = getSVG("pencil", "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z");
    let deleteBtn = getSVG("delete-outline", "M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z");
    div.append(editBtn, deleteBtn);
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

function getProjectPriority() {
    let span = document.createElement("span");
    span.setAttribute("class", "todo-priority");
    let priorityLabel = document.createElement("span");
    priorityLabel.textContent = "Priority";
    let svg = getSVG("circle-slice-8", "M12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z");
    span.append(priorityLabel);
    span.append(svg)
    return span
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
    "getProjectPriority" : getProjectPriority,   
}

export default makers